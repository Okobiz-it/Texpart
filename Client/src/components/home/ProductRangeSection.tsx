"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Loader2 } from "lucide-react";

export default function ProductRangeSection() {
  const [featuredList, setFeaturedList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadFeatured() {
      try {
        const res = await fetch("/api/featured-products");
        const data = await res.json();
        if (isMounted && data.success) {
          if (Array.isArray(data.featuredProducts) && data.featuredProducts.length > 0) {
            setFeaturedList(data.featuredProducts.slice(0, 10));
          } else {
            const combined = [
              ...(Array.isArray(data.privateFeatured) ? data.privateFeatured : []),
              ...(Array.isArray(data.commercialFeatured) ? data.commercialFeatured : []),
            ];
            setFeaturedList(combined.slice(0, 10));
          }
        }
      } catch (err) {
        console.error("Failed to load featured products", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadFeatured();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="product-range" className="py-10 sm:py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header with Blue Accent Bars */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0066CC] flex items-center gap-3">
              <span className="w-8 sm:w-12 h-[2px] bg-[#0066CC] inline-block shrink-0" />
              <span>Our Product Range</span>
              <span className="w-8 sm:w-12 h-[2px] bg-[#0066CC] inline-block shrink-0" />
            </h2>
            <p className="text-xs text-slate-500 font-normal">
              Authentic apparel accessories and precision commercial print solutions manufactured for export.
            </p>
          </div>

          <Link
            href="/work"
            className="text-xs font-heading font-bold text-[#0066CC] hover:underline inline-flex items-center gap-1.5 shrink-0"
          >
            <span>View All Products</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 10 Featured Cards Grid */}
        {isLoading ? (
          <div className="py-16 bg-white rounded-[4px] border border-slate-200 flex flex-col items-center justify-center space-y-2">
            <Loader2 className="w-6 h-6 text-[#0066CC] animate-spin" />
            <span className="text-xs font-heading font-medium text-slate-500 uppercase tracking-wider">
              Loading Featured Products...
            </span>
          </div>
        ) : featuredList.length === 0 ? (
          <div className="py-10 text-center text-xs text-slate-400 bg-slate-50 rounded-[4px]">
            No featured products selected.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {featuredList.slice(0, 10).map((item, idx) => (
              <Link
                key={item._id || item.id || idx}
                href={item.href || `/products/${item.slug || item.id || item._id}`}
                className="group bg-white rounded-[4px] border border-slate-200 hover:border-[#0066CC] overflow-hidden flex flex-col transition-all duration-200 hover:shadow-sm"
              >
                <div className="relative w-full aspect-square overflow-hidden bg-slate-100">
                  <Image
                    src={item.frontImage || item.image || item.logoUrl || "/placeholder.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="220px"
                  />
                </div>
                <div className="p-2 sm:p-2.5 text-center bg-white border-t border-slate-100 flex-grow flex items-center justify-center">
                  <h4 className="text-xs font-heading font-bold text-[#0A2540] group-hover:text-[#0066CC] transition-colors leading-tight">
                    {item.name}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
