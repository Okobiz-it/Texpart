"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { Plus, Trash2 } from "lucide-react";
import { SoftwareRow } from "./quotation-defaults";

interface SyncedSoftwareRowProps {
  row: SoftwareRow;
  index: number;
  onUpdate: (index: number, field: keyof SoftwareRow, value: any) => void;
  onRemove: (index: number) => void;
}

function SyncedSoftwareRow({
  row,
  index,
  onUpdate,
  onRemove,
}: SyncedSoftwareRowProps) {
  const scopeRef = useRef<HTMLTextAreaElement>(null);
  const partRef = useRef<HTMLTextAreaElement>(null);
  const manualHeightRef = useRef<number>(38);

  const syncHeights = useCallback(() => {
    const scopeEl = scopeRef.current;
    const partEl = partRef.current;
    if (!scopeEl || !partEl) return;

    scopeEl.style.height = "auto";
    partEl.style.height = "auto";

    const targetHeight = Math.max(
      scopeEl.scrollHeight,
      partEl.scrollHeight,
      manualHeightRef.current,
      38
    );

    scopeEl.style.height = `${targetHeight}px`;
    partEl.style.height = `${targetHeight}px`;
  }, []);

  useEffect(() => {
    syncHeights();
  }, [row.scope, row.particulars, syncHeights]);

  return (
    <tr className="hover:bg-slate-50/70 transition-colors align-top border-b border-slate-200">
      <td className="py-2.5 px-3 text-center border-r border-slate-200 align-top w-[60px]">
        <input
          type="text"
          value={row.sl}
          onChange={(e) => onUpdate(index, "sl", e.target.value)}
          className="w-full h-8 text-center text-xs font-bold bg-white border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#0066CC]"
        />
      </td>
      <td className="py-2.5 px-3 border-r border-slate-200 align-top w-[35%]">
        <textarea
          ref={scopeRef}
          value={row.scope}
          onChange={(e) => onUpdate(index, "scope", e.target.value)}
          onInput={syncHeights}
          placeholder="e.g. Custom Garment Packaging Boxes"
          className="w-full min-h-[38px] text-xs py-2 px-3 resize-y font-semibold leading-snug rounded-[4px] border border-slate-200 focus:outline-none focus:border-[#0066CC] overflow-hidden"
          rows={1}
        />
      </td>
      <td className="py-2.5 px-3 border-r border-slate-200 align-top">
        <textarea
          ref={partRef}
          value={row.particulars}
          onChange={(e) => onUpdate(index, "particulars", e.target.value)}
          onInput={syncHeights}
          placeholder="e.g. Rigid magnetic closure luxury gift boxes with custom gold foil..."
          className="w-full min-h-[38px] text-xs py-2 px-3 resize-y leading-relaxed text-slate-700 rounded-[4px] border border-slate-200 focus:outline-none focus:border-[#0066CC] overflow-hidden"
          rows={1}
        />
      </td>
      <td className="py-2.5 px-3 text-center align-middle w-[60px]">
        <button
          type="button"
          onClick={() => onRemove(index)}
          title="Remove row"
          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-[4px] transition-colors cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}

interface QuotationScopeTableProps {
  softwareRows: SoftwareRow[];
  onAddRow: () => void;
  onUpdateRow: (index: number, field: keyof SoftwareRow, value: any) => void;
  onRemoveRow: (index: number) => void;
}

export default function QuotationScopeTable({
  softwareRows,
  onAddRow,
  onUpdateRow,
  onRemoveRow,
}: QuotationScopeTableProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-[4px] bg-blue-50 text-[#0066CC] font-bold text-xs flex items-center justify-center">
            2
          </span>
          <h3 className="text-sm font-heading font-bold text-[#0A2540]">
            Scope of Work &amp; Particulars Table
          </h3>
        </div>

        <button
          type="button"
          onClick={onAddRow}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-heading font-bold text-[#0066CC] bg-blue-50 hover:bg-blue-100/80 rounded-[4px] transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Scope Row</span>
        </button>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-[4px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-heading font-bold text-slate-600 uppercase tracking-wider">
              <th className="py-2.5 px-3 text-center border-r border-slate-200 w-[60px]">SL</th>
              <th className="py-2.5 px-3 border-r border-slate-200 w-[35%]">Scope of Work</th>
              <th className="py-2.5 px-3 border-r border-slate-200">Particulars &amp; Features</th>
              <th className="py-2.5 px-3 text-center w-[60px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {softwareRows.map((row, index) => (
              <SyncedSoftwareRow
                key={index}
                row={row}
                index={index}
                onUpdate={onUpdateRow}
                onRemove={onRemoveRow}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
