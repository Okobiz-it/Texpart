"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GALLERY_ITEMS } from "@/data/gallery";
import { useQuote } from "@/context/QuoteContext";
import { GalleryCategory } from "@/types";
import {
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowRight,
} from "lucide-react";

const ITEMS_PER_PAGE = 12;

export default function GalleryPage() {
  const { openQuote } = useQuote();
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const categories: { key: GalleryCategory; label: string }[] = [
    { key: "all", label: "All Works" },
    { key: "garment-production", label: "Garment Production" },
    { key: "apparel-accessories", label: "Apparel Accessories" },
    { key: "printing", label: "Printing" },
    { key: "packaging", label: "Packaging" },
    { key: "finished-products", label: "Finished Products" },
  ];

  const filteredItems =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
        );
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) =>
          prev !== null ? (prev + 1) % filteredItems.length : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, filteredItems.length]);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) =>
      prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
    );
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) =>
      prev !== null ? (prev + 1) % filteredItems.length : null
    );
  };

  const handleCategorySelect = (catKey: GalleryCategory) => {
    setActiveCategory(catKey);
    setCurrentPage(1);
    setActiveIndex(null);
  };

  return (
    <div className="bg-offwhite min-h-screen text-charcoal">
      {/* Header Banner with Fabric Canvas Weave (FLUSH TO TOP UNDER NAV) */}
      <section className="pt-28 pb-16 sm:pt-32 sm:pb-20 bg-charcoal text-white relative overflow-hidden bg-fabric-canvas-dark">
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/90 to-charcoal/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block">
              Visual Archive &bull; Motijheel, Dhaka Facilities
            </span>
            <h1 className="text-4xl sm:text-6xl font-heading font-black uppercase tracking-tight text-white leading-tight">
              Craftsmanship <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange via-beige to-white">
                Documented.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-beige-light leading-relaxed font-light pt-2">
              Explore authentic photography from our garment assembly lines, precision loom workshops, Heidelberg offset printing presses, and luxury packaging ateliers in Bangladesh.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Image-Only Gallery Grid with Pagination */}
      <section className="py-16 sm:py-24 bg-offwhite text-charcoal min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleCategorySelect(cat.key)}
                className={`px-5 py-2.5 rounded-sm font-heading text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeCategory === cat.key
                    ? "bg-charcoal text-white shadow-md"
                    : "bg-white text-grey-dark border border-charcoal/10 hover:border-charcoal"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Image-Only Grid (12 Images Per Page, No Extra Text or Descriptions) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {paginatedItems.map((item, index) => {
              const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIndex(globalIndex)}
                  className="group relative aspect-[4/3] rounded-sm overflow-hidden bg-charcoal border border-charcoal/10 hover:border-orange cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Square Stretch/Expand Icon indicating stretching it big */}
                  <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-sm bg-white/95 text-charcoal flex items-center justify-center shadow-2xl transition-transform duration-300 scale-90 group-hover:scale-100 hover:bg-orange hover:text-white">
                      <Maximize2 className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls (12 Images per page) */}
          {totalPages > 1 && (
            <div className="mt-16 pt-8 border-t border-charcoal/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-mono text-grey-dark uppercase tracking-wider">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} &ndash;{" "}
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredItems.length)} of{" "}
                {filteredItems.length} Archive Images
              </span>

              <div className="flex items-center gap-2">
                {/* Previous Page Button */}
                <button
                  onClick={() => {
                    setCurrentPage((prev) => Math.max(1, prev - 1));
                    window.scrollTo({ top: 350, behavior: "smooth" });
                  }}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-sm text-xs font-heading font-bold uppercase tracking-wider border border-charcoal/15 bg-white text-charcoal hover:border-orange disabled:opacity-40 disabled:hover:border-charcoal/15 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {/* Page Number Buttons */}
                {Array.from({ length: totalPages }).map((_, pIdx) => {
                  const pageNum = pIdx + 1;
                  const isActive = pageNum === currentPage;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => {
                        setCurrentPage(pageNum);
                        window.scrollTo({ top: 350, behavior: "smooth" });
                      }}
                      className={`w-10 h-9 rounded-sm text-xs font-heading font-extrabold uppercase transition-all ${
                        isActive
                          ? "bg-charcoal text-white shadow-md border border-charcoal"
                          : "bg-white text-charcoal border border-charcoal/15 hover:border-orange"
                      }`}
                    >
                      0{pageNum}
                    </button>
                  );
                })}

                {/* Next Page Button */}
                <button
                  onClick={() => {
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                    window.scrollTo({ top: 350, behavior: "smooth" });
                  }}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-sm text-xs font-heading font-bold uppercase tracking-wider border border-charcoal/15 bg-white text-charcoal hover:border-orange disabled:opacity-40 disabled:hover:border-charcoal/15 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
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
          BIG LIGHTBOX MODAL WITH PROPER LEFT-RIGHT CONTROLLER
          ================================================================= */}
      {activeIndex !== null && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-md">
          {/* Backdrop click to close */}
          <div
            className="fixed inset-0"
            onClick={() => setActiveIndex(null)}
            aria-hidden="true"
          />

          {/* Close Button */}
          <button
            onClick={() => setActiveIndex(null)}
            className="absolute top-5 right-5 z-40 w-12 h-12 rounded-full bg-white/10 hover:bg-orange text-white flex items-center justify-center transition-colors shadow-lg hover:scale-105"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow Controller (Previous) */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/15 hover:bg-orange text-white flex items-center justify-center transition-all shadow-2xl backdrop-blur-md hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          {/* Right Arrow Controller (Next) */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/15 hover:bg-orange text-white flex items-center justify-center transition-all shadow-2xl backdrop-blur-md hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Big Image Viewport Container */}
          <div
            className="relative z-20 w-full max-w-6xl h-[82vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[76vh] rounded-sm overflow-hidden shadow-2xl">
              <Image
                src={filteredItems[activeIndex].image}
                alt={filteredItems[activeIndex].title}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Bottom Counter & Title Strip */}
            <div className="mt-3 flex items-center justify-between w-full text-xs font-mono text-grey-light px-2">
              <span className="font-heading font-extrabold uppercase tracking-widest text-white text-sm">
                {filteredItems[activeIndex].title}
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-sm text-beige font-mono">
                0{activeIndex + 1} / 0{filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Fabric CTA Banner */}
      <section className="py-20 sm:py-28 bg-charcoal text-white relative overflow-hidden bg-fabric-oxford-dark">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="border-2 border-dashed border-white/20 p-8 sm:p-14 rounded-sm bg-charcoal/80 backdrop-blur-sm text-center space-y-6">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block">
              Authentic Production Samples
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-white">
              Inspired By What You See?
            </h2>
            <p className="text-sm sm:text-base text-beige-light/90 max-w-2xl mx-auto font-light leading-relaxed">
              &ldquo;We co-operate you build a strong identity for your brand with the perfect accessories and packaging.&rdquo; &mdash; Visit our facilities in Motijheel, Dhaka or schedule a live digital consultation.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => openQuote("Gallery Archive Inquiry")}
                className="bg-orange hover:bg-orange-hover text-white px-9 py-4 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest inline-flex items-center gap-3 transition-all duration-300 shadow-xl hover:shadow-orange/30 hover:scale-105"
              >
                <span>Request Custom Samples</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/contact"
                className="bg-transparent hover:bg-white/10 text-white border border-white/30 px-8 py-4 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest inline-flex items-center gap-2 transition-all"
              >
                Schedule Facility Tour
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
