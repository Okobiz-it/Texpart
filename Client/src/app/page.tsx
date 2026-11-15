"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { GALLERY_ITEMS } from "@/data/gallery";
import ProductCard from "@/components/ProductCard";
import { useQuote } from "@/context/QuoteContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  ArrowRight,
  Layers,
  ShieldCheck,
  Truck,
  Scissors,
  Printer,
  ChevronRight,
  Box,
  Handshake,
  Lightbulb,
  Search,
  Factory,
  PenTool,
  Check,
  Video,
  Sparkles,
} from "lucide-react";

// Background Hero Carousel Slides (Images cross-fade smoothly while hero text stays still)
const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=2000&q=85",
    alt: "Garment Manufacturing & Apparel Cutting Assembly",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=2000&q=85",
    alt: "High-Definition Swiss Damask Looms & Woven Trims",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1589363460779-cd717d7e8fa5?auto=format&fit=crop&w=2000&q=85",
    alt: "Commercial Offset Speedmaster Printing Presses",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=2000&q=85",
    alt: "Garment Craftsmanship & Quality Inspection",
  },
];

// Product categories from official brochures for dynamic typing animation
const TYPED_PRODUCTS = [
  "GARMENT ACCESSORIES",
  "BUSINESS CARD & STATIONERY",
  "HANG TAGS & PRICE TAGS",
  "WOVEN & PRINTED LABELS",
  "TRIMS, TAPES & RIBBONS",
  "CORDS & DRAWSTRINGS",
  "METAL & PLASTIC ZIPPERS",
  "BUTTONS & BUCKLES",
  "PATCHES & BADGES",
  "COMMERCIAL PRINTING",
  "LEAFLETS & FLYERS",
  "BROCHURES & CATALOGUES",
  "DIARIES & NOTEBOOKS",
  "WALL & DESK CALENDARS",
  "POSTERS & BANNERS",
  "PAPER BAGS & PRINTED BOXES",
  "GIFT BOXES & PREMIUM PACKAGING",
  "POLY BAGS & TISSUE WRAPPING",
];

export default function HomePage() {
  const { openQuote, openLightbox } = useQuote();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isSliderPaused, setIsSliderPaused] = useState(false);

  // Typewriter animation state for hero subtitle products
  const [productIndex, setProductIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Scroll reveal observer
  const containerRef = useRef<HTMLDivElement>(null);
  const observe = useScrollReveal();

  useEffect(() => {
    if (containerRef.current) {
      observe(containerRef.current);
    }
  }, [observe]);

  // Hero auto-advance background image slider (images change, text stays still)
  useEffect(() => {
    if (isSliderPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isSliderPaused]);

  // Typewriter effect cycling through brochure product categories
  useEffect(() => {
    const currentWord = TYPED_PRODUCTS[productIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, 70);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        }, 35);
      } else {
        setIsDeleting(false);
        setProductIndex((prev) => (prev + 1) % TYPED_PRODUCTS.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, productIndex]);

  // Take exactly 9 products for showcase as requested
  const showcaseProducts = PRODUCTS.slice(0, 9);

  return (
    <div ref={containerRef} className="space-y-0 selection:bg-orange selection:text-white">
      {/* =================================================================
          SECTION 1: HERO — CINEMATIC INTERACTIVE SLIDER
          TEXT STAYS STILL, IMAGES UNDERNEATH CHANGE ONLY, TYPING ANIMATION
          FULL VIEW ON DESKTOP CONTAINS HERO & BOTTOM MARQUEE IN ONE VIEWPORT
          (TEXTURE VARIANT: DIAGONAL TWILL / DENIM WEAVE)
          ================================================================= */}
      <section
        className="relative min-h-screen lg:h-screen lg:max-h-screen flex flex-col justify-between bg-charcoal text-white pt-24 sm:pt-28 pb-0 overflow-hidden bg-fabric-twill-dark"
        onMouseEnter={() => setIsSliderPaused(true)}
        onMouseLeave={() => setIsSliderPaused(false)}
      >
        {/* Carousel Background Images with Smooth Cross-Fade (Images change, text stays still) */}
        <div className="absolute inset-0 z-0">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === activeSlide ? "opacity-35 scale-100" : "opacity-0 scale-105 pointer-events-none"
              }`}
              style={{ transition: "opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 8s ease-out" }}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={idx === 0}
              />
            </div>
          ))}

          {/* Cinematic Vignette, Radial Light & Weave Pattern Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-forest/35 via-transparent to-transparent opacity-70" />
        </div>

        {/* Hero Content (Static Title + Dynamic Typewriter Products) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-6 sm:py-8">
          <div className="max-w-4xl space-y-6">
            {/* Split Character-Style Animated Headline */}
            <div className="space-y-2 anim-fade-up">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-black uppercase tracking-tight leading-[0.98] text-white">
                <span className="block">
                  FROM CONCEPT TO CREATION.
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange via-beige to-white inline-block mt-3 text-xl sm:text-3xl lg:text-4xl xl:text-5xl tracking-wide min-h-[1.3em]">
                  {displayText}
                  <span className="inline-block w-[3px] sm:w-[4px] lg:w-[5px] h-[0.78em] bg-orange ml-2 align-baseline animate-pulse shadow-[0_0_8px_#E58B48]" />
                </span>
              </h1>
            </div>

            {/* Subtitle & Description */}
            <div className="space-y-2 max-w-2xl">
              <p className="text-sm sm:text-base font-heading font-bold text-beige uppercase tracking-wider">
                End-to-End Apparel Development &bull; Garment Accessories &bull; Commercial Printing
              </p>
              <p className="text-base sm:text-xl text-beige-light/90 font-light leading-relaxed">
                Your trusted manufacturing and production partner in Dhaka, Bangladesh. We take care of the complete journey from initial tech packs and material sourcing to finished, export-ready execution.
              </p>
            </div>

            {/* Dynamic CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/services/private-jobs"
                className="bg-orange hover:bg-orange-hover text-white px-8 py-4 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest inline-flex items-center gap-3 transition-all duration-300 shadow-xl hover:shadow-orange/30 hover:-translate-y-0.5"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => openQuote("Hero Inquiry")}
                className="bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white px-8 py-4 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest inline-flex items-center gap-2 transition-all duration-300"
              >
                Request Custom Quote
              </button>
            </div>
          </div>
        </div>

        {/* =================================================================
            INFINITE RUNNING MARQUEE (EMBEDDED IN HERO AT BOTTOM TO SHOW IN ONE GO ON DESKTOP)
            ================================================================= */}
        <div className="relative z-10 w-full bg-charcoal-surface/95 border-t border-white/10 py-3.5 overflow-hidden text-offwhite flex-shrink-0 backdrop-blur-sm">
          <div className="flex whitespace-nowrap animate-marquee">
            <div className="flex items-center gap-8 text-xs font-heading font-extrabold uppercase tracking-widest text-beige-light/80">
              <span>&bull; iNTEGRITY &bull; iNNOVATIVE &bull; iN-DEPTH</span>
              <span className="text-orange">&bull; QUALITY &bull; INNOVATION &bull; RELIABILITY</span>
              <span>&bull; FROM CONCEPT TO DELIVERY</span>
              <span className="text-orange">&bull; SWISS HIGH-SPEED DAMASK WEAVING</span>
              <span>&bull; AQL 1.5 EXPORT AUDIT</span>
              <span className="text-orange">&bull; GRS RECYCLED POLYESTER</span>
              <span>&bull; HEIDELBERG 6-COLOR SPEEDMASTER</span>
              <span className="text-orange">&bull; SOLID BRASS OUTERWEAR ZIPPERS</span>
              <span>&bull; FSC RECYCLED KRAFT PACKAGING</span>
              <span className="text-orange">&bull; 263, FAKIRAPOOL, MOTIJHEEL, DHAKA</span>
            </div>
            <div className="flex items-center gap-8 text-xs font-heading font-extrabold uppercase tracking-widest text-beige-light/80 ml-8">
              <span>&bull; iNTEGRITY &bull; iNNOVATIVE &bull; iN-DEPTH</span>
              <span className="text-orange">&bull; QUALITY &bull; INNOVATION &bull; RELIABILITY</span>
              <span>&bull; FROM CONCEPT TO DELIVERY</span>
              <span className="text-orange">&bull; SWISS HIGH-SPEED DAMASK WEAVING</span>
              <span>&bull; AQL 1.5 EXPORT AUDIT</span>
              <span className="text-orange">&bull; GRS RECYCLED POLYESTER</span>
              <span>&bull; HEIDELBERG 6-COLOR SPEEDMASTER</span>
              <span className="text-orange">&bull; SOLID BRASS OUTERWEAR ZIPPERS</span>
              <span>&bull; FSC RECYCLED KRAFT PACKAGING</span>
              <span className="text-orange">&bull; 263, FAKIRAPOOL, MOTIJHEEL, DHAKA</span>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION 2: TWO CORE SERVICES (MAIN SELLING POINT)
          MOVED RIGHT AFTER HERO PER USER INSTRUCTION
          (TEXTURE VARIANT: LINEN WEAVE)
          ================================================================= */}
      <section className="py-24 sm:py-32 bg-offwhite text-charcoal relative bg-fabric-linen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl space-y-3 mb-16 anim-fade-up">
            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-charcoal">
              Engineered For Modern Brands.
            </h2>
            <p className="text-sm sm:text-base text-grey-dark font-light leading-relaxed">
              Choose the exact manufacturing path suited to your scale &mdash; from complete garment tech packs and outerwear prototyping to corporate commercial printing and luxury packaging.
            </p>
          </div>

          {/* Two Highly Professional Service Columns (Spacious, Clean, Not Clumsy) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* SERVICE 01: PRIVATE JOBS */}
            <div className="group bg-white border border-charcoal/15 hover:border-orange rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
              <div>
                {/* Visual Header */}
                <Link href="/services/private-jobs" className="relative aspect-[16/10] w-full overflow-hidden block">
                  <Image
                    src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=80"
                    alt="Private Jobs Apparel Development"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-60" />
                </Link>

                {/* Editorial Content */}
                <div className="p-8 sm:p-10 space-y-6">
                  <div>
                    <Link href="/services/private-jobs">
                      <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-charcoal group-hover:text-orange transition-colors leading-tight">
                        From Tech Pack to Finished Product.
                      </h3>
                    </Link>
                    <p className="text-sm text-grey-dark leading-relaxed mt-4 font-light">
                      We provide end-to-end apparel development and manufacturing solutions. From initial concepts and technical specifications to material sourcing, sampling, product development and final production, we take care of the complete process.
                    </p>
                  </div>

                  {/* Highlights Checklist */}
                  <ul className="space-y-3 text-xs text-charcoal/90 border-t border-charcoal/10 pt-5">
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-forest/10 text-forest flex items-center justify-center flex-shrink-0">
                        <Scissors className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium">Jackets, Outerwear, Sportswear &amp; Technical Garments</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-forest/10 text-forest flex items-center justify-center flex-shrink-0">
                        <Layers className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium">Material Sourcing, Lab Dip Sampling &amp; Prototype Development</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-forest/10 text-forest flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium">Rigorous In-Line AQL 1.5 Inspection &amp; Export Carton Finishing</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Footer */}
              <div className="px-8 pb-8 sm:px-10 sm:pb-10 pt-4 border-t border-charcoal/10 flex items-center justify-between">
                <Link
                  href="/services/private-jobs"
                  className="inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-widest text-charcoal group-hover:text-orange transition-colors"
                >
                  <span>Explore Private Jobs</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* SERVICE 02: COMMERCIAL JOBS */}
            <div className="group bg-white border border-charcoal/15 hover:border-forest rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
              <div>
                {/* Visual Header */}
                <Link href="/services/commercial-jobs" className="relative aspect-[16/10] w-full overflow-hidden block">
                  <Image
                    src="https://images.unsplash.com/photo-1589363460779-cd717d7e8fa5?auto=format&fit=crop&w=1200&q=80"
                    alt="Commercial Printing & Promotional Products"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-60" />
                </Link>

                {/* Editorial Content */}
                <div className="p-8 sm:p-10 space-y-6">
                  <div>
                    <Link href="/services/commercial-jobs">
                      <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-charcoal group-hover:text-forest transition-colors leading-tight">
                        Your Design. Our Printing Expertise.
                      </h3>
                    </Link>
                    <p className="text-sm text-grey-dark leading-relaxed mt-4 font-light">
                      Whether you already have a design or need creative support from scratch, we provide customized commercial printing solutions across a wide range of products and materials.
                    </p>
                  </div>

                  {/* Highlights Checklist */}
                  <ul className="space-y-3 text-xs text-charcoal/90 border-t border-charcoal/10 pt-5">
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-forest/10 text-forest flex items-center justify-center flex-shrink-0">
                        <Printer className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium">Woven Labels, Hangtags, Trims &amp; Garment Accessories</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-forest/10 text-forest flex items-center justify-center flex-shrink-0">
                        <Box className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium">Custom Rigid Gift Boxes, FSC Paper Bags &amp; Export Cartons</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-forest/10 text-forest flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium">Brochures, Catalogues, Corporate Stationery &amp; Calendars</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Footer */}
              <div className="px-8 pb-8 sm:px-10 sm:pb-10 pt-4 border-t border-charcoal/10 flex items-center justify-between">
                <Link
                  href="/services/commercial-jobs"
                  className="inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-widest text-charcoal group-hover:text-forest transition-colors"
                >
                  <span>Explore Commercial Jobs</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION 3: BRAND STATEMENT / EDITORIAL INTRO
          (TEXTURE VARIANT: LINEN / PERPENDICULAR WEAVE)
          RIGHT MEDIA REDUCED, OVERLAY TEXT REMOVED, GARMENT PRODUCT PHOTO
          ================================================================= */}
      <section className="py-24 sm:py-32 bg-offwhite text-charcoal relative bg-fabric-linen border-t border-charcoal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6 anim-fade-up">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black uppercase tracking-tight text-charcoal leading-[1.05]">
                We Make Ideas Tangible.
              </h2>

              <p className="text-lg sm:text-xl text-grey-dark leading-relaxed font-light">
                &ldquo;We co-operate you build a strong identity for your brand with the perfect accessories and packaging.&rdquo;
              </p>

              <div className="pt-2 text-sm text-grey-dark leading-relaxed space-y-4 font-light">
                <p>
                  From developing complete apparel products to delivering customized printing and packaging solutions, we bring creativity, craftsmanship and production expertise together under one roof in Bangladesh.
                </p>
                <p>
                  As an international manufacturing partner, we bridge the gap between initial fashion sketches or tech packs and finished, export-grade garments. Simultaneously, our commercial print division produces brand identities, luxury packaging, and corporate collateral with uncompromising precision.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-widest text-charcoal hover:text-orange transition-colors group"
                >
                  <span>Discover Our Story &amp; Philosophy</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Media: Compact Tailored Layout (Text removed, reduced painting size, garments product detail) */}
            <div className="lg:col-span-5 relative anim-scale flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/3] rounded-sm overflow-hidden shadow-2xl border border-charcoal/10 group">
                <Image
                  src="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1000&q=80"
                  alt="Garment Sewing Craftsmanship"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Smaller Floating Garments Product Detail Photo with Stitch Border (Replaced weave macro) */}
              <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-6 w-1/2 aspect-square rounded-sm overflow-hidden shadow-2xl border-4 border-offwhite hidden sm:block group animate-float">
                <Image
                  src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=800&q=80"
                  alt="Garment Accessories & Woven Labels"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2 bg-charcoal/90 text-orange text-[10px] font-mono px-2 py-0.5 rounded-sm">
                  GARMENT ACCESSORIES
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION 4: THE THREE PILLARS OF EXCELLENCE (REDESIGNED 3-i)
          FIRST ICON, THEN HEADLINE, THEN DESCRIPTION
          (TEXTURE VARIANT: OXFORD / BASKETWEAVE)
          ================================================================= */}
      <section className="py-24 sm:py-32 bg-offwhite border-y border-charcoal/10 relative bg-fabric-oxford">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3 anim-fade-up">
            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-charcoal">
              THE THREE PILLARS OF EXCELLENCE.
            </h2>
            <p className="text-sm sm:text-base text-grey-dark font-light leading-relaxed">
              Grounding our global apparel manufacturing and commercial printing operations in three fundamental pillars of trust, innovation, and uncompromising precision.
            </p>
          </div>

          {/* 3 Pillars Grid: Icon First -> Headline -> Description */}
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
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION 5: FROM CONCEPT TO DELIVERY (5-STEP PROCESS FROM PDF)
          3 PER ROW ON DESKTOP, CENTER-ALIGNED CONTAINERS, TEXT LEFT-ALIGNED
          (TEXTURE VARIANT: DIAGONAL TWILL / DENIM WEAVE)
          ================================================================= */}
      <section className="py-24 sm:py-32 bg-charcoal text-white relative overflow-hidden bg-fabric-twill-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3 anim-fade-up">
            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-white">
              FROM CONCEPT TO DELIVERY.
            </h2>
            <p className="text-sm sm:text-base text-beige-light font-light leading-relaxed">
              A disciplined five-stage production framework engineered for international fashion brands.
            </p>
          </div>

          {/* 3 items per row on desktop, centered containers */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 items-stretch">
            {/* STEP 1: DESIGN */}
            <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-md bg-charcoal-card p-7 sm:p-8 rounded-sm border border-white/15 hover:border-orange transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group shadow-xl">
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
            </div>

            {/* STEP 2: DEVELOP */}
            <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-md bg-charcoal-card p-7 sm:p-8 rounded-sm border border-white/15 hover:border-orange transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group shadow-xl">
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
            </div>

            {/* STEP 3: PRODUCE */}
            <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-md bg-charcoal-card p-7 sm:p-8 rounded-sm border border-white/15 hover:border-orange transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group shadow-xl">
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
            </div>

            {/* STEP 4: PACK */}
            <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-md bg-charcoal-card p-7 sm:p-8 rounded-sm border border-white/15 hover:border-orange transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group shadow-xl">
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
            </div>

            {/* STEP 5: DELIVER */}
            <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-md bg-charcoal-card p-7 sm:p-8 rounded-sm border border-white/15 hover:border-orange transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group shadow-xl">
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
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION 6: PRODUCT SHOWCASE ("WHAT WE CREATE")
          EXACTLY 9 PRODUCTS, NO CATEGORY TABS, WITH "VIEW ALL PRODUCTS" BUTTON
          ================================================================= */}
      <section id="products" className="py-24 sm:py-32 bg-offwhite text-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header (No tabs, clean editorial headline) */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3 anim-fade-up">
            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-charcoal">
              WHAT WE CREATE.
            </h2>
            <p className="text-sm sm:text-base text-grey-dark font-light leading-relaxed">
              Authentic product categories straight from our Apparel Accessories &amp; Commercial Printing brochures. Click any item for technical specifications and instant quotation.
            </p>
          </div>

          {/* Product Cards Grid: Exactly 9 Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {showcaseProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Centered Prominent "View All Products" Button */}
          <div className="mt-16 text-center">
            <Link
              href="/services"
              className="bg-charcoal hover:bg-orange text-white px-10 py-5 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest inline-flex items-center gap-3 transition-all duration-300 shadow-xl hover:shadow-orange/30 hover:-translate-y-0.5"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION 8: WHY TEXPART? (EXACT DATA FROM PDF BROCHURE)
          (TEXTURE VARIANT: LUXURY HERRINGBONE / CHEVRON WEAVE)
          ================================================================= */}
      <section className="py-24 sm:py-32 bg-forest-dark text-offwhite relative overflow-hidden bg-fabric-herringbone-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Header & Slogan (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-widest text-orange">
                <span className="w-1.5 h-1.5 rounded-full bg-orange" />
                Value Advantage &bull; Official Brochure
              </span>
              <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-white leading-tight">
                WHY <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange via-beige to-white">
                  TEXPART?
                </span>
              </h2>

              <p className="text-sm sm:text-base text-beige-light leading-relaxed font-light">
                Grounding our operations in Bangladesh with global export standards to serve international fashion houses, budding designers, and multinational corporations with unwavering reliability.
              </p>

              {/* Special Badge from PDF: "LET'S TALK Packages & Competitive PRICING" */}
              <div className="inline-block p-4 rounded-sm bg-charcoal/80 border-2 border-dashed border-orange/60 shadow-xl">
                <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block">
                  LET&apos;S TALK
                </span>
                <span className="text-lg font-heading font-black uppercase text-white block mt-0.5">
                  Packages &amp; Competitive PRICING
                </span>
                <span className="text-[11px] text-grey-light block mt-1">
                  Flexible volume tiers &amp; tailored pilot order quantities
                </span>
              </div>
            </div>

            {/* Right The 5 Core Advantages from PDF Checklist (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white/10 border border-white/15 p-5 rounded-sm flex items-start gap-4 hover:bg-white/15 transition-all">
                <div className="w-8 h-8 rounded-full bg-orange text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-heading font-black uppercase text-white">
                    Wide Range of Accessories &amp; Packaging Solutions
                  </h3>
                  <p className="text-xs text-beige-light/80 mt-1 font-light leading-relaxed">
                    Everything from Swiss damask labels, zippers, and jacquard elastics to luxury Kappa rigid gift boxes and FSC shipping cartons.
                  </p>
                </div>
              </div>

              <div className="bg-white/10 border border-white/15 p-5 rounded-sm flex items-start gap-4 hover:bg-white/15 transition-all">
                <div className="w-8 h-8 rounded-full bg-orange text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-heading font-black uppercase text-white">
                    Customized Design &amp; Development
                  </h3>
                  <p className="text-xs text-beige-light/80 mt-1 font-light leading-relaxed">
                    In-house CAD pattern engineers, graphic artists, and structural dieline specialists crafting bespoke collections from your tech packs.
                  </p>
                </div>
              </div>

              <div className="bg-white/10 border border-white/15 p-5 rounded-sm flex items-start gap-4 hover:bg-white/15 transition-all">
                <div className="w-8 h-8 rounded-full bg-orange text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-heading font-black uppercase text-white">
                    High Quality Materials &amp; Finishing
                  </h3>
                  <p className="text-xs text-beige-light/80 mt-1 font-light leading-relaxed">
                    OEKO-TEX® Standard 100, GRS recycled polyester, soy-based non-bleeding inks, and hot foil metallic debossing.
                  </p>
                </div>
              </div>

              <div className="bg-white/10 border border-white/15 p-5 rounded-sm flex items-start gap-4 hover:bg-white/15 transition-all">
                <div className="w-8 h-8 rounded-full bg-orange text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-heading font-black uppercase text-white">
                    Competitive Price
                  </h3>
                  <p className="text-xs text-beige-light/80 mt-1 font-light leading-relaxed">
                    Direct-from-manufacturer pricing in Dhaka, eliminating intermediaries with transparent bill-of-materials and bulk volume tier discounts.
                  </p>
                </div>
              </div>

              <div className="bg-white/10 border border-white/15 p-5 rounded-sm flex items-start gap-4 hover:bg-white/15 transition-all">
                <div className="w-8 h-8 rounded-full bg-orange text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-heading font-black uppercase text-white">
                    Reliable Delivery
                  </h3>
                  <p className="text-xs text-beige-light/80 mt-1 font-light leading-relaxed">
                    Strict adherence to agreed ship windows with real-time milestone dispatch tracking, FOB Chittagong clearance, and express air options.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION 9: MANUFACTURING / CRAFTSMANSHIP SHOWCASE
          ================================================================= */}
      <section className="py-24 sm:py-32 bg-charcoal text-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-white">
              Precision in Every Detail.
            </h2>
            <p className="text-base text-grey-light font-light leading-relaxed">
              Step into our modern manufacturing floors where high-speed Swiss jacquard looms, automated CAD cutting, German offset presses, and master craftsmen converge.
            </p>
          </div>

          {/* Asymmetrical Collage */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 relative aspect-[16/10] rounded-sm overflow-hidden group border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1400&q=80"
                alt="Automated Garment Cutting & Sewing Line"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 text-white space-y-1">
                <span className="text-xs font-mono text-orange uppercase tracking-wider block">
                  FACILITY 01 &bull; APPAREL ASSEMBLY
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-black uppercase">
                  Automated CAD Cutting &amp; Assembly
                </h3>
              </div>
            </div>

            <div className="md:col-span-4 relative aspect-[4/5] md:aspect-auto rounded-sm overflow-hidden group border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80"
                alt="Swiss Jacquard Loom Weaving"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 text-white space-y-1">
                <span className="text-xs font-mono text-orange uppercase tracking-wider block">
                  FACILITY 02 &bull; WEAVING
                </span>
                <h3 className="text-lg font-heading font-black uppercase">
                  High-Density Damask Loom
                </h3>
              </div>
            </div>

            <div className="md:col-span-4 relative aspect-[4/5] md:aspect-auto rounded-sm overflow-hidden group border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1589363460779-cd717d7e8fa5?auto=format&fit=crop&w=800&q=80"
                alt="Offset Press Printing"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 text-white space-y-1">
                <span className="text-xs font-mono text-orange uppercase tracking-wider block">
                  FACILITY 03 &bull; COMMERCIAL PRINT
                </span>
                <h3 className="text-lg font-heading font-black uppercase">
                  Heidelberg Speedmaster Offset
                </h3>
              </div>
            </div>

            <div className="md:col-span-8 relative aspect-[16/10] rounded-sm overflow-hidden group border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1400&q=80"
                alt="Garment Quality Inspection"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 text-white space-y-1">
                <span className="text-xs font-mono text-orange uppercase tracking-wider block">
                  FACILITY 04 &bull; AQL 1.5 AUDIT
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-black uppercase">
                  Strict 100% In-Line Quality Inspection
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION 10: GALLERY PREVIEW
          (TEXTURE VARIANT: LINEN WEAVE)
          ================================================================= */}
      <section className="py-24 sm:py-32 bg-offwhite text-charcoal relative bg-fabric-linen border-t border-charcoal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-charcoal">
                Manufacturing in Action.
              </h2>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-widest text-orange hover:text-orange-hover group"
            >
              <span>Explore Full Gallery Archive</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY_ITEMS.slice(0, 4).map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  openLightbox({
                    src: item.image,
                    title: item.title,
                    meta: item.categoryLabel || item.location || "",
                  })
                }
                className="relative aspect-square rounded-sm overflow-hidden group text-left border border-charcoal/10"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-white">
                    <span className="text-[10px] font-mono uppercase text-orange block">
                      {item.category}
                    </span>
                    <span className="text-xs font-heading font-bold uppercase block">
                      {item.title}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION 11: FINAL HIGH-IMPACT CTA WITH OFFICIAL CONTACT DATA
          (TEXTURE VARIANT: OXFORD / BASKETWEAVE DARK)
          ================================================================= */}
      <section className="pt-20 sm:pt-28 pb-8 sm:pb-10 bg-charcoal text-white relative overflow-hidden bg-fabric-oxford-dark">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black uppercase tracking-tight text-white leading-tight">
            Ready to Create Something <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange via-beige to-white">
              Exceptional?
            </span>
          </h2>

          <p className="text-base sm:text-xl text-beige-light max-w-2xl mx-auto font-light leading-relaxed">
            Whether you need custom trims, woven labels, rigid packaging boxes, or full apparel tech pack manufacturing, our team in Dhaka is ready to assist.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openQuote("General Project Inquiry")}
              className="bg-orange hover:bg-orange-hover text-white px-10 py-5 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest inline-flex items-center gap-3 transition-all duration-300 shadow-xl hover:shadow-orange/30 hover:scale-105"
            >
              <span>Request a Quote Today</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/contact"
              className="bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white px-10 py-5 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest inline-flex items-center gap-2 transition-all"
            >
              Contact Our Team
            </Link>
          </div>

          {/* Official Brochure Contact Strip */}
          <div className="pt-8 mt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-grey-light font-light text-center">
            <div>
              <span className="font-heading font-bold text-beige uppercase tracking-wider block">
                Office &amp; Factory
              </span>
              <span className="mt-1 block">263, Fakirapool, Motijheel, Dhaka</span>
            </div>
            <div>
              <span className="font-heading font-bold text-beige uppercase tracking-wider block">
                Direct Hotline
              </span>
              <span className="mt-1 block">+880 161 308 4465 &bull; +880 171 308 4465</span>
            </div>
            <div>
              <span className="font-heading font-bold text-beige uppercase tracking-wider block">
                Corporate Email
              </span>
              <span className="mt-1 block">texpartdesign@gmail.com</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
