"use client";

import React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useQuote } from "@/context/QuoteContext";
import {
  ArrowRight,
  Scissors,
  Printer,
  Sparkles,
  ShieldCheck,
  Video,
  ExternalLink,
} from "lucide-react";

export default function ServicesPage() {
  const { openQuote } = useQuote();

  // Split products by collection/division
  const privateProducts = PRODUCTS.filter((p) => p.collectionId === "accessories");
  const commercialProducts = PRODUCTS.filter((p) => p.collectionId === "commercial");

  return (
    <div className="bg-offwhite min-h-screen text-charcoal">
      {/* =================================================================
          1. BANNER: HERO WITH GARMENTS VIBE & FABRIC TWILL WEAVE
          (FLUSH TO TOP WITH ZERO GAP UNDER NAV)
          ================================================================= */}
      <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-36 bg-charcoal text-white overflow-hidden bg-fabric-twill-dark">
        {/* Subtle radial glow & gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/90 to-charcoal/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-forest/30 via-transparent to-transparent opacity-60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-orange text-white text-xs font-heading font-extrabold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Two Core Business Solutions
              </span>
              <span className="text-xs font-heading uppercase tracking-widest text-beige border border-white/15 px-3 py-1 rounded-sm backdrop-blur-md">
                263, Fakirapool, Motijheel, Dhaka
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black uppercase tracking-tight text-white leading-tight">
              Two Pillars of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange via-beige to-white">
                Production Excellence.
              </span>
            </h1>

            {/* Slogan from brochure */}
            <div className="inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-widest text-orange border-l-2 border-orange pl-3">
              LET&apos;S CREATE. LET&apos;S DEVELOP. LET&apos;S DELIVER.
            </div>

            <p className="text-base sm:text-xl text-beige-light/90 max-w-3xl font-light leading-relaxed">
              We operate two specialized manufacturing divisions tailored to international brands and corporate clients: End-to-end Apparel Development &amp; Manufacturing (Private Jobs) and High-Precision Commercial Printing &amp; Packaging (Commercial Jobs).
            </p>

            {/* Quick Navigation Anchor Chips */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href="#private-jobs"
                className="bg-orange hover:bg-orange-hover text-white px-6 py-3.5 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest inline-flex items-center gap-2 transition-all shadow-lg hover:shadow-orange/30"
              >
                <Scissors className="w-4 h-4" />
                Jump to Private Jobs ({privateProducts.length} Products)
              </a>
              <a
                href="#commercial-jobs"
                className="bg-cyan hover:bg-blue text-white px-6 py-3.5 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest inline-flex items-center gap-2 transition-all shadow-lg hover:shadow-cyan/30"
              >
                <Printer className="w-4 h-4" />
                Jump to Commercial Jobs ({commercialProducts.length} Products)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          2. DIVISION 01: PRIVATE JOBS (BANNER -> TEXTS -> PRODUCTS)
          (TEXTURE VARIANT: OXFORD BASKETWEAVE)
          ================================================================= */}
      <section id="private-jobs" className="py-24 sm:py-32 bg-offwhite border-b border-charcoal/10 relative bg-fabric-oxford">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* TEXTS FIRST */}
          <div className="max-w-4xl space-y-6 mb-16">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono font-bold text-orange uppercase tracking-wider bg-orange/10 px-3 py-1 rounded-sm">
                DIVISION 01 &bull; APPAREL MANUFACTURING
              </span>
              <span className="text-xs text-grey-dark font-heading uppercase tracking-wider">
                Full-Package Production
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-charcoal leading-tight">
              From Tech Pack to Finished Product.
            </h2>

            <p className="text-base sm:text-lg text-grey-dark leading-relaxed font-light">
              We provide end-to-end apparel development and manufacturing solutions. Starting from initial concepts, technical sketches, and tech packs through to material sourcing, prototype sampling, fit refinement, bulk sewing, and global carton export.
            </p>

            <div className="text-sm text-grey-dark leading-relaxed space-y-3 pt-2">
              <p>
                Our Private Jobs division serves international fashion labels, outerwear designers, and apparel importers. We combine precision pattern drafting, computer-guided cutting tables, and dedicated assembly lines with in-house manufacturing of all garment trims, labels, zippers, and export packaging.
              </p>
            </div>

            {/* Action Bar: Link to Dedicated Services Details Page + Direct Quote CTA */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/services/private-jobs"
                className="bg-charcoal hover:bg-forest text-white px-7 py-4 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest inline-flex items-center gap-3 transition-all shadow-md group"
              >
                <Video className="w-4 h-4 text-orange" />
                <span>View Factory Videos &amp; Process Details</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <button
                onClick={() => openQuote("Private Jobs Apparel Manufacturing", "Private Jobs")}
                className="bg-orange hover:bg-orange-hover text-white px-7 py-4 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest inline-flex items-center gap-2 transition-all shadow-lg hover:shadow-orange/30"
              >
                Submit Tech Pack For Quote
              </button>
            </div>
          </div>

          {/* PRODUCTS OF THAT SERVICE */}
          <div className="pt-10 border-t border-charcoal/10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block mb-1">
                  Brochure 02 Catalog
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-charcoal">
                  Apparel Accessories &amp; Packaging Products
                </h3>
              </div>
              <span className="text-xs font-heading font-semibold text-grey-dark uppercase tracking-wider">
                Showing {privateProducts.length} Product Categories
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {privateProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          3. DIVISION 02: COMMERCIAL JOBS (BANNER -> TEXTS -> PRODUCTS)
          (TEXTURE VARIANT: ORGANIC CANVAS WEAVE)
          ================================================================= */}
      <section id="commercial-jobs" className="py-24 sm:py-32 bg-white border-b border-charcoal/10 relative bg-fabric-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* TEXTS FIRST */}
          <div className="max-w-4xl space-y-6 mb-16">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono font-bold text-cyan uppercase tracking-wider bg-cyan/10 px-3 py-1 rounded-sm">
                DIVISION 02 &bull; COMMERCIAL PRINTING &amp; PACKAGING
              </span>
              <span className="text-xs text-grey-dark font-heading uppercase tracking-wider">
                Heidelberg Offset Precision
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-charcoal leading-tight">
              Your Design. Our Printing Expertise.
            </h2>

            <p className="text-base sm:text-lg text-grey-dark leading-relaxed font-light">
              Whether you already have a design or need creative support from scratch, we provide customized commercial printing solutions across a wide range of products and materials &mdash; from promotional brochures and executive diaries to luxury rigid gift boxes.
            </p>

            {/* Two Options Highlight Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="bg-offwhite p-6 rounded-sm border border-charcoal/10 space-y-2">
                <span className="text-xs font-mono font-bold text-cyan block">
                  OPTION 01: PRINT FROM YOUR DESIGN
                </span>
                <h4 className="text-lg font-heading font-black uppercase text-charcoal">
                  Upload Print-Ready Artwork
                </h4>
                <p className="text-xs text-grey-dark leading-relaxed">
                  Pre-flight color separation, calibrated PDF/wet proofing, and high-speed offset runs on Heidelberg 6-color presses.
                </p>
              </div>

              <div className="bg-offwhite p-6 rounded-sm border border-charcoal/10 space-y-2">
                <span className="text-xs font-mono font-bold text-orange block">
                  OPTION 02: CREATIVE DESIGN SUPPORT
                </span>
                <h4 className="text-lg font-heading font-black uppercase text-charcoal">
                  Creative Studio + Production
                </h4>
                <p className="text-xs text-grey-dark leading-relaxed">
                  Our packaging engineers draft dielines, select luxury paperboards, and craft typography and foil finishes from scratch.
                </p>
              </div>
            </div>

            {/* Action Bar: Link to Dedicated Services Details Page + Direct Quote CTA */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/services/commercial-jobs"
                className="bg-charcoal hover:bg-forest text-white px-7 py-4 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest inline-flex items-center gap-3 transition-all shadow-md group"
              >
                <Video className="w-4 h-4 text-cyan" />
                <span>View Press Hall Videos &amp; Process Details</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <button
                onClick={() => openQuote("Commercial Printing Solutions", "Commercial Jobs")}
                className="bg-cyan hover:bg-blue text-white px-7 py-4 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest inline-flex items-center gap-2 transition-all shadow-lg hover:shadow-cyan/30"
              >
                Request Commercial Print Quote
              </button>
            </div>
          </div>

          {/* PRODUCTS OF THAT SERVICE */}
          <div className="pt-10 border-t border-charcoal/10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-cyan block mb-1">
                  Brochure 01 Catalog
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-charcoal">
                  Commercial Printing &amp; Packaging Products
                </h3>
              </div>
              <span className="text-xs font-heading font-semibold text-grey-dark uppercase tracking-wider">
                Showing {commercialProducts.length} Product Categories
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {commercialProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          4. BOTTOM B2B QUOTATION BANNER
          (TEXTURE VARIANT: LUXURY HERRINGBONE DARK)
          ================================================================= */}
      <section className="py-20 sm:py-28 bg-charcoal text-white relative overflow-hidden bg-fabric-herringbone-dark">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="border-2 border-dashed border-white/20 p-8 sm:p-12 rounded-sm bg-charcoal/80 backdrop-blur-sm text-center space-y-6">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block">
              LET&apos;S TALK PACKAGES &bull; COMPETITIVE PRICING
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-tight text-white">
              Have Specific Garment or Printing Specs?
            </h2>
            <p className="text-sm sm:text-base text-beige-light/90 max-w-2xl mx-auto font-light leading-relaxed">
              We provide fast, accurate quotations based on your tech packs, sample swatches, or artwork files. Pilot runs and large-scale bulk exports handled with equal dedication.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => openQuote("Custom Order Consultation")}
                className="bg-orange hover:bg-orange-hover text-white px-8 py-4 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest inline-flex items-center gap-2 transition-all shadow-lg hover:shadow-orange/30"
              >
                Request Custom Quotation
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/contact"
                className="bg-transparent hover:bg-white/10 text-white border border-white/30 px-7 py-4 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest inline-flex items-center gap-2 transition-all"
              >
                Visit Motijheel Head Office
              </Link>
            </div>

            {/* Official contact pill */}
            <div className="pt-6 border-t border-white/10 text-xs text-grey-light font-mono flex flex-wrap items-center justify-center gap-6">
              <span>📍 263, Fakirapool, Motijheel, Dhaka</span>
              <span>📞 +880 161 308 4465</span>
              <span>✉️ texpartdesign@gmail.com</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
