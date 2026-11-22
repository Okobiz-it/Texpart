"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  FileText,
  Upload,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Trash2,
  ShieldCheck,
  Package,
} from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import { BRAND_INFO } from "@/data/siteNavigation";

export default function QuotePage() {
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

  // Artwork upload state
  const [artworkUrl, setArtworkUrl] = useState("");
  const [artworkName, setArtworkName] = useState("");
  const [isUploadingArtwork, setIsUploadingArtwork] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

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
    <div className="bg-[#F8FAFC] text-[#0A2540] min-h-screen">
      {/* Header Banner */}
      <section className="pt-32 sm:pt-36 pb-14 sm:pb-16 bg-gradient-to-r from-[#061730] via-[#0A2540] to-[#003B73] text-white overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black uppercase tracking-tight text-white leading-tight">
              Request a Commercial <br className="hidden sm:inline" />
              <span className="text-blue-400">Production Quotation</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              DESIGN &bull; DEVELOP &bull; PRODUCE &bull; PACK &bull; DELIVER &mdash; Submit your technical specs, required quantities, and target delivery dates for factory-direct pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Main Quote Content */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Column (8 cols) */}
            <div className="lg:col-span-8">
              <div className="bg-white p-6 sm:p-8 rounded-[4px] border border-slate-200 shadow-sm">
                <div className="mb-6 space-y-1 pb-4 border-b border-slate-100">
                  <h2 className="text-xl sm:text-2xl font-heading font-black uppercase tracking-tight text-[#0A2540]">
                    Project &amp; Manufacturing Requirements
                  </h2>
                  <p className="text-xs text-slate-500 font-normal">
                    Please provide the specifications below. Our engineering and merchandising teams at Fakirapool, Motijheel will revert within 24 hours.
                  </p>
                </div>

                {isSuccess ? (
                  <div className="py-10 text-center space-y-4 max-w-lg mx-auto">
                    <div className="w-14 h-14 bg-blue-50 text-[#0066CC] rounded-[4px] flex items-center justify-center mx-auto mb-2 border border-blue-200 shadow-md">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0066CC] block">
                      INQUIRY REGISTERED SUCCESSFULLY
                    </span>
                    <h3 className="text-2xl font-heading font-black uppercase text-[#0A2540]">
                      Thank you, {fullName || "Partner"}!
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                      Your quotation request for{" "}
                      <strong className="text-[#0A2540]">{productName || "Custom Order"}</strong> has been securely logged. Our merchandising team will examine your specifications and provide a competitive commercial cost breakdown to{" "}
                      <strong>{email || phone}</strong>.
                    </p>
                    <div className="pt-4 flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsSuccess(false);
                          setFullName("");
                          setCompanyName("");
                          setDesignation("");
                          setEmail("");
                          setPhone("");
                          setProductName("");
                          setMoqQuantity("5,000 pcs");
                          setRequiredDeliveryDate("");
                          setNoteContent("");
                          setArtworkUrl("");
                          setArtworkName("");
                        }}
                        className="px-6 py-2.5 rounded-[4px] bg-[#0066CC] text-white text-xs font-heading font-bold uppercase tracking-wider hover:bg-[#0052CC] transition-colors"
                      >
                        Submit Another Quote
                      </button>
                      <Link
                        href="/"
                        className="px-5 py-2.5 rounded-[4px] border border-slate-200 text-slate-600 hover:text-[#0A2540] hover:bg-slate-100 text-xs font-heading font-bold uppercase tracking-wider transition-colors"
                      >
                        Back to Home
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
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
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
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
                          placeholder="e.g. Senior Merchandiser / Sourcing Lead"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
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
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
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
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
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
                          placeholder="e.g. Woven Labels, Rigid Boxes, Poly Bags"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
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
                          placeholder="e.g. 10,000 pcs"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
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
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
                        />
                      </div>

                      {/* 9. Upload Artwork / Specification */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                          Upload Artwork / Specification
                        </label>

                        {artworkUrl ? (
                          <div className="flex items-center justify-between p-3.5 bg-blue-50/70 border border-blue-200 rounded-[4px]">
                            <div className="flex items-center gap-3 min-w-0">
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
                                  View / Download File
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
                          <div className="relative border-2 border-dashed border-slate-200 hover:border-[#0066CC] rounded-[4px] p-5 text-center transition-colors bg-slate-50/50">
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
                                  <Upload className="w-7 h-7 text-[#0066CC] mb-1.5" />
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

                      {/* 10. Specification */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                          Specification &amp; Technical Details
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

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting || isUploadingArtwork}
                        className="px-8 py-3 rounded-[4px] bg-[#0066CC] hover:bg-[#0052CC] text-white font-heading text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Submitting Quote Request...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Request for Quote</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right Information Column (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Brand Pillars Card */}
              <div className="bg-white border border-slate-200 p-6 rounded-[4px] shadow-sm space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-[11px] font-heading font-bold uppercase tracking-widest text-[#0066CC] block">
                    Why Partner With Texpart
                  </span>
                  <h3 className="text-base font-heading font-black uppercase text-[#0A2540] mt-0.5">
                    {BRAND_INFO.valueProp}
                  </h3>
                </div>

                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-[#0066CC] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#0A2540] block font-semibold">Pre-Flight Digital Proofing</strong>
                      <span>Complimentary dieline validation and sample strike-offs prior to bulk press runs.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Package className="w-4 h-4 text-[#0066CC] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#0A2540] block font-semibold">Industrial Capacity</strong>
                      <span>Over 5 million trims and 1.5 million printed units monthly capacity.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#0066CC] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#0A2540] block font-semibold">Rapid Golden Samples</strong>
                      <span>Physical prototype samples dispatched in 3–5 working days.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-mono">
                  {BRAND_INFO.processSteps}
                </div>
              </div>

              {/* Direct Help / WhatsApp Card */}
              <div className="bg-[#061730] text-white p-6 rounded-[4px] shadow-sm space-y-4">
                <div>
                  <span className="text-[10.5px] font-heading font-bold uppercase tracking-widest text-blue-400 block mb-1">
                    Need Immediate Assistance?
                  </span>
                  <h3 className="text-base font-heading font-bold uppercase text-white">
                    Direct Merchandising Desk
                  </h3>
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>{BRAND_INFO.contact.mobile}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>{BRAND_INFO.contact.emailSecondary}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{BRAND_INFO.contact.address}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={BRAND_INFO.contact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-[4px] bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-heading font-bold uppercase tracking-wider transition-colors shadow-sm"
                  >
                    <span>Chat on WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
