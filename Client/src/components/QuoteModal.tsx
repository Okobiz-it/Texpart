"use client";

import React, { useState, useEffect, useRef } from "react";
import { useQuote } from "@/context/QuoteContext";
import {
  X,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Upload,
  FileText,
  Trash2,
  Calendar,
  Building,
  User,
  Mail,
  Phone,
  Package,
} from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";

export default function QuoteModal() {
  const { isQuoteOpen, closeQuote, quoteProduct } = useQuote();

  // 10 Requested Fields
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [productName, setProductName] = useState("");
  const [moqQuantity, setMoqQuantity] = useState("5,000 pcs");
  const [requiredDeliveryDate, setRequiredDeliveryDate] = useState("");
  const [noteContent, setNoteContent] = useState("");

  // Artwork file state
  const [artworkUrl, setArtworkUrl] = useState("");
  const [artworkName, setArtworkName] = useState("");
  const [isUploadingArtwork, setIsUploadingArtwork] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (isQuoteOpen) {
      setIsSuccess(false);
      setIsSubmitting(false);
      setSubmitError("");
      setUploadError("");
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

  // Handle artwork file selection & Cloudinary upload
  const handleArtworkFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      setUploadError("File size exceeds 20MB limit. Please upload a smaller file.");
      return;
    }

    setIsUploadingArtwork(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "texpart/artworks");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Artwork upload failed");
      }

      setArtworkUrl(data.url);
      setArtworkName(file.name);
    } catch (err: any) {
      console.error("Artwork upload error:", err);
      setUploadError(err.message || "Failed to upload artwork. You can still submit without it.");
    } finally {
      setIsUploadingArtwork(false);
    }
  };

  const handleRemoveArtwork = () => {
    setArtworkUrl("");
    setArtworkName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

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
          designation,
          email,
          phone,
          productName,
          moqQuantity,
          requiredDeliveryDate,
          noteContent,
          artworkUrl,
          artworkName,
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
      className={`fixed inset-0 z-[999] overflow-y-auto flex items-center justify-center p-3 sm:p-6 transition-all duration-300 ease-out ${
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

      {/* Modal Dialog */}
      <div
        className={`relative bg-white text-[#0A2540] w-full max-w-3xl rounded-[4px] shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh] z-10 transition-all duration-300 ease-out ${
          isQuoteOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-3"
        }`}
      >
        {/* Header */}
        <div className="bg-[#0066CC] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-blue-600/30">
          <div>
            <h3 className="text-base sm:text-lg font-heading font-black uppercase text-white tracking-wide">
              Request a Custom Quote
            </h3>
            <p className="text-xs text-blue-100 font-light hidden sm:block">
              One Partner. Multiple Solutions &bull; Printing, Garments Accessories &amp; Packaging
            </p>
          </div>
          <button
            onClick={closeQuote}
            className="p-1.5 rounded-[4px] hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
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
                Our merchandising team at <strong>263 Fakirapool, Motijheel, Dhaka</strong> has received your inquiry for{" "}
                <span className="font-semibold text-[#0A2540]">
                  {productName || "Custom Production"}
                </span>
                . Our specialists will review your requirements and provide an official quotation within <strong>24 hours</strong>.
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
                {/* 1. Name */}
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

                {/* 2. Company */}
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                    Company <span className="text-[#0066CC]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Nordic Apparel Group / Buying House"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
                  />
                </div>

                {/* 3. Designation */}
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g. Merchandiser / Sourcing Lead / Production Manager"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
                  />
                </div>

                {/* 4. Email */}
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                    Email <span className="text-[#0066CC]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
                  />
                </div>

                {/* 5. Mobile / WhatsApp */}
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                    Mobile / WhatsApp <span className="text-[#0066CC]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 / +1 / WhatsApp"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
                  />
                </div>

                {/* 6. Product Required */}
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                    Product Required <span className="text-[#0066CC]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g. Woven Labels, Rigid Boxes, Hangtags"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
                  />
                </div>

                {/* 7. Quantity */}
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                    Quantity <span className="text-[#0066CC]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={moqQuantity}
                    onChange={(e) => setMoqQuantity(e.target.value)}
                    placeholder="e.g. 10,000 pcs / 500 sets"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
                  />
                </div>

                {/* 8. Required Delivery Date */}
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                    Required Delivery Date
                  </label>
                  <input
                    type="date"
                    value={requiredDeliveryDate}
                    onChange={(e) => setRequiredDeliveryDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
                  />
                </div>

                {/* 9. Upload Artwork / Specification */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                    Upload Artwork / Specification
                  </label>
                  
                  {artworkUrl ? (
                    <div className="flex items-center justify-between p-3 bg-blue-50/70 border border-blue-200 rounded-[4px]">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileText className="w-5 h-5 text-[#0066CC] shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-[#0A2540] truncate">
                            {artworkName || "Uploaded Specification File"}
                          </p>
                          <a
                            href={artworkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-[#0066CC] hover:underline"
                          >
                            View File
                          </a>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveArtwork}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-[4px] transition-colors"
                        title="Remove file"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="relative border-2 border-dashed border-slate-200 hover:border-[#0066CC] rounded-[4px] p-4 text-center transition-colors bg-slate-50/50">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.ai,.eps,.cdr,.png,.jpg,.jpeg,.zip,.rar"
                        onChange={handleArtworkFileChange}
                        disabled={isUploadingArtwork}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                      />
                      <div className="flex flex-col items-center justify-center pointer-events-none">
                        {isUploadingArtwork ? (
                          <div className="flex items-center gap-2 text-xs text-[#0066CC] font-semibold">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Uploading artwork to secure storage...</span>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-6 h-6 text-[#0066CC] mb-1" />
                            <p className="text-xs font-heading font-bold text-[#0A2540]">
                              Click or drag artwork / specification file here
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              Accepts PDF, AI, EPS, CDR, PNG, JPG, or ZIP (up to 20MB)
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {uploadError && (
                    <p className="text-[11px] text-rose-500 mt-1 font-medium">{uploadError}</p>
                  )}
                </div>

                {/* 10. Specification / Detailed Instructions with RichTextEditor */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                    Specification &amp; Technical Requirements
                  </label>
                  <RichTextEditor
                    value={noteContent}
                    onChange={setNoteContent}
                    placeholder="Specify dimensions (width x height), GSM, substrate (kraft, artboard, damask), color codes (Pantone), finishing (UV, foil, embossing), etc."
                    minHeight="140px"
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
                  disabled={isSubmitting || isUploadingArtwork}
                  className="px-6 py-2.5 rounded-[4px] font-heading text-xs font-bold uppercase transition-all inline-flex items-center gap-1.5 text-white bg-[#0066CC] hover:bg-[#0052CC] shadow-sm disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Submitting Quote Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Quote Request</span>
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
