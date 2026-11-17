"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, ShieldCheck } from "lucide-react";

interface AdminNavbarProps {
  title?: string;
  subtitle?: string;
}

export default function AdminNavbar({
  title = "Dashboard",
  subtitle,
}: AdminNavbarProps) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 sm:px-8 py-3.5 flex items-center justify-between shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      {/* Page Title / Breadcrumb */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-heading font-black tracking-tight text-[#0A2540]">
            {title}
          </h1>
          {subtitle && (
            <>
              <span className="text-slate-300">/</span>
              <span className="text-xs text-slate-500 font-medium">{subtitle}</span>
            </>
          )}
        </div>
      </div>

      {/* Right Controls: Live Site, Profile */}
      <div className="flex items-center gap-3">
        {/* Live Site Button */}
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-slate-50 border border-slate-200 text-xs font-semibold text-[#0A2540] hover:text-[#0066CC] hover:bg-white hover:border-slate-300 transition-all shadow-xs"
          title="Open Client Website"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0066CC]" />
        </a>

        {/* Profile Avatar Pill with Admin Icon instead of "A" */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div
            className="w-8 h-8 rounded-[4px] bg-[#0066CC] text-white flex items-center justify-center shadow-xs"
            title="Super Admin Profile"
            aria-label="Admin Profile"
          >
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
