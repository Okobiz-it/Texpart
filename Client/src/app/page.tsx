import React from "react";
import { Metadata } from "next";
import HeroSlider from "@/components/home/HeroSlider";
import ProductRangeSection from "@/components/home/ProductRangeSection";
import WhyTexpartSection from "@/components/home/WhyTexpartSection";
import ThreeICommitmentSection from "@/components/about/ThreeICommitmentSection";
import CoreDivisionsSection from "@/components/home/CoreDivisionsSection";
import DesignApproachSection from "@/components/home/DesignApproachSection";
import QualityPhilosophySection from "@/components/home/QualityPhilosophySection";
import CustomerApproachSection from "@/components/home/CustomerApproachSection";
import OurPromiseSection from "@/components/home/OurPromiseSection";
import CertificationsSection from "@/components/home/CertificationsSection";
import ClientsSection from "@/components/home/ClientsSection";

export const metadata: Metadata = {
  title: "Texpart — Design & Accessories | Commercial Printing, Garments Accessories & Packaging",
  description:
    "ONE PARTNER. MULTIPLE SOLUTIONS. Customized B2B solutions across Commercial Printing, Garments Accessories, Packaging Solutions, and Promotional Products.",
};

export default function HomePage() {
  return (
    <div className="bg-white min-h-screen text-[#0A2540]">
      {/* 1. Hero Banners Slider */}
      <HeroSlider />

      {/* 2. Our Product Range (Up to 10 Featured Products) */}
      <ProductRangeSection />

      {/* 3. Why Texpart (One Partner. Multiple Solutions. & 5 Commitments) */}
      <WhyTexpartSection />

      {/* 4. Core Divisions (Commercial Printing, Garments Accessories, Packaging, Promotional) */}
      <CoreDivisionsSection />

      {/* 5. Our Design & Development Approach (5 Stages: Design, Develop, Produce, Pack, Deliver) */}
      <DesignApproachSection />

      {/* 6. Our 3I Commitment (Integrity, Innovation, In-Depth) */}
      <ThreeICommitmentSection />

      {/* 7. Quality & Service Philosophy (7 Key Consideration Steps) */}
      <QualityPhilosophySection />

      {/* 8. Our Customer Approach (7 Consultative Stages: 01 to 07) */}
      <CustomerApproachSection />

      {/* 9. Our Promise (Your Requirement. Our Responsibility.) */}
      <OurPromiseSection />

      {/* 10. Global Quality Certifications Marquee */}
      <CertificationsSection />

      {/* 11. Global Client Partners Grid */}
      <ClientsSection />
    </div>
  );
}
