"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GALLERY_ITEMS } from "@/data/gallery";
import { useQuote } from "@/context/QuoteContext";
import {
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowRight,
  Shirt,
} from "lucide-react";

const ITEMS_PER_PAGE = 24;

export default function GalleryPage() {
  const { openGeneralQuote } = useQuote();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const totalPages = Math.max(1, Math.ceil(GALLERY_ITEMS.length / ITEMS_PER_PAGE));
  const paginatedItems = GALLERY_ITEMS.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          setActiveIndex(null);
        }
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null
        );
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) =>
          prev !== null ? (prev + 1) % GALLERY_ITEMS.length : null
        );
      } else if (e.key === "f" || e.key === "F") {
        setIsFullscreen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, isFullscreen]);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) =>
      prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null
    );
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) =>
      prev !== null ? (prev + 1) % GALLERY_ITEMS.length : null
    );
  };

  return (
    <div className="bg-white text-[#0A2540]">
      {/* Header Banner (Generous padding, zero squeezing) */}
      <section className="pt-32 sm:pt-36 pb-14 sm:pb-16 bg-gradient-to-r from-[#061730] via-[#0A2540] to-[#003B73] text-white overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black uppercase tracking-tight text-white leading-tight">
              Manufacturing &amp; Sourcing <br />
              <span className="text-blue-400">Gallery Archive</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light pt-1">
              Explore authentic photography from our garment assembly lines, precision loom workshops, Heidelberg offset printing presses, and luxury packaging ateliers in Bangladesh.
            </p>
          </div>
        </div>
      </section>

      {/* Image Grid (Tabs removed per request, direct presentation) */}
      <section className="py-8 sm:py-10 bg-white text-[#0A2540]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {paginatedItems.map((item, index) => {
              const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIndex(globalIndex)}
                  className="group relative aspect-[4/3] rounded-[4px] overflow-hidden bg-slate-100 border border-slate-200 hover:border-[#0066CC] cursor-pointer shadow-sm transition-all duration-200"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />

                  {/* Square Expand Icon on Hover */}
                  <div className="absolute inset-0 bg-[#061730]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-[4px] bg-white text-[#0066CC] flex items-center justify-center shadow-lg transition-transform duration-200 hover:bg-[#0066CC] hover:text-white">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500 font-medium">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} &ndash;{" "}
                {Math.min(currentPage * ITEMS_PER_PAGE, GALLERY_ITEMS.length)} of{" "}
                {GALLERY_ITEMS.length} Archive Images
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage((prev) => Math.max(1, prev - 1));
                    window.scrollTo({ top: 250, behavior: "smooth" });
                  }}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-[4px] text-xs font-heading font-bold border border-slate-200 bg-white text-[#0A2540] hover:border-[#0066CC] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                {Array.from({ length: totalPages }).map((_, pIdx) => {
                  const pageNum = pIdx + 1;
                  const isActive = pageNum === currentPage;
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => {
                        setCurrentPage(pageNum);
                        window.scrollTo({ top: 250, behavior: "smooth" });
                      }}
                      className={`w-7 h-7 rounded-[4px] text-xs font-heading font-bold transition-all ${
                        isActive
                          ? "bg-[#0066CC] text-white shadow-sm"
                          : "bg-white text-slate-600 border border-slate-200 hover:border-[#0066CC]"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                    window.scrollTo({ top: 250, behavior: "smooth" });
                  }}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-[4px] text-xs font-heading font-bold border border-slate-200 bg-white text-[#0A2540] hover:border-[#0066CC] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal with Fullscreen & Smooth Controller Image Transitions */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] overflow-hidden flex items-center justify-center transition-all duration-300 backdrop-blur-md"
          style={{
            backgroundColor: isFullscreen ? "#000000" : "rgba(5, 15, 30, 0.96)",
          }}
        >
          {/* Backdrop Click */}
          <div
            className="fixed inset-0"
            onClick={() => {
              setActiveIndex(null);
              setIsFullscreen(false);
            }}
            aria-hidden="true"
          />

          {/* Top Control Bar (Squeeze/Fullscreen Toggle + Close Button) */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[10000] flex items-center gap-2.5">
            {/* Fullscreen / Squeeze (Restore) Toggle Button */}
            <button
              type="button"
              onClick={() => setIsFullscreen((prev) => !prev)}
              className="px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-[4px] bg-black/80 hover:bg-[#0066CC] text-white flex items-center gap-2 transition-all shadow-2xl border border-white/30 backdrop-blur-md text-xs font-heading font-bold"
              title={isFullscreen ? "Exit Fullscreen (Squeeze / Esc)" : "Fullscreen View (Expand / F)"}
              aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-4 h-4 text-white" />
                  <span className="hidden sm:inline">Exit Fullscreen</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-4 h-4 text-white" />
                  <span className="hidden sm:inline">Fullscreen</span>
                </>
              )}
            </button>

            {/* Cross / Close Button */}
            <button
              type="button"
              onClick={() => {
                setActiveIndex(null);
                setIsFullscreen(false);
              }}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-[4px] bg-black/80 hover:bg-red-600 text-white flex items-center justify-center transition-all shadow-2xl border border-white/30 backdrop-blur-md"
              title="Close (Esc)"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Left / Previous Controller */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 z-[10000] w-11 h-11 sm:w-12 sm:h-12 rounded-[4px] bg-black/80 hover:bg-[#0066CC] text-white flex items-center justify-center transition-all shadow-2xl border border-white/30 hover:scale-105"
            aria-label="Previous image"
            title="Previous (Arrow Left)"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Right / Next Controller */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 sm:right-6 z-[10000] w-11 h-11 sm:w-12 sm:h-12 rounded-[4px] bg-black/80 hover:bg-[#0066CC] text-white flex items-center justify-center transition-all shadow-2xl border border-white/30 hover:scale-105"
            aria-label="Next image"
            title="Next (Arrow Right)"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Image Container: Fullscreen fills entire viewport (w-screen h-screen), normal is max-w-6xl */}
          <div
            className={`relative z-[9999] transition-all duration-300 flex items-center justify-center ${
              isFullscreen
                ? "w-screen h-screen max-w-none max-h-none p-2 sm:p-4"
                : "w-full max-w-6xl h-[82vh] p-2 sm:p-4"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`relative w-full h-full overflow-hidden transition-all duration-300 ${
                isFullscreen
                  ? "rounded-none"
                  : "rounded-[4px] shadow-2xl border border-white/20 bg-black/50"
              }`}
            >
              {/* Hardware-Accelerated Controller Image Transitions */}
              {GALLERY_ITEMS.map((item, idx) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out ${
                    activeIndex === idx
                      ? "opacity-100 z-10 pointer-events-auto"
                      : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain select-none"
                    priority={Math.abs(activeIndex - idx) <= 1}
                    sizes="100vw"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Title & Image Index Caption */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[10000] max-w-xl text-center px-4 py-2 rounded-[4px] bg-black/85 border border-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-heading font-medium pointer-events-none shadow-xl">
            {GALLERY_ITEMS[activeIndex].title}
            <span className="text-blue-300 ml-2">({activeIndex + 1} / {GALLERY_ITEMS.length})</span>
          </div>
        </div>
      )}

      {/* Let's Grow Together CTA Banner */}
      <section className="py-6 sm:py-8 bg-gradient-to-r from-[#003B73] via-[#0056B3] to-[#002D59] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-[4px] bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 text-white">
                <Shirt className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-heading font-bold text-white tracking-tight">
                  Let&apos;s Grow Together
                </h2>
                <p className="text-slate-200 text-xs font-light mt-0.5">
                  Partner with Texpart for your garment accessories and sourcing needs.
                </p>
              </div>
            </div>

            <div className="flex-shrink-0">
              <button
                type="button"
                onClick={openGeneralQuote}
                className="bg-white hover:bg-slate-100 text-[#0056B3] px-5 py-2.5 rounded-[4px] font-heading text-xs font-bold inline-flex items-center gap-1.5 shadow-md transition-all"
              >
                <span>Contact Us Today</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
