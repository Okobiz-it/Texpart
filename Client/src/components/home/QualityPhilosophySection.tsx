import React from "react";
import {
  FileCheck,
  Boxes,
  Palette,
  Factory,
  ShieldCheck,
  PackageCheck,
  Clock,
  ArrowRight,
} from "lucide-react";

const PHILOSOPHY_POINTS = [
  { step: "01", title: "Correct Specification", icon: FileCheck },
  { step: "02", title: "Appropriate Material", icon: Boxes },
  { step: "03", title: "Accurate Artwork / Design", icon: Palette },
  { step: "04", title: "Production Coordination", icon: Factory },
  { step: "05", title: "Quality Checking", icon: ShieldCheck },
  { step: "06", title: "Proper Packing", icon: PackageCheck },
  { step: "07", title: "Timely Delivery", icon: Clock },
];

export default function QualityPhilosophySection() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Blue Accent Bars */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0066CC] flex items-center justify-center gap-3">
            <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block shrink-0" />
            <span>QUALITY &amp; SERVICE PHILOSOPHY</span>
            <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block shrink-0" />
          </h2>
          <p className="text-sm sm:text-base font-heading font-bold text-[#0A2540]">
            Quality is not limited to the finished product.
          </p>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            For us, quality begins with understanding the requirement correctly.
          </p>
          <div className="pt-1">
            <span className="inline-block text-[11px] font-heading font-extrabold uppercase tracking-widest text-[#0066CC] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Our approach considers:
            </span>
          </div>
        </div>

        {/* 7-Step Sequential Quality Flow */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4 items-stretch">
          {PHILOSOPHY_POINTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-slate-50 hover:bg-blue-50/60 border border-slate-200/90 hover:border-[#0066CC] rounded-xl p-4 text-center transition-all duration-200 flex flex-col justify-between items-center group relative shadow-2xs"
              >
                <div className="w-full flex flex-col items-center">
                  <span className="text-[10px] font-heading font-black text-slate-400 group-hover:text-[#0066CC] transition-colors mb-2">
                    STEP {item.step}
                  </span>

                  <div className="w-11 h-11 rounded-full bg-white text-[#0066CC] border border-slate-200 group-hover:bg-[#0066CC] group-hover:text-white group-hover:border-[#0066CC] flex items-center justify-center transition-all duration-200 shadow-2xs mb-3">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-xs font-heading font-bold text-[#0A2540] group-hover:text-[#0066CC] transition-colors leading-tight">
                    {item.title}
                  </h3>
                </div>

                {/* Connecting Arrow for Desktop */}
                {idx < PHILOSOPHY_POINTS.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-slate-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
