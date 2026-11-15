"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useQuote } from "@/context/QuoteContext";
import { X, MapPin } from "lucide-react";

export default function LightboxModal() {
  const { isLightboxOpen, closeLightbox, lightboxItem } = useQuote();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isLightboxOpen) {
        closeLightbox();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, closeLightbox]);

  if (!isLightboxOpen || !lightboxItem) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-md">
      <div
        className="fixed inset-0"
        onClick={closeLightbox}
        aria-hidden="true"
      />

      {/* Close Button */}
      <button
        onClick={closeLightbox}
        className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-orange text-white flex items-center justify-center transition-colors"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Main Image Container */}
      <div className="relative z-10 max-w-5xl max-h-[85vh] flex flex-col items-center">
        <div className="relative w-full max-h-[72vh] aspect-[16/10] sm:aspect-[16/9] rounded-sm overflow-hidden shadow-2xl">
          <Image
            src={lightboxItem.src}
            alt={lightboxItem.title}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Captions & Metadata */}
        <div className="mt-4 text-center text-offwhite max-w-xl">
          <h4 className="text-base sm:text-lg font-heading font-extrabold uppercase tracking-tight">
            {lightboxItem.title}
          </h4>
          <div className="flex items-center justify-center gap-1.5 text-xs text-grey-light mt-1">
            <MapPin className="w-3.5 h-3.5 text-orange flex-shrink-0" />
            <span>{lightboxItem.meta}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

