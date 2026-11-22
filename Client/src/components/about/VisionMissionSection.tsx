import React from "react";
import { Compass, Target, CheckCircle2, TrendingUp } from "lucide-react";

const MISSION_POINTS = [
  "Provide reliable customized business solutions.",
  "Deliver consistent product quality.",
  "Maintain competitive and transparent pricing.",
  "Develop long-term customer relationships.",
  "Respond professionally and efficiently to customer requirements.",
  "Continuously improve products, processes and service.",
  "Become a dependable single-source partner for printing, accessories, packaging and promotional requirements.",
];

export default function VisionMissionSection() {
  return (
    <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Blue Accent Bars */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0066CC] uppercase tracking-wide flex items-center justify-center gap-3">
            <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block shrink-0" />
            <span>VISION &amp; MISSION</span>
            <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block shrink-0" />
          </h2>
          <p className="text-sm sm:text-base font-heading font-black text-[#0A2540] uppercase tracking-wide">
            OUR LONG-TERM ROADMAP &amp; OPERATING COMMITMENTS
          </p>
        </div>

        {/* Enhanced Dual Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Card 1: OUR LONG-TERM VISION */}
          <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-[#0066CC] transition-all duration-200 flex flex-col justify-between group relative overflow-hidden">
            {/* Top Sapphire Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0066CC] via-blue-500 to-indigo-500" />

            {/* Top Main Content Area */}
            <div className="p-7 sm:p-9 space-y-4 flex-1">
              <div className="flex items-center gap-3.5 pb-4 border-b border-slate-200/80">
                <div className="w-12 h-12 rounded-xl bg-blue-100/80 text-[#0066CC] flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-[#0066CC] group-hover:text-white transition-colors">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-heading font-black text-[#0A2540] uppercase tracking-wide group-hover:text-[#0066CC] transition-colors">
                    OUR LONG-TERM VISION
                  </h3>
                  <p className="text-[11px] font-mono font-bold text-[#0066CC] uppercase tracking-wider">
                    Strategic Industry Roadmap
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                <p>
                  Our vision is to develop <strong className="text-[#0A2540] font-semibold">&ldquo;texpart design &amp; accessories&rdquo;</strong> into a trusted and recognized B2B solutions partner in Bangladesh for:
                </p>

                {/* 4 Pillars Interactive Chips */}
                <div className="grid grid-cols-2 gap-2 py-1">
                  {[
                    "Commercial Printing",
                    "Garments Accessories",
                    "Packaging Solutions",
                    "Promotional Products",
                  ].map((pillar, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-blue-100/90 rounded-[4px] px-3 py-2 text-center shadow-2xs group-hover:border-blue-200 transition-colors"
                    >
                      <span className="text-[11px] sm:text-xs font-heading font-bold text-[#0066CC] uppercase tracking-tight block">
                        {pillar}
                      </span>
                    </div>
                  ))}
                </div>

                <p>
                  We aim to build long-term relationships with corporate organizations, garment manufacturers, buying houses, financial institutions, NGOs, development organizations, industrial companies and consumer brands.
                </p>
              </div>
            </div>

            {/* Bottom Strategic Outlook - Flush at the Very Bottom of the Card */}
            <div className="mt-auto p-5 sm:px-9 bg-white/90 border-t border-slate-200/80 flex items-start gap-3">
              <TrendingUp className="w-4 h-4 text-[#0066CC] shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 leading-relaxed">
                In the future, we intend to expand our product range, strengthen our production and sourcing network, improve quality-control systems, develop stronger digital capabilities and serve both domestic and international customers.
              </p>
            </div>
          </div>

          {/* Card 2: OUR MISSION */}
          <div className="bg-[#F8FAFC] rounded-2xl p-7 sm:p-9 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-[#0066CC] transition-all duration-200 flex flex-col justify-between space-y-6 group relative overflow-hidden">
            {/* Top Sapphire Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-[#0066CC] to-[#0A2540]" />

            <div className="space-y-4">
              <div className="flex items-center gap-3.5 pb-4 border-b border-slate-200/80">
                <div className="w-12 h-12 rounded-xl bg-blue-100/80 text-[#0066CC] flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-[#0066CC] group-hover:text-white transition-colors">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-heading font-black text-[#0A2540] uppercase tracking-wide group-hover:text-[#0066CC] transition-colors">
                    OUR MISSION
                  </h3>
                  <p className="text-[11px] font-mono font-bold text-[#0066CC] uppercase tracking-wider">
                    Our Operating Commitments
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-heading font-bold text-[#0A2540] uppercase tracking-wide">
                Our mission is to:
              </p>

              {/* 7 Operating Commitments Rows */}
              <div className="space-y-2">
                {MISSION_POINTS.map((point, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-white/90 hover:bg-white border border-slate-200/70 hover:border-blue-200 rounded-[4px] p-2.5 transition-all text-xs sm:text-[13px] text-slate-700 leading-snug group/item shadow-2xs"
                  >
                    <div className="w-4 h-4 rounded-full bg-blue-50 text-[#0066CC] flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-[#0066CC] group-hover/item:text-white transition-colors">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
