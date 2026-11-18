"use client";

import React, { useState, useEffect } from "react";
import { useQuote } from "@/context/QuoteContext";
import {
  X,
  CheckCircle2,
  Loader2,
  ArrowRight,
} from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";

export default function QuoteModal() {
  const { isQuoteOpen, closeQuote, quoteProduct } = useQuote();

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [productName, setProductName] = useState("");
  const [moqQuantity, setMoqQuantity] = useState("5,000 pcs");
  const [noteContent, setNoteContent] = useState("");

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isQuoteOpen) {
      setIsSuccess(false);
      setIsSubmitting(false);
      document.body.style.overflow = "hidden";

      if (quoteProduct && !quoteProduct.isGeneral) {
        setProductName(quoteProduct.name || "");
      } else {
        setProductName("");
      }
    } else {
      document.body.style.overflow = "";
    }
  }, [isQuoteOpen, quoteProduct]);

  // Keyboard shortcut (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isQuoteOpen) {
        closeQuote();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isQuoteOpen, closeQuote]);

  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/quotations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          companyName,
          email,
          phone,
          productName,
          moqQuantity,
          noteContent,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit quotation");
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error("Quote submission error:", err);
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[999] overflow-y-auto flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ease-out ${
        isQuoteOpen
          ? "opacity-100 visible pointer-events-auto"
          : "opacity-0 invisible pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-[#0A2540]/80 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          isQuoteOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeQuote}
        aria-hidden="true"
      />

      {/* Modal Dialog with Smooth Scale & Translate Transition */}
      <div
        className={`relative bg-white text-[#0A2540] w-full max-w-2xl rounded-[4px] shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] z-10 transition-all duration-300 ease-out ${
          isQuoteOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-3"
        }`}
      >
        {/* Clean Corporate Blue Header (Fixed background color per request) */}
        <div className="bg-[#0066CC] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-blue-600/30">
          <h3 className="text-base sm:text-lg font-heading font-black uppercase text-white tracking-wide">
            Request a Custom Quote
          </h3>
          <button
            onClick={closeQuote}
            className="p-1.5 rounded-[4px] hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body without nested border/double-padding */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-grow bg-white">
          {isSuccess ? (
            <div className="py-8 text-center space-y-4 max-w-lg mx-auto">
              <div className="w-14 h-14 bg-blue-50 text-[#0066CC] rounded-[4px] flex items-center justify-center mx-auto mb-2 border border-blue-200 shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0066CC] block">
                INQUIRY REGISTERED SUCCESSFULLY
              </span>
              <h4 className="text-xl sm:text-2xl font-heading font-black uppercase text-[#0A2540]">
                Thank you, {fullName || "Partner"}!
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                Our merchandising team at <strong>263 Fakirapool, Motijheel, Dhaka</strong> has received your parameters for{" "}
                <span className="font-semibold text-[#0A2540]">
                  {productName || "Custom Production"}
                </span>
                . We will contact you within <strong>24 hours</strong>.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={closeQuote}
                  className="bg-[#0066CC] hover:bg-[#0052CC] text-white px-6 py-2.5 rounded-[4px] font-heading text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                    Name <span className="text-[#0066CC]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alexander Smith"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                    Company Name <span className="text-[#0066CC]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Nordic Apparel Group"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                    Email <span className="text-[#0066CC]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@brandname.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                    Phone Number <span className="text-[#0066CC]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 / WhatsApp"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                    Product Name <span className="text-[#0066CC]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g. Woven Labels / Zippers"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                    MOQ / Required Quantity <span className="text-[#0066CC]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={moqQuantity}
                    onChange={(e) => setMoqQuantity(e.target.value)}
                    placeholder="e.g. 5,000 pcs"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
                  />
                </div>

                {/* Note / Technical Instructions with RichTextEditor */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                    Note / Technical Instructions
                  </label>
                  <RichTextEditor
                    value={noteContent}
                    onChange={setNoteContent}
                    placeholder="Type packaging specs, Pantone shades, fold types, delivery instructions..."
                    minHeight="160px"
                  />
                </div>
              </div>

              {submitError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-[4px]">
                  {submitError}
                </div>
              )}

              {/* Modal Footer / Submit CTA */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={closeQuote}
                  className="px-5 py-2 rounded-[4px] font-heading text-xs font-bold text-slate-500 hover:text-[#0A2540] border border-slate-200 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-[4px] font-heading text-xs font-bold uppercase transition-all inline-flex items-center gap-1.5 text-white bg-[#0066CC] hover:bg-[#0052CC] shadow-sm disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending Quotatoin...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Quotatoin</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
