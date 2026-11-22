import React from "react";
import { Handshake, Lightbulb, Search } from "lucide-react";

const THREE_I_COMMITMENT = [
  {
    num: "01",
    title: "INTEGRITY",
    subtitle: "Integrity in Every Step",
    desc: "We believe business relationships are built on honesty, transparency and responsible communication. We aim to provide clear information about product specifications, pricing, production requirements and delivery commitments.",
    icon: Handshake,
  },
  {
    num: "02",
    title: "INNOVATION",
    subtitle: "Innovation in Every Detail",
    desc: "We continuously look for better ideas, improved presentation, practical product alternatives and customized solutions that can add value to our customers. Innovation does not always mean complexity. Sometimes a better material, better finishing, better packaging or more efficient production approach creates the greatest value.",
    icon: Lightbulb,
  },
  {
    num: "03",
    title: "IN-DEPTH",
    subtitle: "Depth in Every Solution",
    desc: "We believe in understanding the requirement before recommending a solution.",
    icon: Search,
  },
];

export default function ThreeICommitmentSection() {
  return (
    <section className="py-14 sm:py-20 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Blue Accent Bars */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0066CC] uppercase tracking-wide flex items-center justify-center gap-3">
            <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block shrink-0" />
            <span>OUR 3I COMMITMENT</span>
            <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block shrink-0" />
          </h2>
          <p className="text-sm sm:text-base font-heading font-black text-[#0A2540] uppercase tracking-wide">
            FOUNDATIONS OF OUR SERVICE &amp; MANUFACTURING EXCELLENCE
          </p>
        </div>

        {/* 3 Pillar Cards - Visually Enhanced UI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {THREE_I_COMMITMENT.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#0066CC] p-7 sm:p-8 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Subtle Hover Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#0066CC] transition-colors" />

                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-[4px] bg-blue-50 text-[#0066CC] font-mono font-black text-sm tracking-wider border border-blue-100/80 group-hover:bg-[#0066CC] group-hover:text-white transition-colors">
                      {item.num}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#0066CC] group-hover:bg-[#0066CC] group-hover:text-white flex items-center justify-center shadow-2xs transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-heading font-black uppercase tracking-tight text-[#0A2540] group-hover:text-[#0066CC] transition-colors leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] font-heading font-bold text-[#0066CC] tracking-tight mt-1">
                        {item.subtitle}
                      </p>
                    </div>

                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal text-left">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
