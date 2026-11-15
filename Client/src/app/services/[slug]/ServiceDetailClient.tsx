"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ServiceDetail } from "@/data/services";
import { useQuote } from "@/context/QuoteContext";
import {
  Play,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Clock,
  Sparkles,
  Maximize2,
  X,
  FileCheck,
} from "lucide-react";

interface ServiceDetailClientProps {
  service: ServiceDetail;
}

export default function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  const { openQuote, openLightbox } = useQuote();
  const [activeMediaTab, setActiveMediaTab] = useState<"all" | "photos" | "videos">("all");
  const [playingVideo, setPlayingVideo] = useState<{
    title: string;
    caption: string;
    thumbnail: string;
  } | null>(null);

  const isPrivate = service.slug === "private-jobs";

  return (
    <div className="bg-offwhite min-h-screen text-charcoal">
      {/* =================================================================
          1. BANNER: CINEMATIC EDITORIAL HERO WITH FABRIC TWILL WEAVE
          (FLUSH TO TOP UNDER NAV WITH ZERO GAP)
          ================================================================= */}
      <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-36 bg-charcoal text-white overflow-hidden bg-fabric-twill-dark">
        {/* Background Image with Layered Fabric Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            className="object-cover opacity-25 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-charcoal/50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-forest/30 via-transparent to-transparent opacity-60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-heading font-medium text-grey-light mb-8 uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-grey" />
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-grey" />
            <span className="text-orange">{service.divisionLabel}</span>
          </nav>

          <div className="max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-sm text-xs font-heading font-extrabold uppercase tracking-widest ${
                isPrivate ? "bg-orange text-white" : "bg-cyan text-white"
              }`}>
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                {service.divisionLabel}
              </span>
              <span className="text-xs font-heading uppercase tracking-widest text-beige border border-white/15 px-3 py-1 rounded-sm backdrop-blur-md">
                {service.badge}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black uppercase tracking-tight text-white leading-tight">
              {service.headline}
            </h1>

            <p className="text-base sm:text-xl text-beige-light/90 max-w-3xl font-light leading-relaxed">
              {service.subtitle} &mdash; {service.description}
            </p>

            {/* Quick CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => openQuote(service.title, service.divisionLabel)}
                className={`px-8 py-4 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest inline-flex items-center gap-3 transition-all duration-300 shadow-xl hover:-translate-y-0.5 text-white ${
                  isPrivate
                    ? "bg-orange hover:bg-orange-hover shadow-orange/20"
                    : "bg-cyan hover:bg-blue shadow-cyan/20"
                }`}
              >
                Request Quotation For {service.divisionLabel}
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#media-gallery"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-4 rounded-sm font-heading text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all"
              >
                View Factory Photos &amp; Videos
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          2. PHOTOS & VIDEOS SECTION: FACTORY FLOOR TELEMETRY
          (As requested: "first few photoes and videos of that services")
          ================================================================= */}
      <section id="media-gallery" className="py-20 sm:py-28 bg-offwhite border-b border-charcoal/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block mb-2">
                Production Floor Documentation
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-tight text-charcoal">
                Photos &amp; Video Demonstrations.
              </h2>
              <p className="text-sm text-grey-dark max-w-xl mt-2 font-light">
                Inspect authentic visual footage and high-definition photography capturing machinery in action, seam construction, color management, and packaging workflows.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex gap-2 bg-charcoal/5 p-1 rounded-sm self-start md:self-auto">
              <button
                onClick={() => setActiveMediaTab("all")}
                className={`px-4 py-2 rounded-sm text-xs font-heading font-bold uppercase tracking-wider transition-all ${
                  activeMediaTab === "all"
                    ? "bg-charcoal text-white shadow-sm"
                    : "text-grey-dark hover:text-charcoal"
                }`}
              >
                All Media ({service.videos.length + service.photos.length})
              </button>
              <button
                onClick={() => setActiveMediaTab("videos")}
                className={`px-4 py-2 rounded-sm text-xs font-heading font-bold uppercase tracking-wider transition-all ${
                  activeMediaTab === "videos"
                    ? "bg-charcoal text-white shadow-sm"
                    : "text-grey-dark hover:text-charcoal"
                }`}
              >
                Video Feeds ({service.videos.length})
              </button>
              <button
                onClick={() => setActiveMediaTab("photos")}
                className={`px-4 py-2 rounded-sm text-xs font-heading font-bold uppercase tracking-wider transition-all ${
                  activeMediaTab === "photos"
                    ? "bg-charcoal text-white shadow-sm"
                    : "text-grey-dark hover:text-charcoal"
                }`}
              >
                Photo Gallery ({service.photos.length})
              </button>
            </div>
          </div>

          {/* Videos Grid */}
          {(activeMediaTab === "all" || activeMediaTab === "videos") && (
            <div className="mb-14">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-orange animate-pulse" />
                <h3 className="text-xs font-heading font-extrabold uppercase tracking-widest text-charcoal">
                  Featured Video Footage &bull; Machinery In Action
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {service.videos.map((vid, idx) => (
                  <div
                    key={idx}
                    onClick={() => setPlayingVideo(vid)}
                    className="group relative bg-charcoal rounded-sm overflow-hidden shadow-lg border border-charcoal/10 cursor-pointer hover:border-orange transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={vid.thumbnail}
                        alt={vid.title}
                        fill
                        className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-95 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-90" />

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-orange text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-orange-hover transition-transform duration-300">
                          <Play className="w-6 h-6 fill-current translate-x-0.5" />
                        </div>
                      </div>

                      {/* Duration Tag */}
                      <div className="absolute top-3 right-3 bg-charcoal/90 text-white text-[11px] font-mono px-2 py-0.5 rounded-sm">
                        {vid.duration}
                      </div>

                      {/* Video Category Badge */}
                      <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md text-white text-[10px] font-heading font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-sm">
                        {vid.videoType}
                      </div>
                    </div>

                    <div className="p-5">
                      <h4 className="text-base font-heading font-black uppercase text-white group-hover:text-orange transition-colors">
                        {vid.title}
                      </h4>
                      <p className="text-xs text-grey-light mt-1.5 leading-relaxed line-clamp-2">
                        {vid.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Photos Grid */}
          {(activeMediaTab === "all" || activeMediaTab === "photos") && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-forest" />
                <h3 className="text-xs font-heading font-extrabold uppercase tracking-widest text-charcoal">
                  High-Resolution Facility Photography
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.photos.map((photo, idx) => (
                  <div
                    key={idx}
                    onClick={() =>
                      openLightbox({
                        src: photo.url,
                        title: photo.title,
                        meta: `${service.title} • ${photo.tag}`,
                      })
                    }
                    className="group relative aspect-[4/3] rounded-sm overflow-hidden bg-charcoal cursor-pointer border border-charcoal/10 hover:border-orange shadow-sm transition-all duration-300 hover:-translate-y-1"
                  >
                    <Image
                      src={photo.url}
                      alt={photo.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-orange">
                          {photo.tag}
                        </span>
                        <Maximize2 className="w-4 h-4 text-white/80" />
                      </div>
                      <h4 className="text-base font-heading font-bold uppercase leading-tight text-white">
                        {photo.title}
                      </h4>
                      <p className="text-xs text-grey-light mt-1 line-clamp-2">
                        {photo.caption}
                      </p>
                    </div>

                    <div className="absolute top-3 left-3 bg-charcoal/80 text-white text-[10px] font-heading font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">
                      {photo.tag}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =================================================================
          3. TEXTS: DETAILED SERVICE EXPLANATION & CAPABILITIES
          (As requested: "then texts")
          ================================================================= */}
      <section className="py-20 sm:py-28 bg-white border-b border-charcoal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Narrative Text (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block">
                Manufacturing Philosophy &amp; Scope
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-tight text-charcoal">
                How We Deliver Perfection At Scale.
              </h2>

              <div className="space-y-4 text-base text-grey-dark leading-relaxed font-light">
                {service.longDescription.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* 4 Core Pillars */}
              <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-charcoal/10">
                {service.capabilities.map((cap, idx) => (
                  <div key={idx} className="bg-offwhite p-5 rounded-sm border border-charcoal/10 space-y-2">
                    {cap.metric && (
                      <span className="text-xs font-mono font-bold text-orange block">
                        CAPACITY: {cap.metric}
                      </span>
                    )}
                    <h4 className="text-base font-heading font-black uppercase text-charcoal">
                      {cap.title}
                    </h4>
                    <p className="text-xs text-grey-dark leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Technical Specs Sidebar (5 cols) */}
            <div className="lg:col-span-5 bg-offwhite p-8 rounded-sm border-2 border-charcoal/10 space-y-6">
              <div className="flex items-center gap-2 border-b border-charcoal/10 pb-4">
                <ShieldCheck className="w-5 h-5 text-orange" />
                <h3 className="text-base font-heading font-extrabold uppercase tracking-wider text-charcoal">
                  Technical Specifications
                </h3>
              </div>

              <dl className="space-y-4 text-xs">
                {service.specifications.map((spec, idx) => (
                  <div key={idx} className="border-b border-charcoal/10 pb-3">
                    <dt className="text-grey-dark font-medium uppercase tracking-wider block mb-1">
                      {spec.label}
                    </dt>
                    <dd className="text-charcoal font-heading font-bold text-sm">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="pt-2">
                <button
                  onClick={() => openQuote(service.title, service.divisionLabel)}
                  className="w-full bg-charcoal hover:bg-forest text-white py-3.5 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest text-center transition-colors"
                >
                  Consult Specifications Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          4. WORKFLOW PROCESS PIPELINE (6-STEP TIMELINE)
          ================================================================= */}
      <section className="py-20 sm:py-28 bg-offwhite border-b border-charcoal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 space-y-3">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block">
              Step-by-Step Execution
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-tight text-charcoal">
              Production Lifecycle &amp; Milestones.
            </h2>
            <p className="text-sm text-grey-dark font-light">
              Every order follows this disciplined, milestone-driven workflow ensuring transparency, sample precision, and zero defect leakage before shipping.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.workflowSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white p-7 rounded-sm border border-charcoal/10 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-extrabold text-orange">
                      STAGE {step.step}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-charcoal/5 text-charcoal text-xs font-heading font-bold flex items-center justify-center">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-heading font-black uppercase text-charcoal">
                    {step.name}
                  </h3>
                  <p className="text-xs text-grey-dark leading-relaxed mt-2">
                    {step.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-charcoal/10">
                  <span className="text-[10px] font-heading font-extrabold uppercase tracking-wider text-grey block mb-2">
                    Key Deliverables:
                  </span>
                  <ul className="space-y-1.5 text-xs text-charcoal/90">
                    {step.deliverables.map((deliv, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          5. FAQS
          ================================================================= */}
      <section className="py-20 sm:py-24 bg-white border-b border-charcoal/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block">
              Clear Answers
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-charcoal">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="bg-offwhite p-6 rounded-sm border border-charcoal/10">
                <h4 className="text-base font-heading font-bold uppercase text-charcoal mb-2">
                  {faq.q}
                </h4>
                <p className="text-sm text-grey-dark leading-relaxed font-light">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          6. PROMINENT QUOTATION BUTTON / HIGH-IMPACT QUOTATION BANNER
          (TEXTURE VARIANT: OXFORD BASKETWEAVE DARK WITH STITCH BORDER)
          ================================================================= */}
      <section className="py-20 sm:py-32 bg-charcoal text-white relative overflow-hidden bg-fabric-oxford-dark">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Inner Dashed Stitch Border Container (Matching the user's reference image!) */}
          <div className="border-2 border-dashed border-white/20 p-8 sm:p-14 lg:p-16 rounded-sm bg-charcoal/80 backdrop-blur-sm text-center space-y-6 shadow-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-widest text-orange">
              <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
              LET&apos;S CREATE. LET&apos;S DEVELOP. LET&apos;S DELIVER.
            </span>

            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-white leading-tight">
              Ready to Produce With {service.divisionLabel}?
            </h2>

            <p className="text-sm sm:text-lg text-beige-light/90 max-w-2xl mx-auto font-light leading-relaxed">
              &ldquo;We co-operate you build a strong identity for your brand with the perfect accessories and packaging.&rdquo; &mdash; Our Motijheel, Dhaka manufacturing team is equipped to fulfill your requirements.
            </p>

            {/* Prominent Quotation Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => openQuote(service.title, service.divisionLabel)}
                className={`w-full sm:w-auto px-10 py-5 rounded-sm font-heading text-sm font-black uppercase tracking-widest inline-flex items-center justify-center gap-3 transition-all duration-300 shadow-2xl hover:scale-105 text-white ${
                  isPrivate
                    ? "bg-orange hover:bg-orange-hover shadow-orange/30"
                    : "bg-cyan hover:bg-blue shadow-cyan/30"
                }`}
              >
                <span>Request Quotation For {service.title.split("—")[0].trim()}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <Link
                href="/contact"
                className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border border-white/30 px-8 py-5 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest inline-flex items-center justify-center gap-2 transition-all"
              >
                Contact Sales Team Directly
              </Link>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 text-xs text-grey-light font-mono">
              <span>📍 263, Fakirapool, Motijheel, Dhaka</span>
              <span>📞 +880 161 308 4465</span>
              <span>✉️ texpartdesign@gmail.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* Video Playback Modal (Simulated Video Experience) */}
      {playingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-charcoal rounded-sm overflow-hidden border border-white/10 shadow-2xl">
            {/* Top Bar */}
            <div className="p-4 bg-charcoal border-b border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-orange block">
                  Production Telemetry Feed
                </span>
                <h4 className="text-sm font-heading font-bold text-white uppercase">
                  {playingVideo.title}
                </h4>
              </div>
              <button
                onClick={() => setPlayingVideo(null)}
                className="text-white hover:text-orange p-1"
                aria-label="Close Video Player"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Video Player Display */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              <Image
                src={playingVideo.thumbnail}
                alt={playingVideo.title}
                fill
                className="object-cover opacity-70"
              />
              <div className="relative z-10 text-center p-6 max-w-md space-y-4">
                <div className="w-16 h-16 rounded-full bg-orange/90 text-white flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                  <Play className="w-8 h-8 fill-current translate-x-0.5" />
                </div>
                <p className="text-xs text-beige-light leading-relaxed">
                  {playingVideo.caption}
                </p>
                <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-orange bg-charcoal/80 px-3 py-1 rounded-sm border border-white/10">
                  Direct Factory Machine Footage &bull; Dhaka Facilities
                </span>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="p-4 bg-charcoal border-t border-white/10 flex items-center justify-between text-xs text-grey-light">
              <span>Industrial Telemetry &bull; Ultra-HD 60FPS</span>
              <button
                onClick={() => {
                  setPlayingVideo(null);
                  openQuote(playingVideo.title, service.divisionLabel);
                }}
                className="bg-orange hover:bg-orange-hover text-white text-[11px] font-heading font-bold uppercase tracking-wider px-4 py-2 rounded-sm transition-colors"
              >
                Inquire About This Process
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

