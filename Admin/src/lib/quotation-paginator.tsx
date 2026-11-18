import React from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import {
  QuotationPrintData,
  QuotationPageModel,
  QuotationPageShell,
  QUOTATION_CSS,
  AtomicBlock,
  tokenizeHtmlBlocks,
  assembleBlocks,
  compileNarrativeText,
  formatPrice,
} from "@/components/quotation/quotation-print-sheet";
import { format } from "@/lib/date";
import { numberToWords } from "@/lib/number-to-words";

export function nextFrame(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.requestAnimationFrame) {
      setTimeout(resolve, 16);
      return;
    }
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => resolve());
    });
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// HARDENED MEASUREMENT SANDBOX (210mm A4, ISOLATED, WITH STYLES)
// ─────────────────────────────────────────────────────────────────────────────
export function createSandbox(): { root: HTMLDivElement; dispose(): void } {
  const root = document.createElement("div");
  root.style.cssText =
    "position:absolute;left:-10000px;top:0;visibility:hidden;pointer-events:none;" +
    "width:210mm;display:flow-root;box-sizing:border-box;";
  root.className = "quotation-document font-sans";

  const styleEl = document.createElement("style");
  styleEl.textContent = QUOTATION_CSS;
  root.appendChild(styleEl);

  document.body.appendChild(root);
  return {
    root,
    dispose: () => {
      try {
        root.remove();
      } catch {}
    },
  };
}

// Extracts a short single-line slice of a block to test orphan-heading clearance
function getFirstLineBlock(block: AtomicBlock): AtomicBlock {
  const isListItem = block.isListItem;
  const tag = isListItem ? "li" : "p";
  const match = block.html.match(new RegExp(`^<${tag}(?:\\s+[^>]*)?>([\\s\\S]*?)<\\/${tag}>$`, "i"));
  const text = (match ? match[1] : block.html).replace(/<[^>]*>/g, "").trim();
  const firstLineText = text.split(/[.\n]/)[0]?.slice(0, 75) || text.slice(0, 75);
  return {
    ...block,
    html: `<${tag}>${firstLineText}</${tag}>`,
  };
}

// Split paragraph or list item candidate based on real browser overflow predicate
function splitBlockWithPredicate(
  block: AtomicBlock,
  pageBlocks: AtomicBlock[],
  narrativeEl: HTMLElement,
  fits: (body: HTMLElement) => boolean,
  body: HTMLElement
): { fitsBlock: AtomicBlock | null; remainderBlock: AtomicBlock | null } {
  const isListItem = block.isListItem;
  const rawHtml = block.html;
  const tag = isListItem ? "li" : "p";
  const match = rawHtml.match(new RegExp(`^<${tag}(?:\\s+[^>]*)?>([\\s\\S]*?)<\\/${tag}>$`, "i"));
  const inner = match ? match[1] : rawHtml.replace(/<[^>]*>/g, "");

  // Find candidate split offsets at whitespace or line-breaks outside of HTML tags
  const candidates: Array<{ pos: number; isSentence: boolean }> = [];
  let inTag = false;

  for (let i = 0; i < inner.length; i++) {
    const ch = inner[i];
    if (ch === "<") {
      inTag = true;
    } else if (ch === ">") {
      inTag = false;
      const tagSlice = inner.slice(Math.max(0, i - 6), i + 1);
      if (/<br\s*\/?>$/i.test(tagSlice)) {
        candidates.push({ pos: i + 1, isSentence: true });
      }
    } else if (!inTag && /\s/.test(ch)) {
      const prevText = inner.slice(Math.max(0, i - 10), i);
      const isSentence = /[.?!;:\u0964]["'”’]?$/.test(prevText.trim());
      candidates.push({ pos: i, isSentence });
    }
  }

  if (candidates.length < 2) {
    return { fitsBlock: null, remainderBlock: block };
  }

  function makeHalves(splitPos: number) {
    const rawPart1 = inner.substring(0, splitPos).trim().replace(/<br\s*\/?>$/i, "");
    const rawPart2 = inner.substring(splitPos).trim().replace(/^<br\s*\/?>/i, "");

    const openTags = (rawPart1.match(/<([a-z0-9]+)(?:\s+[^>]*)?>/gi) || []).map((t) =>
      t.replace(/[<>]/g, "").split(" ")[0].toLowerCase()
    );
    const closeTags = (rawPart1.match(/<\/([a-z0-9]+)>/gi) || []).map((t) =>
      t.replace(/[<>/]/g, "").toLowerCase()
    );
    const unclosed = openTags.filter(
      (t) =>
        t !== "br" &&
        t !== "hr" &&
        t !== "img" &&
        openTags.filter((x) => x === t).length > closeTags.filter((x) => x === t).length
    );

    const closingMarkup = unclosed.slice().reverse().map((t) => `</${t}>`).join("");
    const reopeningMarkup = unclosed.map((t) => `<${t}>`).join("");

    const fitsHtml = `<${tag}>${rawPart1}${closingMarkup}</${tag}>`;
    const remainderHtml = `<${tag} data-continued="true">${reopeningMarkup}${rawPart2}</${tag}>`;

    return {
      fitsBlock: {
        type: block.type,
        html: fitsHtml,
        isListItem: block.isListItem,
        listType: block.listType,
        itemIndex: block.itemIndex,
        height: 0,
      },
      remainderBlock: {
        type: block.type,
        html: remainderHtml,
        isListItem: block.isListItem,
        listType: block.listType,
        itemIndex: block.itemIndex ? block.itemIndex + 1 : undefined,
        height: 0,
      },
    };
  }

  // Binary search for largest candidate chunk that fits without overflow
  let low = 0;
  let high = candidates.length - 1;
  let bestCandidateIdx = -1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const { fitsBlock } = makeHalves(candidates[mid].pos);

    narrativeEl.innerHTML = assembleBlocks([...pageBlocks, fitsBlock]);

    if (fits(body)) {
      bestCandidateIdx = mid;
      low = mid + 1; // Try to fit more
    } else {
      high = mid - 1; // Fit less
    }
  }

  if (bestCandidateIdx >= 0) {
    // If a sentence boundary exists within 4 steps behind, prefer clean sentence break
    let chosenIdx = bestCandidateIdx;
    for (let i = bestCandidateIdx; i >= Math.max(0, bestCandidateIdx - 4); i--) {
      if (candidates[i].isSentence) {
        chosenIdx = i;
        break;
      }
    }
    return makeHalves(candidates[chosenIdx].pos);
  }

  return { fitsBlock: null, remainderBlock: block };
}

// ─────────────────────────────────────────────────────────────────────────────
// MEASURED CLOSED-LOOP PAGINATOR
// ─────────────────────────────────────────────────────────────────────────────
export async function paginateMeasured(data: QuotationPrintData): Promise<QuotationPageModel[]> {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return [];
  }

  const sandbox = createSandbox();
  const reactMount = document.createElement("div");
  sandbox.root.appendChild(reactMount);
  const reactRoot = createRoot(reactMount);

  try {
    const formattedDate = data.quote_date
      ? format(new Date(data.quote_date), "d MMMM, yyyy")
      : format(new Date(), "d MMMM, yyyy");

    const grandTotalValue = data.grand_total || data.software_amount || 0;
    const formattedGrandTotal = formatPrice(grandTotalValue);
    const inWordsDisplay =
      data.in_words && data.in_words.trim().length > 0
        ? data.in_words
        : numberToWords(grandTotalValue);

    const softwareRows = data.software_rows ? [...data.software_rows] : [];
    const narrativeHtml = compileNarrativeText(data);
    const allBlocks = tokenizeHtmlBlocks(narrativeHtml);

    let unallocatedRows = [...softwareRows];
    let unallocatedBlocks = [...allBlocks];
    const pages: QuotationPageModel[] = [];
    let pageNumber = 1;

    // Helper: Mount page into sandbox and return body element
    const renderCandidate = (candidatePage: QuotationPageModel): HTMLElement => {
      flushSync(() => {
        reactRoot.render(
          <QuotationPageShell
            data={data}
            formattedDate={formattedDate}
            formattedGrandTotal={formattedGrandTotal}
            inWordsDisplay={inWordsDisplay}
            page={candidatePage}
            measureMode={true}
          />
        );
      });
      return sandbox.root.querySelector<HTMLElement>(".quotation-page-body")!;
    };

    // Sub-pixel tolerance of 1px for browser text rasterization
    const fits = (body: HTMLElement): boolean => {
      if (!body) return false;
      return body.scrollHeight - body.clientHeight <= 1;
    };

    while (unallocatedRows.length > 0 || unallocatedBlocks.length > 0) {
      const isFirstPage = pageNumber === 1;

      // ───────────────────────────────────────────────────────────────────────
      // 1. Table Row Allocation
      // ───────────────────────────────────────────────────────────────────────
      let pageTableChunk: QuotationPageModel["tableChunk"] = null;

      if (unallocatedRows.length > 0) {
        const isFirstChunk = unallocatedRows.length === softwareRows.length;
        const chunkRows: typeof unallocatedRows = [];

        // Seed with candidate page
        renderCandidate({
          pageNumber,
          isFirstPage,
          isLastPage: false,
          tableChunk: {
            rows: chunkRows,
            isFirstChunk,
            isLastChunk: unallocatedRows.length === 0,
          },
          narrativeHtml: null,
          showSignatory: false,
        });

        while (unallocatedRows.length > 0) {
          const candidateRow = unallocatedRows[0];
          const testRows = [...chunkRows, candidateRow];
          const isLastChunkCandidate = unallocatedRows.length === 1;

          const body = renderCandidate({
            pageNumber,
            isFirstPage,
            isLastPage: false,
            tableChunk: {
              rows: testRows,
              isFirstChunk,
              isLastChunk: isLastChunkCandidate,
            },
            narrativeHtml: null,
            showSignatory: false,
          });

          if (fits(body)) {
            chunkRows.push(unallocatedRows.shift()!);
          } else {
            break;
          }
        }

        // Safety guarantee: Always place at least 1 row per page
        if (chunkRows.length === 0 && unallocatedRows.length > 0) {
          chunkRows.push(unallocatedRows.shift()!);
        }

        pageTableChunk = {
          rows: chunkRows,
          isFirstChunk,
          isLastChunk: unallocatedRows.length === 0,
        };
      }

      // ───────────────────────────────────────────────────────────────────────
      // 2. Narrative Block Allocation with Measured Splitting
      // ───────────────────────────────────────────────────────────────────────
      let pageNarrativeHtml: string | null = null;
      let showSignatory = false;

      if (unallocatedBlocks.length > 0) {
        const pageBlocks: AtomicBlock[] = [];

        const body = renderCandidate({
          pageNumber,
          isFirstPage,
          isLastPage: false,
          tableChunk: pageTableChunk,
          narrativeHtml: "",
          showSignatory: false,
        });

        const narrativeEl = body.querySelector<HTMLElement>(".quotation-narrative-flow")!;

        while (unallocatedBlocks.length > 0) {
          const nextB = unallocatedBlocks[0];

          if (nextB.type === "pagebreak" || nextB.html.includes("page-break")) {
            unallocatedBlocks.shift();
            break;
          }

          // Orphan-heading protection: Headings must clear with at least 1-2 lines of text
          const isStandaloneHeading =
            nextB.type.startsWith("h") ||
            (nextB.html.startsWith("<p><strong>") && !nextB.html.includes("<br"));
          if (isStandaloneHeading) {
            if (unallocatedBlocks.length > 1) {
              const probeNext = unallocatedBlocks[1];
              const firstLineOfNext = getFirstLineBlock(probeNext);
              narrativeEl.innerHTML = assembleBlocks([...pageBlocks, nextB, firstLineOfNext]);
              if (!fits(body)) {
                // Cannot fit heading + at least 1 line of text. Move heading to next page
                break;
              }
            } else {
              break;
            }
          }

          narrativeEl.innerHTML = assembleBlocks([...pageBlocks, nextB]);

          if (fits(body)) {
            pageBlocks.push(unallocatedBlocks.shift()!);
          } else {
            // Block does not fit: attempt measured split if paragraph or list item
            if (nextB.type === "p" || nextB.type === "li") {
              const splitRes = splitBlockWithPredicate(
                nextB,
                pageBlocks,
                narrativeEl,
                fits,
                body
              );

              if (splitRes.fitsBlock) {
                pageBlocks.push(splitRes.fitsBlock);
                unallocatedBlocks[0] = splitRes.remainderBlock!;
                narrativeEl.innerHTML = assembleBlocks(pageBlocks);
              }
            }
            break;
          }
        }

        // Safety: If no block could be placed and no table exists on this page, take at least 1
        if (pageBlocks.length === 0 && unallocatedBlocks.length > 0 && !pageTableChunk) {
          pageBlocks.push(unallocatedBlocks.shift()!);
          narrativeEl.innerHTML = assembleBlocks(pageBlocks);
        }

        pageNarrativeHtml = assembleBlocks(pageBlocks);

        // ─────────────────────────────────────────────────────────────────────
        // 3. Signatory Placement Test
        // ─────────────────────────────────────────────────────────────────────
        if (unallocatedBlocks.length === 0) {
          const bodyWithSig = renderCandidate({
            pageNumber,
            isFirstPage,
            isLastPage: true,
            tableChunk: pageTableChunk,
            narrativeHtml: pageNarrativeHtml,
            showSignatory: true,
          });

          if (fits(bodyWithSig)) {
            showSignatory = true;
          } else if (pageBlocks.length > 1) {
            // Signatory doesn't fit: pull back 1-2 blocks so signature is not alone on next page
            let pullCount = 0;
            while (pageBlocks.length > 1 && pullCount < 2) {
              const popped = pageBlocks.pop()!;
              unallocatedBlocks.unshift(popped);
              pullCount++;
              if (popped.type.startsWith("h") || popped.html.startsWith("<p><strong>")) {
                break;
              }
            }
            pageNarrativeHtml = assembleBlocks(pageBlocks);
          }
        }
      } else if (unallocatedRows.length === 0 && unallocatedBlocks.length === 0) {
        showSignatory = true;
      }

      const hasTable = !!pageTableChunk;
      const hasNarrative = !!(pageNarrativeHtml && pageNarrativeHtml.trim().length > 0);

      if (hasTable || hasNarrative || showSignatory) {
        pages.push({
          pageNumber: pageNumber++,
          isFirstPage,
          isLastPage: false,
          tableChunk: pageTableChunk,
          narrativeHtml: pageNarrativeHtml || null,
          showSignatory,
        });
      }
    }

    // Guarantee: If signatory was not shown on any page, append a clean page for it
    const anyHasSig = pages.some((p) => p.showSignatory);
    if (!anyHasSig && pages.length > 0) {
      pages.push({
        pageNumber: pageNumber++,
        isFirstPage: false,
        isLastPage: true,
        tableChunk: null,
        narrativeHtml: null,
        showSignatory: true,
      });
    }

    if (pages.length > 0) {
      const lastPage = pages[pages.length - 1];
      lastPage.showSignatory = true;
      lastPage.isLastPage = true;
    }

    return pages;
  } finally {
    try {
      reactRoot.unmount();
      sandbox.dispose();
    } catch {}
  }
}
