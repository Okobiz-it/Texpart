"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuote } from "@/context/QuoteContext";
import { X, Check, ArrowRight, ExternalLink } from "lucide-react";

export default function ProductDetailsModal() {
  const { isProductModalOpen, closeProductModal, selectedProduct, openQuote } = useQuote();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
    if (isProductModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isProductModalOpen, selectedProduct]);

  if (!isProductModalOpen || !selectedProduct) return null;

  const images = selectedProduct.galleryImages?.length > 0
    ? selectedProduct.galleryImages
    : [selectedProduct.image];

  const handleRequestQuote = () => {
    const prod = selectedProduct;
    closeProductModal();
    setTimeout(() => {
      openQuote(prod.name, prod.category, prod.id);
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-charcoal/85 backdrop-blur-md">
      <div
        className="fixed inset-0"
        onClick={closeProductModal}
        aria-hidden="true"
      />

      <div className="relative bg-white text-charcoal w-full max-w-5xl rounded-sm shadow-2xl overflow-hidden border border-charcoal/10 z-10 max-h-[92vh] flex flex-col md:grid md:grid-cols-12">
        {/* Close Button */}
        <button
          onClick={closeProductModal}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-[4px] bg-charcoal/80 text-white hover:bg-[#0066CC] flex items-center justify-center transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Multi-Image Interactive Gallery (5 cols) */}
        <div className="md:col-span-5 bg-offwhite-alt/60 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-charcoal/10">
          <div>
            {/* Main Image */}
            <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-white shadow-sm border border-charcoal/5">
              <Image
                src={images[activeImageIndex]}
                alt={selectedProduct.name}
                fill
                className="object-cover transition-all duration-300"
                priority
              />
              <span className="absolute top-3 left-3 bg-charcoal/90 backdrop-blur-sm text-offwhite text-[10px] font-heading font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-sm">
                {selectedProduct.heroBadge || selectedProduct.category}
              </span>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-sm overflow-hidden flex-shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? "border-orange scale-105" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${selectedProduct.name} preview ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Brochure Source of Truth Label */}
          <div className="mt-6 pt-4 border-t border-charcoal/10 text-[11px] text-grey-dark flex items-center justify-between">
            <span className="font-mono">{selectedProduct.brochureRef}</span>
            <Link
              href={`/products/${selectedProduct.id}`}
              onClick={closeProductModal}
              className="inline-flex items-center gap-1 text-orange font-bold hover:underline"
            >
              Permanent Link
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Right Column: Detailed Product Specifications (7 cols) */}
        <div className="md:col-span-7 p-6 sm:p-8 overflow-y-auto max-h-[85vh]">
          {/* Header */}
          <div className="border-b border-charcoal/10 pb-4">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block mb-1">
              {selectedProduct.collection}
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase text-charcoal">
              {selectedProduct.name}
            </h2>
            <p className="text-xs font-medium text-grey-dark mt-1">
              Category: <span className="text-charcoal font-semibold">{selectedProduct.category}</span>
            </p>
          </div>

          {/* Detailed Description */}
          <div className="py-4">
            <p className="text-sm text-grey-dark leading-relaxed">
              {selectedProduct.fullDesc || selectedProduct.shortDesc}
            </p>
          </div>

          {/* Sub-Items from Brochure */}
          <div className="py-3 border-t border-charcoal/10">
            <h4 className="text-xs font-heading font-extrabold uppercase tracking-widest text-charcoal mb-2.5">
              Available Product Variations (Brochure Range)
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {selectedProduct.subItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-charcoal/90">
                  <Check className="w-3.5 h-3.5 text-forest flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Materials */}
          <div className="py-3 border-t border-charcoal/10">
            <h4 className="text-xs font-heading font-extrabold uppercase tracking-widest text-charcoal mb-2">
              Materials &amp; Substrates
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {selectedProduct.materials.map((mat, idx) => (
                <span
                  key={idx}
                  className="bg-offwhite-alt px-2.5 py-1 text-[11px] font-medium text-charcoal rounded-sm"
                >
                  {mat}
                </span>
              ))}
            </div>
          </div>

          {/* Finishes & Customization Options */}
          <div className="py-3 border-t border-charcoal/10">
            <h4 className="text-xs font-heading font-extrabold uppercase tracking-widest text-charcoal mb-2">
              Finishing &amp; Customization Options
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {selectedProduct.finishes.map((fin, idx) => (
                <span
                  key={idx}
                  className="bg-forest/10 text-forest px-2.5 py-1 text-[11px] font-semibold rounded-sm"
                >
                  {fin}
                </span>
              ))}
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="py-3 border-t border-charcoal/10">
            <h4 className="text-xs font-heading font-extrabold uppercase tracking-widest text-charcoal mb-2">
              Manufacturing Specifications
            </h4>
            <div className="border border-charcoal/10 rounded-sm overflow-hidden text-xs">
              <table className="w-full divide-y divide-charcoal/10">
                <tbody className="divide-y divide-charcoal/5 bg-offwhite/30">
                  {Object.entries(selectedProduct.specifications).map(([key, val], idx) => (
                    <tr key={idx}>
                      <td className="px-3.5 py-2 font-heading font-bold text-grey-dark w-2/5 bg-offwhite/50">
                        {key}
                      </td>
                      <td className="px-3.5 py-2 text-charcoal font-medium">
                        {val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* B2B Quotation Callout */}
          <div className="mt-6 pt-4 border-t border-charcoal/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-grey-dark text-center sm:text-left">
              <span className="font-bold text-charcoal block">B2B Manufacturing Order</span>
              Custom sizing, sample prototyping, and export carton packaging.
            </div>
            <button
              onClick={handleRequestQuote}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange hover:bg-orange-hover text-white px-7 py-3.5 rounded-sm font-heading text-xs font-extrabold uppercase tracking-wider transition-all duration-200 shadow-lg hover:shadow-orange/30 hover:-translate-y-0.5"
            >
              Request a Quote
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

