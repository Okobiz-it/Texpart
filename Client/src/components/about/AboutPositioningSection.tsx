import React from "react";

export default function AboutPositioningSection() {
  return (
    <section className="py-14 sm:py-20 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Blue Accent Bars */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0066CC] flex items-center justify-center gap-3">
            <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block shrink-0" />
            <span>OUR POSITIONING</span>
            <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block shrink-0" />
          </h2>
          <p className="text-sm sm:text-base font-heading font-black text-[#0A2540] uppercase tracking-wide">
            YOUR COMPLETE PARTNER FOR PRINTING, ACCESSORIES &amp; PACKAGING SOLUTIONS
          </p>
        </div>

        {/* Single Unified Section Container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-7 sm:p-10 border border-slate-200/90 shadow-xs hover:border-blue-200 transition-all duration-200 space-y-5 text-center sm:text-left">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal text-left">
              Today&apos;s businesses increasingly prefer suppliers who can manage multiple related requirements through one reliable channel.
            </p>

            {/* Central Concept Box */}
            <div className="bg-gradient-to-r from-blue-50/80 via-slate-50 to-indigo-50/50 border border-blue-200/80 rounded-xl p-5 sm:p-6 text-center shadow-2xs">
              <span className="text-xs font-mono font-bold text-[#0A2540] uppercase tracking-wider block">
                &ldquo;texpart&rdquo; is being developed around this concept:
              </span>
              <p className="text-base sm:text-xl font-heading font-black text-[#0066CC] mt-1.5 uppercase tracking-tight">
                One Partner. Multiple Print Solutions.
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal text-left">
              Instead of managing separate suppliers for printing, labels, accessories, packaging and promotional products, our customers can communicate their requirements through one coordinated partner.
            </p>

            {/* Bottom Sourcing Mission Statement */}
            <div className="pt-3 border-t border-slate-100">
              <p className="text-xs sm:text-sm font-heading font-bold text-[#0A2540] leading-relaxed">
                Our objective is to make sourcing simpler, more efficient and more reliable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
