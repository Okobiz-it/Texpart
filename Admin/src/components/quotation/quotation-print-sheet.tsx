"use client";

import React, { useState, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { format } from "@/lib/date";
import { numberToWords } from "@/lib/number-to-words";
import { paginateMeasured, nextFrame } from "@/lib/quotation-paginator";

export {
  TexpartLetterheadPadBackground,
  TexpartLetterheadPage,
  TexpartHeaderBanner,
  TexpartWatermark,
  TexpartFooterBanner,
} from "./texpart-letterhead-page";

export type {
  QuotationPrintData,
  QuotationPrintSheetProps,
  QuotationPageModel,
  AtomicBlock,
} from "./print/quotationPrintTypes";

export {
  METRICS,
  formatPrice,
  compileNarrativeText,
  estimateBlockHeight,
  estimateTableRowHeight,
  splitBlockForAvailableHeight,
  tokenizeHtmlBlocks,
  assembleBlocks,
  buildQuotationPages,
} from "./print/quotationPrintEstimator";

export {
  SignatoryBlock,
  FirstPageHeader,
  ContinuationHeader,
  TableContinuesNote,
  SoftwareTable,
  QuotationPageShell,
} from "./print/QuotationPageComponents";

export { QUOTATION_CSS } from "./print/quotationPrintCss";

import type { QuotationPrintSheetProps, QuotationPageModel } from "./print/quotationPrintTypes";
import { buildQuotationPages, formatPrice } from "./print/quotationPrintEstimator";
import { QuotationPageShell } from "./print/QuotationPageComponents";
import { QUOTATION_CSS } from "./print/quotationPrintCss";

// ─────────────────────────────────────────────────────────────────────────────
// MAIN QUOTATION PRINT SHEET COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export const QuotationPrintSheet: React.FC<QuotationPrintSheetProps> = ({
  data,
  className = "",
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  // Synchronous estimation for instant SSR & first paint
  const initialPages = useMemo(() => buildQuotationPages(data), [data]);
  const [pages, setPages] = useState<QuotationPageModel[]>(initialPages);

  // Re-sync fallback when data updates
  useEffect(() => {
    setPages(buildQuotationPages(data));
  }, [data]);

  // Layout signature key
  const layoutKey = useMemo(() => {
    return JSON.stringify({
      ref: data.ref_no,
      date: data.quote_date,
      client: data.client_name,
      org: data.organization_name,
      addr: data.address,
      phone: data.phone,
      email: data.email,
      subject: data.subject,
      grand_total: data.grand_total,
      in_words: data.in_words,
      rows: data.software_rows,
      terms: data.terms_conditions,
      breakdown: data.project_breakdown,
      reqs: data.client_requirements,
      deliv: data.deliverables,
      notes: data.additional_notes,
      sig_name: data.company_signatory_name,
      sig_title: data.company_signatory_title,
      sig_phone: data.company_phone,
      sig_email: data.company_email,
    });
  }, [data]);

  // Single-pass real layout pagination with localized element verification
  useLayoutEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        if (typeof document !== "undefined" && document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        }

        const nextPages = await paginateMeasured(data);
        if (cancelled) return;

        if (nextPages && nextPages.length > 0) {
          setPages(nextPages);
        }

        await nextFrame();
        if (!cancelled) {
          setReady(true);
        }
      } catch (err) {
        console.warn("[QuotationPrintSheet] Measured pagination error:", err);
        if (!cancelled) {
          setReady(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [layoutKey, data]);

  const formattedDate = data.quote_date
    ? format(new Date(data.quote_date), "d MMMM, yyyy")
    : format(new Date(), "d MMMM, yyyy");

  const grandTotalValue = data.grand_total || data.software_amount || 0;
  const formattedGrandTotal = formatPrice(grandTotalValue);
  const inWordsDisplay =
    data.in_words && data.in_words.trim().length > 0
      ? data.in_words
      : numberToWords(grandTotalValue);

  return (
    <div
      ref={rootRef}
      className={`quotation-document font-sans text-zinc-900 bg-white w-[794px] max-w-[794px] mx-auto p-0 print:p-0 print:w-full print:max-w-full print:m-0 print:mx-0 [&_*]:!rounded-none ${className}`}
      data-pagination-ready={ready ? "true" : "false"}
    >
      <style dangerouslySetInnerHTML={{ __html: QUOTATION_CSS }} />

      {pages.map((page) => (
        <QuotationPageShell
          key={`quotation-page-${page.pageNumber}`}
          data={data}
          formattedDate={formattedDate}
          formattedGrandTotal={formattedGrandTotal}
          inWordsDisplay={inWordsDisplay}
          page={page}
          measureMode={false}
        />
      ))}
    </div>
  );
};
