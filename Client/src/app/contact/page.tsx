"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  UploadCloud,
  CheckCircle2,
  FileText,
  Loader2,
  Globe,
} from "lucide-react";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Private Jobs — Apparel Manufacturing");
  const [projectDetails, setProjectDetails] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 750);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="bg-offwhite min-h-screen text-charcoal">
      {/* Header Banner with Fabric Twill Weave (FLUSH TO TOP UNDER NAV) */}
      <section className="pt-28 pb-16 sm:pt-32 sm:pb-20 bg-charcoal text-white relative overflow-hidden bg-fabric-twill-dark">
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/90 to-charcoal/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block">
              Inquiry &bull; Motijheel, Dhaka Headquarters
            </span>
            <h1 className="text-4xl sm:text-6xl font-heading font-black uppercase tracking-tight text-white leading-tight">
              Let&apos;s Discuss <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange via-beige to-white">
                Your Next Project.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-beige-light leading-relaxed font-light pt-2">
              &ldquo;We co-operate you build a strong identity for your brand with the perfect accessories and packaging.&rdquo; &mdash; Our Motijheel merchandising and engineering teams are ready to fulfill your orders.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form and Location Split */}
      <section className="py-20 sm:py-28 bg-offwhite text-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Form Column (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 sm:p-12 rounded-sm border border-charcoal/10 shadow-lg">
                <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block mb-2">
                  B2B Partnership Inquiry
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-charcoal mb-4">
                  Request a Formal Proposal
                </h2>
                <p className="text-xs sm:text-sm text-grey-dark leading-relaxed mb-8 font-light">
                  Share your project details, tech pack specs, or target quantities. A dedicated technical merchandiser will respond within 24 to 48 hours.
                </p>

                {isSubmitted ? (
                  <div className="p-8 bg-forest/10 border border-forest/30 rounded-sm text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-forest text-white flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-heading font-black uppercase text-forest-dark">
                      Inquiry Received Successfully
                    </h3>
                    <p className="text-sm text-charcoal leading-relaxed max-w-md mx-auto">
                      Thank you, <strong>{fullName || "valued partner"}</strong>. Your project brief has been routed to our technical merchandising team in Dhaka. We will review your requirements and reach out via <strong>{email}</strong> shortly.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFullName("");
                        setCompanyName("");
                        setEmail("");
                        setPhone("");
                        setProjectDetails("");
                        setFileName(null);
                      }}
                      className="mt-4 bg-charcoal hover:bg-forest text-white px-6 py-2.5 rounded-sm font-heading text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-heading font-extrabold uppercase tracking-wider text-charcoal mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g., Alexandra Meyer"
                          className="w-full bg-offwhite border border-charcoal/20 focus:border-orange focus:bg-white rounded-sm px-4 py-3 text-sm text-charcoal outline-none transition-colors font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-heading font-extrabold uppercase tracking-wider text-charcoal mb-1.5">
                          Company / Brand Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g., Nordik Apparel Co."
                          className="w-full bg-offwhite border border-charcoal/20 focus:border-orange focus:bg-white rounded-sm px-4 py-3 text-sm text-charcoal outline-none transition-colors font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-heading font-extrabold uppercase tracking-wider text-charcoal mb-1.5">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@company.com"
                          className="w-full bg-offwhite border border-charcoal/20 focus:border-orange focus:bg-white rounded-sm px-4 py-3 text-sm text-charcoal outline-none transition-colors font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-heading font-extrabold uppercase tracking-wider text-charcoal mb-1.5">
                          Phone / WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 019-2834"
                          className="w-full bg-offwhite border border-charcoal/20 focus:border-orange focus:bg-white rounded-sm px-4 py-3 text-sm text-charcoal outline-none transition-colors font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-extrabold uppercase tracking-wider text-charcoal mb-1.5">
                        Area of Interest / Service Division *
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full bg-offwhite border border-charcoal/20 focus:border-orange focus:bg-white rounded-sm px-4 py-3 text-sm text-charcoal outline-none transition-colors font-medium"
                      >
                        <option value="Private Jobs — Apparel Manufacturing">
                          Private Jobs — End-to-End Apparel Manufacturing &amp; Outerwear
                        </option>
                        <option value="Commercial Jobs — Printing & Promotional">
                          Commercial Jobs — Commercial Printing, Publications &amp; Gifting
                        </option>
                        <option value="Apparel Accessories (Labels, Hangtags, Trims, Zippers)">
                          Apparel Accessories (Labels, Hangtags, Trims, Zippers, Buttons)
                        </option>
                        <option value="Luxury Packaging (Gift Boxes, Paper Bags, Rigid Setup)">
                          Luxury Packaging (Gift Boxes, Paper Bags, Rigid Setup)
                        </option>
                        <option value="Custom Prototyping & Sampling Run">
                          Custom Prototyping &amp; Sampling Run
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-extrabold uppercase tracking-wider text-charcoal mb-1.5">
                        Project Specifications &amp; Requirements *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={projectDetails}
                        onChange={(e) => setProjectDetails(e.target.value)}
                        placeholder="Please detail your required quantities, target delivery date, fabric composition, label density, or packaging specifications..."
                        className="w-full bg-offwhite border border-charcoal/20 focus:border-orange focus:bg-white rounded-sm p-4 text-sm text-charcoal outline-none transition-colors font-medium resize-y"
                      />
                    </div>

                    {/* Tech Pack / Artwork Attachment */}
                    <div>
                      <label className="block text-xs font-heading font-extrabold uppercase tracking-wider text-charcoal mb-1.5">
                        Attach Tech Pack, Design or Artwork (Optional)
                      </label>
                      <label className="border-2 border-dashed border-charcoal/20 hover:border-orange rounded-sm p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-offwhite hover:bg-offwhite-alt/60">
                        <UploadCloud className="w-8 h-8 text-orange mb-2" />
                        <span className="text-xs font-heading font-bold text-charcoal">
                          {fileName ? fileName : "Click to select tech pack or artwork file"}
                        </span>
                        <span className="text-[11px] text-grey mt-1">
                          Accepts PDF, AI, ZIP, CAD, PNG, JPG (Max 50MB)
                        </span>
                        <input
                          type="file"
                          onChange={handleFileChange}
                          className="hidden"
                          accept=".pdf,.ai,.zip,.png,.jpg,.jpeg,.dxf"
                        />
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-orange hover:bg-orange-hover text-white py-4 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 shadow-xl hover:shadow-orange/30 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Transmitting Project Brief...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit B2B Project Brief</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Dhaka Facilities & Telemetry Column (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-charcoal text-offwhite p-8 rounded-sm shadow-xl space-y-6 border border-white/10 bg-fabric-oxford-dark">
                <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block">
                  Official Brochure Contact Coordinates
                </span>
                <h3 className="text-2xl font-heading font-black uppercase text-white">
                  Texpart Design &amp; Packaging
                </h3>

                <div className="space-y-4 text-xs text-beige-light border-t border-white/10 pt-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white uppercase font-heading">
                        Head Office &amp; Facilities
                      </strong>
                      <span className="text-grey-light">
                        263, Fakirapool, Motijheel, Dhaka, Bangladesh
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white uppercase font-heading">
                        Official Email
                      </strong>
                      <span className="text-grey-light">texpartdesign@gmail.com</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="w-4 h-4 text-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white uppercase font-heading">
                        Official Website
                      </strong>
                      <span className="text-grey-light">www.texpartdesign.com</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white uppercase font-heading">
                        Phone &bull; WhatsApp Merchandising
                      </strong>
                      <span className="text-grey-light">+880 161 308 4465 / +880 171 308 4465</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white uppercase font-heading">
                        Production Operating Hours
                      </strong>
                      <span className="text-grey-light">
                        Saturday &ndash; Thursday: 08:30 &ndash; 18:30 (BST)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
