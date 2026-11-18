"use client";

import React from "react";

// ─────────────────────────────────────────────────────────────────────────────
// OFFICIAL TEXPART FULL LETTERHEAD PAD BACKGROUND
// Authentic full-bleed artwork from the user's high-resolution master pad
// (764 x 1024 / 1529 x 2048 aspect ratio). Seamless in screen & print.
// ─────────────────────────────────────────────────────────────────────────────
export const TexpartLetterheadPadBackground: React.FC = () => (
  <img
    src="/assets/letterhead/texpart-pad.png"
    alt="Texpart Design & Packaging Solutions Official Letterhead"
    className="quotation-pad-artwork absolute inset-0 w-full h-full object-fill pointer-events-none select-none z-0"
    style={{ display: "block" }}
  />
);

// Individual banner components for modular composition if needed
export const TexpartWatermark: React.FC = () => (
  <div
    className="quotation-watermark pointer-events-none select-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
    aria-hidden="true"
    style={{ opacity: 0.88 }}
  >
    <img
      src="/assets/letterhead/paper-body.png"
      alt=""
      className="w-full h-full object-contain pointer-events-none select-none"
    />
  </div>
);

export const TexpartHeaderBanner: React.FC = () => (
  <div className="quotation-header w-full shrink-0 select-none relative z-10">
    <img
      src="/assets/letterhead/header.png"
      alt="Texpart Design & Packaging Solutions"
      className="w-full h-auto block select-none pointer-events-none"
      style={{ display: "block" }}
    />
  </div>
);

export interface TexpartFooterBannerProps {
  phone?: string;
  email?: string;
  web?: string;
}

export const TexpartFooterBanner: React.FC<TexpartFooterBannerProps> = () => {
  return (
    <footer className="quotation-footer w-full shrink-0 select-none relative z-20 mt-auto">
      <img
        src="/assets/letterhead/footer.png"
        alt="Texpart Contact Details"
        className="w-full h-auto block select-none pointer-events-none"
        style={{ display: "block" }}
      />
    </footer>
  );
};

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
