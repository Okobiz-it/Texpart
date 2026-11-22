"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DEFAULT_HERO_BANNERS = [
  { id: 1, src: "/banners/banner-1.jpg", alt: "Texpart Garment Accessories Manufacturing" },
  { id: 2, src: "/banners/banner-2.jpg", alt: "Texpart Apparel Trims & Sourcing" },
  { id: 3, src: "/banners/banner-3.jpg", alt: "Texpart Packaging & Commercial Printing" },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [heroBanners, setHeroBanners] = useState<any[]>(DEFAULT_HERO_BANNERS);

  useEffect(() => {
    let isMounted = true;
    async function loadBanners() {
      try {
        const res = await fetch("/api/hero-banners");
        const data = await res.json();
        if (isMounted && data.success && Array.isArray(data.data) && data.data.length > 0) {
          setHeroBanners(data.data);
        }
      } catch (err) {
        console.error("Failed to load hero banners", err);
      }
    }
    loadBanners();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (isPaused || heroBanners.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, heroBanners.length]);

  const prevSlide = () => {
    if (heroBanners.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + heroBanners.length) % heroBanners.length);
  };

  const nextSlide = () => {
    if (heroBanners.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
  };

  return (
    <section
      className="relative pt-[64px] sm:pt-[68px] lg:pt-[76px] bg-white border-b border-slate-200 overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative w-full aspect-[3584/1184] overflow-hidden bg-slate-100 shadow-sm">
        {/* Sliding Track */}
        <div
          className="flex h-full w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {heroBanners.map((banner: any, idx: number) => (
            <div key={banner.id || idx} className="w-full h-full flex-shrink-0 relative">
              <Image
                src={banner.src || banner.imageUrl}
                alt={banner.alt || banner.title || "Texpart Banner"}
                fill
                className="object-contain sm:object-cover"
                priority={idx === 0}
                sizes="100vw"
              />
            </div>
          ))}
        </div>

        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-1.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-10 sm:h-10 rounded-[4px] bg-black/40 hover:bg-[#0066CC] text-white flex items-center justify-center transition-all shadow-md backdrop-blur-sm opacity-80 group-hover:opacity-100 cursor-pointer"
          aria-label="Previous Banner"
        >
          <ChevronLeft className="w-3.5 sm:w-5 h-3.5 sm:h-5" />
        </button>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-1.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-10 sm:h-10 rounded-[4px] bg-black/40 hover:bg-[#0066CC] text-white flex items-center justify-center transition-all shadow-md backdrop-blur-sm opacity-80 group-hover:opacity-100 cursor-pointer"
          aria-label="Next Banner"
        >
          <ChevronRight className="w-3.5 sm:w-5 h-3.5 sm:h-5" />
        </button>

        {/* Slider Dots Indicator */}
        <div className="absolute bottom-1.5 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 sm:gap-2 bg-black/30 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-[4px]">
          {heroBanners.map((_: any, idx: number) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 sm:h-2 rounded-[4px] transition-all duration-300 cursor-pointer ${
                currentSlide === idx ? "w-4 sm:w-6 bg-[#0066CC]" : "w-1.5 sm:w-2 bg-white/70 hover:bg-white"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
