import React from "react";
import {
  ShieldCheck,
  Lightbulb,
  Search,
  Award,
  CheckCircle2,
  Users,
} from "lucide-react";

const CORE_VALUES = [
  {
    title: "INTEGRITY",
    description: "We do business with honesty and responsibility.",
    icon: ShieldCheck,
  },
  {
    title: "INNOVATION",
    description: "We continuously seek better ideas and better solutions.",
    icon: Lightbulb,
  },
  {
    title: "DEPTH",
    description: "We understand requirements before recommending solutions.",
    icon: Search,
  },
  {
    title: "QUALITY",
    description: "We focus on consistency and customer expectations.",
    icon: Award,
  },
  {
    title: "RELIABILITY",
    description: "We value commitments, communication and delivery.",
    icon: CheckCircle2,
  },
  {
    title: "CUSTOMER FOCUS",
    description: "We measure our success through long-term customer relationships.",
    icon: Users,
  },
];

export default function CoreValuesSection() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Blue Accent Bars */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0066CC] flex items-center justify-center gap-3">
            <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block shrink-0" />
            <span>OUR CORE VALUES</span>
            <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block shrink-0" />
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            The fundamental principles that guide our conduct, decisions and customer relationships
          </p>
        </div>

        {/* 6 Core Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto items-stretch">
          {CORE_VALUES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-[#F8FAFC] hover:bg-blue-50/40 border border-slate-200/90 hover:border-[#0066CC] rounded-xl p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between group shadow-2xs hover:shadow-xs"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#0066CC] border border-slate-200/80 group-hover:bg-[#0066CC] group-hover:text-white group-hover:border-[#0066CC] flex items-center justify-center shadow-2xs transition-all duration-200">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-sm sm:text-base font-heading font-black uppercase tracking-wider text-[#0A2540] group-hover:text-[#0066CC] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                    {item.description}
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
