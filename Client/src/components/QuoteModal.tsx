"use client";

import React, { useState, useEffect } from "react";
import { useQuote } from "@/context/QuoteContext";
import { X, CheckCircle2, UploadCloud, FileText, Loader2, ArrowRight } from "lucide-react";

export default function QuoteModal() {
  const { isQuoteOpen, closeQuote, quoteProduct } = useQuote();

  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("");
  const [specifications, setSpecifications] = useState("");
  const [customization, setCustomization] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isQuoteOpen) {
      setIsSuccess(false);
      setIsSubmitting(false);
      // document overflow handling
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isQuoteOpen]);

  if (!isQuoteOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-charcoal/85 backdrop-blur-md transition-opacity">
      <div
        className="fixed inset-0"
        onClick={closeQuote}
        aria-hidden="true"
      />

      <div className="relative bg-white text-charcoal w-full max-w-3xl rounded-sm shadow-2xl overflow-hidden border border-charcoal/10 z-10 transition-all transform scale-100 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-charcoal text-offwhite px-6 py-5 flex items-center justify-between border-b border-white/10 flex-shrink-0">
          <div>
            <span className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-orange block">
              B2B Inquiry System
            </span>
            <h3 className="text-lg sm:text-xl font-heading font-black uppercase tracking-tight text-offwhite mt-0.5">
              Request a Formal Quotation
            </h3>
          </div>
          <button
            onClick={closeQuote}
            className="p-1.5 rounded-full hover:bg-white/10 text-offwhite/80 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-grow">
          {isSuccess ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 bg-forest/10 text-forest rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-heading font-black uppercase text-charcoal">
                Thank you for your inquiry!
              </h4>
              <p className="text-grey-dark max-w-md mx-auto text-sm leading-relaxed">
                Our manufacturing and estimation team in Dhaka will review your requirements and contact you shortly with detailed pricing, production milestones, and lead times.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={closeQuote}
                  className="bg-charcoal hover:bg-forest text-offwhite px-6 py-3 rounded-sm font-heading text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Return to Catalogue
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Reference Banner if opened from a specific product */}
              {quoteProduct ? (
                <div className="p-4 bg-offwhite-alt border-l-4 border-orange rounded-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-grey-dark block">
                      Target Product Selected
                    </span>
                    <span className="text-base font-heading font-extrabold text-charcoal">
                      {quoteProduct.name}
                    </span>
                    <span className="text-xs text-grey block">
                      {quoteProduct.category}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono bg-white px-2.5 py-1 rounded border border-charcoal/10 text-forest font-semibold">
                    Pre-Populated
                  </span>
                </div>
              ) : (
                <div className="p-3.5 bg-offwhite border-l-4 border-cyan rounded-sm">
                  <span className="text-xs font-semibold text-charcoal block">
                    General Custom Project Inquiry &mdash; Private Jobs / Commercial Printing
                  </span>
                </div>
              )}

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-charcoal mb-1.5">
                    Full Name <span className="text-orange">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Marcus Vance"
                    className="w-full px-3.5 py-2.5 bg-offwhite-alt/40 border border-charcoal/20 rounded-sm text-sm text-charcoal focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-charcoal mb-1.5">
                    Company / Brand Name <span className="text-orange">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Vance Apparel Ltd."
                    className="w-full px-3.5 py-2.5 bg-offwhite-alt/40 border border-charcoal/20 rounded-sm text-sm text-charcoal focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-charcoal mb-1.5">
                    Business Email <span className="text-orange">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="marcus@vanceapparel.com"
                    className="w-full px-3.5 py-2.5 bg-offwhite-alt/40 border border-charcoal/20 rounded-sm text-sm text-charcoal focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange"
                  />
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-charcoal mb-1.5">
                    Phone / WhatsApp Number <span className="text-orange">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 234-5678"
                    className="w-full px-3.5 py-2.5 bg-offwhite-alt/40 border border-charcoal/20 rounded-sm text-sm text-charcoal focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange"
                  />
                </div>

                {/* Required Quantity */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-charcoal mb-1.5">
                    Required Quantity (Estimated Units / Pcs) <span className="text-orange">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g. 5,000 pcs (labels) / 1,000 pcs (jackets) / 2,500 copies (catalogues)"
                    className="w-full px-3.5 py-2.5 bg-offwhite-alt/40 border border-charcoal/20 rounded-sm text-sm text-charcoal focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange"
                  />
                </div>

                {/* Product Specifications / Requirements */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-charcoal mb-1.5">
                    Product Specifications &amp; Requirements
                  </label>
                  <textarea
                    rows={2}
                    value={specifications}
                    onChange={(e) => setSpecifications(e.target.value)}
                    placeholder="Specify dimensions, preferred materials (e.g. GRS polyester, 350gsm art board), or technical tolerances..."
                    className="w-full px-3.5 py-2.5 bg-offwhite-alt/40 border border-charcoal/20 rounded-sm text-sm text-charcoal focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange"
                  />
                </div>

                {/* Customization Details */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-charcoal mb-1.5">
                    Customization Details (Finishes, Weave, Foiling, Colors)
                  </label>
                  <textarea
                    rows={2}
                    value={customization}
                    onChange={(e) => setCustomization(e.target.value)}
                    placeholder="Specify finishing touches (e.g., gold foil stamping, ultrasonic soft cut, spot UV, Pantone codes)..."
                    className="w-full px-3.5 py-2.5 bg-offwhite-alt/40 border border-charcoal/20 rounded-sm text-sm text-charcoal focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange"
                  />
                </div>

                {/* File Upload Simulation */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-charcoal mb-1.5">
                    Upload Reference Design / Tech Pack / Artwork (Optional)
                  </label>
                  <label className="border-2 border-dashed border-charcoal/20 hover:border-orange rounded-sm p-4 text-center cursor-pointer flex flex-col items-center justify-center gap-1.5 bg-offwhite/50 transition-colors">
                    <UploadCloud className="w-6 h-6 text-orange" />
                    <span className="text-xs font-medium text-grey-dark">
                      Click to upload Tech Pack (PDF, AI, EPS, ZIP, JPG - Max 50MB)
                    </span>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.ai,.eps,.zip,.jpg,.jpeg,.png"
                    />
                  </label>
                  {fileName && (
                    <div className="mt-2 text-xs font-semibold text-forest flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Attached: {fileName}</span>
                    </div>
                  )}
                </div>

                {/* Additional Message */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-charcoal mb-1.5">
                    Additional Message or Delivery Destination
                  </label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Any specific delivery timeline, export port requirements, or target FOB prices..."
                    className="w-full px-3.5 py-2.5 bg-offwhite-alt/40 border border-charcoal/20 rounded-sm text-sm text-charcoal focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-between border-t border-charcoal/10">
                <span className="text-[11px] text-grey">
                  No online payment &bull; B2B estimation only
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-orange hover:bg-orange-hover text-white px-7 py-3 rounded-sm font-heading text-xs font-extrabold uppercase tracking-wider transition-all duration-200 inline-flex items-center gap-2 shadow-lg hover:shadow-orange/30 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing Request...
                    </>
                  ) : (
                    <>
                      Submit Quotation Request
                      <ArrowRight className="w-4 h-4" />
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

