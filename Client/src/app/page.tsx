"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { GALLERY_ITEMS } from "@/data/gallery";
import ProductCard from "@/components/ProductCard";
import { useQuote } from "@/context/QuoteContext";
import {
  ArrowRight,
  ArrowDown,
  Layers,
  Sparkles,
  ShieldCheck,
  Truck,
  Users,
  Compass,
  Scissors,
  Printer,
  ChevronRight,
  Package,
} from "lucide-react";

export default function HomePage() {
  const { openQuote, openLightbox } = useQuote();
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<"all" | "accessories" | "commercial" | "featured">("all");

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeCategoryFilter === "featured") return p.featured;
    if (activeCategoryFilter === "accessories") return p.collectionId === "accessories";
    if (activeCategoryFilter === "commercial") return p.collectionId === "commercial";
    return true;
  });

  return (
    <div className="space-y-0">
      {/* =================================================================
          SECTION 1: HERO — CINEMATIC FIRST IMPRESSION
          ================================================================= */}
      <section className="relative min-h-screen flex items-center bg-charcoal text-white pt-24 pb-16 overflow-hidden">
        {/* Cinematic Background Media */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=2000&q=85"
            alt="Garment Manufacturing Environment"
            fill
            className="object-cover opacity-35 scale-105 transition-transform duration-10000 hover:scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/50 to-charcoal" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-forest/30 via-transparent to-transparent opacity-60" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl space-y-6">
            {/* Floating Editorial Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-beige text-xs font-heading font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                Dhaka Export Manufacturing Facility
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-heading tracking-widest text-grey-light uppercase">
                Private &bull; Commercial Solutions
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-black uppercase tracking-tight leading-[0.95] text-white">
              From Concept <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange via-beige to-white">
                To Creation.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-xl text-beige-light/90 max-w-2xl font-light leading-relaxed">
              Your trusted partner for end-to-end apparel development, manufacturing, garment accessories, and high-precision commercial printing solutions.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/services"
                className="bg-orange hover:bg-orange-hover text-white px-8 py-4 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest inline-flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-orange/30 hover:-translate-y-0.5"
              >
                Explore Our Services
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => openQuote()}
                className="bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white px-8 py-4 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest inline-flex items-center gap-3 transition-all duration-300"
              >
                Let&apos;s Discuss Your Project
              </button>
            </div>

            {/* Statistics / Capability Pillars */}
            <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/10 text-xs">
              <div>
                <span className="font-heading text-xl sm:text-2xl font-extrabold text-beige block">
                  02
                </span>
                <span className="text-grey-light uppercase tracking-wider font-semibold">
                  Core Divisions
                </span>
              </div>
              <div>
                <span className="font-heading text-xl sm:text-2xl font-extrabold text-beige block">
                  100%
                </span>
                <span className="text-grey-light uppercase tracking-wider font-semibold">
                  Tailored Production
                </span>
              </div>
              <div>
                <span className="font-heading text-xl sm:text-2xl font-extrabold text-beige block">
                  ISO &amp; OEKO
                </span>
                <span className="text-grey-light uppercase tracking-wider font-semibold">
                  Compliant Standards
                </span>
              </div>
              <div>
                <span className="font-heading text-xl sm:text-2xl font-extrabold text-beige block">
                  Export
                </span>
                <span className="text-grey-light uppercase tracking-wider font-semibold">
                  Worldwide Logistics
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 z-10 hidden sm:flex items-center gap-3 text-xs uppercase tracking-widest font-heading text-grey-light">
          <span>Scroll to explore</span>
          <div className="w-8 h-px bg-orange animate-pulse" />
          <ArrowDown className="w-4 h-4 text-orange" />
        </div>
      </section>

      {/* =================================================================
          SECTION 2: BRAND STATEMENT / EDITORIAL INTRO
          ================================================================= */}
      <section className="py-24 sm:py-32 bg-offwhite text-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-widest text-orange">
                <span className="w-1.5 h-1.5 rounded-full bg-orange" />
                The Art of Making
              </span>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black uppercase tracking-tight text-charcoal leading-[1.05]">
                We Make Ideas Tangible.
              </h2>

              <p className="text-lg sm:text-xl text-grey-dark leading-relaxed font-light">
                From developing complete apparel products to delivering customized printing and packaging solutions, we bring creativity, craftsmanship and production expertise together under one roof in Bangladesh.
              </p>

              <div className="pt-2 text-sm text-grey-dark leading-relaxed space-y-4">
                <p>
                  As an international manufacturing partner, we bridge the gap between initial fashion sketches or tech packs and finished, export-grade garments. Simultaneously, our commercial print division produces brand identities, luxury packaging, and corporate collateral with uncompromising precision.
                </p>
              </div>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-widest text-charcoal hover:text-orange transition-colors group"
                >
                  <span>Discover Our Story &amp; Philosophy</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Media: Asymmetrical Editorial Composition (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1000&q=80"
                  alt="Garment Sewing Craftsmanship"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Smaller Floating Textile Macro Photo */}
              <div className="absolute -bottom-8 -left-8 w-3/5 aspect-square rounded-sm overflow-hidden shadow-2xl border-4 border-offwhite hidden sm:block">
                <Image
                  src="https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80"
                  alt="Textile & Weave Details"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating Editorial Quote Card */}
              <div className="absolute top-8 -right-6 bg-charcoal text-offwhite p-5 rounded-sm shadow-xl max-w-[210px] hidden sm:block">
                <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-orange block mb-1">
                  Craftsmanship
                </span>
                <p className="text-xs text-beige-light leading-relaxed">
                  Precision in stitching, density in weaving, perfection in print.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION 3: TWO CORE SERVICES (INTERACTIVE SPLIT PANELS)
          ================================================================= */}
      <section className="py-24 sm:py-32 bg-charcoal text-offwhite relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-2xl space-y-3 mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-widest text-orange">
              <span className="w-1.5 h-1.5 rounded-full bg-orange" />
              Two Major Business Solutions
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-white">
              Engineered For Modern Brands
            </h2>
            <p className="text-sm sm:text-base text-grey-light">
              Choose the exact manufacturing path suited to your scale &mdash; from complete garment tech packs to corporate commercial printing.
            </p>
          </div>

          {/* Two Panels Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* SERVICE 01: PRIVATE JOBS */}
            <div className="group bg-charcoal-card border border-white/10 hover:border-orange/60 rounded-sm overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=80"
                  alt="Private Jobs Apparel Development"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-charcoal/85 backdrop-blur-md text-orange px-3 py-1 rounded-sm text-xs font-heading font-extrabold uppercase tracking-widest border border-white/10">
                  Service 01 &bull; Apparel Manufacturing
                </div>
              </div>

              <div className="p-8 sm:p-10 flex flex-col flex-grow justify-between space-y-6">
                <div>
                  <span className="text-xs font-mono text-grey block mb-2">
                    DIVISION: PRIVATE JOBS
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white group-hover:text-orange transition-colors">
                    From Tech Pack to Finished Product.
                  </h3>
                  <p className="text-sm text-grey-light leading-relaxed mt-4">
                    We provide end-to-end apparel development and manufacturing solutions. From initial concepts and technical specifications to material sourcing, sampling, product development and final production, we take care of the complete process.
                  </p>

                  {/* Highlights */}
                  <ul className="mt-6 space-y-2.5 text-xs text-beige-light border-t border-white/10 pt-4">
                    <li className="flex items-center gap-2.5">
                      <Scissors className="w-3.5 h-3.5 text-orange flex-shrink-0" />
                      <span>Jackets, Outerwear, Sportswear &amp; Technical Garments</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Layers className="w-3.5 h-3.5 text-orange flex-shrink-0" />
                      <span>Material Sourcing, Sampling &amp; Prototype Development</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-orange flex-shrink-0" />
                      <span>Rigorous In-Line Inspection &amp; Export Carton Finishing</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href="/services#private-jobs"
                    className="inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-widest text-white hover:text-orange transition-colors"
                  >
                    Explore Private Jobs
                    <ChevronRight className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => openQuote("Private Jobs Apparel Manufacturing", "Private Jobs")}
                    className="text-xs font-heading font-bold uppercase tracking-wider bg-orange hover:bg-orange-hover text-white px-4 py-2 rounded-sm transition-colors"
                  >
                    Consult Tech Pack
                  </button>
                </div>
              </div>
            </div>

            {/* SERVICE 02: COMMERCIAL JOBS */}
            <div className="group bg-charcoal-card border border-white/10 hover:border-cyan/60 rounded-sm overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1589363460779-cd717d7e8fa5?auto=format&fit=crop&w=1200&q=80"
                  alt="Commercial Printing & Promotional Products"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-charcoal/85 backdrop-blur-md text-cyan px-3 py-1 rounded-sm text-xs font-heading font-extrabold uppercase tracking-widest border border-white/10">
                  Service 02 &bull; Commercial Printing
                </div>
              </div>

              <div className="p-8 sm:p-10 flex flex-col flex-grow justify-between space-y-6">
                <div>
                  <span className="text-xs font-mono text-grey block mb-2">
                    DIVISION: COMMERCIAL JOBS
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white group-hover:text-cyan transition-colors">
                    Your Design. Our Printing Expertise.
                  </h3>
                  <p className="text-sm text-grey-light leading-relaxed mt-4">
                    Whether you already have a design or need creative support from scratch, we provide customized commercial printing solutions across a wide range of products and materials &mdash; from brochures to luxury presentation packaging.
                  </p>

                  {/* Highlights */}
                  <ul className="mt-6 space-y-2.5 text-xs text-beige-light border-t border-white/10 pt-4">
                    <li className="flex items-center gap-2.5">
                      <Printer className="w-3.5 h-3.5 text-cyan flex-shrink-0" />
                      <span>Option 01: High-Speed Offset &amp; Digital Print From Your Artwork</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan flex-shrink-0" />
                      <span>Option 02: Creative Studio Design + Structural Print Packaging</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Package className="w-3.5 h-3.5 text-cyan flex-shrink-0" />
                      <span>Rigid Gift Boxes, Executive Diaries, Catalogues &amp; Bags</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href="/services#commercial-jobs"
                    className="inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-widest text-white hover:text-cyan transition-colors"
                  >
                    Explore Commercial Jobs
                    <ChevronRight className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => openQuote("Commercial Printing Solutions", "Commercial Jobs")}
                    className="text-xs font-heading font-bold uppercase tracking-wider bg-cyan hover:bg-blue text-white px-4 py-2 rounded-sm transition-colors"
                  >
                    Request Print Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION 4: PRODUCT SHOWCASE (WHAT WE CREATE)
          ================================================================= */}
      <section id="products" className="py-24 sm:py-32 bg-offwhite text-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-widest text-orange mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange" />
                Comprehensive Product Portfolio
              </span>
              <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-charcoal">
                What We Create.
              </h2>
              <p className="text-sm text-grey-dark max-w-lg mt-2">
                Authentic product categories straight from our Apparel Accessories &amp; Commercial Printing brochures. Click any item for specifications and instant quotation.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategoryFilter("all")}
                className={`px-4 py-2 rounded-sm text-xs font-heading font-bold uppercase tracking-wider transition-colors ${
                  activeCategoryFilter === "all"
                    ? "bg-charcoal text-white"
                    : "bg-white text-grey-dark border border-charcoal/10 hover:border-charcoal"
                }`}
              >
                All Products ({PRODUCTS.length})
              </button>
              <button
                onClick={() => setActiveCategoryFilter("accessories")}
                className={`px-4 py-2 rounded-sm text-xs font-heading font-bold uppercase tracking-wider transition-colors ${
                  activeCategoryFilter === "accessories"
                    ? "bg-charcoal text-white"
                    : "bg-white text-grey-dark border border-charcoal/10 hover:border-charcoal"
                }`}
              >
                Apparel Accessories &amp; Packaging
              </button>
              <button
                onClick={() => setActiveCategoryFilter("commercial")}
                className={`px-4 py-2 rounded-sm text-xs font-heading font-bold uppercase tracking-wider transition-colors ${
                  activeCategoryFilter === "commercial"
                    ? "bg-charcoal text-white"
                    : "bg-white text-grey-dark border border-charcoal/10 hover:border-charcoal"
                }`}
              >
                Commercial Printing
              </button>
              <button
                onClick={() => setActiveCategoryFilter("featured")}
                className={`px-4 py-2 rounded-sm text-xs font-heading font-bold uppercase tracking-wider transition-colors ${
                  activeCategoryFilter === "featured"
                    ? "bg-charcoal text-white"
                    : "bg-white text-grey-dark border border-charcoal/10 hover:border-charcoal"
                }`}
              >
                Featured Highlights
              </button>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Bottom Note */}
          <div className="mt-16 text-center">
            <p className="text-xs text-grey-dark font-medium">
              Need a custom engineered trim, non-standard zipper gauge, or custom packaging die-line?
            </p>
            <button
              onClick={() => openQuote("Custom Engineering & Prototyping")}
              className="mt-3 inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-widest text-orange hover:text-orange-hover underline"
            >
              Discuss Custom Manufacturing Requirements
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION 5: WHY WORK WITH US (5 BROCHURE CORE VALUES)
          ================================================================= */}
      <section className="py-24 sm:py-32 bg-forest-dark text-offwhite relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-widest text-orange">
              <span className="w-1.5 h-1.5 rounded-full bg-orange" />
              Brochure Core Value Pillars
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-white">
              One Partner. Multiple Solutions.
            </h2>
            <p className="text-sm text-beige-light font-light leading-relaxed">
              Grounding our operations in Bangladesh with global export standards to serve international fashion houses and corporations reliably.
            </p>
          </div>

          {/* The 5 Core Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* 1. Customized Solutions */}
            <div className="bg-white/5 border border-white/10 hover:border-orange rounded-sm p-6 space-y-4 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-sm bg-orange/15 text-orange flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-extrabold uppercase text-white">
                Customized Solutions
              </h3>
              <p className="text-xs text-beige-light leading-relaxed">
                Tailored formulations for every apparel tech pack, fabric composition, label density, and box structure.
              </p>
            </div>

            {/* 2. Consistent Quality */}
            <div className="bg-white/5 border border-white/10 hover:border-orange rounded-sm p-6 space-y-4 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-sm bg-orange/15 text-orange flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-extrabold uppercase text-white">
                Consistent Quality
              </h3>
              <p className="text-xs text-beige-light leading-relaxed">
                AQL 1.5 inspection standards, color gamut calibration, wash test durability, and zero tolerance for defect leakage.
              </p>
            </div>

            {/* 3. Competitive Pricing */}
            <div className="bg-white/5 border border-white/10 hover:border-orange rounded-sm p-6 space-y-4 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-sm bg-orange/15 text-orange flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-extrabold uppercase text-white">
                Competitive Pricing
              </h3>
              <p className="text-xs text-beige-light leading-relaxed">
                Direct manufacturing advantage from Bangladesh&apos;s world-class garment and industrial printing supply ecosystem.
              </p>
            </div>

            {/* 4. Reliable Delivery */}
            <div className="bg-white/5 border border-white/10 hover:border-orange rounded-sm p-6 space-y-4 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-sm bg-orange/15 text-orange flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-extrabold uppercase text-white">
                Reliable Delivery
              </h3>
              <p className="text-xs text-beige-light leading-relaxed">
                Rigid production lead-time management, container stuffing optimization, and dependable air/ocean freight coordination.
              </p>
            </div>

            {/* 5. Professional Service */}
            <div className="bg-white/5 border border-white/10 hover:border-orange rounded-sm p-6 space-y-4 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-sm bg-orange/15 text-orange flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-extrabold uppercase text-white">
                Professional Service
              </h3>
              <p className="text-xs text-beige-light leading-relaxed">
                Dedicated bilingual technical merchandisers, rapid sample turnarounds, and transparent milestone tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION 6: MANUFACTURING / CRAFTSMANSHIP SHOWCASE
          ================================================================= */}
      <section className="py-24 sm:py-32 bg-charcoal text-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3 mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-widest text-orange">
              <span className="w-1.5 h-1.5 rounded-full bg-orange" />
              Production Floor Telemetry
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-white">
              Precision in Every Detail.
            </h2>
            <p className="text-sm sm:text-base text-grey-light font-light leading-relaxed">
              Every detail matters. From the selection of raw materials to the finishing touches, we believe quality is built into every step across our Dhaka facilities.
            </p>
          </div>

          {/* Cinematic Photo Collage */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div
              onClick={() => openLightbox({ src: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80", title: "Automated Precision Pattern Cutting", meta: "Dhaka Apparel Division" })}
              className="md:col-span-8 relative aspect-[16/10] rounded-sm overflow-hidden group cursor-pointer"
            >
              <Image
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80"
                alt="Automated Precision Pattern Cutting"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-orange block mb-1">
                  01. Cutting &amp; Spreading
                </span>
                <h4 className="text-xl font-heading font-extrabold uppercase text-white">
                  Automated Multi-Ply Vacuum Cutting Tables
                </h4>
              </div>
            </div>

            <div
              onClick={() => openLightbox({ src: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1200&q=80", title: "Heavy Duty Industrial Sewing", meta: "Assembly Line 02, Dhaka" })}
              className="md:col-span-4 relative aspect-[4/5] rounded-sm overflow-hidden group cursor-pointer"
            >
              <Image
                src="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1200&q=80"
                alt="Heavy Duty Industrial Sewing"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-orange block mb-1">
                  02. Garment Assembly
                </span>
                <h4 className="text-lg font-heading font-extrabold uppercase text-white">
                  Twin-Needle Seam Construction
                </h4>
              </div>
            </div>

            <div
              onClick={() => openLightbox({ src: "https://images.unsplash.com/photo-1589363460779-cd717d7e8fa5?auto=format&fit=crop&w=1200&q=80", title: "Heidelberg 6-Color Offset Printing", meta: "Commercial Print Division" })}
              className="md:col-span-4 relative aspect-[4/3] rounded-sm overflow-hidden group cursor-pointer"
            >
              <Image
                src="https://images.unsplash.com/photo-1589363460779-cd717d7e8fa5?auto=format&fit=crop&w=1200&q=80"
                alt="Heidelberg 6-Color Offset Printing"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-cyan block mb-1">
                  03. Color Management
                </span>
                <h4 className="text-base font-heading font-extrabold uppercase text-white">
                  Offset Printing Presses
                </h4>
              </div>
            </div>

            <div
              onClick={() => openLightbox({ src: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80", title: "Strict 4-Point Quality Inspection", meta: "QA Hub, Dhaka" })}
              className="md:col-span-8 relative aspect-[16/9] rounded-sm overflow-hidden group cursor-pointer"
            >
              <Image
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80"
                alt="Strict 4-Point Quality Inspection"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-forest-light block mb-1">
                  04. Quality Assurance
                </span>
                <h4 className="text-xl font-heading font-extrabold uppercase text-white">
                  4-Point Seam, Measurement &amp; Needle Detection Inspection
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION 7: GALLERY PREVIEW (MASONRY ARCHIVE)
          ================================================================= */}
      <section className="py-24 sm:py-32 bg-offwhite text-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-widest text-orange mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange" />
                Visual Documentation
              </span>
              <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-charcoal">
                Manufacturing Archive.
              </h2>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-widest text-charcoal hover:text-orange transition-colors"
            >
              Explore Full Gallery ({GALLERY_ITEMS.length} Photos)
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Masonry Preview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GALLERY_ITEMS.slice(0, 4).map((item) => (
              <div
                key={item.id}
                onClick={() => openLightbox({ src: item.image, title: item.title, meta: `${item.location} • ${item.meta}` })}
                className="group relative aspect-[4/5] rounded-sm overflow-hidden bg-charcoal cursor-pointer shadow-md"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                  <span className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-orange block mb-1">
                    {item.categoryLabel}
                  </span>
                  <h4 className="text-sm font-heading font-bold uppercase leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-grey-light mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION 8: FINAL HIGH-IMPACT CTA
          ================================================================= */}
      <section className="relative py-28 sm:py-40 bg-charcoal text-white text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=2000&q=80"
            alt="Outerwear Technical Finish"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-charcoal/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block">
            Let&apos;s Build Together
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black uppercase tracking-tight text-white leading-none">
            Have a Project In Mind?
          </h2>
          <p className="text-base sm:text-xl text-beige-light/90 max-w-2xl mx-auto font-light leading-relaxed">
            Let&apos;s turn your ideas into exceptional products. Whether you need full-package apparel manufacturing or customized commercial printing, our Dhaka team is ready.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openQuote("New B2B Partnership Inquiry")}
              className="bg-orange hover:bg-orange-hover text-white px-9 py-4 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest inline-flex items-center gap-3 transition-all duration-300 shadow-xl hover:shadow-orange/30 hover:-translate-y-0.5"
            >
              Start a Conversation
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/contact"
              className="bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white px-8 py-4 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest inline-flex items-center gap-2 transition-all duration-300"
            >
              Visit Dhaka Facilities
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

