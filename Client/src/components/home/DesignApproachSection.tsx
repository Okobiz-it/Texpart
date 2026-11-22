import React from "react";
import { Lightbulb, Layers, Factory, Package, Truck } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "DESIGN",
    icon: Lightbulb,
    description: "Understand the customer's brand, requirement, application and target audience.",
  },
  {
    step: "02",
    title: "DEVELOP",
    icon: Layers,
    description: "Convert the requirement into an appropriate product, material, specification and production solution.",
  },
  {
    step: "03",
    title: "PRODUCE",
    icon: Factory,
    description: "Coordinate production according to the approved specification and required quality standard.",
  },
  {
    step: "04",
    title: "PACK",
    icon: Package,
    description: "Ensure appropriate packing and presentation for safe handling and delivery.",
  },
  {
    step: "05",
    title: "DELIVER",
    icon: Truck,
    description: "Deliver the finished products according to the agreed quantity, specification and timeline.",
  },
];

export default function DesignApproachSection() {
  return (
    <section className="py-12 sm:py-16 bg-[#F0F7FD] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Blue Accent Bars */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0066CC] flex items-center justify-center gap-3">
            <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block shrink-0" />
            <span>OUR DESIGN &amp; DEVELOPMENT APPROACH</span>
            <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block shrink-0" />
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            At &ldquo;texpart&rdquo;, we believe that a successful product starts with understanding the requirement correctly
          </p>
        </div>

        {/* 5 Process Step Cards (Clean Icon Without Numbering) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch">
          {STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white rounded-xl p-5 border border-blue-100/80 shadow-xs hover:border-[#0066CC] hover:shadow-md transition-all duration-200 flex flex-col justify-between text-center group"
              >
                <div>
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-12 h-12 rounded-full bg-[#0066CC] text-white flex items-center justify-center shadow-xs transition-transform duration-200 group-hover:scale-105">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-sm font-heading font-black uppercase tracking-wider text-[#0A2540] group-hover:text-[#0066CC] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 font-normal mt-2 leading-relaxed">
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
