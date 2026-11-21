"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  Package,
} from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import { BRAND_INFO } from "@/data/siteNavigation";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanComment = comment.replace(/<[^>]*>/g, "").trim();
    if (!cleanComment) {
      setCommentError(true);
      return;
    }
    setCommentError(false);
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          comment,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit inquiry");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Contact form error:", err);
      setSubmitError(err.message || "Failed to submit inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] text-[#0A2540] min-h-screen">
      {/* Header Banner */}
      <section className="pt-24 sm:pt-28 pb-14 sm:pb-16 bg-gradient-to-r from-[#061730] via-[#0A2540] to-[#003B73] text-white overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black uppercase tracking-tight text-white leading-tight">
              Connect With <br className="hidden sm:inline" />
              <span className="text-blue-400">Texpart Manufacturing</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              DESIGN &bull; DEVELOP &bull; PRODUCE &bull; PACK &bull; DELIVER &mdash; Our merchandising and production teams in Motijheel, Dhaka are available to discuss your apparel trims, offset printing, and packaging solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Contact Form & Corporate Info */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Send a Message Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white p-6 sm:p-8 rounded-[4px] border border-slate-200 shadow-sm">
                <div className="mb-6 space-y-1 pb-4 border-b border-slate-100">
                  <h2 className="text-xl sm:text-2xl font-heading font-black uppercase tracking-tight text-[#0A2540]">
                    Get In Touch
                  </h2>
                  <p className="text-xs text-slate-500 font-normal">
                    Have an inquiry about commercial printing, labels, rigid boxes, or promotional items? Fill in the details below.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="p-8 bg-blue-50 border border-blue-200 rounded-[4px] text-center space-y-4">
                    <div className="w-14 h-14 rounded-[4px] bg-[#0066CC] text-white flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-heading font-bold uppercase text-[#0A2540]">
                      Inquiry Received Successfully
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                      Thank you, <strong>{name || "valued partner"}</strong>. Your message has been routed to our technical merchandising team in Dhaka. We will review your inquiry and reach out via <strong>{email || phone}</strong> shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setName("");
                        setPhone("");
                        setEmail("");
                        setComment("");
                      }}
                      className="px-6 py-2.5 rounded-[4px] bg-[#0066CC] text-white text-xs font-heading font-bold uppercase tracking-wider hover:bg-[#0052CC] transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                        Name <span className="text-[#0066CC]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name or company name"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                          Mobile / WhatsApp <span className="text-[#0066CC]">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+880 / WhatsApp"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
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
                          placeholder="corporate@brand.com"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                        Message / Specification Details <span className="text-[#0066CC]">*</span>
                      </label>
                      <RichTextEditor
                        value={comment}
                        onChange={(val) => {
                          setComment(val);
                          if (commentError && val.replace(/<[^>]*>/g, "").trim()) {
                            setCommentError(false);
                          }
                        }}
                        placeholder="Please describe your product requirement, target quantities, accessories specifications, or inquiry details..."
                        minHeight="160px"
                      />
                      {commentError && (
                        <p className="text-[11px] text-rose-500 mt-1">
                          Please enter your message before sending.
                        </p>
                      )}
                    </div>

                    {submitError && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-[4px]">
                        {submitError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-[4px] bg-[#0066CC] hover:bg-[#0052CC] text-white font-heading text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Sending Message...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column: ONLY ONE Unified Contact & Merchandising Box */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-slate-200 p-6 sm:p-7 rounded-[4px] shadow-sm space-y-6">
                {/* Header */}
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-[11px] font-heading font-bold uppercase tracking-widest text-[#0066CC] block mb-1">
                    Direct Merchandising Desk
                  </span>
                  <h3 className="text-lg sm:text-xl font-heading font-black uppercase text-[#0A2540]">
                    Contact Coordinates
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Get in direct touch with our Dhaka headquarters and merchandising team.
                  </p>
                </div>

                {/* 5 Coordinates Items */}
                <div className="space-y-4 text-xs text-slate-600">
                  {/* 1. Office Address */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-[4px] bg-blue-50 text-[#0066CC] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-[#0A2540] block font-heading font-bold uppercase text-[11px] tracking-wider mb-0.5">
                        Office Address
                      </strong>
                      <span className="leading-relaxed">
                        {BRAND_INFO.contact.address}
                      </span>
                      <span className="block text-[11px] text-slate-400 mt-0.5">
                        Production: Fakirapool &amp; Tejgaon Industrial Area, Dhaka
                      </span>
                    </div>
                  </div>

                  {/* 2. Mobile */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-[4px] bg-blue-50 text-[#0066CC] flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-[#0A2540] block font-heading font-bold uppercase text-[11px] tracking-wider mb-0.5">
                        Mobile
                      </strong>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs">
                        <a href="tel:+8801711234567" className="text-[#0066CC] hover:underline font-semibold">
                          +880 1711-234567
                        </a>
                        <span className="text-slate-300">|</span>
                        <a href="tel:+8801613084465" className="text-[#0066CC] hover:underline font-semibold">
                          +880 1613-084465
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* 3. WhatsApp */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-[4px] bg-blue-50 text-[#0066CC] flex items-center justify-center shrink-0 mt-0.5">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <strong className="text-[#0A2540] block font-heading font-bold uppercase text-[11px] tracking-wider mb-0.5">
                        WhatsApp
                      </strong>
                      <a
                        href={BRAND_INFO.contact.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#0066CC] hover:underline font-semibold font-mono"
                      >
                        <span>+880 1711-234567</span>
                      </a>
                    </div>
                  </div>

                  {/* 4. Email */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-[4px] bg-blue-50 text-[#0066CC] flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-[#0A2540] block font-heading font-bold uppercase text-[11px] tracking-wider mb-0.5">
                        Email
                      </strong>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-x-3 gap-y-1">
                        <a href={`mailto:${BRAND_INFO.contact.email}`} className="text-[#0066CC] hover:underline font-medium">
                          {BRAND_INFO.contact.email}
                        </a>
                        <span className="hidden sm:inline text-slate-300">|</span>
                        <a href={`mailto:${BRAND_INFO.contact.emailSecondary}`} className="text-[#0066CC] hover:underline font-medium">
                          {BRAND_INFO.contact.emailSecondary}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* 5. Business Hours */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-[4px] bg-blue-50 text-[#0066CC] flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-[#0A2540] block font-heading font-bold uppercase text-[11px] tracking-wider mb-0.5">
                        Business Hours
                      </strong>
                      <span className="leading-relaxed">
                        {BRAND_INFO.contact.businessHours}
                      </span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Chat CTA Button */}
                <div className="pt-2 border-t border-slate-100">
                  <a
                    href={BRAND_INFO.contact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-[4px] bg-[#0066CC] hover:bg-[#0052CC] text-white text-xs font-heading font-bold uppercase tracking-wider transition-colors shadow-sm"
                  >
                    <span>Chat on WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Google Map Section */}
          <div className="mt-12 bg-white border border-slate-200 rounded-[4px] overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0066CC]" />
                <span className="font-heading font-bold text-xs uppercase tracking-wider text-[#0A2540]">
                  Google Map Location &bull; 263 Fakirapool, Motijheel, Dhaka
                </span>
              </div>
              <a
                href="https://maps.google.com/?q=263+Fakirapool+Motijheel+Dhaka"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#0066CC] hover:underline font-semibold"
              >
                Open in Google Maps &rarr;
              </a>
            </div>
            <div className="w-full h-80 sm:h-96">
              <iframe
                title="Texpart Motijheel Office Location Map"
                src={BRAND_INFO.contact.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
