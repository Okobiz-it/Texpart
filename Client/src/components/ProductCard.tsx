"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imgSrc = (product as any).frontImage || product.image || "/images/products/range-labels.jpg";

  return (
    <Link
      href={`/products/${product.id}`}
      className="group bg-white rounded-[4px] border border-slate-200 hover:border-[#0066CC] overflow-hidden flex flex-col transition-all duration-200 hover:shadow-sm"
    >
      {/* Upper Area: Image completely fills the square box */}
      <div className="relative w-full aspect-square overflow-hidden bg-slate-100">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 180px"
        />
      </div>

      {/* Bottom Area: Title bar strictly matching Home Page scale, padding and font size */}
      <div className="p-2 sm:p-2.5 text-center bg-white border-t border-slate-100 flex-grow flex items-center justify-center">
        <h4 className="text-xs font-heading font-bold text-[#0A2540] group-hover:text-[#0066CC] transition-colors leading-tight">
          {product.name}
        </h4>
      </div>
    </Link>
  );
}
