"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/types";
import { useQuote } from "@/context/QuoteContext";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { openProductModal, openQuote } = useQuote();

  return (
    <div
      onClick={() => openProductModal(product)}
      className="group bg-white rounded-sm border border-charcoal/10 hover:border-orange overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
    >
      {/* Media */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-offwhite-alt">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3 bg-charcoal/85 backdrop-blur-sm text-offwhite text-[10px] font-heading font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-sm">
          {product.heroBadge || product.category}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <span className="text-[11px] font-heading font-extrabold uppercase tracking-widest text-orange block mb-1">
            {product.collection}
          </span>
          <h3 className="text-xl font-heading font-black uppercase text-charcoal group-hover:text-orange transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-grey-dark leading-relaxed mt-2 line-clamp-2">
            {product.shortDesc}
          </p>

          {/* Sub-items Pills */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {product.subItems.slice(0, 3).map((sub, idx) => (
              <span
                key={idx}
                className="bg-offwhite-alt text-charcoal/80 text-[10px] font-medium px-2 py-0.5 rounded-sm"
              >
                {sub.split("(")[0].trim()}
              </span>
            ))}
            {product.subItems.length > 3 && (
              <span className="bg-offwhite-alt text-grey text-[10px] font-medium px-1.5 py-0.5 rounded-sm">
                +{product.subItems.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-charcoal/10 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-xs font-heading font-bold uppercase tracking-wider text-charcoal group-hover:text-orange transition-colors">
            View Details
            <ArrowRight className="w-3.5 h-3.5" />
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuote(product.name, product.collection, product.id);
            }}
            className="text-[11px] font-heading font-bold uppercase tracking-wider bg-orange/10 hover:bg-orange text-orange hover:text-white px-3 py-1.5 rounded-sm transition-colors"
          >
            Request Quote
          </button>
        </div>
      </div>
    </div>
  );
}

