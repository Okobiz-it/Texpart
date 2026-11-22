import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const COMMITMENTS = [
  {
    title: "CUSTOMIZED SOLUTIONS",
    description: "We develop products according to individual customer requirements rather than relying only on standard products.",
  },
  {
    title: "CONSISTENT QUALITY",
    description: "We focus on maintaining consistency across repeated production and supply.",
  },
  {
    title: "COMPETITIVE PRICING",
    description: "We aim to provide commercially competitive solutions without compromising the agreed specification.",
  },
  {
    title: "RELIABLE DELIVERY",
    description: "We understand that delayed printing, packaging or accessories can affect a customer's own production and delivery schedule.",
  },
  {
    title: "PROFESSIONAL SERVICE",
    description: "We maintain clear communication from requirement development through production and delivery.",
  },
];

export default function WhyTexpartSection() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Visual Factory Imagery & Value Prop Badge (Balanced Height Ratio) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
            <div className="relative w-full aspect-[4/4.2] sm:aspect-[4/3.8] lg:h-[440px] lg:aspect-auto rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 flex-1">
              <Image
                src="/images/about-texpart-factory.jpg"
                alt="Texpart Factory Floor & Manufacturing"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-center shrink-0">
              <p className="text-xs font-heading font-bold text-[#0066CC] uppercase tracking-wider">
                One Partner. Multiple Solutions.
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Design • Develop • Produce • Pack • Deliver
              </p>
            </div>
          </div>

          {/* Right Column: Why Texpart Narrative & 5 Core Commitments */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-[#0A2540] uppercase tracking-tight">
                WHY TEXPART
              </h2>
              <p className="text-sm font-heading font-bold text-[#0066CC] mt-2">
                ONE PARTNER. MULTIPLE SOLUTIONS.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mt-1">
                Customers choose suppliers not only because of price, but also because of reliability, communication, consistency and service.
              </p>
              <p className="text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mt-3">
                Our key commitments are:
              </p>
            </div>

            {/* 5 Distinct Commitment Cards with Checkmarks */}
            <div className="space-y-2.5">
              {COMMITMENTS.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50/70 hover:bg-blue-50/40 border border-slate-200/90 hover:border-blue-200 rounded-lg p-3.5 transition-all duration-150 flex items-start gap-3.5 group"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-100/80 text-[#0066CC] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#0066CC] group-hover:text-white transition-colors shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <h4 className="text-xs sm:text-[13px] font-heading font-bold text-[#0A2540] group-hover:text-[#0066CC] transition-colors uppercase tracking-wide">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
