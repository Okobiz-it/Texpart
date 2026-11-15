"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ServiceDetail } from "@/data/services";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useQuote } from "@/context/QuoteContext";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

interface ServiceDetailClientProps {
  service: ServiceDetail;
}

const ITEMS_PER_PAGE = 9;

export default function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  const { openQuote } = useQuote();
  const [currentPage, setCurrentPage] = useState(1);

  const isPrivate = service.slug === "private-jobs";

  // Filter products specifically belonging to this service division
  const divisionProducts = PRODUCTS.filter((p) =>
    isPrivate ? p.collectionId === "accessories" : p.collectionId === "commercial"
  );

  // Pagination calculation
  const totalPages = Math.ceil(divisionProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = divisionProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const section = document.getElementById("products");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-offwhite min-h-screen text-charcoal">
      {/* =================================================================
          1. BANNER: CLEAN DARK TWILL WEAVE HERO WITH NO IMAGES
          (FLUSH TO TOP UNDER NAV WITH ZERO GAP)
          ================================================================= */}
      <section className="relative pt-28 pb-14 sm:pt-32 sm:pb-18 bg-charcoal text-white overflow-hidden bg-fabric-twill-dark">
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/90 to-charcoal/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-forest/30 via-transparent to-transparent opacity-60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-heading font-medium text-grey-light mb-8 uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-grey" />
            <span className="hover:text-white transition-colors">
              Services
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-grey" />
            <span className="text-orange">{isPrivate ? "Private Jobs" : "Commercial Jobs"}</span>
          </nav>

          <div className="max-w-4xl space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black uppercase tracking-tight text-white leading-tight">
              {isPrivate ? (
                <>
                  YOUR COMPLETE PARTNER <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange via-beige to-white">
                    FOR APPAREL ACCESSORIES &amp; PACKAGING.
                  </span>
                </>
              ) : (
                <>
                  YOUR COMPLETE PARTNER <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange via-beige to-white">
                    FOR COMMERCIAL PRINTING &amp; PROMOTION.
                  </span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-xl text-beige-light/90 max-w-3xl font-light leading-relaxed">
              {isPrivate
                ? "End-to-end apparel development, custom trim engineering, and export packaging solutions built from scratch under one roof in Dhaka, Bangladesh."
                : "High-precision commercial offset printing, corporate stationery, luxury rigid packaging, and customized promotional products for modern brands."}
            </p>

            {/* Quick Action CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() =>
                  openQuote(
                    isPrivate
                      ? "Private Jobs (Apparel Accessories & Packaging)"
                      : "Commercial Jobs (Commercial Printing & Packaging)",
                    isPrivate ? "Private Jobs" : "Commercial Jobs"
                  )
                }
                className="px-8 py-4 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest inline-flex items-center gap-3 transition-all duration-300 shadow-xl hover:-translate-y-0.5 text-white bg-orange hover:bg-orange-hover shadow-orange/20"
              >
                Request Custom Quotation
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#products"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-7 py-4 rounded-sm font-heading text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all"
              >
                <span>Explore Products ({divisionProducts.length})</span>
                <ChevronRight className="w-3.5 h-3.5 text-orange" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          2. SERVICE DESCRIPTION & CORE PHILOSOPHY (FULL-WIDTH CLEAN FLOW)
          ================================================================= */}
      <section className="py-20 sm:py-28 bg-white border-b border-charcoal/10 bg-fabric-linen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading at Top */}
          <div className="mb-12 max-w-4xl">
            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-charcoal leading-tight">
              {isPrivate ? (
                <>
                  WE CREATE SOLUTIONS <br className="hidden sm:inline" />
                  <span className="text-orange">FROM SCRATCH TO FINISHED PRODUCT.</span>
                </>
              ) : (
                <>
                  YOUR DESIGN. <br className="hidden sm:inline" />
                  <span className="text-orange">OUR COMMERCIAL PRINTING EXPERTISE.</span>
                </>
              )}
            </h2>
          </div>

          {/* Full-Width Narrative Details & 5 Brochure Pillars */}
          <div className="space-y-10">
            <div className="space-y-5 text-base sm:text-lg text-grey-dark leading-relaxed font-light max-w-5xl">
              {isPrivate ? (
                <>
                  <p className="text-lg sm:text-xl text-charcoal font-normal leading-relaxed">
                    In our <strong>Private Jobs Division</strong>, we deliver complete, end-to-end product development and manufacturing. Rather than simply supplying individual loose items, we take complete ownership of your requirements from scratch.
                  </p>
                  <p>
                    Consider a custom metal zipper: our engineers draft the CAD technical specifications, custom-cast the branded alloy pullers and sliders, weave high-tensile polyester tape, assemble the teeth with micro tolerances, execute rigorous seam tensile and wash-fastness testing, and deliver an export-ready packaged component ready for garment production lines.
                  </p>
                  <p>
                    From Swiss-loom woven labels, architectural paperboard hangtags, jacquard elastics, and cords to heavy-duty export poly bags and corrugated cartons, our Dhaka production hub handles the entire spectrum under one unified roof.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-lg sm:text-xl text-charcoal font-normal leading-relaxed">
                    In our <strong>Commercial Jobs Division</strong>, we provide high-precision commercial printing and promotional packaging. Whether you are launching a global corporate campaign, outfitting retail stores, or producing luxury brand gift sets, we have the machinery and craftsmanship to fulfill your orders.
                  </p>
                  <p>
                    <strong>Flexible Design Options:</strong> You can provide your own print-ready files (PDF, AI, InDesign) with specific Pantone color profiles, or our in-house creative design team can develop custom layouts, typography, and structural packaging dielines tailored specifically to your brand identity.
                  </p>
                  <p>
                    Utilizing high-speed multi-color Heidelberg speedmaster presses, automatic foil stamping, spot UV curing, and computer-guided die-cutting, we guarantee vibrant ink density, sharp registration, and immaculate tactile finishes across all commercial print runs.
                  </p>
                </>
              )}
            </div>

            {/* The 5 Pillars from Official PDF Brochure */}
            <div className="pt-8 border-t border-charcoal/10">
              <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-charcoal block mb-6">
                Five Core Manufacturing Standards (Official Brochure)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="p-5 bg-offwhite rounded-sm border border-charcoal/10 flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-heading font-bold uppercase text-charcoal">
                      Customized Solutions
                    </h4>
                    <p className="text-[11px] text-grey-dark mt-1 font-light leading-relaxed">
                      Tailored specs, bespoke molds, and structural packaging dielines.
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-offwhite rounded-sm border border-charcoal/10 flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-heading font-bold uppercase text-charcoal">
                      Consistent Quality
                    </h4>
                    <p className="text-[11px] text-grey-dark mt-1 font-light leading-relaxed">
                      OEKO-TEX Class I, GRS certified materials, and Heidelberg press accuracy.
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-offwhite rounded-sm border border-charcoal/10 flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-heading font-bold uppercase text-charcoal">
                      Competitive Pricing
                    </h4>
                    <p className="text-[11px] text-grey-dark mt-1 font-light leading-relaxed">
                      Direct manufacturing advantage from Bangladesh with zero middleman markups.
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-offwhite rounded-sm border border-charcoal/10 flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-heading font-bold uppercase text-charcoal">
                      Reliable Delivery
                    </h4>
                    <p className="text-[11px] text-grey-dark mt-1 font-light leading-relaxed">
                      FOB Chittagong port consolidation or rapid express air dispatch from Dhaka.
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-offwhite rounded-sm border border-charcoal/10 flex items-start gap-3.5 sm:col-span-2 lg:col-span-2">
                  <CheckCircle2 className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-heading font-bold uppercase text-charcoal">
                      Professional Service
                    </h4>
                    <p className="text-[11px] text-grey-dark mt-1 font-light leading-relaxed">
                      Dedicated bilingual technical merchandisers providing end-to-end milestone updates throughout production.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          3. PRODUCTS OFFERED BY THIS SERVICE DIVISION (9 PER PAGE + PAGINATION)
          ================================================================= */}
      <section id="products" className="py-20 sm:py-32 bg-offwhite text-charcoal scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block mb-2">
              Official Brochure Portfolio ({divisionProducts.length} Product Categories)
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-charcoal">
              {isPrivate ? "Apparel Accessories & Packaging Range." : "Commercial Print & Promotional Products."}
            </h2>
            <p className="text-sm sm:text-base text-grey-dark mt-3 font-light leading-relaxed">
              {isPrivate
                ? "Authentic garment trim categories directly from our Apparel Accessories brochure. Click any product category for comprehensive technical tolerances and quotation."
                : "Authentic commercial printing and branding items straight from our Commercial Printing brochure. Choose your products and request instant customized pricing."}
            </p>
          </div>

          {/* Product Cards Grid (9 items per page) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-14 pt-8 border-t border-charcoal/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-grey-dark font-mono">
                Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} &ndash;{" "}
                {Math.min(currentPage * ITEMS_PER_PAGE, divisionProducts.length)} of {divisionProducts.length} Products
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-charcoal/15 rounded-sm text-xs font-heading font-bold uppercase tracking-wider text-charcoal hover:bg-charcoal hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none inline-flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-9 h-9 rounded-sm text-xs font-heading font-bold transition-all ${
                        currentPage === page
                          ? "bg-orange text-white shadow-sm"
                          : "border border-charcoal/10 text-charcoal hover:bg-charcoal/5"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-charcoal/15 rounded-sm text-xs font-heading font-bold uppercase tracking-wider text-charcoal hover:bg-charcoal hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none inline-flex items-center gap-1.5"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =================================================================
          4. PROMINENT QUOTATION BANNER
          (TEXTURE VARIANT: OXFORD BASKETWEAVE DARK WITH STITCH BORDER)
          ================================================================= */}
      <section className="py-20 sm:py-32 bg-charcoal text-white relative overflow-hidden bg-fabric-oxford-dark">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="border-2 border-dashed border-white/20 p-8 sm:p-12 lg:p-14 rounded-sm bg-charcoal/80 backdrop-blur-sm text-center space-y-5 shadow-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-widest text-orange">
              <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
              Direct Factory Partnership &bull; Motijheel, Dhaka
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black uppercase tracking-tight text-white leading-tight">
              Ready to Produce With {isPrivate ? "Private Jobs" : "Commercial Jobs"}?
            </h2>

            <p className="text-xs sm:text-sm text-beige-light/90 max-w-2xl mx-auto font-light leading-relaxed">
              &ldquo;We co-operate you build a strong identity for your brand with the perfect accessories and packaging.&rdquo; &mdash; Our Motijheel, Dhaka manufacturing team is equipped to fulfill your volume requirements.
            </p>

            {/* Prominent Quotation Button */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() =>
                  openQuote(
                    isPrivate ? "Private Jobs Division Consultation" : "Commercial Print Division Consultation",
                    isPrivate ? "Apparel Accessories & Packaging" : "Commercial Printing & Promotion"
                  )
                }
                className="w-full sm:w-auto px-9 py-4 rounded-sm font-heading text-xs sm:text-sm font-black uppercase tracking-widest inline-flex items-center justify-center gap-3 transition-all duration-300 shadow-2xl hover:scale-105 text-white bg-orange hover:bg-orange-hover shadow-orange/30"
              >
                <span>Request Quotation For {isPrivate ? "Private Jobs" : "Commercial Jobs"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/contact"
                className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border border-white/30 px-8 py-4 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest inline-flex items-center justify-center gap-2 transition-all"
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
    </div>
  );
}
