"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GALLERY_ITEMS } from "@/data/gallery";
import { useQuote } from "@/context/QuoteContext";
import { GalleryCategory } from "@/types";
import { MapPin, ZoomIn, ArrowRight } from "lucide-react";

export default function GalleryPage() {
  const { openLightbox, openQuote } = useQuote();
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");

  const categories: { key: GalleryCategory; label: string }[] = [
    { key: "all", label: "All Works" },
    { key: "garment-production", label: "Garment Production" },
    { key: "apparel-accessories", label: "Apparel Accessories" },
    { key: "printing", label: "Printing" },
    { key: "packaging", label: "Packaging" },
    { key: "finished-products", label: "Finished Products" },
  ];

  const filteredItems = activeCategory === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="pt-20">
      {/* Header Banner */}
      <section className="py-20 sm:py-28 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block">
              Visual Archive &bull; Dhaka Facilities
            </span>
            <h1 className="text-4xl sm:text-6xl font-heading font-black uppercase tracking-tight text-white leading-tight">
              Craftsmanship <br />
              <span className="text-orange">Documented.</span>
            </h1>
            <p className="text-base sm:text-lg text-beige-light leading-relaxed font-light pt-2">
              Explore authentic photography from our garment assembly lines, precision loom workshops, Heidelberg offset printing presses, and luxury packaging ateliers in Bangladesh.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Gallery Grid */}
      <section className="py-16 sm:py-24 bg-offwhite text-charcoal min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
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

          {/* Masonry / Responsive Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  openLightbox({
                    src: item.image,
                    title: item.title,
                    meta: `${item.location} • ${item.meta}`,
                  })
                }
                className="break-inside-avoid group relative rounded-sm overflow-hidden bg-charcoal cursor-pointer shadow-md border border-charcoal/10 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative w-full aspect-[4/3] sm:aspect-[4/5] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-charcoal/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>

                {/* Caption / Overlay */}
                <div className="p-5 bg-white border-t border-charcoal/10 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-orange block mb-1">
                      {item.categoryLabel}
                    </span>
                    <h3 className="text-base font-heading font-extrabold uppercase text-charcoal group-hover:text-orange transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-grey-dark leading-relaxed mt-1.5">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-charcoal/5 flex items-center justify-between text-[11px] text-grey">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-forest flex-shrink-0" />
                      <span>{item.location}</span>
                    </div>
                    <span className="font-mono text-[10px] bg-offwhite-alt px-1.5 py-0.5 rounded">
                      {item.meta.split("•")[0]?.trim()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Quotation Callout */}
          <div className="mt-20 p-8 sm:p-12 bg-charcoal text-offwhite rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange">
                Have Specific Specifications?
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white">
                Request Samples Or Factory Visit
              </h3>
              <p className="text-xs text-grey-light max-w-lg">
                We welcome prospective global clients to inspect physical swatches, lab dips, and quality control stations at our Dhaka facilities.
              </p>
            </div>
            <button
              onClick={() => openQuote("Factory Visit & Sample Request")}
              className="bg-orange hover:bg-orange-hover text-white px-8 py-4 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest inline-flex items-center gap-2 transition-all shadow-lg flex-shrink-0"
            >
              Request Sample Kit
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

