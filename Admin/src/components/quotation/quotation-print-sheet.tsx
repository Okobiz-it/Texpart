"use client";

import React, { useState, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { format } from "@/lib/date";
import { numberToWords } from "@/lib/number-to-words";
import {
  QuotationColumn,
  SoftwareRow,
  DEFAULT_SOFTWARE_COLUMNS,
} from "./quotation-defaults";
import {
  TexpartLetterheadPadBackground,
  TexpartLetterheadPage,
  TexpartHeaderBanner,
  TexpartWatermark,
  TexpartFooterBanner,
} from "./texpart-letterhead-page";
import { paginateMeasured, nextFrame } from "@/lib/quotation-paginator";

export {
  TexpartLetterheadPadBackground,
  TexpartLetterheadPage,
  TexpartHeaderBanner,
  TexpartWatermark,
  TexpartFooterBanner,
};

export interface QuotationPrintData {
  id?: number | string;
  _id?: string;
  ref_no: string;
  quote_date: string | Date;
  client_name: string;
  organization_name?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  subject: string;
  software_columns?: QuotationColumn[];
  software_rows?: SoftwareRow[];
  software_amount?: number | string;
  grand_total: number | string;
  in_words?: string | null;
  project_breakdown?: string | null;
  terms_conditions?: string | null;
  client_requirements?: string | null;
  deliverables?: string | null;
  additional_notes?: string | null;
  company_signatory_name?: string;
  company_signatory_title?: string;
  company_phone?: string;
  company_email?: string;
  status?: string;
  email_sent_at?: string | Date | null;
}

interface QuotationPrintSheetProps {
  data: QuotationPrintData;
  className?: string;
}

export interface QuotationPageModel {
  pageNumber: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  tableChunk?: {
    rows: SoftwareRow[];
    isFirstChunk: boolean;
    isLastChunk: boolean;
  } | null;
  narrativeHtml?: string | null;
  showSignatory?: boolean;
}

export interface AtomicBlock {
  type: string;
  html: string;
  isListItem: boolean;
  listType?: "ol" | "ul";
  itemIndex?: number;
  height: number;
}

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

// ─────────────────────────────────────────────────────────────────────────────
// TOP-LEVEL REUSABLE COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
export const SignatoryBlock: React.FC<{ data: QuotationPrintData }> = ({ data }) => (
  <div className="signatory-block mt-auto pt-2 pb-0 shrink-0 select-none">
    <div className="grid grid-cols-2 gap-8 text-xs">
      <div>
        <div className="text-[12px] text-zinc-500 mb-6">Sincerely,</div>
        <div className="w-48 border-b border-zinc-900 mb-1" />
        <div className="font-bold text-zinc-900 text-[13.5px]">
          {data.company_signatory_name || "Md. Sorower Jahan"}
        </div>
        <div className="text-zinc-600 text-[11px] font-medium">
          {data.company_signatory_title || "Managing Director, Texpart Ltd."}
        </div>
        <div className="text-zinc-500 text-[10.5px]">
          Direct: {data.company_phone || "+880 1711-234567"}
        </div>
      </div>
      <div className="text-right flex flex-col items-end">
        <div className="text-[12px] text-zinc-500 mb-6">Accepted &amp; Agreed By:</div>
        <div className="w-48 border-b border-zinc-900 mb-1" />
        <div className="font-bold text-zinc-900 text-[13.5px]">Client Signature &amp; Seal</div>
        <div className="text-zinc-500 text-[10.5px]">
          {data.organization_name || data.client_name || "Authorized Representative"}
        </div>
      </div>
    </div>
  </div>
);

export const FirstPageHeader: React.FC<{ data: QuotationPrintData; formattedDate: string }> = ({
  data,
  formattedDate,
}) => (
  <div className="first-page-header shrink-0">
    <div className="flex justify-between items-start text-[13px] font-semibold mb-2.5">
      <div className="text-zinc-700">{formattedDate}</div>
      {data.ref_no && (
        <div className="text-right">
          <span className="text-zinc-400">Ref No. </span>
          <span className="font-bold text-[#0066CC]">{data.ref_no}</span>
        </div>
      )}
    </div>

    {(data.client_name || data.organization_name || data.address || data.phone || data.email) && (
      <div className="text-[12px] leading-snug mb-2.5">
        {data.client_name && data.client_name.trim() !== "Valued Client" && (
          <div className="font-bold text-zinc-900 text-[13.5px]">{data.client_name}</div>
        )}
        {data.organization_name && (
          <div className="text-zinc-700 font-semibold">{data.organization_name}</div>
        )}
        {data.address && <div className="text-zinc-600">{data.address}</div>}
        {(data.phone || data.email) && (
          <div className="flex items-center gap-3 text-zinc-600 text-[11.5px] mt-0.5">
            {data.phone && <span>Cell: {data.phone}</span>}
            {data.email && <span>Email: {data.email}</span>}
          </div>
        )}
      </div>
    )}

    <div className="text-[13.5px] font-bold text-zinc-900 mb-3 pb-1 border-b border-zinc-200">
      <span>Subject: </span>
      <span>
        {data.subject || "Official Quotation for Garment Packaging & Apparel Development Solutions"}
      </span>
    </div>
  </div>
);

export const ContinuationHeader: React.FC<{ data: QuotationPrintData; isTable?: boolean }> = ({
  data,
  isTable = false,
}) => (
  <div className="continuation-header flex justify-between items-center text-xs font-semibold mb-3 pb-1 border-b border-zinc-200 shrink-0">
    <span className="font-bold text-zinc-800">
      {isTable ? "Scope of Work & Deliverables (Continued)" : "Terms & Specifications (Continued)"}
    </span>
    <div className="text-right text-zinc-600">
      <span className="text-zinc-400">Ref No. </span>
      <span className="font-bold text-[#0066CC]">{data.ref_no}</span>
    </div>
  </div>
);

export const TableContinuesNote = () => (
  <div className="table-continues-note text-[10.5px] text-zinc-500 font-semibold italic text-right mt-1 pb-1 shrink-0">
    Scope of work continues on next page →
  </div>
);

export const SoftwareTable: React.FC<{
  rows: SoftwareRow[];
  isLast: boolean;
  formattedGrandTotal?: string;
  inWordsDisplay?: string;
}> = ({ rows, isLast, formattedGrandTotal, inWordsDisplay }) => {
  if (!rows || rows.length === 0) return null;
  return (
    <div className="shrink-0 mb-2 quotation-table-wrapper">
      <div className="border border-zinc-900 overflow-hidden bg-transparent rounded-none">
        <table
          className="quotation-table w-full text-[12px] border-collapse bg-transparent shrink-0"
          style={{ tableLayout: "fixed", height: "auto" }}
        >
          <thead>
            <tr
              className="bg-[#2363ad] !text-white font-bold border-b border-zinc-900 print:bg-[#2363ad] print:text-white"
              style={{ backgroundColor: "#2363ad", color: "#ffffff" }}
            >
              <th
                style={{ width: "7%", backgroundColor: "#2363ad", color: "#ffffff" }}
                className="quotation-th py-2 px-2 text-center text-[12px] font-bold uppercase tracking-wider border-r border-white/40 text-white"
              >
                <span>SL</span>
              </th>
              <th
                style={{ width: "28%", backgroundColor: "#2363ad", color: "#ffffff" }}
                className="quotation-th py-2 px-3 text-left text-[12px] font-bold uppercase tracking-wider border-r border-white/40 text-white"
              >
                <span>Scope of Work / Item</span>
              </th>
              <th
                style={{ width: "51%", backgroundColor: "#2363ad", color: "#ffffff" }}
                className="quotation-th py-2 px-3 text-left text-[12px] font-bold uppercase tracking-wider border-r border-white/40 text-white"
              >
                <span>Particulars &amp; Specifications</span>
              </th>
              <th
                style={{ width: "14%", backgroundColor: "#2363ad", color: "#ffffff" }}
                className="quotation-th py-2 px-2 text-center text-[12px] font-bold uppercase tracking-wider text-white"
              >
                <span>Amount</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-300 bg-transparent" style={{ backgroundColor: "transparent" }}>
            {rows.map((row, index) => (
              <tr
                key={index}
                className="bg-transparent"
                style={{ backgroundColor: "transparent", height: "auto" }}
              >
                <td
                  className="py-2 px-2 text-center font-bold text-zinc-900 align-top border-r border-zinc-400 w-[7%] bg-transparent text-[12px]"
                  style={{ backgroundColor: "transparent" }}
                >
                  {row.sl || index + 1}
                </td>
                <td
                  className="py-2 px-3 font-bold text-zinc-900 align-top border-r border-zinc-400 w-[28%] bg-transparent whitespace-pre-line leading-snug text-[12px]"
                  style={{ backgroundColor: "transparent" }}
                >
                  {row.scope}
                </td>
                <td
                  className="py-2 px-3 text-black font-medium leading-snug align-top border-r border-zinc-400 w-[51%] bg-transparent whitespace-pre-line text-[12px] particulars-cell"
                  style={{ backgroundColor: "transparent", color: "#000000" }}
                >
                  {row.particulars}
                </td>
                {index === 0 && (
                  <td
                    rowSpan={rows.length}
                    className="py-2 px-2 text-center font-bold text-zinc-900 text-[14px] align-middle bg-transparent w-[14%]"
                    style={{ backgroundColor: "transparent" }}
                  >
                    {formattedGrandTotal}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
          {isLast && (
            <tfoot className="border-t-2 border-zinc-900 bg-transparent" style={{ backgroundColor: "transparent" }}>
              <tr className="bg-transparent font-bold border-b border-zinc-800" style={{ backgroundColor: "transparent" }}>
                <td
                  colSpan={3}
                  className="py-2 px-3.5 text-right text-[12px] font-bold text-zinc-900 border-r border-zinc-800 uppercase tracking-wide bg-transparent"
                  style={{ backgroundColor: "transparent" }}
                >
                  Grand Total =
                </td>
                <td
                  className="py-2 px-2.5 text-center text-[13px] font-bold text-zinc-900 bg-transparent"
                  style={{ backgroundColor: "transparent" }}
                >
                  {formattedGrandTotal}
                </td>
              </tr>
              <tr className="bg-transparent font-bold" style={{ backgroundColor: "transparent" }}>
                <td
                  colSpan={4}
                  className="py-2 px-3.5 text-left text-[12px] font-bold text-zinc-900 bg-transparent"
                  style={{ backgroundColor: "transparent" }}
                >
                  In Words: {inWordsDisplay}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SHARED PAGE SHELL COMPONENT
// Both real render and sandbox measure using this EXACT SAME component
// ─────────────────────────────────────────────────────────────────────────────
export const QuotationPageShell: React.FC<{
  data: QuotationPrintData;
  formattedDate: string;
  formattedGrandTotal: string;
  inWordsDisplay: string;
  page: QuotationPageModel;
  measureMode?: boolean;
}> = ({
  data,
  formattedDate,
  formattedGrandTotal,
  inWordsDisplay,
  page,
  measureMode = false,
}) => {
  return (
    <section
      className="quotation-page relative bg-white border border-zinc-200 print:border-none p-0 mb-8 print:mb-0 shadow-sm print:shadow-none w-[210mm] max-w-[210mm] print:w-full print:max-w-full print:m-0 print:mx-0 flex flex-col justify-between overflow-hidden rounded-none"
    >
      {/* Authentic Vector Letterhead Pad (Watermark + Crystal Banners + Footer Contacts) */}
      <TexpartLetterheadPadBackground
        phone={data.company_phone}
        email={data.company_email}
      />

      {/* Safe printable content container (clears top crystals & bottom contacts) */}
      <div
        className="quotation-page-body relative z-10 w-full h-full flex flex-col justify-between bg-transparent"
      >
        <div>
          {page.isFirstPage && (
            <FirstPageHeader data={data} formattedDate={formattedDate} />
          )}

          {/* Table Chunk (if any on this page) */}
          {page.tableChunk && (
            <div className="mt-1">
              <SoftwareTable
                rows={page.tableChunk.rows}
                isLast={page.tableChunk.isLastChunk}
                formattedGrandTotal={formattedGrandTotal}
                inWordsDisplay={inWordsDisplay}
              />
              {!page.tableChunk.isLastChunk && <TableContinuesNote />}
            </div>
          )}

          {/* Narrative Content */}
          {(measureMode || (page.narrativeHtml && page.narrativeHtml.trim().length > 0)) && (
            <div
              className={`quotation-narrative-flow ${page.tableChunk ? "mt-2.5" : "mt-0"} text-xs text-zinc-800 leading-normal`}
              style={measureMode ? { flex: "none" } : { flex: "1 1 0%" }}
              dangerouslySetInnerHTML={{ __html: page.narrativeHtml || "" }}
            />
          )}
        </div>

        {/* Signatory Block (pinned above bottom footer bar) */}
        {page.showSignatory && <SignatoryBlock data={data} />}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// DE-DUPLICATED NARRATIVE COMPILER
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// SYNCHRONOUS FALLBACK ESTIMATION FUNCTIONS (SSR / FIRST PAINT)
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// SYNCHRONOUS INITIAL PAGINATOR (SSR & INSTANT FIRST PAINT)
// ─────────────────────────────────────────────────────────────────────────────
export function buildQuotationPages(data: QuotationPrintData): QuotationPageModel[] {
  const softwareRows = data.software_rows || [];
  const raw = compileNarrativeText(data);
  const allBlocks = tokenizeHtmlBlocks(raw);

  // Usable printable vertical height (296.2mm total - 32mm top padding - 17mm bottom padding = 247.2mm = ~938px)
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

  // Ensure signatory is placed on last page if not yet placed
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

// ─────────────────────────────────────────────────────────────────────────────
// SHARED HYGIENIC CSS (SCREEN & PRINT ZERO-DIVERGENCE)
// ─────────────────────────────────────────────────────────────────────────────
export const QUOTATION_CSS = `
  /* Core quotation typography & layout */
  .quotation-document {
    --q-page-h: 297mm;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
  }
  .quotation-page {
    box-sizing: border-box !important;
    width: 210mm !important;
    min-width: 210mm !important;
    max-width: 210mm !important;
    height: var(--q-page-h, 297mm) !important;
    min-height: var(--q-page-h, 297mm) !important;
    max-height: var(--q-page-h, 297mm) !important;
    overflow: hidden !important;
    position: relative !important;
  }
  .quotation-pad-artwork {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100% !important;
    height: 100% !important;
    pointer-events: none !important;
    user-select: none !important;
    z-index: 0 !important;
    overflow: hidden !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  .quotation-footer,
  .quotation-header,
  .quotation-watermark {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  .quotation-page-body {
    box-sizing: border-box !important;
    width: 100% !important;
    height: 100% !important;
    min-height: 100% !important;
    max-height: 100% !important;
    padding-left: 14mm !important;
    padding-right: 14mm !important;
    padding-top: 33mm !important;    /* Clears top crystals & blue accent rule */
    padding-bottom: 17mm !important; /* Clears bottom footer banner & contacts with sleek balanced gap */
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    overflow: hidden !important;
    position: relative !important;
    z-index: 10 !important;
  }
  .quotation-table,
  .quotation-table-wrapper {
    table-layout: fixed !important;
    height: auto !important;
    min-height: 0 !important;
    flex-grow: 0 !important;
    flex-shrink: 0 !important;
  }
  .quotation-table,
  .quotation-table tbody,
  .quotation-table tr,
  .quotation-table tfoot {
    border-collapse: collapse !important;
    width: 100% !important;
    background-color: transparent !important;
  }
  .quotation-table tr,
  .quotation-table td,
  .quotation-table th {
    height: auto !important;
    min-height: 0 !important;
    max-height: none !important;
  }
  .quotation-page thead,
  .quotation-page th,
  .quotation-table thead,
  .quotation-table th {
    background-color: #2363ad !important;
    color: #ffffff !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  .quotation-page th *,
  .quotation-table th * {
    color: #ffffff !important;
  }
  .quotation-table td.particulars-cell,
  .particulars-cell {
    color: #000000 !important;
    font-weight: 500 !important;
  }
  .quotation-narrative-flow {
    font-size: 11.5px !important;
    line-height: 1.38 !important;
    color: #1e293b !important;
  }
  .quotation-narrative-flow h1 {
    display: block !important;
    font-size: 15px !important;
    font-weight: 800 !important;
    color: #09090b !important;
    margin-top: 7px !important;
    margin-bottom: 3px !important;
    line-height: 1.25 !important;
  }
  .quotation-narrative-flow h2 {
    display: block !important;
    font-size: 13.5px !important;
    font-weight: 700 !important;
    color: #09090b !important;
    margin-top: 6px !important;
    margin-bottom: 2px !important;
    line-height: 1.25 !important;
  }
  .quotation-narrative-flow h3 {
    display: block !important;
    font-size: 12.5px !important;
    font-weight: 700 !important;
    color: #09090b !important;
    margin-top: 5px !important;
    margin-bottom: 2px !important;
    line-height: 1.25 !important;
  }
  .quotation-narrative-flow h4,
  .quotation-narrative-flow h5,
  .quotation-narrative-flow h6 {
    display: block !important;
    font-size: 12px !important;
    font-weight: 700 !important;
    color: #09090b !important;
    margin-top: 4px !important;
    margin-bottom: 2px !important;
  }
  .quotation-narrative-flow strong,
  .quotation-narrative-flow b {
    font-weight: 700 !important;
  }
  .quotation-narrative-flow a {
    color: #0066cc !important;
    text-decoration: underline !important;
    text-underline-offset: 2px !important;
  }
  .quotation-narrative-flow [style*="background-color"],
  .quotation-narrative-flow [style*="color"],
  .quotation-narrative-flow mark {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  .quotation-narrative-flow em,
  .quotation-narrative-flow i {
    font-style: italic !important;
  }
  .quotation-narrative-flow u {
    text-decoration: underline !important;
    text-underline-offset: 2px !important;
  }
  .quotation-narrative-flow s,
  .quotation-narrative-flow strike,
  .quotation-narrative-flow del {
    text-decoration: line-through !important;
  }
  .quotation-narrative-flow ol {
    display: block !important;
    list-style-type: decimal !important;
    margin: 2px 0 !important;
    padding-left: 18px !important;
  }
  .quotation-narrative-flow ul {
    display: block !important;
    list-style-type: disc !important;
    margin: 2px 0 !important;
    padding-left: 18px !important;
  }
  .quotation-narrative-flow li {
    display: list-item !important;
    margin-bottom: 2.0px !important;
    line-height: 1.38 !important;
    color: #1e293b !important;
  }
  .quotation-narrative-flow li[data-continued="true"] {
    list-style-type: none !important;
    padding-left: 0 !important;
  }
  .quotation-narrative-flow p {
    margin-bottom: 2.5px !important;
    line-height: 1.38 !important;
  }
  .quotation-narrative-flow blockquote {
    display: block !important;
    border-left: 3px solid #2363ad !important;
    background-color: #f8fafc !important;
    padding: 4px 8px !important;
    margin: 4px 0 !important;
    color: #334155 !important;
    font-style: italic !important;
  }
  .quotation-narrative-flow code {
    display: inline-block !important;
    background-color: #f1f5f9 !important;
    border: 1px solid #cbd5e1 !important;
    border-radius: 2px !important;
    padding: 0 4px !important;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
    font-size: 10.5px !important;
    color: #0f172a !important;
  }
  .quotation-narrative-flow hr {
    display: block !important;
    border: none !important;
    border-top: 1px solid #cbd5e1 !important;
    margin: 6px 0 !important;
    height: 1px !important;
    width: 100% !important;
  }

  @media print {
    @page {
      size: A4 portrait;
      margin: 0;
    }
    html, body {
      background-color: #ffffff !important;
      color: #000000 !important;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      margin: 0 !important;
      padding: 0 !important;
      width: 210mm !important;
      height: auto !important;
      min-height: 0 !important;
      overflow: visible !important;
      display: block !important;
    }
    .no-print, .print\:hidden, [data-sonner-toaster], [data-sonner-toast], [aria-live="polite"], [role="status"], header, aside, nav, footer {
      display: none !important;
    }
    main,
    main > div {
      display: block !important;
      position: static !important;
      overflow: visible !important;
      width: 100% !important;
      min-width: 0 !important;
      max-width: none !important;
      height: auto !important;
      min-height: 0 !important;
      max-height: none !important;
      margin: 0 !important;
      padding: 0 !important;
      background: transparent !important;
    }
    .quotation-print-container {
      display: block !important;
      position: static !important;
      width: 210mm !important;
      margin: 0 !important;
      padding: 0 !important;
      visibility: visible !important;
    }
    .quotation-document {
      --q-page-h: 297mm;
      display: block !important;
      margin: 0 !important;
      padding: 0 !important;
      max-width: 210mm !important;
      width: 210mm !important;
      background: #ffffff !important;
    }
    .quotation-page {
      box-sizing: border-box !important;
      width: 210mm !important;
      min-width: 210mm !important;
      max-width: 210mm !important;
      height: var(--q-page-h, 297mm) !important;
      min-height: var(--q-page-h, 297mm) !important;
      max-height: var(--q-page-h, 297mm) !important;
      padding: 0 !important;
      margin: 0 !important;
      box-shadow: none !important;
      border: none !important;
      background: #ffffff !important;
      overflow: hidden !important;
      position: relative !important;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }
    .quotation-page:not(:last-child) {
      page-break-after: always !important;
      break-after: page !important;
    }
    .quotation-page:last-child {
      page-break-after: auto !important;
      break-after: auto !important;
    }
    .quotation-pad-artwork {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      width: 100% !important;
      height: 100% !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      z-index: 0 !important;
      display: block !important;
      overflow: hidden !important;
    }
    .quotation-page-body {
      box-sizing: border-box !important;
      width: 100% !important;
      height: 100% !important;
      padding-left: 14mm !important;
      padding-right: 14mm !important;
      padding-top: 32mm !important;
      padding-bottom: 17mm !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: space-between !important;
      overflow: hidden !important;
      position: relative !important;
      z-index: 10 !important;
    }
  }
`;

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
  }, [layoutKey]);

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
