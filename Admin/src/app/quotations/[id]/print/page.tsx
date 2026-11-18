"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Printer,
  ArrowLeft,
  Edit,
  Loader2,
  AlertCircle,
  FileText,
  Download,
} from "lucide-react";
import { QuotationPrintSheet } from "@/components/quotation/quotation-print-sheet";

export default function QuotationPrintPage() {
  const params = useParams();
  const id = params?.id as string;

  const [quotation, setQuotation] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    (async () => {
      setIsLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/quotations/${id}`);
        const data = await res.json();
        if (!res.ok || !data.success || !data.data) {
          throw new Error(data.error || "Failed to load quotation");
        }
        setQuotation(data.data);
      } catch (err: any) {
        setError(err.message || "Failed to load quotation");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-[#0066CC] animate-spin" />
        <span className="text-xs font-heading font-medium text-slate-600">
          Preparing letterhead document...
        </span>
      </div>
    );
  }

  if (error || !quotation) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="w-12 h-12 rounded-[4px] bg-rose-50 text-rose-600 flex items-center justify-center">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-heading font-bold text-slate-900">
          Quotation Not Found
        </h2>
        <p className="text-xs text-slate-500 max-w-sm">
          {error || "The requested quotation could not be found or has been deleted."}
        </p>
        <Link
          href="/quotations"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0066CC] text-white text-xs font-heading font-bold rounded-[4px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Quotations</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-200/80 print:bg-white text-zinc-900">
      {/* Top Floating Control Bar (Hidden during print) */}
      <header className="no-print sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-300 shadow-sm px-4 sm:px-8 py-3">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/quotations"
              className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-slate-600 hover:text-[#0066CC] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Link>

            <span className="text-slate-300">|</span>

            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#0066CC]" />
              <span className="text-xs font-heading font-bold text-slate-900">
                Official Letterhead Pad
              </span>
              <span className="text-xs font-mono font-bold text-[#0066CC] bg-blue-50 px-2 py-0.5 rounded-[4px] border border-blue-100">
                {quotation.ref_no}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href={`/quotations/${quotation._id || quotation.id}/edit`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-heading font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-[4px] shadow-xs transition-colors"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Document</span>
            </Link>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-heading font-bold text-white bg-[#0066CC] hover:bg-blue-700 rounded-[4px] shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Printable Letterhead Canvas Container */}
      <main className="py-6 sm:py-10 print:p-0 print:m-0 flex justify-center">
        <QuotationPrintSheet data={quotation} />
      </main>
    </div>
  );
}
