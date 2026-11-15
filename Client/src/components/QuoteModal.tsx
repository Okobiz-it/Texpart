"use client";

import React, { useState, useEffect, useRef } from "react";
import { useQuote } from "@/context/QuoteContext";
import {
  X,
  CheckCircle2,
  UploadCloud,
  FileText,
  Loader2,
  ArrowRight,
  Building2,
  Package,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Quote as QuoteIcon,
} from "lucide-react";

export default function QuoteModal() {
  const { isQuoteOpen, closeQuote, quoteProduct } = useQuote();

  // Animation & Rendering State for Smooth Fade/Scale Modal Entry
  const [isRendered, setIsRendered] = useState(false);
  const [isAnimateIn, setIsAnimateIn] = useState(false);

  // 1. Client & Export Delivery Details
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);

  // 2. Apparel Accessories & Packaging Specs
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("Apparel Accessories & Packaging");
  const [moqQuantity, setMoqQuantity] = useState("5,000 pcs");
  const [targetGarment, setTargetGarment] = useState("Technical Outerwear & Jackets");
  const [technicalSpecs, setTechnicalSpecs] = useState("");
  const [targetTimeline, setTargetTimeline] = useState("Within 3-4 weeks");

  // Rich Text Editor State & Ref
  const [noteContent, setNoteContent] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Smooth opening and closing animation controller
  useEffect(() => {
    if (isQuoteOpen) {
      setIsRendered(true);
      setIsSuccess(false);
      setIsSubmitting(false);
      document.body.style.overflow = "hidden";

      if (quoteProduct && !quoteProduct.isGeneral) {
        setProductName(quoteProduct.name || "");
        setCategory(quoteProduct.category || "Apparel Accessories & Packaging");
      } else {
        // General quotation: start fresh
        setProductName("");
        setCategory("");
      }

      // Smooth double-RAF animation trigger
      const timer = setTimeout(() => {
        setIsAnimateIn(true);
      }, 25);
      return () => clearTimeout(timer);
    } else {
      setIsAnimateIn(false);
      const timer = setTimeout(() => {
        setIsRendered(false);
        document.body.style.overflow = "";
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isQuoteOpen, quoteProduct]);

  if (!isRendered) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 850);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  // True WYSIWYG Rich Text Formatting Action Helpers
  const executeCommand = (command: string, value: string | undefined = undefined) => {
    if (typeof document !== "undefined") {
      document.execCommand(command, false, value);
      if (editorRef.current) {
        setNoteContent(editorRef.current.innerHTML);
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 transition-all duration-300 ${
        isAnimateIn ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Smooth Backdrop Fade */}
      <div
        className={`fixed inset-0 bg-charcoal/85 backdrop-blur-md transition-opacity duration-300 ease-out ${
          isAnimateIn ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeQuote}
        aria-hidden="true"
      />

      {/* Smooth Modal Dialog Scale & Slide Animation */}
      <div
        className={`relative bg-white text-charcoal w-full max-w-4xl rounded-sm shadow-2xl overflow-hidden border border-charcoal/10 z-10 max-h-[94vh] flex flex-col transform transition-all duration-300 ease-out ${
          isAnimateIn ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-3"
        }`}
      >
        {/* ==============================================================
            MODAL HEADER (CLEAN & ELEGANT)
            ============================================================== */}
        <div className="bg-charcoal text-offwhite px-6 sm:px-8 py-5 flex items-center justify-between border-b border-white/10 flex-shrink-0 bg-fabric-twill-dark">
          <div>
            <h3 className="text-xl sm:text-2xl font-heading font-black uppercase tracking-tight text-white">
              {quoteProduct?.isGeneral
                ? "General Project Quotation"
                : productName
                ? `Quotation — ${productName}`
                : "Request Project Quotation"}
            </h3>
            <p className="text-xs text-beige-light/80 mt-1 font-light">
              Direct B2B manufacturing inquiry &bull; Texpart Headquarters, Motijheel, Dhaka
            </p>
          </div>
          <button
            onClick={closeQuote}
            className="p-2 rounded-sm hover:bg-white/10 text-offwhite/80 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-grow bg-fabric-linen">
          {isSuccess ? (
            <div className="py-12 text-center space-y-5 max-w-lg mx-auto">
              <div className="w-20 h-20 bg-forest/15 text-forest rounded-full flex items-center justify-center mx-auto mb-2 border-2 border-forest/30 shadow-lg">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange block">
                INQUIRY REGISTERED SUCCESSFULLY
              </span>
              <h4 className="text-2xl sm:text-3xl font-heading font-black uppercase text-charcoal">
                Thank you, {fullName || "Partner"}!
              </h4>
              <p className="text-grey-dark text-sm sm:text-base leading-relaxed font-light">
                Our merchandising team at <strong>263 Fakirapool, Motijheel, Dhaka</strong> has received your project parameters for{" "}
                <span className="font-semibold text-charcoal">
                  {productName || category || "Custom Production"}
                </span>
                . We will calculate an itemized Bill of Materials (BOM) quote with lead times and contact you within <strong>24 hours</strong>.
              </p>
              <div className="p-4 bg-white rounded-sm border border-charcoal/10 text-xs text-grey-dark font-mono text-left space-y-1">
                <div>&bull; Company: <strong className="text-charcoal">{companyName || "N/A"}</strong></div>
                <div>&bull; Contact Email: <strong className="text-charcoal">{email}</strong></div>
                <div>&bull; Phone/WhatsApp: <strong className="text-charcoal">{phone}</strong></div>
                <div>&bull; Direct Support: <strong className="text-charcoal">+880 161 308 4465 / texpartdesign@gmail.com</strong></div>
              </div>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={closeQuote}
                  className="bg-charcoal hover:bg-orange text-white px-8 py-3.5 rounded-sm font-heading text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* ==============================================================
                  SECTION 1: CLIENT & EXPORT DELIVERY DETAILS (COMES FIRST)
                  ============================================================== */}
              <div className="space-y-5 bg-white p-6 sm:p-7 rounded-sm border border-charcoal/15 shadow-sm">
                <div className="border-b border-charcoal/10 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-sm bg-orange/10 text-orange flex items-center justify-center">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-heading font-black uppercase tracking-wider text-charcoal">
                      Client &amp; Export Delivery Details
                    </h4>
                  </div>
                  <span className="text-[10px] text-grey-dark font-mono uppercase tracking-wider">
                    Official B2B Inquiry
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-heading font-bold uppercase tracking-wider text-charcoal mb-1.5">
                      Name <span className="text-orange">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alexander Smith"
                      className="w-full px-3.5 py-2.5 bg-[#F8F7F2] border border-charcoal/20 rounded-sm text-xs text-charcoal focus:bg-white focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange shadow-inner transition-all"
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-xs font-heading font-bold uppercase tracking-wider text-charcoal mb-1.5">
                      Company Name <span className="text-orange">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Nordic Apparel Group / Fashion Studio"
                      className="w-full px-3.5 py-2.5 bg-[#F8F7F2] border border-charcoal/20 rounded-sm text-xs text-charcoal focus:bg-white focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange shadow-inner transition-all"
                    />
                  </div>

                  {/* Designation */}
                  <div>
                    <label className="block text-xs font-heading font-bold uppercase tracking-wider text-charcoal mb-1.5">
                      Designation
                    </label>
                    <input
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      placeholder="e.g. Sourcing Director, Merchandiser, Designer"
                      className="w-full px-3.5 py-2.5 bg-[#F8F7F2] border border-charcoal/20 rounded-sm text-xs text-charcoal focus:bg-white focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange shadow-inner transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-heading font-bold uppercase tracking-wider text-charcoal mb-1.5">
                      Email <span className="text-orange">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@brandname.com"
                      className="w-full px-3.5 py-2.5 bg-[#F8F7F2] border border-charcoal/20 rounded-sm text-xs text-charcoal focus:bg-white focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange shadow-inner transition-all"
                    />
                  </div>

                  {/* Full Address */}
                  <div>
                    <label className="block text-xs font-heading font-bold uppercase tracking-wider text-charcoal mb-1.5">
                      Full Address <span className="text-orange">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullAddress}
                      onChange={(e) => setFullAddress(e.target.value)}
                      placeholder="e.g. 123 Fashion Blvd, Dhaka / London, UK / FOB Port"
                      className="w-full px-3.5 py-2.5 bg-[#F8F7F2] border border-charcoal/20 rounded-sm text-xs text-charcoal focus:bg-white focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange shadow-inner transition-all"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-heading font-bold uppercase tracking-wider text-charcoal mb-1.5">
                      Phone Number <span className="text-orange">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+880 / +1 / +44 (WhatsApp enabled)"
                      className="w-full px-3.5 py-2.5 bg-[#F8F7F2] border border-charcoal/20 rounded-sm text-xs text-charcoal focus:bg-white focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange shadow-inner transition-all"
                    />
                  </div>

                  {/* Upload Tech Pack / File */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-heading font-bold uppercase tracking-wider text-charcoal mb-1.5">
                      Upload Tech Pack / Reference Artwork (Optional)
                    </label>
                    <label className="border-2 border-dashed border-charcoal/20 hover:border-orange rounded-sm p-4 text-center cursor-pointer flex flex-col items-center justify-center gap-1 bg-[#F8F7F2] hover:bg-orange/[0.02] transition-colors group">
                      <UploadCloud className="w-6 h-6 text-orange group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-medium text-charcoal">
                        Click or drag to attach CAD Tech Pack, Dieline, or Logo Artwork
                      </span>
                      <span className="text-[10px] text-grey-dark font-mono">
                        PDF, AI, EPS, DXF, PSD, ZIP, JPG (Up to 50MB)
                      </span>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.ai,.eps,.dxf,.psd,.indd,.zip,.jpg,.jpeg,.png"
                      />
                    </label>
                    {fileName && (
                      <div className="mt-2 text-xs font-semibold text-forest flex items-center gap-2 bg-forest/10 p-2 rounded-sm border border-forest/20">
                        <FileText className="w-4 h-4" />
                        <span>Attached: {fileName}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ==============================================================
                  SECTION 2: APPAREL ACCESSORIES & PACKAGING SPECS
                  ============================================================== */}
              <div className="space-y-6 bg-white p-6 sm:p-7 rounded-sm border border-charcoal/15 shadow-sm">
                <div className="border-b border-charcoal/10 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-sm bg-orange/10 text-orange flex items-center justify-center">
                      <Package className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-heading font-black uppercase tracking-wider text-charcoal">
                      Apparel Accessories &amp; Packaging Specs
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-grey-dark uppercase tracking-wider">
                    Product Parameters
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Product Name */}
                  <div>
                    <label className="block text-xs font-heading font-bold uppercase tracking-wider text-charcoal mb-1.5">
                      Product Name <span className="text-orange">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="e.g. Woven Labels / Metal Zippers / Rigid Gift Box"
                      className="w-full px-3.5 py-2.5 bg-[#F8F7F2] border border-charcoal/20 rounded-sm text-xs font-medium text-charcoal focus:bg-white focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange shadow-inner transition-all"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-heading font-bold uppercase tracking-wider text-charcoal mb-1.5">
                      Category <span className="text-orange">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="e.g. Apparel Accessories, Trims, Commercial Print, Packaging"
                      list="categories-list"
                      className="w-full px-3.5 py-2.5 bg-[#F8F7F2] border border-charcoal/20 rounded-sm text-xs font-medium text-charcoal focus:bg-white focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange shadow-inner transition-all"
                    />
                    <datalist id="categories-list">
                      <option value="Labels (Woven, Printed, Care, Heat-Transfer)" />
                      <option value="Hangtags & Price Tags" />
                      <option value="Trims, Tapes & Jacquard Elastics" />
                      <option value="Cords & Drawstrings" />
                      <option value="Metal & Nylon Zippers" />
                      <option value="Buttons & Metal Hardware" />
                      <option value="Patches & Silicone Badges" />
                      <option value="Poly Bags & Export Master Cartons" />
                      <option value="Paper Bags & Retail Packaging" />
                      <option value="Gift Boxes & Luxury Rigid Packaging" />
                      <option value="Commercial Brochures & Catalogues" />
                      <option value="Business Cards & Stationery" />
                      <option value="Calendars & Executive Diaries" />
                    </datalist>
                  </div>

                  {/* MOQ */}
                  <div>
                    <label className="block text-xs font-heading font-bold uppercase tracking-wider text-charcoal mb-1.5">
                      MOQ / Required Quantity <span className="text-orange">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={moqQuantity}
                      onChange={(e) => setMoqQuantity(e.target.value)}
                      placeholder="e.g. 5,000 pcs (Flexible MOQ)"
                      className="w-full px-3.5 py-2.5 bg-[#F8F7F2] border border-charcoal/20 rounded-sm text-xs text-charcoal focus:bg-white focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange shadow-inner transition-all"
                    />
                  </div>

                  {/* Target Garment / Application */}
                  <div>
                    <label className="block text-xs font-heading font-bold uppercase tracking-wider text-charcoal mb-1.5">
                      Target Garment / End Use
                    </label>
                    <input
                      type="text"
                      value={targetGarment}
                      onChange={(e) => setTargetGarment(e.target.value)}
                      placeholder="e.g. Jackets, Denim, Sportswear, Luxury Retail"
                      className="w-full px-3.5 py-2.5 bg-[#F8F7F2] border border-charcoal/20 rounded-sm text-xs text-charcoal focus:bg-white focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange shadow-inner transition-all"
                    />
                  </div>

                  {/* Technical Specifications & Dimensions */}
                  <div>
                    <label className="block text-xs font-heading font-bold uppercase tracking-wider text-charcoal mb-1.5">
                      Dimensions &amp; Gauge Specs
                    </label>
                    <input
                      type="text"
                      value={technicalSpecs}
                      onChange={(e) => setTechnicalSpecs(e.target.value)}
                      placeholder="e.g. 70x25mm label, #5 antique brass zipper, 350gsm card"
                      className="w-full px-3.5 py-2.5 bg-[#F8F7F2] border border-charcoal/20 rounded-sm text-xs text-charcoal focus:bg-white focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange shadow-inner transition-all"
                    />
                  </div>

                  {/* Target Timeline */}
                  <div>
                    <label className="block text-xs font-heading font-bold uppercase tracking-wider text-charcoal mb-1.5">
                      Target Delivery Timeline
                    </label>
                    <input
                      type="text"
                      value={targetTimeline}
                      onChange={(e) => setTargetTimeline(e.target.value)}
                      placeholder="e.g. 3-4 weeks / Next month / Urgent proto"
                      className="w-full px-3.5 py-2.5 bg-[#F8F7F2] border border-charcoal/20 rounded-sm text-xs text-charcoal focus:bg-white focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange shadow-inner transition-all"
                    />
                  </div>

                  {/* Note [Flawless Inline WYSIWYG Rich Text Editor] */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-heading font-bold uppercase tracking-wider text-charcoal mb-1.5">
                      Note / Technical Instructions
                    </label>

                    {/* Rich Editor Container */}
                    <div className="border border-charcoal/20 rounded-sm overflow-hidden bg-white shadow-inner focus-within:border-orange focus-within:ring-1 focus-within:ring-orange transition-all">
                      {/* Formatting Toolbar */}
                      <div className="bg-[#EFECE6] border-b border-charcoal/15 px-3 py-1.5 flex flex-wrap items-center gap-1 text-charcoal">
                        <button
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            executeCommand("bold");
                          }}
                          className="p-1.5 hover:bg-white rounded text-xs font-bold transition-colors"
                          title="Bold"
                        >
                          <Bold className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            executeCommand("italic");
                          }}
                          className="p-1.5 hover:bg-white rounded text-xs italic transition-colors"
                          title="Italic"
                        >
                          <Italic className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            executeCommand("underline");
                          }}
                          className="p-1.5 hover:bg-white rounded text-xs transition-colors"
                          title="Underline"
                        >
                          <UnderlineIcon className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-px h-4 bg-charcoal/20 mx-1" />
                        <button
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            executeCommand("insertUnorderedList");
                          }}
                          className="p-1.5 hover:bg-white rounded text-xs transition-colors"
                          title="Bullet List"
                        >
                          <List className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            executeCommand("insertOrderedList");
                          }}
                          className="p-1.5 hover:bg-white rounded text-xs transition-colors"
                          title="Numbered List"
                        >
                          <ListOrdered className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            executeCommand("formatBlock", "blockquote");
                          }}
                          className="p-1.5 hover:bg-white rounded text-xs transition-colors"
                          title="Quote Block"
                        >
                          <QuoteIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* ContentEditable Live WYSIWYG Editable Area (Auto-expands as text grows) */}
                      <div
                        ref={editorRef}
                        contentEditable
                        suppressContentEditableWarning
                        onInput={(e) => {
                          setNoteContent(e.currentTarget.innerHTML);
                        }}
                        data-placeholder="Type bespoke packing requirements, Pantone shades, fold types, barcode tolerances, or special delivery notes here..."
                        className="w-full px-4 py-3 bg-[#F8F7F2] text-xs text-charcoal focus:bg-white focus:outline-none leading-relaxed min-h-[140px] transition-all prose prose-sm max-w-none relative before:content-[attr(data-placeholder)] before:text-grey/60 before:pointer-events-none empty:before:inline-block [&:not(:empty)]:before:hidden [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-2 [&_blockquote]:border-orange [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-grey-dark"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer / Submit CTA (Clean layout with unwanted text removed) */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-charcoal/10">
                <button
                  type="button"
                  onClick={closeQuote}
                  className="px-5 py-3 rounded-sm font-heading text-xs font-bold uppercase tracking-wider text-grey-dark hover:text-charcoal transition-colors border border-charcoal/20"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-sm font-heading text-xs font-extrabold uppercase tracking-wider transition-all duration-200 inline-flex items-center justify-center gap-2 text-white bg-orange hover:bg-orange-hover shadow-xl hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Calculating BOM...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Quotation Request</span>
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
