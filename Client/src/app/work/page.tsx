"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuote } from "@/context/QuoteContext";
import {
  Briefcase,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
  Printer,
  Shirt,
  Package,
  Gift,
  Scissors,
  ChevronRight,
} from "lucide-react";
import { OUR_WORK_ITEMS, BRAND_INFO } from "@/data/siteNavigation";

const WORK_DISCIPLINES = [
  {
    id: "commercial-printing",
    name: "Commercial Printing",
    href: "/commercial-printing",
    icon: Printer,
    desc: "Business cards, stationery, leaflets, brochures, catalogues, diaries, calendars, posters, banners, and corporate publications.",
    bullets: [
      "Custom dielines & precision color separation",
      "High-speed 5-color German offset press runs",
    ],
  },
  {
    id: "garments-accessories",
    name: "Garments Accessories",
    href: "/garments-accessories",
    icon: Shirt,
    desc: "Woven labels, hangtags, price tags, barcode stickers, heat transfers, leather & PU patches, drawstrings, and metal buttons.",
    bullets: [
      "OEKO-TEX & FSC certified apparel accessories",
      "Rapid physical golden sample strike-offs",
    ],
  },
  {
    id: "packaging",
    name: "Packaging",
    href: "/packaging-solutions",
    icon: Package,
    desc: "Kraft paper bags, folding product boxes, luxury rigid gift boxes, printed poly bags, self-adhesive bags, seals, and tissue paper.",
    bullets: [
      "Structural CAD packaging dieline prototyping",
      "Eco-friendly kraft, duplex & rigid board stock",
    ],
  },
  {
    id: "promotional-products",
    name: "Promotional Products",
    href: "/promotional-products",
    icon: Gift,
    desc: "Branded corporate pens, customized notebooks, diaries, calendars, ceramic mugs, lanyards, ID cards, t-shirts, caps, and gifts.",
    bullets: [
      "Corporate executive gifting & swag suites",
      "Screen print, UV print & laser engraving",
    ],
  },
  {
    id: "corporate-projects",
    name: "Corporate Projects",
    href: "/corporate-projects",
    icon: Briefcase,
    desc: "Annual reports & publications, corporate identity suites, presentation folders, press kits, event collateral, and VIP portfolios.",
    bullets: [
      "Foil stamping, embossing & spot UV finishing",
      "Strict confidentiality & brand guideline fidelity",
    ],
  },
  {
    id: "apparel-projects",
    name: "Apparel Projects",
    href: "/apparel-projects",
    icon: Scissors,
    desc: "Complete denim trim packages, outerwear 3D badges, stretch heat transfers, sustainable recycled labels, and export cartons.",
    bullets: [
      "Full vertical integration under one single roof",
      "Direct dispatch to factory floors across EPZs",
    ],
  },
];

export default function WorkPage() {
  const { openGeneralQuote } = useQuote();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  return (
    <div className="bg-[#F8FAFC] text-[#0A2540] min-h-screen">
      {/* Hero Banner */}
      <section className="pt-24 sm:pt-28 pb-14 sm:pb-16 bg-gradient-to-r from-[#061730] via-[#0A2540] to-[#003B73] text-white overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black uppercase tracking-tight text-white leading-tight">
              Manufacturing Projects &amp; <br className="hidden sm:inline" />
              <span className="text-blue-400">Delivered Portfolio</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              DESIGN &bull; DEVELOP &bull; PRODUCE &bull; PACK &bull; DELIVER &mdash; Explore our delivered programs across Commercial Printing, Garments Accessories, Packaging, Promotional Products, Corporate Projects, and Apparel trim packages.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={openGeneralQuote}
                className="px-6 py-2.5 rounded-[4px] bg-[#0066CC] hover:bg-[#0052CC] text-white text-xs font-heading font-bold uppercase tracking-wider transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <Link
                href="/gallery"
                className="px-5 py-2.5 rounded-[4px] border border-white/20 hover:bg-white/10 text-white text-xs font-heading font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
              >
                <span>Browse Full Gallery Archive</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Work Divisions Showcase */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0066CC] flex items-center justify-center gap-3">
              <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block shrink-0" />
              <span>6 Core Project Disciplines</span>
              <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block shrink-0" />
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
              Design &bull; Develop &bull; Produce &bull; Pack &bull; Deliver &bull; Serving world-class fashion houses, international sportswear brands, and leading corporate institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WORK_DISCIPLINES.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.id}
                  id={item.id}
                  className="bg-white border border-slate-200/90 hover:border-[#0066CC] rounded-xl overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200 p-6 group scroll-mt-36"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0066CC] flex items-center justify-center font-bold">
                      <IconComp className="w-5 h-5" />
                    </div>

                    <Link href={item.href}>
                      <h3 className="text-base font-heading font-black uppercase text-[#0A2540] group-hover:text-[#0066CC] transition-colors leading-snug">
                        {item.name}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {item.desc}
                    </p>

                    <div className="pt-2 space-y-1.5 text-[11px] text-slate-600">
                      {item.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0066CC] shrink-0" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={item.href}
                      className="text-xs font-heading font-bold text-[#0066CC] group-hover:underline inline-flex items-center gap-1.5"
                    >
                      <span>Explore Products</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      type="button"
                      onClick={openGeneralQuote}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[4px] bg-slate-100 hover:bg-[#0066CC] hover:text-white text-[#0A2540] text-xs font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <span>Inquire</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
