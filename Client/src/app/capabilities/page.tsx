"use client";

import React from "react";
import CorePillarsSection from "@/components/capabilities/CorePillarsSection";
import DesignApproachSection from "@/components/home/DesignApproachSection";
import QualityPhilosophySection from "@/components/home/QualityPhilosophySection";
import CustomerApproachSection from "@/components/home/CustomerApproachSection";
import OurPromiseSection from "@/components/home/OurPromiseSection";

export default function CapabilitiesPage() {
  return (
    <div className="bg-white min-h-screen text-[#0A2540]">
      {/* 1. Header Design (Consistent With All Client Site Pages) */}
      <section className="pt-32 sm:pt-36 pb-14 sm:pb-16 bg-gradient-to-r from-[#061730] via-[#0A2540] to-[#003B73] text-white overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black uppercase tracking-tight text-white leading-tight">
              Sourcing &amp; Manufacturing <br className="hidden sm:inline" />
              <span className="text-blue-400">Capabilities</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              We provide customized commercial printing, garments accessories, packaging solutions, and promotional products for corporate, retail, garment, institutional, and consumer brands.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Core Business Areas: 4 Core Manufacturing & Sourcing Pillars */}
      <CorePillarsSection />

      {/* 3. Our Design & Development Approach (Exact Home Page Component) */}
      <DesignApproachSection />

      {/* 4. Quality & Service Philosophy (Exact Home Page Component) */}
      <QualityPhilosophySection />

      {/* 5. Our Customer Approach (Exact Home Page Component) */}
      <CustomerApproachSection />

      {/* 6. Our Promise: Your Requirement. Our Responsibility. (Exact Home Page Component) */}
      <OurPromiseSection />
    </div>
  );
}
