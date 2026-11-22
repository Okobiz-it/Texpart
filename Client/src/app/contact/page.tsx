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
  Globe,
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
      <section className="pt-32 sm:pt-36 pb-14 sm:pb-16 bg-gradient-to-r from-[#061730] via-[#0A2540] to-[#003B73] text-white overflow-hidden border-b border-white/10">
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
                  <h3 className="text-lg sm:text-xl font-heading font-black uppercase text-[#0A2540]">
                    &ldquo;texpart design &amp; accessories&rdquo;
                  </h3>
                  <p className="text-[11px] font-semibold text-slate-500 mt-1 leading-snug">
                    Commercial Printing | Garments Accessories | Packaging Solutions | Promotional Products
                  </p>
                </div>

                {/* Key Leadership / Proprietor Card */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-[4px] p-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-semibold">
                      Key Contact
                    </span>
                    <h4 className="text-sm font-heading font-black text-[#0A2540] uppercase tracking-wide">
                      Tarkik HASAN
                    </h4>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-[4px] bg-blue-100/70 text-[#0066CC] text-[11px] font-heading font-bold uppercase tracking-wider border border-blue-200/60">
                    Proprietor
                  </span>
                </div>

                {/* Coordinates Items */}
                <div className="space-y-4 text-xs text-slate-600">
                  {/* 1. Office / Factory Address */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-[4px] bg-blue-50 text-[#0066CC] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-[#0A2540] block font-heading font-bold uppercase text-[11px] tracking-wider mb-0.5">
                        Office / Factory
                      </strong>
                      <span className="leading-relaxed block">
                        119, Arambagh, Motijheel
                      </span>
                      <span className="leading-relaxed block text-slate-500">
                        Dhaka-1000, Bangladesh
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
                      <a href="tel:+8801973084465" className="text-[#0066CC] hover:underline font-semibold font-mono text-xs">
                        +880 197 308 4465
                      </a>
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
                        href="https://wa.me/8801713084465"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#0066CC] hover:underline font-semibold font-mono"
                      >
                        <span>+880 171 308 4465</span>
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
                      <a href="mailto:info@texpartdesign.com" className="text-[#0066CC] hover:underline font-medium">
                        info@texpartdesign.com
                      </a>
                    </div>
                  </div>

                  {/* 5. Website */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-[4px] bg-blue-50 text-[#0066CC] flex items-center justify-center shrink-0 mt-0.5">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-[#0A2540] block font-heading font-bold uppercase text-[11px] tracking-wider mb-0.5">
                        Website
                      </strong>
                      <a
                        href="https://www.texpartdesign.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0066CC] hover:underline font-medium"
                      >
                        www.texpartdesign.com
                      </a>
                    </div>
                  </div>

                  {/* 6. Business Hours */}
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
                    href="https://wa.me/8801713084465"
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
                  Google Map Location &bull; 119 Arambagh, Motijheel, Dhaka
                </span>
              </div>
              <a
                href="https://maps.google.com/?q=119+Arambagh+Motijheel+Dhaka"
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
