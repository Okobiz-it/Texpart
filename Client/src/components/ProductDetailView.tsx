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
  Check,
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
    <div className="pt-24 pb-20 bg-offwhite text-charcoal min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="py-4 flex items-center gap-2 text-xs text-grey-dark border-b border-charcoal/10 mb-8">
          <Link href="/" className="hover:text-orange transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href={
              product.collectionId === "accessories"
                ? "/services/private-jobs#products"
                : "/services/commercial-jobs#products"
            }
            className="hover:text-orange transition-colors"
          >
            {product.collection}
          </Link>
          <span>/</span>
          <span className="text-charcoal font-bold">{product.name}</span>
        </div>

        {/* Back Link */}
        <div className="mb-6">
          <Link
            href={
              product.collectionId === "accessories"
                ? "/services/private-jobs#products"
                : "/services/commercial-jobs#products"
            }
            className="inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-widest text-charcoal hover:text-orange transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Product Catalogue
          </Link>
        </div>

        {/* Product Details Grid */}
        <div className="bg-white rounded-sm border border-charcoal/10 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Expanded Gallery & Thumbnails (6 cols) */}
          <div className="lg:col-span-6 bg-offwhite-alt/40 p-6 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-charcoal/10">
            <div>
              {/* Main Expanded Image Frame */}
              <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden bg-white shadow-sm border border-charcoal/10 group">
                <Image
                  src={images[activeImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover transition-all duration-500"
                  priority
                />

                {/* Left & Right Controllers (if photo count > 1) */}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === 0 ? images.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-charcoal/80 hover:bg-orange text-white flex items-center justify-center transition-all duration-200 shadow-xl group/btn z-10 opacity-80 hover:opacity-100"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="w-5 h-5 group-hover/btn:-translate-x-0.5 transition-transform" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === images.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-charcoal/80 hover:bg-orange text-white flex items-center justify-center transition-all duration-200 shadow-xl group/btn z-10 opacity-80 hover:opacity-100"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>

                    {/* Image Counter Pill */}
                    <div className="absolute bottom-3 right-3 bg-charcoal/80 text-white font-mono text-[10px] px-2.5 py-1 rounded-sm backdrop-blur-sm z-10">
                      {activeImageIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2.5 mt-5 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-20 rounded-sm overflow-hidden flex-shrink-0 border-2 transition-all ${
                        activeImageIndex === idx
                          ? "border-orange scale-105 shadow-md"
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

          {/* Right Column: Information, Specs & Quote (6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header */}
              <div className="border-b border-charcoal/10 pb-5">
                <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block mb-1">
                  {product.collection}
                </span>
                <h1 className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-tight text-charcoal">
                  {product.name}
                </h1>
                <p className="text-xs text-grey-dark mt-1 font-light">
                  Product Category: <strong className="text-charcoal font-semibold">{product.category}</strong>
                </p>
              </div>

              {/* Description */}
              <div>
                <p className="text-sm sm:text-base text-grey-dark leading-relaxed font-light">
                  {product.fullDesc || product.shortDesc}
                </p>
              </div>

              {/* Sub-Items from Brochure */}
              <div className="pt-4 border-t border-charcoal/10">
                <h3 className="text-xs font-heading font-extrabold uppercase tracking-widest text-charcoal mb-3">
                  Variations Included in This Range
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {product.subItems.map((sub, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-charcoal/90">
                      <Check className="w-3.5 h-3.5 text-forest flex-shrink-0 mt-0.5" />
                      <span>{sub}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Materials & Substrates */}
              <div className="pt-4 border-t border-charcoal/10">
                <h3 className="text-xs font-heading font-extrabold uppercase tracking-widest text-charcoal mb-2">
                  Materials &amp; Substrates
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {product.materials.map((mat, idx) => (
                    <span
                      key={idx}
                      className="bg-offwhite-alt px-2.5 py-1 text-xs font-medium text-charcoal rounded-sm border border-charcoal/5"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Manufacturing Specifications Table */}
              <div className="pt-4 border-t border-charcoal/10">
                <h3 className="text-xs font-heading font-extrabold uppercase tracking-widest text-charcoal mb-2">
                  Manufacturing Specifications &amp; Lead Time
                </h3>
                <div className="border border-charcoal/10 rounded-sm overflow-hidden text-xs">
                  <table className="w-full divide-y divide-charcoal/10">
                    <tbody className="divide-y divide-charcoal/5 bg-offwhite/30">
                      {Object.entries(product.specifications).map(([key, val], idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-2.5 font-heading font-bold text-grey-dark w-2/5 bg-offwhite/50">
                            {key}
                          </td>
                          <td className="px-4 py-2.5 text-charcoal font-medium">
                            {val}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Primary Action: Request a Quote */}
            <div className="pt-6 border-t border-charcoal/10 flex items-center justify-end">
              <button
                onClick={() =>
                  openQuote(product.name, product.category, product.id)
                }
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange hover:bg-orange-hover text-white px-9 py-4 rounded-sm font-heading text-xs font-extrabold uppercase tracking-wider transition-all duration-200 shadow-xl hover:shadow-orange/30 hover:-translate-y-0.5"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Related Products from Same Collection */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-charcoal/10 pb-6">
              <div>
                <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block mb-1">
                  More From {product.collection}
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase text-charcoal">
                  Related Product Categories
                </h2>
              </div>
              <Link
                href={
                  product.collectionId === "accessories"
                    ? "/services/private-jobs#products"
                    : "/services/commercial-jobs#products"
                }
                className="inline-flex items-center gap-2 bg-charcoal hover:bg-orange text-white px-5 py-2.5 rounded-sm font-heading text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm self-start sm:self-auto"
              >
                <span>View All Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
