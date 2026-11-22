import React from "react";
import {
  Ear,
  Compass,
  FileSpreadsheet,
  TestTube,
  Factory,
  Truck,
  Headphones,
} from "lucide-react";

const APPROACH_STAGES = [
  {
    step: "01",
    title: "UNDERSTAND",
    icon: Ear,
    description: "We listen to the requirement and understand the intended application.",
  },
  {
    step: "02",
    title: "RECOMMEND",
    icon: Compass,
    description: "We suggest suitable materials, specifications, finishing and production options.",
  },
  {
    step: "03",
    title: "QUOTE",
    icon: FileSpreadsheet,
    description: "We provide a commercially appropriate quotation based on the approved requirement.",
  },
  {
    step: "04",
    title: "SAMPLE",
    icon: TestTube,
    description: "Where necessary, we develop samples or prototypes for approval.",
  },
  {
    step: "05",
    title: "PRODUCE",
    icon: Factory,
    description: "Production is coordinated according to the approved specification.",
  },
  {
    step: "06",
    title: "DELIVER",
    icon: Truck,
    description: "The finished products are properly packed and delivered.",
  },
  {
    step: "07",
    title: "SUPPORT",
    icon: Headphones,
    description: "We remain available for repeat requirements and future developments.",
  },
];

export default function CustomerApproachSection() {
  return (
    <section className="py-12 sm:py-16 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Blue Accent Bars */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0066CC] flex items-center justify-center gap-3">
            <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block shrink-0" />
            <span>OUR CUSTOMER APPROACH</span>
            <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block shrink-0" />
          </h2>
          <p className="text-sm sm:text-base font-heading font-bold text-[#0A2540]">
            Every customer has different requirements.
          </p>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            Therefore, we follow a consultative approach:
          </p>
        </div>

        {/* 7 Consultative Stages in a Clean Staggered Grid (Senior UI/UX Card Design) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {APPROACH_STAGES.slice(0, 4).map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.title}
                className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/90 hover:border-[#0066CC] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Subtle Hover Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-transparent group-hover:bg-[#0066CC] transition-colors" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066CC] group-hover:bg-[#0066CC] group-hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-sm sm:text-[15px] font-heading font-black uppercase tracking-wider text-[#0A2540] group-hover:text-[#0066CC] transition-colors">
                    {stage.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {stage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Remaining 3 Stages Centered on Desktop with Equal Card Widths */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-4 sm:mt-5 max-w-5xl mx-auto">
          {APPROACH_STAGES.slice(4).map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.title}
                className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/90 hover:border-[#0066CC] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Subtle Hover Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-transparent group-hover:bg-[#0066CC] transition-colors" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066CC] group-hover:bg-[#0066CC] group-hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-sm sm:text-[15px] font-heading font-black uppercase tracking-wider text-[#0A2540] group-hover:text-[#0066CC] transition-colors">
                    {stage.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {stage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
