import React from "react";
import {
  ShieldCheck,
  Lightbulb,
  CheckCircle2,
  Tag,
  Award,
} from "lucide-react";

const PILLARS = [
  { name: "Quality", icon: ShieldCheck },
  { name: "Innovation", icon: Lightbulb },
  { name: "Reliability", icon: CheckCircle2 },
  { name: "Competitive Pricing", icon: Tag },
  { name: "Professional Service", icon: Award },
];

export default function OurPromiseSection() {
  return (
    <section className="py-14 sm:py-20 bg-gradient-to-r from-[#061730] via-[#0A2540] to-[#003B73] text-white border-b border-white/10 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="w-8 sm:w-16 h-[2px] bg-blue-400 inline-block shrink-0" />
            <h2 className="text-xl sm:text-2xl font-heading font-black text-blue-400 uppercase tracking-widest">
              OUR PROMISE
            </h2>
            <span className="w-8 sm:w-16 h-[2px] bg-blue-400 inline-block shrink-0" />
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black tracking-tight text-white uppercase mt-2">
            YOUR REQUIREMENT. OUR RESPONSIBILITY.
          </h3>
        </div>

        {/* Narrative */}
        <div className="max-w-3xl mx-auto space-y-3 text-slate-200 font-light text-sm sm:text-base leading-relaxed">
          <p>
            At &ldquo;texpart&rdquo;, we understand that a customer&apos;s requirement is more than an order.
          </p>
          <p className="text-xs sm:text-sm text-slate-300">
            It may be a brand launch, a garment production deadline, a corporate event, a promotional campaign, a product delivery or an important business presentation.
          </p>
          <p className="text-xs sm:text-sm font-medium text-blue-200 pt-2">
            That is why we aim to provide solutions that combine:
          </p>
        </div>

        {/* Formula Pillars Badges (4px border radius) */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-4xl mx-auto">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <React.Fragment key={pillar.name}>
                <div className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 rounded-[4px] px-3.5 py-1.5 backdrop-blur-sm transition-all shadow-sm">
                  <Icon className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-heading font-bold text-white tracking-wide">
                    {pillar.name}
                  </span>
                </div>
                {idx < PILLARS.length - 1 && (
                  <span className="text-blue-400 font-bold text-sm hidden sm:inline">&bull;</span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
