"use client";

import React from "react";
import { SoftwareRow } from "../quotation-defaults";
import { QuotationPrintData, QuotationPageModel } from "./quotationPrintTypes";
import { TexpartLetterheadPadBackground } from "../texpart-letterhead-page";

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
      <TexpartLetterheadPadBackground
        phone={data.company_phone}
        email={data.company_email}
      />

      <div
        className="quotation-page-body relative z-10 w-full h-full flex flex-col justify-between bg-transparent"
      >
        <div>
          {page.isFirstPage && (
            <FirstPageHeader data={data} formattedDate={formattedDate} />
          )}

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

          {(measureMode || (page.narrativeHtml && page.narrativeHtml.trim().length > 0)) && (
            <div
              className={`quotation-narrative-flow ${page.tableChunk ? "mt-2.5" : "mt-0"} text-xs text-zinc-800 leading-normal`}
              style={measureMode ? { flex: "none" } : { flex: "1 1 0%" }}
              dangerouslySetInnerHTML={{ __html: page.narrativeHtml || "" }}
            />
          )}
        </div>

        {page.showSignatory && <SignatoryBlock data={data} />}
      </div>
    </section>
  );
};
