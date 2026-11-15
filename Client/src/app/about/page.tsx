"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuote } from "@/context/QuoteContext";
import {
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
  Award,
  Layers,
  Scissors,
  Printer,
  Package,
  ArrowRight,
  CheckCircle2,
  Handshake,
  Lightbulb,
  Search,
  PenTool,
  Factory,
  Box,
  Check,
  MapPin,
  Phone,
  Mail,
  Globe,
} from "lucide-react";

export default function AboutPage() {
  const { openQuote } = useQuote();

  return (
    <div className="bg-offwhite min-h-screen text-charcoal">
      {/* =================================================================
          HERO: EDITORIAL WITH DIAGONAL TWILL CLOTH THREAD TEXTURE
          (FLUSH TO TOP WITH ZERO GAP UNDER NAV)
          ================================================================= */}
      <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-36 bg-charcoal text-white overflow-hidden bg-fabric-twill-dark">
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/90 to-charcoal/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-forest/30 via-transparent to-transparent opacity-60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <h1 className="text-4xl sm:text-6xl font-heading font-black uppercase tracking-tight text-white leading-tight">
              Built on Craftsmanship. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange via-beige to-white">
                Driven by Quality.
              </span>
            </h1>

            {/* Official Slogan from PDF Brochure */}
            <div className="inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-widest text-orange border-l-2 border-orange pl-3">
              LET&apos;S CREATE. LET&apos;S DEVELOP. LET&apos;S DELIVER.
            </div>

            <p className="text-base sm:text-lg text-beige-light leading-relaxed font-light pt-2">
              &ldquo;We co-operate you build a strong identity for your brand with the perfect accessories and packaging.&rdquo; &mdash; Operating from our Motijheel, Dhaka headquarters to serve international fashion houses and corporations worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* =================================================================
          1. COMPANY INTRODUCTION — ABOUT US (REWRITTEN CLEANLY)
          (TEXTURE VARIANT: LINEN WEAVE)
          ================================================================= */}
      <section className="py-20 sm:py-28 bg-offwhite text-charcoal bg-fabric-linen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div>
              <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block mb-2">
                About Us
              </span>
              <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-charcoal">
                About Texpart.
              </h2>
            </div>

            <div className="text-base sm:text-lg text-grey-dark leading-relaxed font-light space-y-6">
              <p>
                Headquartered at <strong>263, Fakirapool, Motijheel, Dhaka</strong>, Texpart is an international manufacturing and production partner bridging fashion innovation with industrial excellence in Bangladesh. Established to serve global fashion brands, independent fashion labels, and multinational corporations, we unite complete apparel manufacturing with precision commercial printing and luxury packaging under one integrated roof.
              </p>

              <p>
                Our operations are organized into two dedicated, world-class divisions designed to address the full product lifecycle:
              </p>

              <div className="border-l-2 border-orange pl-6 py-2 space-y-4 text-sm sm:text-base">
                <p>
                  <strong>Private Jobs &mdash; End-to-End Apparel Manufacturing:</strong> We take complete ownership from initial tech pack interpretation to finished, retail-ready garments. Our technical merchandisers and CAD pattern engineers manage prototype draping, physical fit sampling, lab-dip color formulation under strict D65 lighting standards, high-density computer-aided cutting, automated assembly stitching lines, seam sealing, and export carton consolidation across knitwear, activewear, and technical outerwear.
                </p>
                <p>
                  <strong>Commercial Jobs &mdash; Printing &amp; Brand Accessories:</strong> From initial brand concept to physical touchpoint, our commercial print division produces Swiss-loom high-density damask woven labels, FSC-certified hangtags, custom-cast metal zippers, jacquard elastics, luxury rigid presentation boxes with magnetic closures, folding retail cartons, and corporate print collateral on high-speed Heidelberg multi-color speedmaster presses.
                </p>
              </div>

              <p>
                At Texpart, quality is not a final checkpoint &mdash; it is engineered into every stage of the manufacturing process. Every production run undergoes rigorous multi-point in-line quality control adhering to <strong>AQL 1.5 standard export inspection</strong> benchmarks. We employ calibrated optical micrometer die-cutting, 100% industrial needle detection, seam tensile testing, and wash-fastness verification to ensure zero-defect compliance for international markets.
              </p>

              <p>
                We believe in ethical manufacturing, environmental sustainability, and responsible sourcing. Our materials comply with <strong>OEKO-TEX® Standard 100</strong> and <strong>GRS (Global Recycled Standard)</strong> criteria, utilizing recycled polyester fibers, organic cotton tapes, non-toxic soy-based printing inks, and responsibly harvested FSC paperboards.
              </p>

              <p>
                Guided by our foundational 3-i philosophy &mdash; <strong>iNTEGRITY</strong>, <strong>iNNOVATIVE</strong>, and <strong>iN-DEPTH</strong> &mdash; we eliminate intermediary brokerage markups with transparent bill-of-materials pricing, flexible minimum order quantities (MOQ) for emerging startups, and reliable on-time global logistics dispatch via FOB Chittagong Port or express air from Dhaka Shahjalal International Airport.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          2. THE THREE PILLARS OF EXCELLENCE (REDESIGNED 3-i LIKE HOMEPAGE)
          (TEXTURE VARIANT: OXFORD / BASKETWEAVE)
          ================================================================= */}
      <section className="py-20 sm:py-28 bg-offwhite border-y border-charcoal/10 relative bg-fabric-oxford">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-widest text-orange">
              <span className="w-1.5 h-1.5 rounded-full bg-orange" />
              The 3-i Manufacturing Philosophy
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-charcoal">
              THE THREE PILLARS OF EXCELLENCE.
            </h2>
            <p className="text-sm sm:text-base text-grey-dark font-light leading-relaxed">
              Every garment accessories order, printing press run, and packaging project at Texpart is steered by these three fundamental principles:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* 1. iNTEGRITY */}
            <div className="bg-white p-8 sm:p-10 rounded-sm border-2 border-charcoal/10 hover:border-orange shadow-lg flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 group">
              <div>
                {/* 1. FIRST: ICON */}
                <div className="w-16 h-16 rounded-sm bg-charcoal text-orange flex items-center justify-center border-2 border-dashed border-charcoal/20 shadow-md group-hover:bg-orange group-hover:text-white transition-all group-hover:scale-105 mb-6">
                  <Handshake className="w-8 h-8" />
                </div>

                {/* 2. NEXT: HEADLINE */}
                <span className="text-xs font-mono font-bold text-orange uppercase tracking-wider block mb-1">
                  PILLAR 01 &bull; HONESTY &amp; TRUST
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-charcoal">
                  iNTEGRITY
                </h3>
                <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-grey-dark mt-1">
                  Trust in Every Transaction
                </h4>

                {/* 3. NEXT: DESCRIPTION */}
                <p className="text-sm text-grey-dark leading-relaxed font-light border-t border-charcoal/10 pt-4 mt-4">
                  &ldquo;We believe in honesty, transparency and building long-term business relationships.&rdquo;
                </p>
                <p className="text-xs text-grey-dark leading-relaxed font-light mt-2">
                  Transparent open-book BOM costings, compliant factories, and ethical labor standards across every apparel cut and printed label run.
                </p>
              </div>

              <div className="text-xs text-charcoal font-medium space-y-2 pt-6 border-t border-charcoal/10 mt-6">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-forest flex-shrink-0" />
                  <span>Honest material composition grading</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-forest flex-shrink-0" />
                  <span>Transparent delivery milestones</span>
                </div>
              </div>
            </div>

            {/* 2. iNNOVATIVE */}
            <div className="bg-white p-8 sm:p-10 rounded-sm border-2 border-charcoal/10 hover:border-orange shadow-lg flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 group">
              <div>
                {/* 1. FIRST: ICON */}
                <div className="w-16 h-16 rounded-sm bg-charcoal text-orange flex items-center justify-center border-2 border-dashed border-charcoal/20 shadow-md group-hover:bg-orange group-hover:text-white transition-all group-hover:scale-105 mb-6">
                  <Lightbulb className="w-8 h-8" />
                </div>

                {/* 2. NEXT: HEADLINE */}
                <span className="text-xs font-mono font-bold text-orange uppercase tracking-wider block mb-1">
                  PILLAR 02 &bull; CREATIVE TECHNOLOGY
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-charcoal">
                  iNNOVATIVE
                </h3>
                <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-grey-dark mt-1">
                  Ideas That Add Value
                </h4>

                {/* 3. NEXT: DESCRIPTION */}
                <p className="text-sm text-grey-dark leading-relaxed font-light border-t border-charcoal/10 pt-4 mt-4">
                  &ldquo;We create modern, functional and creative solutions that make your brand stand out.&rdquo;
                </p>
                <p className="text-xs text-grey-dark leading-relaxed font-light mt-2">
                  Leveraging computer-aided design, 3D prototype draping, GRS recycled yarn innovations, and eco-friendly soy printing technologies.
                </p>
              </div>

              <div className="text-xs text-charcoal font-medium space-y-2 pt-6 border-t border-charcoal/10 mt-6">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-forest flex-shrink-0" />
                  <span>Structural packaging dielines</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-forest flex-shrink-0" />
                  <span>Specialized trim embellishments</span>
                </div>
              </div>
            </div>

            {/* 3. iN-DEPTH */}
            <div className="bg-white p-8 sm:p-10 rounded-sm border-2 border-charcoal/10 hover:border-orange shadow-lg flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 group">
              <div>
                {/* 1. FIRST: ICON */}
                <div className="w-16 h-16 rounded-sm bg-charcoal text-orange flex items-center justify-center border-2 border-dashed border-charcoal/20 shadow-md group-hover:bg-orange group-hover:text-white transition-all group-hover:scale-105 mb-6">
                  <Search className="w-8 h-8" />
                </div>

                {/* 2. NEXT: HEADLINE */}
                <span className="text-xs font-mono font-bold text-orange uppercase tracking-wider block mb-1">
                  PILLAR 03 &bull; RIGOROUS EXECUTION
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-charcoal">
                  iN-DEPTH
                </h3>
                <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-grey-dark mt-1">
                  Attention to Every Detail
                </h4>

                {/* 3. NEXT: DESCRIPTION */}
                <p className="text-sm text-grey-dark leading-relaxed font-light border-t border-charcoal/10 pt-4 mt-4">
                  &ldquo;From material to finishing, we focus on every detail to meet your exact requirements.&rdquo;
                </p>
                <p className="text-xs text-grey-dark leading-relaxed font-light mt-2">
                  End-to-end multi-stage inspection, yarn density audits under magnification, needle detection, and AQL 1.5 international export clearance.
                </p>
              </div>

              <div className="text-xs text-charcoal font-medium space-y-2 pt-6 border-t border-charcoal/10 mt-6">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-forest flex-shrink-0" />
                  <span>AQL 1.5 strict multi-point inspection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-forest flex-shrink-0" />
                  <span>Needle detection &amp; wash fastness audits</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          3. FROM CONCEPT TO DELIVERY (5-STEP PROCESS FROM PDF)
          (3 PER ROW, CENTER-ALIGNED CONTAINERS, TEXT LEFT-ALIGNED AS BEFORE)
          (TEXTURE VARIANT: RAW SLUB CANVAS WEAVE DARK)
          ================================================================= */}
      <section className="py-20 sm:py-28 bg-charcoal text-white relative overflow-hidden bg-fabric-canvas-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block">
              The 5-Stage Journey
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-white">
              FROM CONCEPT TO DELIVERY.
            </h2>
            <p className="text-sm sm:text-base text-beige-light font-light leading-relaxed">
              Our step-by-step methodology ensures seamless transitions from design conceptualization to global shipment.
            </p>
          </div>

          {/* 3 items per row on desktop, centered containers */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 items-stretch">
            {/* STAGE 01: DESIGN */}
            <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-md bg-charcoal-card p-7 sm:p-8 rounded-sm border border-white/10 hover:border-orange transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group shadow-xl">
              <div>
                <div className="w-14 h-14 rounded-sm bg-orange/20 text-orange flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-orange/30">
                  <PenTool className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-mono font-bold text-orange uppercase tracking-widest block">
                  STAGE 01
                </span>
                <h3 className="text-2xl font-heading font-black uppercase text-white mt-1">
                  DESIGN
                </h3>
                <h4 className="text-xs font-heading font-bold uppercase text-beige mt-1.5 leading-snug">
                  Creative &amp; Customized Solutions
                </h4>
                <p className="text-xs text-grey-light mt-4 leading-relaxed font-light">
                  Tailored style guidelines, CAD tech pack consultation, and structural dieline engineering for products and packaging.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-[11px] text-grey-light font-mono mt-6">
                &bull; Initial Design Review
              </div>
            </div>

            {/* STAGE 02: DEVELOP */}
            <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-md bg-charcoal-card p-7 sm:p-8 rounded-sm border border-white/10 hover:border-orange transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group shadow-xl">
              <div>
                <div className="w-14 h-14 rounded-sm bg-orange/20 text-orange flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-orange/30">
                  <Layers className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-mono font-bold text-orange uppercase tracking-widest block">
                  STAGE 02
                </span>
                <h3 className="text-2xl font-heading font-black uppercase text-white mt-1">
                  DEVELOP
                </h3>
                <h4 className="text-xs font-heading font-bold uppercase text-beige mt-1.5 leading-snug">
                  Sample &amp; Product Development
                </h4>
                <p className="text-xs text-grey-light mt-4 leading-relaxed font-light">
                  Physical proto sampling, lab dip color matching under D65, size grading, and wet proofs on actual production paper.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-[11px] text-grey-light font-mono mt-6">
                &bull; Pre-Production Approval
              </div>
            </div>

            {/* STAGE 03: PRODUCE */}
            <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-md bg-charcoal-card p-7 sm:p-8 rounded-sm border border-white/10 hover:border-orange transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group shadow-xl">
              <div>
                <div className="w-14 h-14 rounded-sm bg-orange/20 text-orange flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-orange/30">
                  <Factory className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-mono font-bold text-orange uppercase tracking-widest block">
                  STAGE 03
                </span>
                <h3 className="text-2xl font-heading font-black uppercase text-white mt-1">
                  PRODUCE
                </h3>
                <h4 className="text-xs font-heading font-bold uppercase text-beige mt-1.5 leading-snug">
                  Quality Manufacturing &amp; Quality Control
                </h4>
                <p className="text-xs text-grey-light mt-4 leading-relaxed font-light">
                  Automated computer cutting, dedicated assembly stitching lines, Heidelberg offset press runs, and 100% in-line QC.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-[11px] text-grey-light font-mono mt-6">
                &bull; AQL 1.5 In-Line QC
              </div>
            </div>

            {/* STAGE 04: PACK */}
            <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-md bg-charcoal-card p-7 sm:p-8 rounded-sm border border-white/10 hover:border-orange transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group shadow-xl">
              <div>
                <div className="w-14 h-14 rounded-sm bg-orange/20 text-orange flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-orange/30">
                  <Box className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-mono font-bold text-orange uppercase tracking-widest block">
                  STAGE 04
                </span>
                <h3 className="text-2xl font-heading font-black uppercase text-white mt-1">
                  PACK
                </h3>
                <h4 className="text-xs font-heading font-bold uppercase text-beige mt-1.5 leading-snug">
                  Smart &amp; Secure Packaging
                </h4>
                <p className="text-xs text-grey-light mt-4 leading-relaxed font-light">
                  Retail polybagging, hangtag attachment, silica desiccant insertion, and heavy-duty corrugated export master carton packing.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-[11px] text-grey-light font-mono mt-6">
                &bull; Ocean-Proof Protection
              </div>
            </div>

            {/* STAGE 05: DELIVER */}
            <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-md bg-charcoal-card p-7 sm:p-8 rounded-sm border border-white/10 hover:border-orange transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group shadow-xl">
              <div>
                <div className="w-14 h-14 rounded-sm bg-orange/20 text-orange flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-orange/30">
                  <Truck className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-mono font-bold text-orange uppercase tracking-widest block">
                  STAGE 05
                </span>
                <h3 className="text-2xl font-heading font-black uppercase text-white mt-1">
                  DELIVER
                </h3>
                <h4 className="text-xs font-heading font-bold uppercase text-beige mt-1.5 leading-snug">
                  On-Time Delivery Every Time
                </h4>
                <p className="text-xs text-grey-light mt-4 leading-relaxed font-light">
                  Container consolidation, FOB Chittagong Port ocean export, or express air dispatch through Dhaka Shahjalal Airport.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-[11px] text-grey-light font-mono mt-6">
                &bull; Global Port Clearance
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          4. WHY TEXPART? (FROM PDF BROCHURE)
          (TEXTURE VARIANT: LUXURY HERRINGBONE)
          ================================================================= */}
      <section className="py-20 sm:py-28 bg-offwhite border-b border-charcoal/10 relative bg-fabric-herringbone">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 space-y-3">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block">
              Core Value Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-tight text-charcoal">
              WHY TEXPART?
            </h2>
            <p className="text-sm text-grey-dark font-light">
              We stand apart through our complete service scope, competitive pricing structures, and relentless pursuit of zero-defect manufacturing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-sm border border-charcoal/10 shadow-sm space-y-3">
              <div className="w-8 h-8 rounded-full bg-orange/15 text-orange flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="text-base font-heading font-black uppercase text-charcoal">
                Wide Range of Accessories &amp; Packaging Solutions
              </h3>
              <p className="text-xs text-grey-dark leading-relaxed font-light">
                One-stop source for woven labels, FSC tags, metal zippers, luxury boxes, and brochures.
              </p>
            </div>

            <div className="p-6 bg-white rounded-sm border border-charcoal/10 shadow-sm space-y-3">
              <div className="w-8 h-8 rounded-full bg-orange/15 text-orange flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="text-base font-heading font-black uppercase text-charcoal">
                Customized Design &amp; Development
              </h3>
              <p className="text-xs text-grey-dark leading-relaxed font-light">
                Tailored pattern drafting, dieline engineering, and color matching under strict D65 lighting.
              </p>
            </div>

            <div className="p-6 bg-white rounded-sm border border-charcoal/10 shadow-sm space-y-3">
              <div className="w-8 h-8 rounded-full bg-orange/15 text-orange flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="text-base font-heading font-black uppercase text-charcoal">
                High Quality Materials &amp; Finishing
              </h3>
              <p className="text-xs text-grey-dark leading-relaxed font-light">
                OEKO-TEX® Class I certified yarns, GRS recycled materials, and soy-based printing inks.
              </p>
            </div>

            <div className="p-6 bg-white rounded-sm border border-charcoal/10 shadow-sm space-y-3">
              <div className="w-8 h-8 rounded-full bg-orange/15 text-orange flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="text-base font-heading font-black uppercase text-charcoal">
                Competitive Price
              </h3>
              <p className="text-xs text-grey-dark leading-relaxed font-light">
                Direct manufacturing advantage from Bangladesh&apos;s RMG cluster with zero trading broker fees.
              </p>
            </div>

            <div className="p-6 bg-white rounded-sm border border-charcoal/10 shadow-sm space-y-3">
              <div className="w-8 h-8 rounded-full bg-orange/15 text-orange flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="text-base font-heading font-black uppercase text-charcoal">
                On-time Delivery &amp; After Sales Support
              </h3>
              <p className="text-xs text-grey-dark leading-relaxed font-light">
                Dedicated bilingual technical merchandisers keeping you updated through every stage.
              </p>
            </div>

            {/* Special Callout Badge from PDF */}
            <div className="p-6 bg-charcoal text-white rounded-sm border-2 border-dashed border-orange flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-orange uppercase tracking-wider block mb-1">
                  OFFICIAL BROCHURE PROMISE
                </span>
                <h3 className="text-lg font-heading font-black uppercase text-white">
                  LET&apos;S TALK PACKAGES &amp; COMPETITIVE PRICING
                </h3>
              </div>
              <button
                onClick={() => openQuote("Volume Pricing Consultation")}
                className="mt-4 bg-orange hover:bg-orange-hover text-white py-2.5 px-4 rounded-sm text-xs font-heading font-extrabold uppercase tracking-wider transition-colors"
              >
                Request Custom Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          5. COMPLETE SCOPE: TWO MAIN PILLARS
          (TEXTURE VARIANT: LINEN WEAVE)
          ================================================================= */}
      <section className="py-20 sm:py-28 bg-white text-charcoal bg-fabric-linen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 space-y-3">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block">
              Comprehensive Production Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-tight text-charcoal">
              Full Spectrum Manufacturing &amp; Printing.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-offwhite border border-charcoal/10 rounded-sm space-y-4">
              <div className="w-12 h-12 rounded-sm bg-orange/15 text-orange flex items-center justify-center">
                <Scissors className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-black uppercase text-charcoal">
                Apparel Development
              </h3>
              <p className="text-xs text-grey-dark leading-relaxed font-light">
                Transforming fashion sketches, mood boards, and CAD tech packs into physical graded patterns, fit samples, and verified size sets.
              </p>
            </div>

            <div className="p-8 bg-offwhite border border-charcoal/10 rounded-sm space-y-4">
              <div className="w-12 h-12 rounded-sm bg-orange/15 text-orange flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-black uppercase text-charcoal">
                Garment Manufacturing
              </h3>
              <p className="text-xs text-grey-dark leading-relaxed font-light">
                Automated multi-ply cutting, high-speed lockstitch assembly, seam sealing, and export carton packaging across knitwear and technical outerwear.
              </p>
            </div>

            <div className="p-8 bg-offwhite border border-charcoal/10 rounded-sm space-y-4">
              <div className="w-12 h-12 rounded-sm bg-orange/15 text-orange flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-black uppercase text-charcoal">
                Apparel Accessories
              </h3>
              <p className="text-xs text-grey-dark leading-relaxed font-light">
                High-definition Swiss damask labels, FSC hangtags, jacquard tapes, drawcords, zippers, buttons, and molded 3D silicone badges.
              </p>
            </div>

            <div className="p-8 bg-offwhite border border-charcoal/10 rounded-sm space-y-4">
              <div className="w-12 h-12 rounded-sm bg-forest/15 text-forest flex items-center justify-center">
                <Printer className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-black uppercase text-charcoal">
                Commercial Printing
              </h3>
              <p className="text-xs text-grey-dark leading-relaxed font-light">
                Heidelberg offset press production for corporate catalogues, annual reports, leaflets, executive diaries, and desk calendars.
              </p>
            </div>

            <div className="p-8 bg-offwhite border border-charcoal/10 rounded-sm space-y-4">
              <div className="w-12 h-12 rounded-sm bg-forest/15 text-forest flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-black uppercase text-charcoal">
                Customized Packaging
              </h3>
              <p className="text-xs text-grey-dark leading-relaxed font-light">
                Rigid luxury gift boxes with magnetic closures, folding retail cartons, branded boutique paper bags, and garment tissue wrapping.
              </p>
            </div>

            <div className="p-8 bg-charcoal text-white rounded-sm space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-orange uppercase tracking-wider block mb-2">
                  CUSTOM SPECIFICATIONS
                </span>
                <h3 className="text-xl font-heading font-black uppercase text-white">
                  Have a Unique Design?
                </h3>
                <p className="text-xs text-beige-light leading-relaxed font-light mt-2">
                  We engineer bespoke components, non-standard zipper gauges, and custom dielines tailored to your brand.
                </p>
              </div>
              <button
                onClick={() => openQuote("Custom Engineering")}
                className="bg-orange hover:bg-orange-hover text-white py-3 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest text-center transition-colors"
              >
                Inquire With Engineering
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          6. FABRIC TEXTURED B2B CTA BANNER WITH OFFICIAL CONTACT
          (TEXTURE VARIANT: OXFORD BASKETWEAVE DARK)
          ================================================================= */}
      <section className="py-20 sm:py-28 bg-charcoal text-white relative overflow-hidden bg-fabric-oxford-dark">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="border-2 border-dashed border-white/20 p-8 sm:p-14 rounded-sm bg-charcoal/85 backdrop-blur-sm text-center space-y-6 shadow-2xl">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block">
              LET&apos;S CREATE. LET&apos;S DEVELOP. LET&apos;S DELIVER.
            </span>

            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-white">
              Work With a Trusted Production Partner.
            </h2>

            <p className="text-sm sm:text-base text-beige-light/90 max-w-2xl mx-auto font-light leading-relaxed">
              From initial prototype samples to massive volume export runs, we ensure uncompromising quality, ethical production standards, and on-time global fulfillment.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => openQuote("About Us Page CTA")}
                className="bg-orange hover:bg-orange-hover text-white px-9 py-4 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest inline-flex items-center gap-3 transition-all duration-300 shadow-xl hover:shadow-orange/30 hover:scale-105"
              >
                <span>Request a Quote Today</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/services"
                className="bg-transparent hover:bg-white/10 text-white border border-white/30 px-8 py-4 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest inline-flex items-center gap-2 transition-all"
              >
                Explore Full Services
              </Link>
            </div>

            {/* Official Contact Summary from Brochure */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-grey-light font-light text-center">
              <div>
                <span className="font-heading font-bold text-beige uppercase tracking-wider block">Office &amp; Factory</span>
                <span className="mt-1 block">263, Fakirapool, Motijheel, Dhaka</span>
              </div>
              <div>
                <span className="font-heading font-bold text-beige uppercase tracking-wider block">Hotline</span>
                <span className="mt-1 block">+880 161 308 4465 &bull; +880 171 308 4465</span>
              </div>
              <div>
                <span className="font-heading font-bold text-beige uppercase tracking-wider block">Email</span>
                <span className="mt-1 block">texpartdesign@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
