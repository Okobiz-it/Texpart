import React from "react";
import Link from "next/link";
import { Printer, Shirt, Package, Gift, ArrowRight, CheckCircle2 } from "lucide-react";

const CORE_PILLARS = [
  {
    id: "commercial-printing",
    title: "Commercial Printing",
    subtitle: "Print & Publication",
    scope: "We provide customized commercial printing solutions for corporate, institutional, promotional and business requirements.",
    icon: Printer,
    iconColor: "text-blue-600 bg-blue-50 border-blue-200",
    href: "/commercial-printing",
    sampleProducts: [
      "Corporate Brochures & Catalogues",
      "Company Profiles & Annual Reports",
      "Business Cards & Stationery",
      "Diaries & Notebooks",
      "Wall & Desk Calendars",
      "Leaflets, Flyers & Posters",
    ],
  },
  {
    id: "garments-accessories",
    title: "Garments Accessories",
    subtitle: "Apparel Trims & Sourcing",
    scope: "Strong focus on garment trims and related sourcing engineered to exact client specifications, colors, and quantities.",
    icon: Shirt,
    iconColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
    href: "/garments-accessories",
    sampleProducts: [
      "Woven Labels & Printed Care Labels",
      "Hangtags & Barcode Price Tags",
      "Heat Transfer & Screen Print Labels",
      "Leather & Silicone Badges",
      "Cotton & Twill Tapes & Drawstrings",
      "Buttons, Rivets, Buckles & D-Rings",
    ],
  },
  {
    id: "packaging-solutions",
    title: "Packaging Solutions",
    subtitle: "Custom Boxes & Bags",
    scope: "Customized packaging solutions for corporate, retail, garment, promotional and institutional requirements.",
    icon: Package,
    iconColor: "text-purple-600 bg-purple-50 border-purple-200",
    href: "/packaging-solutions",
    sampleProducts: [
      "Printed Paper Shopping Bags",
      "Luxury Rigid & Gift Presentation Boxes",
      "Folding Cartons & Product Boxes",
      "Printed & Sealed Poly Bags",
      "Barcode Stickers & Product Seals",
      "Customized Branding Packaging Materials",
    ],
  },
  {
    id: "promotional-products",
    title: "Promotional Products",
    subtitle: "Branded Merchandise & Gifts",
    scope: "Customized promotional products for corporate branding, campaigns, events, employee engagement, and customer promotions.",
    icon: Gift,
    iconColor: "text-amber-600 bg-amber-50 border-amber-200",
    href: "/promotional-products",
    sampleProducts: [
      "Promotional T-Shirts & Branded Caps",
      "Custom Corporate Pens & Ceramic Mugs",
      "Corporate Diaries & Planners",
      "Branded Tote Bags & Lanyards",
      "Key Rings & Umbrellas",
      "Event Giveaways & Executive Corporate Gifts",
    ],
  },
];

export default function CorePillarsSection() {
  return (
    <section id="core-pillars" className="py-14 sm:py-20 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Blue Accent Bars (Removed '4 CORE MANUFACTURING & SOURCING PILLARS') */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0066CC] uppercase tracking-wide flex items-center justify-center gap-3">
            <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block shrink-0" />
            <span>CORE BUSINESS AREAS</span>
            <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block shrink-0" />
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed pt-1">
            Consolidating full-suite print, apparel trim, packaging, and promotional merchandise solutions through one coordinated channel.
          </p>
        </div>

        {/* 4 Pillars Grid - Visually Enhanced Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {CORE_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-7 sm:p-8 shadow-xs hover:shadow-lg hover:border-[#0066CC] transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Subtle Hover Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#0066CC] transition-colors" />

                <div className="space-y-4">
                  {/* Card Header: Icon, Title & Custom 2-3 Word Subtitle */}
                  <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-2xs ${pillar.iconColor} group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-heading font-black uppercase text-[#0A2540] group-hover:text-[#0066CC] transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-[11px] font-mono font-bold text-[#0066CC] uppercase tracking-wider">
                        {pillar.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Scope */}
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal text-left">
                    {pillar.scope}
                  </p>

                  {/* Sample Products List (Featured items chips) */}
                  <div className="pt-2">
                    <p className="text-[11px] font-mono font-bold text-[#0A2540] uppercase tracking-wider mb-2.5">
                      Key Capabilities &amp; Products:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {pillar.sampleProducts.map((prod, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 bg-slate-50/80 hover:bg-blue-50/50 rounded-[4px] px-2.5 py-1.5 border border-slate-200/70 hover:border-blue-200 transition-colors"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0066CC] shrink-0" />
                          <span className="text-xs text-slate-700 font-medium truncate">
                            {prod}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Clean Right-Aligned 'VIEW ALL PRODUCTS' Button */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end">
                  <Link
                    href={pillar.href}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[4px] bg-[#0066CC] hover:bg-[#0052CC] text-white text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-xs hover:shadow group/btn"
                  >
                    <span>View All Products</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
