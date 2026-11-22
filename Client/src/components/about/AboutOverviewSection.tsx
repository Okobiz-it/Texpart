import React from "react";
import Image from "next/image";

export default function AboutOverviewSection() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Building Graphic (Clean Transparent Background on #FFFFFF) */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] w-full flex items-center justify-center bg-transparent">
              <Image
                src="/images/products/about-building.png"
                alt="Texpart Design & Accessories Corporate Headquarters"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Right Narrative (Exact Text Specified) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2">
                <span className="w-8 h-[2px] bg-[#0066CC] inline-block" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0066CC]">
                  Corporate Profile
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-[#0A2540] uppercase tracking-tight">
                ABOUT TEXPART
              </h1>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              <p>
                <strong className="text-[#0A2540] font-semibold">&ldquo;texpart design &amp; accessories&rdquo;</strong> is a Bangladesh-based B2B solutions company providing Commercial Printing, Garments Accessories, Packaging Solutions and Promotional Products for businesses, organizations, brands and institutions.
              </p>

              <p>
                We aim to become a reliable single-source partner for customers who require professionally designed, consistently produced and efficiently delivered printing, branding, packaging and accessory solutions.
              </p>

              <p>
                Our approach goes beyond simply supplying products. We work to understand the customer&apos;s requirement, develop the appropriate solution, coordinate production, maintain consistency and deliver according to the agreed specification and timeline.
              </p>

              <p className="pt-1 text-[#0A2540] font-medium border-l-2 border-[#0066CC] pl-3.5 italic bg-blue-50/40 py-2.5 rounded-r-[4px]">
                From a single customized requirement to recurring corporate orders, Texpart is committed to providing practical, competitive and dependable solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
