"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useQuote } from "@/context/QuoteContext";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { openQuote } = useQuote();

  return (
    <div className="group bg-white rounded-sm border border-charcoal/10 hover:border-orange overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
      {/* Media with Clickable Link */}
      <Link
        href={`/products/${product.id}`}
        className="relative aspect-[4/3] w-full overflow-hidden bg-offwhite-alt block"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-108"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Fabric Weave Overlay on Hover */}
        <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Body */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <span className="text-[11px] font-heading font-extrabold uppercase tracking-widest text-orange block mb-1">
            {product.collection}
          </span>
          <Link href={`/products/${product.id}`}>
            <h3 className="text-xl font-heading font-black uppercase text-charcoal group-hover:text-orange transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-grey-dark leading-relaxed mt-2 line-clamp-2 font-light">
            {product.shortDesc}
          </p>

          {/* Sub-items Pills */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {product.subItems.slice(0, 3).map((sub, idx) => (
              <span
                key={idx}
                className="bg-offwhite text-charcoal/80 text-[10px] font-medium px-2 py-0.5 rounded-sm border border-charcoal/5"
              >
                {sub.split("(")[0].trim()}
              </span>
            ))}
            {product.subItems.length > 3 && (
              <span className="bg-offwhite text-grey text-[10px] font-medium px-1.5 py-0.5 rounded-sm border border-charcoal/5">
                +{product.subItems.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-charcoal/10 flex items-center justify-between">
          <Link
            href={`/products/${product.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-charcoal hover:text-orange transition-colors"
          >
            <span>View Specifications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => openQuote(product.name, product.category, product.id)}
            className="text-[11px] font-heading font-bold uppercase tracking-wider bg-orange/10 hover:bg-orange text-orange hover:text-white px-3.5 py-1.5 rounded-sm transition-all shadow-sm"
          >
            Get Quote
          </button>
        </div>
      </div>
    </div>
  );
}
