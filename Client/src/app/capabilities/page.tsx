"use client";

import React from "react";
import Link from "next/link";
import { useQuote } from "@/context/QuoteContext";
import {
  Palette,
  Sliders,
  Printer,
  ShieldCheck,
  Truck,
  ArrowRight,
  Cpu,
  Sparkles,
  FlaskConical,
  Tag,
  Package,
  Factory,
  Scissors,
  Boxes,
  CheckCircle2,
  Award,
  Globe2,
  Zap,
} from "lucide-react";
import { BRAND_INFO } from "@/data/siteNavigation";

export default function CapabilitiesPage() {
  const { openGeneralQuote } = useQuote();

  // 5 Operational Workflow Steps
  const WORKFLOW_STEPS = [
    {
      step: "01",
      name: "DESIGN",
      icon: <Palette className="w-5 h-5" />,
      tagline: "Creative & Dielines",
      desc: "Concept development, structural CAD packaging dielines, and press-ready color separation.",
    },
    {
      step: "02",
      name: "DEVELOP",
      icon: <Sliders className="w-5 h-5" />,
      tagline: "Plates & Sampling",
      desc: "Computer-to-Plate (CTP) laser imaging, Pantone color matching, and digital proofing.",
    },
    {
      step: "03",
      name: "PRODUCE",
      icon: <Printer className="w-5 h-5" />,
      tagline: "High-Speed Run",
      desc: "German Heidelberg 5-color offset presses, ultrasonic loom weaving, and carton fabrication.",
    },
    {
      step: "04",
      name: "PACK",
      icon: <ShieldCheck className="w-5 h-5" />,
      tagline: "QC & Barrier Wrap",
      desc: "100% optical inspection, barcode scannability verification, and moisture-proof export packaging.",
    },
    {
      step: "05",
      name: "DELIVER",
      icon: <Truck className="w-5 h-5" />,
      tagline: "Global Logistics",
      desc: "Direct factory floor dispatch across all Bangladesh EPZs and international air/sea freight.",
    },
  ];

  // 11 Core Capabilities with Rich Visual Details
  const DETAILED_CAPABILITIES = [
    {
      id: "01",
      name: "Creative & Graphic Design",
      icon: <Palette className="w-6 h-6" />,
      iconColor: "text-blue-600 bg-blue-50 border-blue-100",
      badge: "CAD & Pre-Press",
      tagline: "Brand Identity, Structural Dielines & Packaging Architecture",
      desc: "Our in-house design studio translates client tech packs into production-ready dielines, 3D packaging mockups, and precise vector separations.",
      features: [
        "Vector artwork generation & typography curation",
        "Structural packaging CAD dieline engineering",
        "Export barcode & QR code specification compliance",
      ],
      specs: "Adobe CC & ArtiosCAD Suite",
    },
    {
      id: "02",
      name: "Material Sourcing & R&D",
      icon: <Sparkles className="w-6 h-6" />,
      iconColor: "text-indigo-600 bg-indigo-50 border-indigo-100",
      badge: "Material Science",
      tagline: "Substrate Curation & Industrial GSM Optimization",
      desc: "Engineering custom trim solutions for international fashion houses, selecting exact yarn counts, paper GSMs, tensile strengths, and surface coatings.",
      features: [
        "FSC-certified board & recycled kraft selection",
        "Yarn count selection (50D, 75D, 100D Damask)",
        "Specialty foils, inks & antimicrobial coatings",
      ],
      specs: "Tensile & Micrometer Analysis",
    },
    {
      id: "03",
      name: "Sampling & Prototyping",
      icon: <FlaskConical className="w-6 h-6" />,
      iconColor: "text-cyan-600 bg-cyan-50 border-cyan-100",
      badge: "Rapid Turnaround",
      tagline: "Physical Swatches & Pre-Production Samples in 3–5 Days",
      desc: "Dedicated sample lines deliver actual pre-production proofs for brand buyer approval before full-scale commercial manufacturing commences.",
      features: [
        "3 to 5 working day sample turnaround time",
        "Exact pantone color lab dip & spectrophotometer",
        "Physical dieline assembly & mock fitting",
      ],
      specs: "X-Rite Spectrophotometer",
    },
    {
      id: "04",
      name: "Commercial Printing",
      icon: <Printer className="w-6 h-6" />,
      iconColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
      badge: "Heidelberg Offset",
      tagline: "High-Speed Multi-Color Offset & Publication Presses",
      desc: "Featuring genuine Heidelberg Speedmaster 5-color offset presses capable of running 15,000 sheets per hour with computerized inking control.",
      features: [
        "Heidelberg Speedmaster CD 102 5-Color line",
        "Substrate range: 60 GSM Bible paper to 450 GSM card",
        "Chemical embossing & metallic metallic inks",
      ],
      specs: "15,000 Sheets/Hour Max Speed",
    },
    {
      id: "05",
      name: "Label & Trim Development",
      icon: <Tag className="w-6 h-6" />,
      iconColor: "text-amber-600 bg-amber-50 border-amber-100",
      badge: "OEKO-TEX Certified",
      tagline: "Woven Labels, Hangtags, Heat Transfers & Patches",
      desc: "Manufacturing OEKO-TEX Standard 100 Class 1 certified apparel trims suitable for infants and high-performance international sportswear.",
      features: [
        "Broadloom & needle loom damask woven labels",
        "Ultrasonic soft-edge slitting (no neck scratch)",
        "4-way stretchable silicone heat transfers",
      ],
      specs: "OEKO-TEX Standard 100 Class 1",
    },
    {
      id: "06",
      name: "Packaging Development",
      icon: <Package className="w-6 h-6" />,
      iconColor: "text-purple-600 bg-purple-50 border-purple-100",
      badge: "Luxury Rigid & Boxes",
      tagline: "Rigid Gift Boxes, Cartons & Shopping Bags",
      desc: "Automated rigid box grooving and taping lines, producing magnetic closure gift boxes, garment presentation cartons, and retail shopping bags.",
      features: [
        "Automated V-grooving & edge wrapping lines",
        "Greyboard thickness from 800 GSM to 2400 GSM",
        "Grosgrain ribbon, eyeleted & die-cut handles",
      ],
      specs: "Automated Box Wrapping Machine",
    },
    {
      id: "07",
      name: "Quality Control",
      icon: <ShieldCheck className="w-6 h-6" />,
      iconColor: "text-rose-600 bg-rose-50 border-rose-100",
      badge: "AQL 1.5 Standard",
      tagline: "100% In-Line Optical Inspection & Wash Endurance",
      desc: "Four-stage quality inspection checkpoints checking print registration, scannability, color fastness, and international wash resistance.",
      features: [
        "ISO 105 wash fastness & rubbing resistance testing",
        "100% barcode grade A verification",
        "Strict moisture level measurement (< 8%)",
      ],
      specs: "AQL 1.0 / 1.5 Strict Quality Pass",
    },
    {
      id: "08",
      name: "Sourcing & Production",
      icon: <Factory className="w-6 h-6" />,
      iconColor: "text-blue-600 bg-blue-50 border-blue-100",
      badge: "High Volume",
      tagline: "Direct Raw Material Mills & Scalable Volume Lines",
      desc: "Direct agreements with FSC-certified paper mills in Sweden, Korea, and China, maintaining reserve stocks to guarantee uninterrupted production.",
      features: [
        "50M+ total monthly trim & packaging capacity",
        "Reserve stock of 200+ tons premium art cards",
        "Direct tier-1 yarn and dyestuff sourcing",
      ],
      specs: "Tejgaon & Fakirapool Plants",
    },
    {
      id: "09",
      name: "Finishing",
      icon: <Scissors className="w-6 h-6" />,
      iconColor: "text-pink-600 bg-pink-50 border-pink-100",
      badge: "Surface Embellishment",
      tagline: "Foil Stamping, Embossing, UV Spot & Lamination",
      desc: "Elevating print collateral with automated thermal lamination, precision foil stamping, multi-level 3D embossing, and high-gloss spot UV coatings.",
      features: [
        "High-precision hot foil stamping (Gold, Silver, Holo)",
        "Multi-level 3D embossing & debossing dies",
        "Matte, gloss, and soft-touch thermal lamination",
      ],
      specs: "Automated Die-Cutting & Foiling",
    },
    {
      id: "10",
      name: "Packing",
      icon: <Boxes className="w-6 h-6" />,
      iconColor: "text-teal-600 bg-teal-50 border-teal-100",
      badge: "Export Grade",
      tagline: "Moisture-Proof Barrier Wrap & Barcoded Export Bundling",
      desc: "Finished trims and packaging are sealed in anti-static, moisture-proof poly wraps and packed into heavy 5-ply corrugated export cartons.",
      features: [
        "Desiccant silica gel packets in every master carton",
        "Clear master carton shipping mark & barcode tags",
        "Strapping & shrink-wrapped wooden palletizing",
      ],
      specs: "Heavy 5-Ply Corrugated Cartons",
    },
    {
      id: "11",
      name: "Delivery & Logistics",
      icon: <Truck className="w-6 h-6" />,
      iconColor: "text-orange-600 bg-orange-50 border-orange-100",
      badge: "On-Time Dispatch",
      tagline: "Factory Floor Delivery Across EPZs & Global Export",
      desc: "Our dedicated logistics fleet delivers directly to garment factories in Dhaka, Gazipur, Narayanganj, and Chittagong EPZ, alongside air/sea export.",
      features: [
        "Same-day emergency dispatch to Dhaka/Gazipur RMG units",
        "Bonded warehouse customs clearance support",
        "Direct DHL / FedEx / Sea freight export forwarding",
      ],
      specs: "GPS-Tracked Delivery Fleet",
    },
  ];

  return (
    <div className="bg-[#F8FAFC] text-[#0A2540] min-h-screen">
      {/* 1. HERO BANNER (CLEAN 3-PART STRUCTURE) */}
      <section className="pt-24 sm:pt-28 pb-14 sm:pb-16 bg-gradient-to-r from-[#061730] via-[#0A2540] to-[#003B73] text-white overflow-hidden border-b border-white/10 relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0066CC_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            {/* 1. Heading: Top White, Bottom Blue (Guaranteed Max 2 Lines) */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black uppercase tracking-tight text-white leading-tight">
              Our Capabilities &amp; <br />
              <span className="text-blue-400">Manufacturing Workflow</span>
            </h1>

            {/* 2. Subheading */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              DESIGN &bull; DEVELOP &bull; PRODUCE &bull; PACK &bull; DELIVER &mdash; Full vertical integration under one roof to deliver impeccable precision, certified compliance, and rapid dispatch from our Motijheel facilities.
            </p>

            {/* 3. CTA Buttons */}
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={openGeneralQuote}
                className="px-6 py-2.5 rounded-[4px] bg-[#0066CC] hover:bg-[#0052CC] text-white text-xs font-heading font-bold uppercase tracking-wider transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Request Custom Production</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <Link
                href="/work"
                className="px-5 py-2.5 rounded-[4px] border border-white/20 hover:bg-white/10 text-white text-xs font-heading font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
              >
                <span>Explore Delivered Work</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 5-STEP OPERATIONAL PIPELINE (CLEAN BOXES WITHOUT ARROWS) */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-1">
            <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#0066CC] block">
              End-to-End Operational Pipeline
            </span>
            <h2 className="text-xl sm:text-2xl font-heading font-black uppercase tracking-tight text-[#0A2540]">
              DESIGN &bull; DEVELOP &bull; PRODUCE &bull; PACK &bull; DELIVER
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {WORKFLOW_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-5 rounded-xl bg-slate-50 border border-slate-200/90 hover:border-[#0066CC] hover:bg-white hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0066CC] group-hover:bg-[#0066CC] group-hover:text-white transition-colors flex items-center justify-center font-bold">
                      {step.icon}
                    </div>
                    <span className="text-xl font-mono font-black text-slate-300 group-hover:text-[#0066CC] transition-colors">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="font-heading font-black text-base uppercase text-[#0A2540] group-hover:text-[#0066CC] transition-colors">
                    {step.name}
                  </h3>
                  <div className="text-[11px] font-mono font-bold text-[#0066CC] mt-0.5">
                    {step.tagline}
                  </div>
                  <p className="text-xs text-slate-500 mt-2 font-normal leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 11 CORE CAPABILITIES GRID (CLEAN, UNCLUTTERED CARDS) */}
      <section className="py-14 sm:py-20 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#0066CC] block">
              In-House Technology &amp; Engineering
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-[#0A2540]">
              11 Core Manufacturing Capabilities
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Serving world-class fashion retailers, multinational corporate groups, and industrial manufacturing plants with certified quality assurance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DETAILED_CAPABILITIES.map((cap) => (
              <div
                key={cap.id}
                id={cap.id}
                className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-xs hover:shadow-lg hover:border-blue-300 transition-all duration-200 flex flex-col justify-between group scroll-mt-28"
              >
                <div>
                  {/* Card Top: Clean Icon */}
                  <div className="mb-4">
                    <div
                      className={`w-11 h-11 rounded-lg flex items-center justify-center border shadow-xs ${cap.iconColor}`}
                    >
                      {cap.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-heading font-black uppercase tracking-tight text-[#0A2540] group-hover:text-[#0066CC] transition-colors leading-snug">
                    {cap.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed mt-2 font-normal">
                    {cap.desc}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="text-[11px] font-mono text-slate-400 truncate max-w-[60%]">
                    {cap.specs}
                  </div>
                  <button
                    onClick={openGeneralQuote}
                    className="text-[#0066CC] hover:text-[#0052CC] font-heading font-bold text-xs uppercase inline-flex items-center gap-1 group-hover:underline cursor-pointer"
                  >
                    <span>Request a Quote</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
