"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import AdminNavbar from "@/components/AdminNavbar";
import QuotationForm from "@/components/quotation/quotation-form";

export default function EditQuotationPage() {
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

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminNavbar title="Quotations" subtitle="Edit Quotation" />

      {isLoading ? (
        <div className="w-full px-6 sm:px-8 py-20 flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-8 h-8 text-[#0066CC] animate-spin" />
          <span className="text-xs font-heading font-medium text-slate-500">
            Loading quotation details...
          </span>
        </div>
      ) : error || !quotation ? (
        <div className="w-full px-6 sm:px-8 py-20 flex flex-col items-center justify-center gap-3 text-center max-w-md mx-auto">
          <div className="w-12 h-12 rounded-[4px] bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-base font-heading font-bold text-slate-900">
            Quotation Not Found
          </h2>
          <p className="text-xs text-slate-500">
            {error || "The quotation you are attempting to edit could not be found or has been deleted."}
          </p>
          <Link
            href="/quotations"
            className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-[#0066CC] text-white text-xs font-heading font-bold rounded-[4px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Quotations</span>
          </Link>
        </div>
      ) : (
        <QuotationForm initialData={quotation} isEdit={true} />
      )}
    </div>
  );
}
