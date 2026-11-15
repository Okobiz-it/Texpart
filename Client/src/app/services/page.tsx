"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuote } from "@/context/QuoteContext";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import {
  Scissors,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Printer,
  Compass,
  ArrowRight,
  FileCheck,
  Package,
} from "lucide-react";

export default function ServicesPage() {
  const { openQuote } = useQuote();
  const [activeTab, setActiveTab] = useState<"private" | "commercial">("private");

  const commercialProducts = PRODUCTS.filter((p) => p.collectionId === "commercial");

  const steps = [
    {
      num: "01",
      title: "Idea & Tech Pack",
      desc: "Understanding the client's concept, requirements, style guidelines, and technical specifications (measurements, tolerances, fabric weights).",
      img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80",
      details: ["Measurement charts & grading", "BOM (Bill of Materials) creation", "Design feasibility consultation"],
    },
    {
      num: "02",
      title: "Design & Development",
      desc: "Developing the detailed garment construction specifications, pattern drafting, silhouette refinements, and stitch engineering.",
      img: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
      details: ["Digital CAD pattern drafting", "3D virtual fitting adjustments", "Seam construction engineering"],
    },
    {
      num: "03",
      title: "Material & Fabric Selection",
      desc: "Sourcing and selecting appropriate shell fabrics, technical linings, insulations, trims, zippers, woven labels, and hardware.",
      img: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1000&q=80",
      details: ["Fabric lab dips & strike-offs", "Thread & trim color matching", "OEKO-TEX & GRS certified trims"],
    },
    {
      num: "04",
      title: "Sampling & Prototyping",
      desc: "Developing physical prototypes and fit samples for hands-on review, fit validation, wash testing, and client sign-off.",
      img: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1000&q=80",
      details: ["Proto sample & fit revision", "Pre-production (PP) sample", "Client approval milestone"],
    },
    {
      num: "05",
      title: "Bulk Production",
      desc: "Moving the approved sample into scheduled assembly lines with automated cutting, precision stitching, and continuous in-line QA.",
      img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80",
      details: ["Multi-ply vacuum table cutting", "Dedicated jacket & knitwear lines", "Continuous line inspection"],
    },
    {
      num: "06",
      title: "Finishing & Delivery",
      desc: "Final garment pressing, thread trimming, metal detector scanning, hangtag attachment, folding, polybagging, and export dispatch.",
      img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80",
      details: ["AQL 1.5 final audit", "Barcoded retail polybagging", "Ocean & air freight coordination"],
    },
  ];

  return (
    <div className="pt-20">
      {/* Header Banner */}
      <section className="relative py-20 sm:py-32 bg-charcoal text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block">
              Core Manufacturing Capabilities
            </span>
            <h1 className="text-4xl sm:text-6xl font-heading font-black uppercase tracking-tight text-white leading-tight">
              Two Pillars of <br />
              <span className="text-orange">Production Excellence.</span>
            </h1>
            <p className="text-base sm:text-lg text-beige-light leading-relaxed font-light pt-2">
              Explore our specialized manufacturing divisions designed to handle everything from complex apparel development to customized commercial printing and promotional merchandise.
            </p>

            {/* Quick Switcher Tabs */}
            <div className="pt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab("private")}
                className={`px-6 py-3 rounded-sm font-heading text-xs font-extrabold uppercase tracking-wider transition-all ${
                  activeTab === "private"
                    ? "bg-orange text-white shadow-lg"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                Service A: Private Jobs (Apparel Manufacturing)
              </button>
              <button
                onClick={() => setActiveTab("commercial")}
                className={`px-6 py-3 rounded-sm font-heading text-xs font-extrabold uppercase tracking-wider transition-all ${
                  activeTab === "commercial"
                    ? "bg-cyan text-white shadow-lg"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                Service B: Commercial Jobs (Printing &amp; Promo)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SERVICE A: PRIVATE JOBS
          ================================================================= */}
      <section
        id="private-jobs"
        className={`py-24 sm:py-32 bg-offwhite text-charcoal border-b border-charcoal/10 ${
          activeTab === "commercial" ? "opacity-75" : "opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Service A Header */}
          <div className="max-w-3xl space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange/10 text-orange rounded-sm text-xs font-heading font-extrabold uppercase tracking-widest">
              SERVICE DIVISION 01 &bull; APPAREL DEVELOPMENT &amp; PRODUCTION
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-charcoal">
              From Tech Pack to Production.
            </h2>
            <p className="text-base sm:text-lg text-grey-dark leading-relaxed font-light">
              Complete apparel development and manufacturing solutions under one roof. We handle the complete process of developing an apparel product such as an outerwear jacket or technical collection &mdash; starting from the client&apos;s initial idea or technical pack and continuing through prototyping, sourcing, and export shipping.
            </p>
            <div className="pt-2">
              <button
                onClick={() => openQuote("Private Jobs Apparel Manufacturing", "Private Jobs")}
                className="bg-charcoal hover:bg-forest text-offwhite px-7 py-3.5 rounded-sm font-heading text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-md"
              >
                Submit Tech Pack For Review
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 6-Step Visual Process Timeline */}
          <div className="space-y-12 relative before:hidden lg:before:block lg:before:absolute lg:before:left-1/2 lg:before:-translate-x-1/2 lg:before:top-12 lg:before:bottom-12 lg:before:w-0.5 lg:before:bg-charcoal/10">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={step.num}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative"
                >
                  {/* Step Node Marker (Desktop Center) */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-charcoal text-orange font-heading font-black text-xs items-center justify-center border-4 border-offwhite shadow-lg z-10">
                    {step.num}
                  </div>

                  {/* Left Column Content/Image */}
                  <div className={`lg:col-span-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="bg-white p-8 sm:p-10 rounded-sm border border-charcoal/10 shadow-sm space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-orange">
                          STEP {step.num}
                        </span>
                        <span className="text-[11px] font-heading font-extrabold uppercase text-grey-dark tracking-wider">
                          Manufacturing Pipeline
                        </span>
                      </div>
                      <h3 className="text-2xl font-heading font-black uppercase text-charcoal">
                        {step.title}
                      </h3>
                      <p className="text-sm text-grey-dark leading-relaxed">
                        {step.desc}
                      </p>
                      <div className="pt-2 border-t border-charcoal/10">
                        <ul className="space-y-1.5 text-xs text-charcoal font-medium">
                          {step.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Right Column Image */}
                  <div className={`lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="relative aspect-[16/10] rounded-sm overflow-hidden shadow-lg border border-charcoal/10">
                      <Image
                        src={step.img}
                        alt={step.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-charcoal/85 backdrop-blur-sm text-white px-2.5 py-1 text-[10px] font-heading font-bold uppercase tracking-wider">
                        Stage {step.num} Telemetry
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 p-4 bg-offwhite-alt/80 border-l-4 border-orange text-xs text-grey-dark">
            <strong>Production Integrity Notice:</strong> This 6-step visual workflow represents our comprehensive end-to-end service offering. Exact timelines, sampling iterations, and machine allocations are agreed upon client technical consultation.
          </div>
        </div>
      </section>

      {/* =================================================================
          SERVICE B: COMMERCIAL JOBS
          ================================================================= */}
      <section
        id="commercial-jobs"
        className={`py-24 sm:py-32 bg-white text-charcoal ${
          activeTab === "private" ? "opacity-95" : "opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Service B Header */}
          <div className="max-w-3xl space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan/10 text-cyan rounded-sm text-xs font-heading font-extrabold uppercase tracking-widest">
              SERVICE DIVISION 02 &bull; COMMERCIAL PRINTING &amp; PACKAGING
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-charcoal">
              Bring Your Design. We&apos;ll Make It Real.
            </h2>
            <p className="text-base sm:text-lg text-grey-dark leading-relaxed font-light">
              Complete commercial printing solutions for businesses, brands, and organizations. From luxury gift boxes to corporate catalogues and promotional merchandise, we offer two distinct execution pathways.
            </p>
          </div>

          {/* Two Service Approaches Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {/* OPTION 01 */}
            <div className="p-8 sm:p-10 rounded-sm bg-offwhite border-2 border-charcoal/10 hover:border-cyan space-y-5 transition-all">
              <div className="w-12 h-12 rounded-sm bg-cyan/15 text-cyan flex items-center justify-center">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-cyan block mb-1">
                  WORKFLOW OPTION 01
                </span>
                <h3 className="text-2xl font-heading font-black uppercase text-charcoal">
                  Printing From Your Design
                </h3>
              </div>
              <p className="text-sm text-grey-dark leading-relaxed">
                &ldquo;Already have a design? Share your artwork and we will help turn it into high-quality printed products.&rdquo;
              </p>
              <ul className="space-y-2 text-xs text-charcoal/90 border-t border-charcoal/10 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0" />
                  <span>Pre-flight artwork inspection (CMYK separation, resolution check)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0" />
                  <span>Digital calibrated PDF or wet proofs for color approval</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0" />
                  <span>Rapid press run on Heidelberg 6-color offset machinery</span>
                </li>
              </ul>
              <div className="pt-2">
                <button
                  onClick={() => openQuote("Printing From Client Artwork", "Commercial Jobs - Option 01")}
                  className="bg-charcoal hover:bg-cyan text-white px-6 py-3 rounded-sm font-heading text-xs font-extrabold uppercase tracking-wider transition-colors"
                >
                  Upload Artwork &amp; Quote
                </button>
              </div>
            </div>

            {/* OPTION 02 */}
            <div className="p-8 sm:p-10 rounded-sm bg-offwhite border-2 border-charcoal/10 hover:border-orange space-y-5 transition-all">
              <div className="w-12 h-12 rounded-sm bg-orange/15 text-orange flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-orange block mb-1">
                  WORKFLOW OPTION 02
                </span>
                <h3 className="text-2xl font-heading font-black uppercase text-charcoal">
                  Design + Printing Creative Support
                </h3>
              </div>
              <p className="text-sm text-grey-dark leading-relaxed">
                &ldquo;Don&apos;t have a design yet? Our creative team can help develop the artwork and deliver the final printed product.&rdquo;
              </p>
              <ul className="space-y-2 text-xs text-charcoal/90 border-t border-charcoal/10 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0" />
                  <span>Creative concept development, structural dieline engineering</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0" />
                  <span>Typography, branding accents, foil stamping &amp; embossing layouts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0" />
                  <span>End-to-end design through final print delivery under single ownership</span>
                </li>
              </ul>
              <div className="pt-2">
                <button
                  onClick={() => openQuote("Creative Design + Printing Support", "Commercial Jobs - Option 02")}
                  className="bg-orange hover:bg-orange-hover text-white px-6 py-3 rounded-sm font-heading text-xs font-extrabold uppercase tracking-wider transition-colors"
                >
                  Consult Creative Team
                </button>
              </div>
            </div>
          </div>

          {/* Commercial Printing Product Categories Showcase */}
          <div className="border-t border-charcoal/10 pt-16">
            <div className="mb-10">
              <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-cyan block mb-1">
                Brochure 01 Range
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-charcoal">
                Commercial Printing Products
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {commercialProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

