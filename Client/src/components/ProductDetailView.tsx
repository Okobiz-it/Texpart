"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useQuote } from "@/context/QuoteContext";
import ProductCard from "@/components/ProductCard";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const { openQuote } = useQuote();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.image];

  return (
    <div className="pt-28 sm:pt-32 pb-12 sm:pb-16 bg-white text-[#0A2540]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="py-2.5 flex items-center gap-2 text-xs text-slate-500 border-b border-slate-200 mb-6">
          <Link href="/" className="hover:text-[#0066CC] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href={
              product.collectionId === "accessories"
                ? "/services/private-jobs#products"
                : "/services/commercial-jobs#products"
            }
            className="hover:text-[#0066CC] transition-colors"
          >
            {product.collection}
          </Link>
          <span>/</span>
          <span className="text-[#0A2540] font-bold">{product.name}</span>
        </div>

        {/* Back Link */}
        <div className="mb-4">
          <Link
            href={
              product.collectionId === "accessories"
                ? "/services/private-jobs#products"
                : "/services/commercial-jobs#products"
            }
            className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] hover:text-[#0066CC] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Product Catalogue
          </Link>
        </div>

        {/* Product Details Grid */}
        <div className="bg-white rounded-[4px] border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 mb-10">
          {/* Left Column: Expanded Gallery & Smooth Switcher (6 cols) */}
          <div className="lg:col-span-6 bg-slate-50 p-5 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200">
            <div>
              {/* Main Expanded Image Frame with Smooth Image Transition */}
              <div className="relative aspect-[4/3] w-full rounded-[4px] overflow-hidden bg-white shadow-sm border border-slate-200 group">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
                      activeImageIndex === idx
                        ? "opacity-100 z-0"
                        : "opacity-0 pointer-events-none z-[-1]"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} - ${idx + 1}`}
                      fill
                      className="object-cover"
                      priority={idx === 0}
                    />
                  </div>
                ))}

                {/* Left & Right Controllers */}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === 0 ? images.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-[4px] bg-[#061730]/80 hover:bg-[#0066CC] text-white flex items-center justify-center transition-all shadow-md z-10"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === images.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-[4px] bg-[#061730]/80 hover:bg-[#0066CC] text-white flex items-center justify-center transition-all shadow-md z-10"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-[4px] overflow-hidden flex-shrink-0 border-2 transition-all ${
                        activeImageIndex === idx
                          ? "border-[#0066CC] shadow-sm"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} thumb ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Title, Pure Text Description & Request a Quote (6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Product Title (Collection text removed per request) */}
              <div className="border-b border-slate-200 pb-3">
                <h1 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-[#0A2540]">
                  {product.name}
                </h1>
              </div>

              {/* Pure Text Description (No tables, no tags, no ticks - strictly text) */}
              <div className="py-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {product.fullDesc && product.fullDesc.includes("<") ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: product.fullDesc }}
                    className="prose prose-sm max-w-none text-slate-600"
                  />
                ) : (
                  <p>{product.fullDesc || product.shortDesc}</p>
                )}
              </div>
            </div>

            {/* Primary Action: Request a Quote */}
            <div className="pt-6 border-t border-slate-200 flex items-center justify-end">
              <button
                type="button"
                onClick={() =>
                  openQuote(product.name, product.category, product.id)
                }
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0066CC] hover:bg-[#0052CC] text-white px-6 py-2.5 rounded-[4px] font-heading text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Related Products: Full Row (6 items) & Text-like Link */}
        {relatedProducts.length > 0 && (
          <div className="mt-10 sm:mt-12">
            <div className="mb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-heading font-black uppercase text-[#0A2540]">
                  Related Products
                </h2>
              </div>
              <Link
                href={
                  product.collectionId === "accessories"
                    ? "/services/private-jobs#products"
                    : "/services/commercial-jobs#products"
                }
                className="text-xs font-heading font-bold text-[#0066CC] hover:text-[#0052CC] hover:underline inline-flex items-center gap-1 group transition-colors"
              >
                <span>View All Products</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Full 6-column row on desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
