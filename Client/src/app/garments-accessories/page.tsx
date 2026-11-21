"use client";

import React from "react";
import Link from "next/link";
import { useQuote } from "@/context/QuoteContext";
import {
  Shirt,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Award,
} from "lucide-react";
import { GARMENTS_ACCESSORIES_ITEMS, BRAND_INFO } from "@/data/siteNavigation";

export default function GarmentsAccessoriesPage() {
  const { openQuote } = useQuote();

  return (
    <div className="bg-[#F8FAFC] text-[#0A2540] min-h-screen">
      {/* Hero Banner */}
      <section className="pt-32 sm:pt-36 pb-14 sm:pb-16 bg-gradient-to-r from-[#061730] via-[#0A2540] to-[#003B73] text-white overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-blue-500/20 text-blue-300 text-xs font-mono font-semibold">
              <Shirt className="w-3.5 h-3.5" />
              <span>DIVISION 02 &bull; GARMENTS ACCESSORIES</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-heading font-black uppercase tracking-tight text-white leading-tight">
              Export-Grade Garments Accessories &amp; Trims
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Supplying world-renowned international brands and apparel manufacturers with certified woven labels, hangtags, heat transfers, drawstrings, leather patches, and metallic hardware. Engineered to withstand stringent textile wash-fastness and tensile standards.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => openQuote("Garments Accessories & Trims", "Garments Accessories")}
                className="px-6 py-2.5 rounded-[4px] bg-[#0066CC] hover:bg-[#0052CC] text-white text-xs font-heading font-bold uppercase tracking-wider transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Request Trims Quotation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <Link
                href="/work"
                className="px-5 py-2.5 rounded-[4px] border border-white/20 hover:bg-white/10 text-white text-xs font-heading font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
              >
                <span>View Apparel Projects</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 11 Garments Accessories Categories Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#0066CC] block">
              11 Comprehensive Apparel Accessories Divisions
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-[#0A2540]">
              Complete Trims Program for Global Apparel Brands
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Certified under OEKO-TEX Standard 100, FSC, and Recycled Claim Standard (RCS).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {GARMENTS_ACCESSORIES_ITEMS.map((item, idx) => (
              <div
                key={item.slug}
                id={item.slug}
                className="bg-white border border-slate-200 rounded-[4px] p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group scroll-mt-36"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-xs font-mono font-bold text-[#0066CC] bg-blue-50 px-2.5 py-1 rounded-[4px] border border-blue-100">
                      ACCESSORY {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">OEKO-TEX / FSC Compliant</span>
                  </div>

                  <h3 className="text-lg font-heading font-black uppercase tracking-tight text-[#0A2540] group-hover:text-[#0066CC] transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mt-2 font-normal">
                    {item.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-500">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0066CC]" />
                      <span>Specifications: Sonic cut, ultrasonic edge, end fold, loop fold, mitre fold</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0066CC]" />
                      <span>Yarns / Metals: Recycled polyester, combed cotton, lead-free brass/zinc alloy</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">Sampling: 3–5 Days</span>
                  <button
                    onClick={() => openQuote(item.name, "Garments Accessories")}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[4px] bg-[#0066CC] hover:bg-[#0052CC] text-white text-xs font-heading font-bold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
                  >
                    <span>Request Sample / Quote</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Strip */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#0066CC]">
            <ShieldCheck className="w-4 h-4" />
            <span>International Compliance &amp; Sustainability</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-black uppercase text-[#0A2540]">
            Audit-Ready For Leading Global Retailers &amp; Brands
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
            All Texpart garment accessories are manufactured under stringent ethical audits, non-toxic chemical testing (REACH &amp; ZDHC), and sustainable forestry certifications.
          </p>
        </div>
      </section>
    </div>
  );
}
