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
} from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";

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
    <div className="bg-white text-[#0A2540]">
      {/* Header Banner (Generous padding, zero squeezing) */}
      <section className="pt-32 sm:pt-36 pb-14 sm:pb-16 bg-gradient-to-r from-[#061730] via-[#0A2540] to-[#003B73] text-white overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black uppercase tracking-tight text-white leading-tight">
              Let&apos;s Discuss <br />
              <span className="text-blue-400">
                Your Next Project.
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light pt-1">
              &ldquo;We co-operate you build a strong identity for your brand with the perfect accessories and packaging.&rdquo; &mdash; Our Motijheel merchandising and engineering teams are ready to fulfill your orders.
            </p>
          </div>
        </div>
      </section>

      {/* Main Get In Touch Section (Form on Left, Official Coordinates on Right) */}
      <section className="py-8 sm:py-12 bg-white text-[#0A2540]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: GET IN TOUCH Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white p-6 sm:p-8 rounded-[4px] border border-slate-200 shadow-sm">
                <div className="mb-6 space-y-1">
                  <h2 className="text-xl sm:text-2xl font-heading font-black uppercase tracking-tight text-[#0A2540]">
                    Get In Touch
                  </h2>
                  <p className="text-xs text-slate-500 font-normal">
                    Leave your project details and contact info below. Our team in Motijheel, Dhaka will contact you within 24 hours.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="p-6 bg-blue-50 border border-blue-200 rounded-[4px] text-center space-y-3">
                    <div className="w-12 h-12 rounded-[4px] bg-[#0066CC] text-white flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-base sm:text-lg font-heading font-bold uppercase text-[#0A2540]">
                      Inquiry Received Successfully
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                      Thank you, <strong>{name || "valued partner"}</strong>. Your message has been routed to our technical merchandising team in Dhaka. We will review your requirements and reach out via <strong>{email || phone}</strong> shortly.
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
                      className="px-5 py-2 rounded-[4px] bg-[#0066CC] text-white text-xs font-heading font-bold uppercase tracking-wider hover:bg-[#0052CC] transition-colors"
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
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] focus:ring-1 focus:ring-[#0066CC] transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                          Phone / WhatsApp <span className="text-[#0066CC]">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+880 161 308 4465"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] focus:ring-1 focus:ring-[#0066CC] transition-all"
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
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] focus:ring-1 focus:ring-[#0066CC] transition-all"
                        />
                      </div>
                    </div>

                    {/* Auto-growing Comment / Message with Rich Text Editor */}
                    <div>
                      <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                        Comment / Message <span className="text-[#0066CC]">*</span>
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
                        minHeight="180px"
                      />
                      {commentError && (
                        <p className="text-[11px] text-red-500 mt-1">
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
                      className="w-full py-3 rounded-[4px] bg-[#0066CC] hover:bg-[#0052CC] text-white font-heading text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60"
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

            {/* Right: Coordinates Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-50 border border-slate-200 p-6 sm:p-7 rounded-[4px] space-y-5 shadow-sm">
                <div>
                  <span className="text-[11px] font-heading font-bold uppercase tracking-widest text-[#0066CC] block mb-1">
                    Direct Contact
                  </span>
                  <h3 className="text-base sm:text-lg font-heading font-black uppercase text-[#0A2540]">
                    Office &amp; Factory Coordinates
                  </h3>
                </div>

                <div className="space-y-4 text-xs text-slate-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#0A2540] block font-semibold">Office &amp; Factory</strong>
                      <span>263, Fakirapool, Motijheel, Dhaka, Bangladesh</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#0A2540] block font-semibold">Direct Hotline</strong>
                      <span>+880 161 308 4465 &bull; +880 171 308 4465</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#0A2540] block font-semibold">Email Correspondence</strong>
                      <span>info@texpart.com &bull; texpart.bd@gmail.com</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#0A2540] block font-semibold">Working Hours</strong>
                      <span>Saturday &ndash; Thursday: 9:00 AM &ndash; 7:00 PM (BST)</span>
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
