"use client";

import React from "react";
import { Phone, Mail, Globe } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// OFFICIAL TEXPART HIGH-DEFINITION VECTOR LETTERHEAD COMPONENTS
// Pristine vector typography, SVG icons, and high-resolution crystal facets.
// Perfectly sharp at any zoom level, in screen preview and printed PDF.
// ─────────────────────────────────────────────────────────────────────────────

export interface TexpartFooterBannerProps {
  phone?: string;
  email?: string;
  web?: string;
}

export const TexpartFooterBanner: React.FC<TexpartFooterBannerProps> = ({
  phone = "+880 1711-234567",
  email = "info@texpartbd.com",
  web = "www.texpartbd.com",
}) => {
  return (
    <div
      className="quotation-footer absolute bottom-0 left-0 right-0 h-[15.66mm] flex items-center justify-between z-10 overflow-hidden select-none"
      style={{
        backgroundColor: "#0d1f43",
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
      }}
    >
      {/* Top cyan accent rule */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          backgroundColor: "#00A3E0",
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact",
        }}
      />

      {/* Left Crystal Facets (ultra high-res HD artwork) */}
      <div className="absolute top-0 left-0 h-full w-[160px] pointer-events-none">
        <img
          src="/assets/letterhead/footer-bg-hd.png"
          alt=""
          className="h-full w-full object-cover object-left pointer-events-none select-none"
          style={{ display: "block" }}
        />
      </div>

      {/* Vector Contacts (SVG Icons + Real Vector Typography) */}
      <div className="relative z-10 w-full flex items-center justify-center gap-10 text-white px-6">
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-white shrink-0 stroke-[2.2]" />
          <span className="text-white text-[11.5px] font-sans font-medium tracking-wide leading-none whitespace-nowrap">
            {phone}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-3.5 h-3.5 text-white shrink-0 stroke-[2.2]" />
          <span className="text-white text-[11.5px] font-sans font-medium tracking-wide leading-none whitespace-nowrap">
            {email}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 text-white shrink-0 stroke-[2.2]" />
          <span className="text-white text-[11.5px] font-sans font-medium tracking-wide leading-none whitespace-nowrap">
            {web}
          </span>
        </div>
      </div>
    </div>
  );
};

export const TexpartHeaderBanner: React.FC = () => (
  <div
    className="quotation-header absolute top-0 left-0 right-0 h-[28mm] flex flex-col justify-between z-10 overflow-hidden select-none bg-white"
    style={{
      WebkitPrintColorAdjust: "exact",
      printColorAdjust: "exact",
    }}
  >
    {/* Left & Right Crystal Facets (ultra high-res HD artwork) */}
    <div className="absolute top-0 left-0 h-[25mm] w-[180px] pointer-events-none">
      <img
        src="/assets/letterhead/header-crystals-left-hd.png"
        alt=""
        className="h-full w-auto object-contain object-left-top pointer-events-none select-none"
        style={{ display: "block" }}
      />
    </div>
    <div className="absolute top-0 right-0 h-[25mm] w-[180px] pointer-events-none">
      <img
        src="/assets/letterhead/header-crystals-right-hd.png"
        alt=""
        className="h-full w-auto object-contain object-right-top pointer-events-none select-none"
        style={{ display: "block" }}
      />
    </div>

    {/* Center Logo: 1024px Ultra High-Res HD Vector Graphic */}
    <div className="relative z-10 mx-auto pt-2.5 flex items-center justify-center">
      <img
        src="/logo-full.png"
        alt="Texpart Design & Packaging Solutions"
        className="h-[20mm] w-auto object-contain pointer-events-none select-none"
        style={{ display: "block" }}
      />
    </div>

    {/* Dual Vector Bottom Rules */}
    <div className="w-full shrink-0">
      <div
        className="w-full h-[3.5px]"
        style={{
          backgroundColor: "#0A2540",
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact",
        }}
      />
      <div
        className="w-full h-[2px]"
        style={{
          backgroundColor: "#00A3E0",
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact",
        }}
      />
    </div>
  </div>
);

export const TexpartWatermark: React.FC = () => (
  <div
    className="quotation-watermark pointer-events-none select-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
    aria-hidden="true"
    style={{
      WebkitPrintColorAdjust: "exact",
      printColorAdjust: "exact",
    }}
  >
    <img
      src="/assets/letterhead/paper-body-hd.png"
      alt=""
      className="w-full h-full object-contain pointer-events-none select-none"
      style={{ display: "block" }}
    />
  </div>
);

export interface TexpartLetterheadPadBackgroundProps {
  phone?: string;
  email?: string;
  web?: string;
}

export const TexpartLetterheadPadBackground: React.FC<TexpartLetterheadPadBackgroundProps> = ({
  phone,
  email,
  web,
}) => (
  <div
    className="quotation-pad-artwork absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden bg-white"
    style={{
      backgroundColor: "#ffffff",
      WebkitPrintColorAdjust: "exact",
      printColorAdjust: "exact",
    }}
  >
    {/* Authentic High-Definition Watermark (20% reduced opacity) */}
    <TexpartWatermark />

    {/* Vector Header: HD Crystals + 1024px Logo + Vector Dual Rules */}
    <TexpartHeaderBanner />

    {/* Vector Footer: HD Base + Real SVG Icons + Real Vector Typography */}
    <TexpartFooterBanner phone={phone} email={email} web={web} />
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// REUSABLE TEXPART LETTERHEAD PAD CONTAINER
// Wraps quotation, proposal, or agreement pages with pristine A4 proportions
// ─────────────────────────────────────────────────────────────────────────────
export interface TexpartLetterheadPageProps {
  children: React.ReactNode;
  refNo?: string;
  date?: string;
  className?: string;
}

export const TexpartLetterheadPage: React.FC<TexpartLetterheadPageProps> = ({
  children,
  refNo,
  date,
  className = "",
}) => {
  return (
    <section
      className={`quotation-page relative bg-white border border-zinc-200 print:border-none p-0 mb-8 print:mb-0 shadow-sm print:shadow-none w-[210mm] max-w-[210mm] print:w-full print:max-w-full print:m-0 print:mx-0 flex flex-col justify-between overflow-hidden rounded-none ${className}`}
    >
      {/* Pristine Full Letterhead Pad Artwork */}
      <TexpartLetterheadPadBackground />

      {/* Safe printable content container (clears header crystals at top & footer at bottom) */}
      <div className="quotation-page-body relative z-10 w-full h-full flex flex-col justify-between bg-transparent">
        <div>
          {(date || refNo) && (
            <div className="flex justify-between items-start text-[13px] font-semibold mb-3">
              <div className="text-zinc-700">{date || ""}</div>
              {refNo && (
                <div className="text-right">
                  <span className="text-zinc-400">Ref No. </span>
                  <span className="font-bold text-[#0066CC]">{refNo}</span>
                </div>
              )}
            </div>
          )}

          <div className="bg-transparent">{children}</div>
        </div>
      </div>
    </section>
  );
};
