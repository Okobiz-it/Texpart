"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  ChevronDown,
  ChevronRight,
  Shirt,
  Printer,
  ExternalLink,
  Layers,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [productsOpen, setProductsOpen] = useState(true);

  const isDashboard = pathname === "/";
  const isPrivateJobs = pathname === "/products/private-jobs";
  const isCommercialJobs = pathname === "/products/commercial-jobs";
  const isPartners = pathname === "/partners";

  return (
    <aside className="w-64 bg-[#0A2540] text-slate-200 min-h-screen flex flex-col border-r border-slate-800 shadow-xl flex-shrink-0">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 bg-[#061730] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[4px] bg-[#0066CC] text-white flex items-center justify-center font-black text-sm shadow-md">
            T
          </div>
          <div>
            <h1 className="font-heading font-black text-base text-white tracking-wide leading-none">
              TEXPART
            </h1>
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400">
              Admin Portal
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Menus */}
      <nav className="flex-1 p-3.5 space-y-1.5 overflow-y-auto">
        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 px-3 py-1 font-semibold">
          Overview
        </div>

        {/* 1. Dashboard */}
        <Link
          href="/"
          className={`flex items-center gap-2.5 px-3 py-2 rounded-[4px] text-xs font-heading font-bold uppercase tracking-wider transition-all ${
            isDashboard
              ? "bg-[#0066CC] text-white shadow-sm"
              : "text-slate-300 hover:bg-white/5 hover:text-white"
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </Link>

        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 px-3 pt-3 pb-1 font-semibold">
          Catalog Management
        </div>

        {/* 2. Products (Parent Menu with Commercial Jobs & Privet Jobs Submenus) */}
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => setProductsOpen(!productsOpen)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-[4px] text-xs font-heading font-bold uppercase tracking-wider transition-all ${
              isPrivateJobs || isCommercialJobs
                ? "text-blue-400 bg-white/5"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Package className="w-4 h-4 text-[#0066CC]" />
              <span>Products</span>
            </div>
            {productsOpen ? (
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>

          {productsOpen && (
            <div className="pl-6 space-y-1 pt-0.5">
              {/* Submenu 1: Privet Jobs */}
              <Link
                href="/products/private-jobs"
                className={`flex items-center gap-2 px-3 py-2 rounded-[4px] text-xs font-medium transition-all ${
                  isPrivateJobs
                    ? "bg-[#0066CC] text-white font-bold shadow-sm"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Shirt className="w-3.5 h-3.5" />
                <span>Privet Jobs</span>
              </Link>

              {/* Submenu 2: Commercial Jobs */}
              <Link
                href="/products/commercial-jobs"
                className={`flex items-center gap-2 px-3 py-2 rounded-[4px] text-xs font-medium transition-all ${
                  isCommercialJobs
                    ? "bg-[#0066CC] text-white font-bold shadow-sm"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Commercial Jobs</span>
              </Link>
            </div>
          )}
        </div>

        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 px-3 pt-3 pb-1 font-semibold">
          Relationships
        </div>

        {/* 3. Partners Menu */}
        <Link
          href="/partners"
          className={`flex items-center gap-2.5 px-3 py-2 rounded-[4px] text-xs font-heading font-bold uppercase tracking-wider transition-all ${
            isPartners
              ? "bg-[#0066CC] text-white shadow-sm"
              : "text-slate-300 hover:bg-white/5 hover:text-white"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Partners</span>
        </Link>
      </nav>

      {/* Footer Info / Live Client Link */}
      <div className="p-4 border-t border-slate-800 bg-[#061730]/70 text-xs text-slate-400 space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span>Cloudinary Storage</span>
          <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active
          </span>
        </div>
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between w-full p-2 bg-white/5 hover:bg-white/10 rounded-[4px] text-white text-[11px] font-heading font-bold uppercase tracking-wider transition-colors"
        >
          <span>View Live Client</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>
      </div>
    </aside>
  );
}
