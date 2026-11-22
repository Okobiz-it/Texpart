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
          <div className="pt-1">
            <span className="inline-block text-[11px] font-heading font-extrabold uppercase tracking-widest text-[#0066CC] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Our approach considers:
            </span>
          </div>
        </div>

        {/* 7-Step Sequential Quality Pipeline */}
        <div className="relative">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 relative z-10">
            {PHILOSOPHY_POINTS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-slate-50/70 hover:bg-white border border-slate-200/90 hover:border-[#0066CC] rounded-xl p-3.5 sm:p-4 transition-all duration-200 flex flex-col items-center text-center shadow-xs hover:shadow-md group relative overflow-hidden"
                >
                  {/* Step Sequence Badge (Positioned at Top-Left) */}
                  <span className="self-start inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-blue-50/80 border border-blue-100 group-hover:bg-[#0066CC] group-hover:border-[#0066CC] text-[#0066CC] group-hover:text-white font-mono font-black text-xs sm:text-[13px] tracking-wide transition-all mb-2 shadow-2xs">
                    {item.step}
                  </span>

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0066CC] group-hover:bg-[#0066CC] group-hover:text-white transition-colors flex items-center justify-center mb-2.5 shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xs font-heading font-bold text-[#0A2540] group-hover:text-[#0066CC] transition-colors leading-tight">
                    {item.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
