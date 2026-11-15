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
    <div className="pt-20">
      {/* Header Banner */}
      <section className="py-20 sm:py-28 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block">
              Inquiry &bull; Dhaka Headquarters
            </span>
            <h1 className="text-4xl sm:text-6xl font-heading font-black uppercase tracking-tight text-white leading-tight">
              Let&apos;s Discuss <br />
              <span className="text-orange">Your Next Project.</span>
            </h1>
            <p className="text-base sm:text-lg text-beige-light leading-relaxed font-light pt-2">
              Whether you need complete apparel development or customized commercial printing, we&apos;d love to hear from you. Our Dhaka merchandising and engineering teams are ready to assist.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content: Form & Details Grid */}
      <section className="py-20 sm:py-28 bg-offwhite text-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Contact Information & Map (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block">
                  Direct Factory Liaison
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase text-charcoal">
                  Manufacturing Hub &amp; Executive Offices
                </h2>
                <p className="text-sm text-grey-dark leading-relaxed">
                  Located in Dhaka&apos;s primary industrial garments manufacturing and printing cluster, facilitating rapid logistics and on-site buyer inspections.
                </p>
              </div>

              {/* Contact Details List */}
              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3.5 p-4 bg-white rounded-sm border border-charcoal/10 shadow-sm">
                  <MapPin className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-extrabold uppercase text-charcoal text-xs mb-0.5">
                      Factory &amp; Corporate Address
                    </h4>
                    <p className="text-grey-dark text-xs leading-relaxed">
                      Plot 42, Tejgaon Industrial Area, Dhaka-1208, Bangladesh
                    </p>
                    <p className="text-[11px] text-grey mt-1 font-mono">
                      (Uttara Garments Zone satellite facility available for scheduled buyer audits)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 bg-white rounded-sm border border-charcoal/10 shadow-sm">
                  <Phone className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-extrabold uppercase text-charcoal text-xs mb-0.5">
                      Direct Telephone &amp; WhatsApp
                    </h4>
                    <p className="text-grey-dark text-xs">
                      +880 1712 345678 (WhatsApp Business Active)
                    </p>
                    <p className="text-grey-dark text-xs">
                      +880 2 9876543 (Factory PBX)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 bg-white rounded-sm border border-charcoal/10 shadow-sm">
                  <Mail className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-extrabold uppercase text-charcoal text-xs mb-0.5">
                      Official Inquiries
                    </h4>
                    <p className="text-grey-dark text-xs">
                      inquiry@texpart.com
                    </p>
                    <p className="text-grey-dark text-xs">
                      production@texpart.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 bg-white rounded-sm border border-charcoal/10 shadow-sm">
                  <Clock className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-extrabold uppercase text-charcoal text-xs mb-0.5">
                      Operating Hours (Dhaka Local Time, GMT+6)
                    </h4>
                    <p className="text-grey-dark text-xs">
                      Saturday &ndash; Thursday: 9:00 AM &ndash; 7:00 PM
                    </p>
                    <p className="text-grey text-[11px]">
                      Friday: Weekly Facility Maintenance
                    </p>
                  </div>
                </div>
              </div>

              {/* Stylized Map Placeholder */}
              <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden bg-charcoal border border-charcoal/10 flex flex-col items-center justify-center p-6 text-center text-offwhite">
                <Globe className="w-8 h-8 text-orange mb-2" />
                <h4 className="font-heading font-bold uppercase text-xs tracking-wider">
                  Dhaka Industrial Zone Map Embed
                </h4>
                <p className="text-[11px] text-grey-light mt-1 max-w-xs">
                  Tejgaon &bull; Gulshan &bull; Airport Corridor &bull; Dhaka
                </p>
                <div className="mt-3 px-3 py-1 bg-white/10 rounded text-[10px] font-mono text-beige">
                  23.7644&deg; N, 90.3925&deg; E
                </div>
              </div>
            </div>

            {/* Right: Premium B2B Project Inquiry Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 sm:p-12 rounded-sm border border-charcoal/10 shadow-xl">
                {isSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-forest/10 text-forest rounded-full flex items-center justify-center mx-auto mb-2">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-heading font-black uppercase text-charcoal">
                      Inquiry Received Successfully!
                    </h3>
                    <p className="text-sm text-grey-dark max-w-md mx-auto leading-relaxed">
                      Thank you for contacting Texpart. Our merchandising division in Dhaka will review your project details and reach out within 24 hours.
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="bg-charcoal text-offwhite px-6 py-2.5 rounded-sm font-heading text-xs font-bold uppercase tracking-wider hover:bg-forest transition-colors"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block mb-1">
                        B2B Project Inquiry Form
                      </span>
                      <h3 className="text-2xl font-heading font-black uppercase text-charcoal">
                        Tell Us About Your Project
                      </h3>
                      <p className="text-xs text-grey-dark mt-1">
                        Provide preliminary quantities, design files, or specifications to expedite your quotation.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-charcoal mb-1.5">
                          Full Name <span className="text-orange">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Eleanor Vance"
                          className="w-full px-3.5 py-2.5 bg-offwhite-alt/30 border border-charcoal/20 rounded-sm text-sm focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-charcoal mb-1.5">
                          Company Name <span className="text-orange">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g. Nordic Apparel AS"
                          className="w-full px-3.5 py-2.5 bg-offwhite-alt/30 border border-charcoal/20 rounded-sm text-sm focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-charcoal mb-1.5">
                          Email Address <span className="text-orange">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="eleanor@nordicapparel.no"
                          className="w-full px-3.5 py-2.5 bg-offwhite-alt/30 border border-charcoal/20 rounded-sm text-sm focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-charcoal mb-1.5">
                          Phone / WhatsApp <span className="text-orange">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+47 22 12 34 56"
                          className="w-full px-3.5 py-2.5 bg-offwhite-alt/30 border border-charcoal/20 rounded-sm text-sm focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-charcoal mb-1.5">
                          Service Interested In <span className="text-orange">*</span>
                        </label>
                        <select
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-offwhite-alt/30 border border-charcoal/20 rounded-sm text-sm focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange font-medium"
                        >
                          <option value="Private Jobs — Apparel Manufacturing">
                            Private Jobs &mdash; Apparel Development &amp; Manufacturing
                          </option>
                          <option value="Commercial Jobs — Printing & Promotional">
                            Commercial Jobs &mdash; Commercial Printing &amp; Packaging
                          </option>
                          <option value="Apparel Accessories & Trims">
                            Apparel Accessories &amp; Trims (Labels, Hangtags, Zippers, Patches)
                          </option>
                          <option value="Both / Comprehensive Partnership">
                            Both / Comprehensive Full-Package Partnership
                          </option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-charcoal mb-1.5">
                          Project Details &amp; Quantities <span className="text-orange">*</span>
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={projectDetails}
                          onChange={(e) => setProjectDetails(e.target.value)}
                          placeholder="Describe your product requirements, target materials, estimated order scale (e.g. 5,000 pcs), and required delivery target..."
                          className="w-full px-3.5 py-2.5 bg-offwhite-alt/30 border border-charcoal/20 rounded-sm text-sm focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange"
                        />
                      </div>

                      {/* Optional File Upload */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-charcoal mb-1.5">
                          Upload Design / Tech Pack / Artwork (Optional)
                        </label>
                        <label className="border-2 border-dashed border-charcoal/20 hover:border-orange rounded-sm p-4 text-center cursor-pointer flex flex-col items-center justify-center gap-1.5 bg-offwhite/50 transition-colors">
                          <UploadCloud className="w-5 h-5 text-orange" />
                          <span className="text-xs font-medium text-grey-dark">
                            Click to attach PDF, AI, EPS, ZIP, or high-res images (Max 50MB)
                          </span>
                          <input
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                        {fileName && (
                          <div className="mt-2 text-xs font-semibold text-forest flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5" />
                            <span>Attached: {fileName}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-charcoal/10">
                      <span className="text-[11px] text-grey">
                        Direct B2B Manufacturing Inquiry &bull; Dhaka Facilities
                      </span>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-orange hover:bg-orange-hover text-white px-8 py-3.5 rounded-sm font-heading text-xs font-extrabold uppercase tracking-wider transition-all shadow-lg hover:shadow-orange/30 disabled:opacity-60 inline-flex items-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Submitting Inquiry...
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            Send Inquiry
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

