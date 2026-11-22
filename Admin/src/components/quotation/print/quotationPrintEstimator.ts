import { SoftwareRow } from "../quotation-defaults";
import { QuotationPrintData, QuotationPageModel, AtomicBlock } from "./quotationPrintTypes";

// ─────────────────────────────────────────────────────────────────────────────
// CALIBRATED METRICS FOR SYNCHRONOUS FALLBACK (SSR & INITIAL PAINT)
// ─────────────────────────────────────────────────────────────────────────────
export const METRICS = {
  PARA_CHARS: 118,
  LI_CHARS: 112,
  LINE_H: 11.5 * 1.38, // ~15.87px
  PARA_MARGIN: 2.5,
  LI_MARGIN: 2.0,
  TABLE_SCOPE_CHARS: 28,
  TABLE_PART_CHARS: 56,
  TABLE_LINE_H: 15,
  TABLE_ROW_PAD: 9, // 8px padding + 1px border
};

export const formatPrice = (val: number | string | undefined | null): string => {
  if (val === undefined || val === null || val === "" || val === 0) return "0/-";
  if (typeof val === "string" && val.includes("/-")) return val;
  const num = typeof val === "string" ? parseFloat(val.replace(/[^0-9.-]/g, "")) : val;
  if (isNaN(num)) return String(val);
  return num.toLocaleString("en-IN") + "/-";
};

export function compileNarrativeText(data: QuotationPrintData): string {
  let raw = (data.terms_conditions || "").trim();

  if (!raw) {
    const parts: string[] = [];
    if (data.project_breakdown && data.project_breakdown.trim()) {
      parts.push(data.project_breakdown.trim());
    }
    if (data.client_requirements && data.client_requirements.trim()) {
      parts.push(`<h3>What We Require From You:</h3>\n${data.client_requirements.trim()}`);
    }
    if (data.deliverables && data.deliverables.trim()) {
      parts.push(`<h3>What You Will Receive From Texpart:</h3>\n${data.deliverables.trim()}`);
    }
    if (data.additional_notes && data.additional_notes.trim()) {
      parts.push(data.additional_notes.trim());
    }
    return parts.join("\n\n");
  }

  const cleanRaw = raw.replace(/<[^>]*>/g, " ").toLowerCase();

  if (data.project_breakdown) {
    const cleanBreakdown = data.project_breakdown.replace(/<[^>]*>/g, " ").trim().toLowerCase();
    if (cleanBreakdown.length > 20 && !cleanRaw.includes(cleanBreakdown.slice(0, 30))) {
      raw = data.project_breakdown + "\n\n" + raw;
    }
  }

  if (data.client_requirements) {
    const cleanReq = data.client_requirements.replace(/<[^>]*>/g, " ").trim().toLowerCase();
    if (cleanReq.length > 20 && !cleanRaw.includes(cleanReq.slice(0, 30))) {
      raw = raw + "\n\n<h3>What We Require From You:</h3>\n" + data.client_requirements;
    }
  }

  if (data.deliverables) {
    const cleanDeliv = data.deliverables.replace(/<[^>]*>/g, " ").trim().toLowerCase();
    if (cleanDeliv.length > 20 && !cleanRaw.includes(cleanDeliv.slice(0, 30))) {
      raw = raw + "\n\n<h3>What You Will Receive From Texpart:</h3>\n" + data.deliverables;
    }
  }

  if (data.additional_notes) {
    const cleanNotes = data.additional_notes.replace(/<[^>]*>/g, " ").trim().toLowerCase();
    if (cleanNotes.length > 20 && !cleanRaw.includes(cleanNotes.slice(0, 30))) {
      raw = raw + "\n\n" + data.additional_notes;
    }
  }

  return raw;
}

export function estimateBlockHeight(html: string, isListItem = false): number {
  const text = html.replace(/<[^>]*>/g, "").trim();
  const lower = html.toLowerCase();

  if (lower.startsWith("<h1")) {
    const lines = Math.max(1, Math.ceil((text.length || 1) / 55));
    return lines * 18 + 10;
  }
  if (lower.startsWith("<h2")) {
    const lines = Math.max(1, Math.ceil((text.length || 1) / 65));
    return lines * 16.5 + 8;
  }
  if (lower.startsWith("<h3")) {
    const lines = Math.max(1, Math.ceil((text.length || 1) / 70));
    return lines * 15.5 + 6;
  }
  if (lower.startsWith("<h4") || lower.startsWith("<h5") || lower.startsWith("<h6")) {
    const lines = Math.max(1, Math.ceil((text.length || 1) / 72));
    return lines * 14.5 + 5;
  }
  if (lower.startsWith("<blockquote")) {
    const lines = Math.max(1, Math.ceil(text.length / 68));
    return lines * 15.5 + 6;
  }
  if (lower.startsWith("<hr")) {
    if (lower.includes("page-break") || lower.includes("pagebreak")) return 9999;
    return 12;
  }
  if (!text) {
    if (lower.includes("<br")) return METRICS.LINE_H;
    return 0;
  }

  const charPerLine = isListItem ? METRICS.LI_CHARS : METRICS.PARA_CHARS;
  const extraMargin = isListItem ? METRICS.LI_MARGIN : METRICS.PARA_MARGIN;

  const tag = isListItem ? "li" : "p";
  const match = html.match(new RegExp(`^<${tag}(?:\\s+[^>]*)?>([\\s\\S]*?)<\\/${tag}>$`, "i"));
  const inner = match ? match[1] : html;

  const rawSegments = inner.split(/<br\s*\/?>|\r?\n/i);
  let totalLines = 0;
  for (const seg of rawSegments) {
    const segText = seg.replace(/<[^>]*>/g, "").trim();
    if (segText.length === 0) continue;
    totalLines += Math.max(1, Math.ceil(segText.length / charPerLine));
  }
  if (totalLines === 0) totalLines = 1;
  return totalLines * METRICS.LINE_H + extraMargin;
}

export function estimateTableRowHeight(row: SoftwareRow): number {
  const scopeText = (row.scope || "").trim();
  const partText = (row.particulars || "").trim();

  if (scopeText.length === 0 && partText.length === 0) {
    return 17.0;
  }

  const scopeLines = Math.max(1, Math.ceil(scopeText.length / METRICS.TABLE_SCOPE_CHARS));
  const partLines = Math.max(1, Math.ceil(partText.length / METRICS.TABLE_PART_CHARS));
  const maxLines = Math.max(scopeLines, partLines);
  if (maxLines === 1) return 23.0;
  return METRICS.TABLE_ROW_PAD + maxLines * METRICS.TABLE_LINE_H;
}

export function splitBlockForAvailableHeight(
  block: AtomicBlock,
  availableHeight: number
): { fitsBlock: AtomicBlock | null; remainderBlock: AtomicBlock | null } {
  const isListItem = block.isListItem;
  const charPerLine = isListItem ? METRICS.LI_CHARS : METRICS.PARA_CHARS;
  const extraMargin = isListItem ? METRICS.LI_MARGIN : METRICS.PARA_MARGIN;

  const rawHtml = block.html;
  const tag = isListItem ? "li" : "p";
  const match = rawHtml.match(new RegExp(`^<${tag}(?:\\s+[^>]*)?>([\\s\\S]*?)<\\/${tag}>$`, "i"));
  const inner = match ? match[1] : rawHtml.replace(/<[^>]*>/g, "");

  const cleanText = inner.replace(/<[^>]*>/g, "").trim();
  const totalLines = Math.max(1, Math.ceil(cleanText.length / charPerLine));
  const totalH = totalLines * METRICS.LINE_H + extraMargin;

  if (totalH <= availableHeight + 2) {
    return { fitsBlock: block, remainderBlock: null };
  }

  const linesThatFit = Math.floor((availableHeight + 2 - extraMargin) / METRICS.LINE_H);
  if (linesThatFit < 1 || linesThatFit >= totalLines) {
    return { fitsBlock: null, remainderBlock: block };
  }

  const targetChars = linesThatFit * charPerLine;
  let splitPos = -1;

  const punctRegex = /([.?!;:\u0964]["'”’]?\s+)(?=[A-Z0-9\u0980-\u09FF"'“‘<])/g;
  let pMatch: RegExpExecArray | null;
  while ((pMatch = punctRegex.exec(inner)) !== null) {
    const end = pMatch.index + pMatch[0].length;
    const textSoFar = inner.substring(0, end).replace(/<[^>]*>/g, "").length;
    if (textSoFar <= targetChars + 15) {
      splitPos = end;
    } else {
      break;
    }
  }

  if (splitPos === -1 || inner.substring(0, splitPos).replace(/<[^>]*>/g, "").length < targetChars * 0.3) {
    const spaceRegex = /\s+/g;
    let sMatch: RegExpExecArray | null;
    let lastValidSpace = -1;
    while ((sMatch = spaceRegex.exec(inner)) !== null) {
      const textSoFar = inner.substring(0, sMatch.index).replace(/<[^>]*>/g, "").length;
      if (textSoFar <= targetChars) {
        lastValidSpace = sMatch.index + sMatch[0].length;
      } else {
        break;
      }
    }
    splitPos = lastValidSpace;
  }

  if (splitPos <= 0 || splitPos >= inner.length) {
    return { fitsBlock: null, remainderBlock: block };
  }

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
      height: estimateBlockHeight(fitsHtml, isListItem),
    },
    remainderBlock: {
      type: block.type,
      html: remainderHtml,
      isListItem: block.isListItem,
      listType: block.listType,
      itemIndex: block.itemIndex ? block.itemIndex + 1 : undefined,
      height: estimateBlockHeight(remainderHtml, isListItem),
    },
  };
}

export function tokenizeHtmlBlocks(html: string): AtomicBlock[] {
  if (!html || !html.trim()) return [];

  if (!html.includes("<p") && !html.includes("<h") && !html.includes("<ol") && !html.includes("<ul")) {
    html = html
      .split(/\n{2,}/)
      .map((seg) => seg.trim())
      .filter((line) => line.length > 0)
      .map((line) => `<p>${line}</p>`)
      .join("");
  }

  const blocks: AtomicBlock[] = [];
  const blockRegex = /<(h[1-6]|p|blockquote)(?:\s+[^>]*)?>[\s\S]*?<\/\1>|<hr(?:\s+[^>]*)?\/?>|<(ol|ul)(?:\s+[^>]*)?>[\s\S]*?<\/\2>/gi;
  let m: RegExpExecArray | null;
  let lastPos = 0;

  while ((m = blockRegex.exec(html)) !== null) {
    if (m.index > lastPos) {
      const text = html.substring(lastPos, m.index).trim();
      if (text && text.replace(/<[^>]*>/g, "").trim()) {
        const pHtml = `<p>${text}</p>`;
        blocks.push({
          type: "p",
          html: pHtml,
          isListItem: false,
          height: estimateBlockHeight(pHtml),
        });
      }
    }

    const fullMatch = m[0];
    const tagName = (m[1] || m[2] || "hr").toLowerCase();

    if (fullMatch.includes("page-break") || fullMatch.includes("<!-- pagebreak -->")) {
      blocks.push({
        type: "pagebreak",
        html: "",
        isListItem: false,
        height: 9999,
      });
    } else if (tagName === "hr") {
      blocks.push({
        type: "hr",
        html: "<hr />",
        isListItem: false,
        height: 14,
      });
    } else if (tagName === "ol" || tagName === "ul") {
      const isOl = tagName === "ol";
      const startMatch = fullMatch.match(/start=["']?(\d+)["']?/i);
      const startNum = startMatch ? parseInt(startMatch[1], 10) : 1;

      const liRegex = /<li(?:\s+[^>]*)?>[\s\S]*?<\/li>/gi;
      let liMatch: RegExpExecArray | null;
      let count = 0;
      while ((liMatch = liRegex.exec(fullMatch)) !== null) {
        const liHtml = liMatch[0];
        const textOnly = liHtml.replace(/<[^>]*>/g, "").trim();
        if (textOnly) {
          blocks.push({
            type: "li",
            html: liHtml,
            isListItem: true,
            listType: isOl ? "ol" : "ul",
            itemIndex: startNum + count,
            height: estimateBlockHeight(liHtml, true),
          });
          count++;
        }
      }
    } else {
      const textOnly = fullMatch.replace(/<[^>]*>/g, "").trim();
      if (textOnly) {
        blocks.push({
          type: tagName,
          html: fullMatch,
          isListItem: false,
          height: estimateBlockHeight(fullMatch),
        });
      }
    }

    lastPos = blockRegex.lastIndex;
  }

  if (lastPos < html.length) {
    const text = html.substring(lastPos).trim();
    if (text && text.replace(/<[^>]*>/g, "").trim()) {
      const pHtml = `<p>${text}</p>`;
      blocks.push({
        type: "p",
        html: pHtml,
        isListItem: false,
        height: estimateBlockHeight(pHtml),
      });
    }
  }

  return blocks;
}

export function assembleBlocks(blocksSlice: AtomicBlock[]): string {
  if (!blocksSlice || blocksSlice.length === 0) return "";
  const out: string[] = [];
  let inList = false;
  let currentListType: "ol" | "ul" | null = null;
  let currentStart = 1;

  for (let i = 0; i < blocksSlice.length; i++) {
    const b = blocksSlice[i];
    if (b.isListItem) {
      if (!inList) {
        inList = true;
        currentListType = b.listType || "ul";
        currentStart = b.itemIndex || 1;
        out.push(currentListType === "ol" ? `<ol start="${currentStart}">` : "<ul>");
      } else if (currentListType !== b.listType) {
        out.push(currentListType === "ol" ? "</ol>" : "</ul>");
        currentListType = b.listType || "ul";
        currentStart = b.itemIndex || 1;
        out.push(currentListType === "ol" ? `<ol start="${currentStart}">` : "<ul>");
      }
      out.push(b.html);
    } else {
      if (inList) {
        out.push(currentListType === "ol" ? "</ol>" : "</ul>");
        inList = false;
        currentListType = null;
      }
      out.push(b.html);
    }
  }

  if (inList) {
    out.push(currentListType === "ol" ? "</ol>" : "</ul>");
  }

  return out.join("\n");
}

export function buildQuotationPages(data: QuotationPrintData): QuotationPageModel[] {
  const softwareRows = data.software_rows || [];
  const raw = compileNarrativeText(data);
  const allBlocks = tokenizeHtmlBlocks(raw);

  const PAGE_USABLE_HEIGHT = 938;
  const TABLE_THEAD_HEIGHT = 26;
  const TABLE_TFOOT_HEIGHT = 50;
  const TABLE_MARGINS_TOTAL = 12;
  const TABLE_CONTINUES_NOTE_HEIGHT = 18;
  const SIGNATORY_HEIGHT = 135;
  const CONTINUATION_TABLE_HEADER_HEIGHT = 0;

  let clientCardH = 16.0;
  if (data.client_name && data.client_name.trim().length > 0) clientCardH += 15.0;
  if (data.organization_name && data.organization_name.trim().length > 0) clientCardH += 15.0;
  if (data.address && data.address.trim().length > 0) {
    const addrLines = Math.max(1, Math.ceil(data.address.trim().length / 60));
    clientCardH += addrLines * 14.0;
  }
  if (data.phone && data.phone.trim().length > 0) clientCardH += 14.0;
  if (data.email && data.email.trim().length > 0) clientCardH += 14.0;
  clientCardH += 6.0;

  let subjectH = 22.0;
  if (data.subject && data.subject.length > 55) {
    subjectH += Math.ceil((data.subject.length - 55) / 55) * 15.0;
  }
  const FIRST_PAGE_HEADER_TOTAL = clientCardH + subjectH + 18.0;

  const pages: QuotationPageModel[] = [];
  let pageNumber = 1;
  let unallocatedRows = [...softwareRows];
  let unallocatedBlocks = [...allBlocks];

  while (unallocatedRows.length > 0 || unallocatedBlocks.length > 0) {
    const isFirstPage = pageNumber === 1;
    let pageAvailH = PAGE_USABLE_HEIGHT;
    if (isFirstPage) pageAvailH -= FIRST_PAGE_HEADER_TOTAL;

    let pageTableChunk: QuotationPageModel["tableChunk"] = null;

    if (unallocatedRows.length > 0) {
      if (!isFirstPage) pageAvailH -= CONTINUATION_TABLE_HEADER_HEIGHT;

      let tableOverhead = TABLE_THEAD_HEIGHT + TABLE_MARGINS_TOTAL;
      let chunkRows: SoftwareRow[] = [];
      let currentTableContentH = 0;
      const isFirstChunk = unallocatedRows.length === softwareRows.length;

      while (unallocatedRows.length > 0) {
        const nextRow = unallocatedRows[0];
        const nextRowH = estimateTableRowHeight(nextRow);
        const isLastRow = unallocatedRows.length === 1;
        const totalIfAdded = tableOverhead + currentTableContentH + nextRowH + (isLastRow ? TABLE_TFOOT_HEIGHT : TABLE_CONTINUES_NOTE_HEIGHT);

        if (totalIfAdded <= pageAvailH) {
          chunkRows.push(unallocatedRows.shift()!);
          currentTableContentH += nextRowH;
        } else {
          break;
        }
      }

      if (chunkRows.length === 0 && unallocatedRows.length > 0) {
        chunkRows.push(unallocatedRows.shift()!);
        currentTableContentH += estimateTableRowHeight(chunkRows[0]);
      }

      const isLastChunk = unallocatedRows.length === 0;
      pageTableChunk = {
        rows: chunkRows,
        isFirstChunk,
        isLastChunk,
      };

      const finalTableTotalH = tableOverhead + currentTableContentH + (isLastChunk ? TABLE_TFOOT_HEIGHT : TABLE_CONTINUES_NOTE_HEIGHT);
      pageAvailH -= finalTableTotalH;
    }

    let pageNarrativeHtml: string | null = null;
    let showSignatory = false;

    if (unallocatedBlocks.length > 0) {
      if (pageAvailH < 45) {
        // Not enough room for text
      } else if (unallocatedRows.length === 0 && unallocatedBlocks.length === 0) {
        showSignatory = true;
      } else {
        let effectiveAvailH = pageAvailH;
        const pageBlocks: AtomicBlock[] = [];

        while (unallocatedBlocks.length > 0 && effectiveAvailH > 10) {
          const nextB = unallocatedBlocks[0];

          if (nextB.type === "pagebreak" || nextB.html.includes("page-break")) {
            unallocatedBlocks.shift();
            break;
          }

          if (
            (nextB.type.startsWith("h") || nextB.html.startsWith("<p><strong>")) &&
            effectiveAvailH < nextB.height + 18
          ) {
            break;
          }

          if (nextB.height <= effectiveAvailH + 2) {
            pageBlocks.push(unallocatedBlocks.shift()!);
            effectiveAvailH -= nextB.height;
          } else {
            if ((nextB.type === "p" || nextB.type === "li") && effectiveAvailH >= 10) {
              const splitRes = splitBlockForAvailableHeight(nextB, effectiveAvailH);
              if (splitRes.fitsBlock) {
                pageBlocks.push(splitRes.fitsBlock);
                effectiveAvailH -= splitRes.fitsBlock.height;
                unallocatedBlocks[0] = splitRes.remainderBlock!;
              }
            }
            break;
          }
        }

        if (pageBlocks.length === 0 && unallocatedBlocks.length > 0 && !pageTableChunk) {
          pageBlocks.push(unallocatedBlocks.shift()!);
        }

        const usedBlocksH = pageBlocks.reduce((s, b) => s + b.height, 0);
        if (unallocatedBlocks.length === 0 && pageAvailH - usedBlocksH >= SIGNATORY_HEIGHT) {
          showSignatory = true;
        }

        pageNarrativeHtml = assembleBlocks(pageBlocks);
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

  const anyHasSig = pages.some((p) => p.showSignatory);
  if (!anyHasSig && pages.length > 0) {
    const lastP = pages[pages.length - 1];
    lastP.showSignatory = true;
    lastP.isLastPage = true;
  } else if (pages.length > 0) {
    pages[pages.length - 1].isLastPage = true;
  }

  return pages;
}
