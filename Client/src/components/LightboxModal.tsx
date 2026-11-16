"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useQuote } from "@/context/QuoteContext";
import { X, MapPin, Maximize2, Minimize2 } from "lucide-react";

export default function LightboxModal() {
  const { isLightboxOpen, closeLightbox, lightboxItem } = useQuote();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else if (isLightboxOpen) {
          closeLightbox();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setIsFullscreen(false);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, isFullscreen, closeLightbox]);

  if (!isLightboxOpen || !lightboxItem) return null;

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden flex items-center justify-center ${
        isFullscreen ? "p-0 bg-black/98" : "p-4 sm:p-8 bg-[#061730]/95 backdrop-blur-md"
      }`}
    >
      {/* Backdrop for closing in normal modal view */}
      {!isFullscreen && (
        <div
          className="fixed inset-0"
          onClick={closeLightbox}
          aria-hidden="true"
        />
      )}

      {/* Control Buttons Group (Full View & Close) placed top right */}
      <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-40 flex items-center gap-2">
        {/* Fullscreen / Small-screen Toggle Button */}
        <button
          onClick={toggleFullscreen}
          className="w-10 h-10 rounded-[4px] bg-white/10 hover:bg-[#0066CC] text-white flex items-center justify-center transition-all shadow-md backdrop-blur-sm"
          aria-label={isFullscreen ? "Reduce to normal view" : "Full screen image view"}
          title={isFullscreen ? "Reduce view" : "Full screen"}
        >
          {isFullscreen ? (
            <Minimize2 className="w-5 h-5 text-white" />
          ) : (
            <Maximize2 className="w-5 h-5 text-white" />
          )}
        </button>

        {/* Close Button */}
        <button
          onClick={closeLightbox}
          className="w-10 h-10 rounded-[4px] bg-white/10 hover:bg-rose-600 text-white flex items-center justify-center transition-all shadow-md backdrop-blur-sm"
          aria-label="Close lightbox"
          title="Close (Esc)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {isFullscreen ? (
        /* True Fullscreen Edge-to-Edge View */
        <div className="relative w-screen h-screen flex items-center justify-center p-2 sm:p-6">
          <div className="relative w-full h-full max-w-[98vw] max-h-[96vh]">
            <Image
              src={lightboxItem.src}
              alt={lightboxItem.title}
              fill
              className="object-contain"
              priority
              sizes="100vw"
            />
          </div>
        </div>
      ) : (
        /* Normal Centered Modal View */
        <div className="relative z-10 max-w-5xl w-full max-h-[85vh] flex flex-col items-center">
          <div className="relative w-full max-h-[72vh] aspect-[16/10] sm:aspect-[16/9] rounded-[4px] overflow-hidden shadow-2xl border border-white/20">
            <Image
              src={lightboxItem.src}
              alt={lightboxItem.title}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1280px) 90vw, 1200px"
            />
          </div>

          {/* Captions & Metadata */}
          <div className="mt-4 text-center text-white max-w-xl">
            <h4 className="text-base sm:text-lg font-heading font-extrabold uppercase tracking-tight">
              {lightboxItem.title}
            </h4>
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-300 mt-1">
              <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
              <span>{lightboxItem.meta}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
