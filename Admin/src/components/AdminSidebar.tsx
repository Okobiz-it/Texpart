"use client";

import React, { useState, useEffect } from "react";
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
  Award,
  Menu,
  X,
  Database,
  Cloud,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [productsOpen, setProductsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [counts, setCounts] = useState<{
    privateJobs?: number;
    commercialJobs?: number;
    clients?: number;
    certs?: number;
  }>({});

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Fetch quick counts for badges
  useEffect(() => {
    async function loadCounts() {
      try {
        const res = await fetch("/api/stats");
        const data = await res.json();
        if (data.success && data.stats) {
          setCounts({
            privateJobs: data.stats.privateJobsCount,
            commercialJobs: data.stats.commercialJobsCount,
            clients: data.stats.clientBrandsCount,
            certs: data.stats.certificationsCount,
          });
        }
      } catch (err) {
        // Non-blocking
      }
    }
    loadCounts();
  }, [pathname]);

  const isDashboard = pathname === "/";
  const isPrivateJobs = pathname === "/products/private-jobs";
  const isCommercialJobs = pathname === "/products/commercial-jobs";
  const isPartners = pathname === "/partners";

  const navigationContent = (
    <div className="flex flex-col h-full bg-[#0A2540] text-slate-200">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 bg-[#061730] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-[4px] bg-[#0066CC] text-white flex items-center justify-center font-heading font-black text-base shadow-md group-hover:bg-[#0052CC] transition-colors">
            T
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-heading font-black text-base text-white tracking-wider leading-none">
                TEXPART
              </h1>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-semibold block mt-0.5">
              Enterprise Admin
            </span>
          </div>
        </Link>
        {mobileOpen && (
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-[4px] text-slate-400 hover:text-white hover:bg-white/10 transition-colors lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Menus */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto custom-scrollbar">
        {/* SECTION 1: OVERVIEW */}
        <div className="space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 px-3 py-1 font-bold">
            Overview
          </div>

          <Link
            href="/"
            className={`group flex items-center justify-between px-3.5 py-2.5 rounded-[4px] text-xs font-heading font-bold uppercase tracking-wider transition-all ${
              isDashboard
                ? "bg-[#0066CC] text-white shadow-md"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className={`w-4 h-4 transition-transform group-hover:scale-110 ${isDashboard ? "text-white" : "text-[#0066CC]"}`} />
              <span>Dashboard</span>
            </div>
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-[3px] ${isDashboard ? "bg-white/20 text-white" : "bg-white/5 text-slate-400"}`}>
              Live
            </span>
          </Link>
        </div>

        {/* SECTION 2: CATALOG MANAGEMENT */}
        <div className="space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 px-3 py-1 font-bold">
            Catalog Management
          </div>

          {/* Products Dropdown / Section */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => setProductsOpen(!productsOpen)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-[4px] text-xs font-heading font-bold uppercase tracking-wider transition-all ${
                isPrivateJobs || isCommercialJobs
                  ? "text-blue-300 bg-white/5"
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
              <div className="pl-4 space-y-1 pt-1 border-l border-slate-800 ml-4">
                {/* Submenu 1: Privet Jobs */}
                <Link
                  href="/products/private-jobs"
                  className={`flex items-center justify-between px-3 py-2 rounded-[4px] text-xs font-medium transition-all ${
                    isPrivateJobs
                      ? "bg-[#0066CC] text-white font-bold shadow-sm"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Shirt className="w-3.5 h-3.5" />
                    <span>Privet Jobs</span>
                  </div>
                  {counts.privateJobs !== undefined && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-[3px] ${isPrivateJobs ? "bg-white/20 text-white" : "bg-white/5 text-slate-400"}`}>
                      {counts.privateJobs}
                    </span>
                  )}
                </Link>

                {/* Submenu 2: Commercial Jobs */}
                <Link
                  href="/products/commercial-jobs"
                  className={`flex items-center justify-between px-3 py-2 rounded-[4px] text-xs font-medium transition-all ${
                    isCommercialJobs
                      ? "bg-[#0066CC] text-white font-bold shadow-sm"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Printer className="w-3.5 h-3.5" />
                    <span>Commercial Jobs</span>
                  </div>
                  {counts.commercialJobs !== undefined && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-[3px] ${isCommercialJobs ? "bg-white/20 text-white" : "bg-white/5 text-slate-400"}`}>
                      {counts.commercialJobs}
                    </span>
                  )}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* SECTION 3: PARTNERS & CERTIFICATIONS */}
        <div className="space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 px-3 py-1 font-bold">
            Media &amp; Relationships
          </div>

          <Link
            href="/partners"
            className={`group flex items-center justify-between px-3.5 py-2.5 rounded-[4px] text-xs font-heading font-bold uppercase tracking-wider transition-all ${
              isPartners
                ? "bg-[#0066CC] text-white shadow-md"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className={`w-4 h-4 transition-transform group-hover:scale-110 ${isPartners ? "text-white" : "text-[#0066CC]"}`} />
              <span>Partners &amp; Certs</span>
            </div>
            {counts.clients !== undefined && counts.certs !== undefined && (
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-[3px] ${isPartners ? "bg-white/20 text-white" : "bg-white/5 text-slate-400"}`}>
                {counts.clients + counts.certs}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Footer Info / Live Client Link */}
      <div className="p-4 border-t border-slate-800 bg-[#061730]/90 text-xs text-slate-400 space-y-3">
        <div className="space-y-1.5 text-[11px] font-mono">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Database className="w-3 h-3 text-[#0066CC]" /> MongoDB Atlas
            </span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Connected
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Cloud className="w-3 h-3 text-sky-400" /> Cloudinary CDN
            </span>
            <span className="text-emerald-400 font-bold">Active</span>
          </div>
        </div>

        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between w-full p-2.5 bg-white/5 hover:bg-[#0066CC] hover:text-white text-slate-200 rounded-[4px] text-[11px] font-heading font-bold uppercase tracking-wider transition-colors shadow-sm"
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            View Live Website
          </span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Header */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-[#0A2540] border-b border-slate-800 text-white">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-1.5 rounded-[4px] text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-[4px] bg-[#0066CC] text-white flex items-center justify-center font-heading font-black text-xs">
              T
            </div>
            <span className="font-heading font-black text-sm text-white tracking-wider">
              TEXPART ADMIN
            </span>
          </Link>
        </div>

        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noreferrer"
          className="p-1.5 rounded-[4px] bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs flex items-center gap-1 transition-colors"
          title="Open live website"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 flex flex-col">
            {navigationContent}
          </div>
        </div>
      )}

      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#0A2540] min-h-screen flex-col border-r border-slate-800 shadow-xl flex-shrink-0 sticky top-0 h-screen">
        {navigationContent}
      </aside>
    </>
  );
}
