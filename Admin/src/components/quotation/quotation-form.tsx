"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  Plus,
  Trash2,
  Save,
  Printer,
  CheckCircle2,
  RefreshCw,
  ArrowLeft,
  X,
  Layers,
  Sparkles,
  Loader2,
} from "lucide-react";
import {
  DEFAULT_SOFTWARE_COLUMNS,
  DEFAULT_SOFTWARE_ROWS,
  DEFAULT_UNIFIED_TERMS_AND_CONDITIONS,
  SoftwareRow,
} from "./quotation-defaults";
import { QuotationPrintSheet } from "./quotation-print-sheet";
import AdminRichTextEditor from "@/components/AdminRichTextEditor";
import { numberToWords } from "@/lib/number-to-words";
import QuotationClientDetails from "./QuotationClientDetails";
import QuotationScopeTable from "./QuotationScopeTable";

interface QuotationFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function QuotationForm({
  initialData,
  isEdit = false,
}: QuotationFormProps) {
  const router = useRouter();

  const [refNo, setRefNo] = useState(initialData?.ref_no || "");
  const [quoteDate, setQuoteDate] = useState(
    initialData?.quote_date
      ? new Date(initialData.quote_date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0]
  );
  const [clientName, setClientName] = useState(initialData?.client_name || "");
  const [organizationName, setOrganizationName] = useState(
    initialData?.organization_name || ""
  );
  const [address, setAddress] = useState(initialData?.address || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [subject, setSubject] = useState(
    initialData?.subject ||
      "Quotation for Garment Packaging & Apparel Development Solutions"
  );

  // Scope rows
  const [softwareRows, setSoftwareRows] = useState<SoftwareRow[]>(
    initialData?.software_rows?.length
      ? initialData.software_rows
      : DEFAULT_SOFTWARE_ROWS
  );

  // Pricing
  const [grandTotal, setGrandTotal] = useState<number | string>(
    initialData?.grand_total || initialData?.software_amount || 35000
  );
  const [inWords, setInWords] = useState(
    initialData?.in_words || numberToWords(35000)
  );

  // Terms & narrative
  const [termsAndConditions, setTermsAndConditions] = useState(
    initialData?.terms_conditions || DEFAULT_UNIFIED_TERMS_AND_CONDITIONS
  );
  const [savedDefaultTerms, setSavedDefaultTerms] = useState<string>("");
  const [isSavingDefaultTerms, setIsSavingDefaultTerms] = useState(false);
  const [defaultSaveSuccess, setDefaultSaveSuccess] = useState(false);

  // Load permanent default terms & conditions from database
  useEffect(() => {
    let isMounted = true;
    fetch("/api/quotations/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && isMounted) {
          const dbDefault = data.defaultTerms || DEFAULT_UNIFIED_TERMS_AND_CONDITIONS;
          setSavedDefaultTerms(dbDefault);
          if (!initialData?.terms_conditions) {
            setTermsAndConditions(dbDefault);
          }
        }
      })
      .catch((err) => console.error("Failed to load quotation settings", err));
    return () => {
      isMounted = false;
    };
  }, [initialData]);

  const handleSaveDefaultTerms = async () => {
    if (isSavingDefaultTerms || termsAndConditions.trim() === savedDefaultTerms.trim()) return;
    setIsSavingDefaultTerms(true);
    try {
      const res = await fetch("/api/quotations/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ defaultTerms: termsAndConditions }),
      });
      const data = await res.json();
      if (data.success) {
        setSavedDefaultTerms(data.defaultTerms);
        setDefaultSaveSuccess(true);
        setTimeout(() => setDefaultSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Failed to save default terms", err);
    } finally {
      setIsSavingDefaultTerms(false);
    }
  };

  // Signatory
  const [signatoryName, setSignatoryName] = useState(
    initialData?.company_signatory_name || "Md. Sorower Jahan"
  );
  const [signatoryTitle, setSignatoryTitle] = useState(
    initialData?.company_signatory_title || "Managing Director, Texpart Ltd."
  );
  const [signatoryPhone, setSignatoryPhone] = useState(
    initialData?.company_phone || "+880 1711-234567"
  );

  // Status & UI state
  const [status, setStatus] = useState<string>(initialData?.status || "DRAFT");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const handlePrint = () => {
    window.print();
  };

  // Auto-fetch next Ref No if creating new
  useEffect(() => {
    if (!isEdit && !refNo) {
      (async () => {
        try {
          const res = await fetch("/api/quotations");
          const d = await res.json();
          if (d.success && d.nextRefNo) {
            setRefNo(d.nextRefNo);
          }
        } catch {}
      })();
    }
  }, [isEdit, refNo]);

  // Sync grand total with in-words
  const handleGrandTotalChange = (val: string) => {
    setGrandTotal(val);
    const num = parseFloat(val.replace(/[^0-9.-]/g, ""));
    if (!isNaN(num)) {
      setInWords(numberToWords(num));
    }
  };

  // Scope rows mutations
  const handleUpdateRow = (
    index: number,
    field: keyof SoftwareRow,
    value: any
  ) => {
    setSoftwareRows((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleAddRow = () => {
    setSoftwareRows((prev) => [
      ...prev,
      {
        sl: prev.length + 1,
        scope: "",
        particulars: "",
      },
    ]);
  };

  const handleRemoveRow = (index: number) => {
    setSoftwareRows((prev) => {
      const filtered = prev.filter((_, i) => i !== index);
      return filtered.map((row, i) => ({
        ...row,
        sl: typeof row.sl === "number" || /^\d+$/.test(String(row.sl)) ? i + 1 : row.sl,
      }));
    });
  };

  // Data bundle for preview & save
  const currentQuotationData = {
    id: initialData?._id || initialData?.id || "preview-id",
    _id: initialData?._id,
    ref_no: refNo || "texpart/quote/preview/26",
    quote_date: quoteDate,
    client_name: clientName.trim(),
    organization_name: organizationName,
    address,
    phone,
    email,
    subject,
    software_columns: DEFAULT_SOFTWARE_COLUMNS,
    software_rows: softwareRows,
    software_amount: Number(grandTotal) || 0,
    grand_total: Number(grandTotal) || 0,
    in_words: inWords,
    terms_conditions: termsAndConditions,
    company_signatory_name: signatoryName,
    company_signatory_title: signatoryTitle,
    company_phone: signatoryPhone,
    company_email: "info@texpartbd.com",
    status,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) {
      setSubmitError("Client Name is required");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess("");

    try {
      const payload = {
        ...currentQuotationData,
        doc_type: "QUOTATION",
      };

      const url = isEdit
        ? `/api/quotations/${initialData._id || initialData.id}`
        : "/api/quotations";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to save quotation");
      }

      setSubmitSuccess(
        isEdit
          ? "Quotation updated successfully!"
          : "Quotation created successfully!"
      );

      setTimeout(() => {
        router.push("/quotations");
      }, 1000);
    } catch (err: any) {
      setSubmitError(err.message || "Failed to save quotation");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* 1. BUILDER FORM: Full-width, visible on screen, strictly hidden in print */}
      <div className="no-print print:hidden w-full px-6 sm:px-8 py-6 space-y-6">
        {/* Top Header & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Link
                href="/quotations"
                className="inline-flex items-center gap-1.5 text-slate-500 hover:text-[#0066CC] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Quotations</span>
              </Link>
              <span>/</span>
              <span className="text-[#0A2540] font-bold">
                {isEdit ? "Edit Quotation" : "Create Quotation"}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-heading font-black text-[#0A2540] tracking-tight flex items-center gap-2.5">
              <FileText className="w-6 h-6 text-[#0066CC]" />
              <span>
                {isEdit ? `Edit Quotation: ${refNo || "Draft"}` : "Create Official Quotation"}
              </span>
            </h1>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-heading font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:text-[#0066CC] hover:border-slate-300 rounded-[4px] shadow-xs cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-[#0066CC]" />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-heading font-bold text-white bg-[#0066CC] hover:bg-blue-700 rounded-[4px] shadow-xs cursor-pointer transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              <span>{isEdit ? "Update Quotation" : "Save Quotation"}</span>
            </button>
          </div>
        </div>

        {/* Notifications */}
        {submitError && (
          <div className="p-4 rounded-[4px] bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <X className="w-4 h-4 shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        {submitSuccess && (
          <div className="p-4 rounded-[4px] bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{submitSuccess}</span>
          </div>
        )}

        {/* Builder Form Sections (Full Admin Width) */}
        <div className="w-full space-y-6">
          {/* SECTION 1: Client & Reference Details */}
          <QuotationClientDetails
            refNo={refNo}
            setRefNo={setRefNo}
            quoteDate={quoteDate}
            setQuoteDate={setQuoteDate}
            clientName={clientName}
            setClientName={setClientName}
            organizationName={organizationName}
            setOrganizationName={setOrganizationName}
            phone={phone}
            setPhone={setPhone}
            email={email}
            setEmail={setEmail}
            address={address}
            setAddress={setAddress}
            subject={subject}
            setSubject={setSubject}
          />

          {/* SECTION 2: Scope of Work Table & Financial Engine */}
          <div className="bg-white border border-slate-200 rounded-[4px] shadow-xs p-5 space-y-4">
            <QuotationScopeTable
              softwareRows={softwareRows}
              onAddRow={handleAddRow}
              onUpdateRow={handleUpdateRow}
              onRemoveRow={handleRemoveRow}
            />

            {/* Financial Calculations */}
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-[4px] border border-slate-200">
                <div className="space-y-1">
                  <label className="text-xs font-heading font-bold text-slate-700">
                    Total Quotation Amount (৳ BDT) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={grandTotal}
                    onChange={(e) => handleGrandTotalChange(e.target.value)}
                    placeholder="e.g. 35000"
                    className="w-48 h-9 px-3 text-sm rounded-[4px] border border-slate-200 focus:outline-none focus:border-[#0066CC] font-bold text-slate-900 bg-white"
                  />
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-400 block">
                    Calculated Grand Total
                  </span>
                  <span className="text-xl font-heading font-black text-[#0066CC]">
                    ৳ {Number(grandTotal || 0).toLocaleString("en-IN")}/-
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-heading font-bold text-slate-700">
                  Amount in Words
                </label>
                <input
                  type="text"
                  value={inWords}
                  onChange={(e) => setInWords(e.target.value)}
                  className="w-full h-9 px-3 text-xs rounded-[4px] border border-slate-200 focus:outline-none focus:border-[#0066CC] bg-slate-50/60 font-medium text-slate-700"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: Terms & Conditions WYSIWYG Narrative */}
          <div className="bg-white border border-slate-200 rounded-[4px] shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-[4px] bg-blue-50 text-[#0066CC] font-bold text-xs flex items-center justify-center">
                  3
                </span>
                <h3 className="text-sm font-heading font-bold text-[#0A2540]">
                  Terms &amp; Conditions, Project Timeline &amp; Deliverables
                </h3>
              </div>

              {/* Save as Default button on top right */}
              <div className="flex items-center gap-2">
                {defaultSaveSuccess && (
                  <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 animate-in fade-in">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Saved Default
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleSaveDefaultTerms}
                  disabled={isSavingDefaultTerms || termsAndConditions.trim() === savedDefaultTerms.trim()}
                  title={
                    termsAndConditions.trim() === savedDefaultTerms.trim()
                      ? "Terms match the saved database default"
                      : "Save current terms as default for all future quotations"
                  }
                  className={`h-7 px-3 text-xs font-heading font-bold rounded-[4px] border transition-all flex items-center gap-1.5 ${
                    termsAndConditions.trim() !== savedDefaultTerms.trim() && !isSavingDefaultTerms
                      ? "bg-[#0066CC] hover:bg-[#0055b3] text-white border-[#0066CC] shadow-xs cursor-pointer active:scale-95"
                      : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-60"
                  }`}
                >
                  {isSavingDefaultTerms ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Save className="w-3 h-3" />
                  )}
                  <span>Save</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              Format your production milestones, terms, and client requirements. The virtual paginator will balance tags and prevent orphan headings automatically.
            </p>

            <AdminRichTextEditor
              value={termsAndConditions}
              onChange={setTermsAndConditions}
              placeholder="Enter quotation terms and conditions..."
              minHeight="min-h-[220px]"
            />
          </div>

          {/* SECTION 4: Authorized Signatory Details */}
          <div className="bg-white border border-slate-200 rounded-[4px] shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-[4px] bg-blue-50 text-[#0066CC] font-bold text-xs flex items-center justify-center">
                  4
                </span>
                <h3 className="text-sm font-heading font-bold text-[#0A2540]">
                  Company Signatory
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">Authorization</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-heading font-bold text-slate-700">
                  Signatory Name
                </label>
                <input
                  type="text"
                  value={signatoryName}
                  onChange={(e) => setSignatoryName(e.target.value)}
                  placeholder="e.g. Md. Sorower Jahan"
                  className="w-full h-9 px-3 text-xs rounded-[4px] border border-slate-200 focus:outline-none focus:border-[#0066CC]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-heading font-bold text-slate-700">
                  Designation / Title
                </label>
                <input
                  type="text"
                  value={signatoryTitle}
                  onChange={(e) => setSignatoryTitle(e.target.value)}
                  placeholder="e.g. Managing Director, Texpart Ltd."
                  className="w-full h-9 px-3 text-xs rounded-[4px] border border-slate-200 focus:outline-none focus:border-[#0066CC]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-heading font-bold text-slate-700">
                  Contact Phone
                </label>
                <input
                  type="text"
                  value={signatoryPhone}
                  onChange={(e) => setSignatoryPhone(e.target.value)}
                  placeholder="e.g. +880 1711-234567"
                  className="w-full h-9 px-3 text-xs rounded-[4px] border border-slate-200 focus:outline-none focus:border-[#0066CC]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <CheckCircle2 className="w-4 h-4 text-[#0066CC] shrink-0" />
              <span>
                Saving stores this quotation in <strong>Manage Quotations</strong> where you can print on letterhead pad, download PDF, or edit anytime.
              </span>
            </div>
          </div>

          {/* Bottom Save Bar */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Link
              href="/quotations"
              className="px-4 py-2 text-xs font-heading font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-[4px] transition-colors"
            >
              Cancel
            </Link>

            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 text-xs font-heading font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:text-[#0066CC] hover:border-slate-300 rounded-[4px] shadow-xs cursor-pointer transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-[#0066CC]" />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 text-xs font-heading font-bold text-white bg-[#0066CC] hover:bg-blue-700 rounded-[4px] shadow-xs cursor-pointer transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              {isSubmitting ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              <span>{isEdit ? "Update Quotation" : "Save Quotation"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. PRINT ENGINE: Hidden on screen, strictly rendered during print */}
      <div className="quotation-print-container hidden print:block print:w-full print:m-0 print:p-0">
        <QuotationPrintSheet data={currentQuotationData} />
      </div>
    </>
  );
}
