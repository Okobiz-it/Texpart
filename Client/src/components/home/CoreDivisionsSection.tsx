import React from "react";
import Link from "next/link";
import { Printer, Shirt, Package, Gift, ChevronRight } from "lucide-react";

const DIVISIONS = [
  {
    id: "commercial-printing",
    title: "COMMERCIAL PRINTING",
    icon: Printer,
    href: "/commercial-printing",
    description:
      "We provide customized commercial printing solutions for corporate, institutional, promotional and business requirements",
    cta: "Explore Commercial Printing",
  },
  {
    id: "garments-accessories",
    title: "GARMENTS ACCESSORIES",
    icon: Shirt,
    href: "/garments-accessories",
    description:
      "“texpart” has a strong focus on garments accessories and related sourcing requirements",
    cta: "Explore Garments Accessories",
  },
  {
    id: "packaging-solutions",
    title: "PACKAGING SOLUTIONS",
    icon: Package,
    href: "/packaging-solutions",
    description:
      "Packaging is an important part of product presentation and brand communication. “texpart” provides customized packaging solutions for corporate, retail, garment, promotional and institutional requirements.",
    cta: "Explore Packaging Solutions",
  },
  {
    id: "promotional-products",
    title: "PROMOTIONAL PRODUCTS",
    icon: Gift,
    href: "/promotional-products",
    description:
      "“texpart” provides customized promotional products for corporate branding, campaigns, events, employee engagement, dealer programmes and customer promotions.",
    cta: "Explore Promotional Products",
  },
];

export default function CoreDivisionsSection() {
  return (
    <section className="py-12 sm:py-16 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Blue Accent Bars */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0066CC] flex items-center justify-center gap-3">
            <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block shrink-0" />
            <span>Printing, Garments Accessories &amp; Packaging</span>
            <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block shrink-0" />
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Design &bull; Develop &bull; Produce &bull; Pack &bull; Deliver &bull; ONE PARTNER. MULTIPLE SOLUTIONS.
          </p>
        </div>

        {/* 4 Beautiful Cards (Responsive Grid: 1 col on mobile, 2 on tablet, 4 on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DIVISIONS.map((division) => {
            const Icon = division.icon;
            return (
              <div
                key={division.id}
                className="bg-white border border-slate-200/90 hover:border-[#0066CC] rounded-xl overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 p-6 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0066CC] flex items-center justify-center font-bold group-hover:bg-[#0066CC] group-hover:text-white transition-colors duration-200 shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <Link href={division.href}>
                      <h3 className="text-base font-heading font-black uppercase text-[#0A2540] group-hover:text-[#0066CC] transition-colors leading-snug tracking-tight">
                        {division.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal mt-2.5">
                      {division.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={division.href}
                    className="text-xs font-heading font-bold text-[#0066CC] group-hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>Explore Solutions</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
