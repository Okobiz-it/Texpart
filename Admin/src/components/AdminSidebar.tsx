"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { formatBadgeCount } from "@/lib/formatNumber";
import {
  LayoutDashboard,
  Package,
  Shirt,
  Printer,
  Users,
  Award,
  Camera,
  Image as ImageIcon,
  FileText,
  MessageSquare,
  ChevronDown,
  LogOut,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  ShieldCheck,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [productsOpen, setProductsOpen] = useState(true);

  const [counts, setCounts] = useState<{
    products?: number;
    partners?: number;
    certifications?: number;
    heroSlides?: number;
    gallery?: number;
    quotations?: number;
    newQuotations?: number;
    inquiries?: number;
    newInquiries?: number;
  }>({});

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Keep products open if current path is under /products
  useEffect(() => {
    if (pathname.startsWith("/products")) {
      setProductsOpen(true);
    }
  }, [pathname]);

  // Fetch live counts
  const loadStats = useCallback(async () => {
    try {
      const res = await fetch("/api/stats");
      const data = await res.json();
      if (data.success && data.stats) {
        setCounts({
          products: data.stats.totalProducts,
          partners: data.stats.clientPartnersCount,
          certifications: data.stats.certificationsCount,
          heroSlides: data.stats.heroSlidesCount,
          gallery: data.stats.galleryMediaCount,
          quotations: data.stats.quotationsCount,
          newQuotations: data.stats.newQuotationsCount,
          inquiries: data.stats.inquiriesCount,
          newInquiries: data.stats.newInquiriesCount,
        });
      }
    } catch (err) {
      // Non-blocking
    }
  }, []);

  const [activeDivision, setActiveDivision] = useState<string>("private-jobs");

  useEffect(() => {
    loadStats();
  }, [pathname, loadStats]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("texpart_active_division");
      if (stored) setActiveDivision(stored);
    }

    const handleDivisionChange = (e: any) => {
      if (e.detail) {
        setActiveDivision(e.detail);
      }
    };
    window.addEventListener("texpart_active_division", handleDivisionChange);
    return () => window.removeEventListener("texpart_active_division", handleDivisionChange);
  }, [pathname]);

  useEffect(() => {
    const handleStatsUpdated = () => {
      loadStats();
    };
    window.addEventListener("texpart_stats_updated", handleStatsUpdated);
    return () => window.removeEventListener("texpart_stats_updated", handleStatsUpdated);
  }, [loadStats]);

  const isOverview = pathname === "/";
  const isHeroBanners = pathname === "/hero-banners";
  const isProducts = pathname.startsWith("/products");

  const isCommercialJobs =
    pathname === "/products/commercial-jobs" ||
    (isProducts &&
      pathname !== "/products/private-jobs" &&
      pathname !== "/products" &&
      activeDivision === "commercial-jobs");

  const isPrivateJobs =
    pathname === "/products/private-jobs" ||
    pathname === "/products" ||
    (isProducts && !isCommercialJobs);

  const isPartners = pathname === "/partners";
  const isCertifications = pathname === "/certifications";
  const isGallery = pathname === "/gallery";
  const isQuotations = pathname === "/quotations";
  const isInquiries = pathname === "/inquiries";

  // Sidebar expanded content
  const expandedContent = (
    <div className="flex flex-col h-full bg-white text-slate-700 select-none">
      {/* Brand Header: Full horizontal logo when expanded + collapse toggle button */}
      <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between">
        <Link href="/" className="flex items-center" title="Texpart Dashboard">
          <div className="relative w-36 h-9 overflow-hidden flex items-center flex-shrink-0">
            <Image
              src="/logo-full.png"
              alt="Texpart Design & Packaging Solutions"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {mobileOpen ? (
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-[4px] text-slate-400 hover:text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsCollapsed(true)}
            className="p-1.5 text-slate-400 hover:text-[#0A2540] hover:bg-slate-100 rounded-[4px] transition-colors hidden lg:flex items-center justify-center"
            title="Collapse sidebar"
            aria-label="Collapse sidebar"
          >
            <PanelLeftClose className="w-4.5 h-4.5" />
          </button>
        )}
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase px-3 block mb-2">
          Management
        </span>

        {/* 1. Overview */}
        <Link
          href="/"
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[4px] text-[13.5px] font-semibold transition-all ${
            isOverview
              ? "bg-[#0066CC] text-white shadow-xs"
              : "text-slate-600 hover:text-[#0A2540] hover:bg-slate-50"
          }`}
        >
          <LayoutDashboard
            className={`w-[18px] h-[18px] ${isOverview ? "text-white" : "text-slate-400"}`}
          />
          <span>Overview</span>
        </Link>

        {/* 2. Hero Banners */}
        <Link
          href="/hero-banners"
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[4px] text-[13.5px] font-semibold transition-all ${
            isHeroBanners
              ? "bg-[#0066CC] text-white shadow-xs"
              : "text-slate-600 hover:text-[#0A2540] hover:bg-slate-50"
          }`}
        >
          <div className="flex items-center gap-3">
            <ImageIcon
              className={`w-[18px] h-[18px] ${isHeroBanners ? "text-white" : "text-slate-400"}`}
            />
            <span>Hero Banners</span>
          </div>
        </Link>

        {/* 3. Products (Parent Menu with Submenus: Custom Jobs & Commercial Jobs) */}
        <div className="pt-0.5">
          <button
            type="button"
            onClick={() => setProductsOpen((prev) => !prev)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[4px] text-[13.5px] font-semibold transition-colors ${
              isProducts
                ? "bg-blue-50/70 text-[#0066CC] font-bold"
                : "text-slate-600 hover:text-[#0A2540] hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <Package
                className={`w-[18px] h-[18px] ${
                  isProducts ? "text-[#0066CC]" : "text-slate-400"
                }`}
              />
              <span>Products</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isProducts ? "text-[#0066CC]" : "text-slate-400"
              } ${productsOpen ? "" : "-rotate-90"}`}
            />
          </button>

          {productsOpen && (
            <div className="ml-4 pl-3 border-l-2 border-slate-100 mt-1 space-y-1">
              {/* Submenu 1: Custom Jobs (Private Jobs) */}
              <Link
                href="/products/private-jobs"
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-[4px] text-[13px] font-medium transition-colors ${
                  isPrivateJobs
                    ? "bg-[#0066CC] text-white font-bold shadow-xs"
                    : "text-slate-600 hover:text-[#0A2540] hover:bg-slate-50"
                }`}
              >
                <Shirt className={`w-4 h-4 ${isPrivateJobs ? "text-white" : "text-slate-400"}`} />
                <span>Custom Jobs</span>
              </Link>

              {/* Submenu 2: Commercial Jobs */}
              <Link
                href="/products/commercial-jobs"
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-[4px] text-[13px] font-medium transition-colors ${
                  isCommercialJobs
                    ? "bg-[#0066CC] text-white font-bold shadow-xs"
                    : "text-slate-600 hover:text-[#0A2540] hover:bg-slate-50"
                }`}
              >
                <Printer className={`w-4 h-4 ${isCommercialJobs ? "text-white" : "text-slate-400"}`} />
                <span>Commercial Jobs</span>
              </Link>
            </div>
          )}
        </div>

        {/* 4. Client Partners */}
        <Link
          href="/partners"
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[4px] text-[13.5px] font-semibold transition-all ${
            isPartners
              ? "bg-[#0066CC] text-white shadow-xs"
              : "text-slate-600 hover:text-[#0A2540] hover:bg-slate-50"
          }`}
        >
          <div className="flex items-center gap-3">
            <Users
              className={`w-[18px] h-[18px] ${isPartners ? "text-white" : "text-slate-400"}`}
            />
            <span>Client Partners</span>
          </div>
        </Link>

        {/* 5. Certifications */}
        <Link
          href="/certifications"
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[4px] text-[13.5px] font-semibold transition-all ${
            isCertifications
              ? "bg-[#0066CC] text-white shadow-xs"
              : "text-slate-600 hover:text-[#0A2540] hover:bg-slate-50"
          }`}
        >
          <div className="flex items-center gap-3">
            <Award
              className={`w-[18px] h-[18px] ${isCertifications ? "text-white" : "text-slate-400"}`}
            />
            <span>Certifications</span>
          </div>
        </Link>

        {/* 6. Gallery Archive */}
        <Link
          href="/gallery"
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[4px] text-[13.5px] font-semibold transition-all ${
            isGallery
              ? "bg-[#0066CC] text-white shadow-xs"
              : "text-slate-600 hover:text-[#0A2540] hover:bg-slate-50"
          }`}
        >
          <div className="flex items-center gap-3">
            <Camera
              className={`w-[18px] h-[18px] ${isGallery ? "text-white" : "text-slate-400"}`}
            />
            <span>Gallery Archive</span>
          </div>
        </Link>

        {/* 7. Quotations */}
        <Link
          href="/quotations"
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[4px] text-[13.5px] font-semibold transition-all ${
            isQuotations
              ? "bg-[#0066CC] text-white shadow-xs"
              : "text-slate-600 hover:text-[#0A2540] hover:bg-slate-50"
          }`}
        >
          <div className="flex items-center gap-3">
            <FileText
              className={`w-[18px] h-[18px] ${isQuotations ? "text-white" : "text-slate-400"}`}
            />
            <span>Quotations</span>
          </div>
          {counts.newQuotations && counts.newQuotations > 0 ? (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-rose-50 text-rose-600 font-bold border border-rose-200">
              {formatBadgeCount(counts.newQuotations)} new
            </span>
          ) : null}
        </Link>

        {/* 8. Contact Messages */}
        <Link
          href="/inquiries"
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[4px] text-[13.5px] font-semibold transition-all ${
            isInquiries
              ? "bg-[#0066CC] text-white shadow-xs"
              : "text-slate-600 hover:text-[#0A2540] hover:bg-slate-50"
          }`}
        >
          <div className="flex items-center gap-3">
            <MessageSquare
              className={`w-[18px] h-[18px] ${isInquiries ? "text-white" : "text-slate-400"}`}
            />
            <span>Contact Messages</span>
          </div>
          {counts.newInquiries && counts.newInquiries > 0 ? (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-amber-50 text-amber-700 font-bold border border-amber-200">
              {formatBadgeCount(counts.newInquiries)} new
            </span>
          ) : null}
        </Link>
      </nav>

      {/* User Profile Card at bottom */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between p-2 rounded-[4px] hover:bg-white transition-colors border border-transparent hover:border-slate-200">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-[4px] bg-[#0066CC] text-white flex items-center justify-center shadow-xs flex-shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="font-heading font-bold text-xs text-[#0A2540] truncate block leading-tight">
                Super Admin
              </span>
              <span className="text-[11px] text-slate-400 truncate block leading-tight">
                admin@texpart.com
              </span>
            </div>
          </div>
          <button
            type="button"
            title="Sign Out"
            className="p-1.5 text-slate-400 hover:text-red-600 rounded-[4px] hover:bg-slate-100 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  // Sidebar collapsed content (rail mode)
  const collapsedContent = (
    <div className="flex flex-col h-full bg-white text-slate-700 select-none items-center">
      {/* Brand Header: Logo only, on hover shows expand icon */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-center w-full">
        <button
          type="button"
          onClick={() => setIsCollapsed(false)}
          className="relative w-8 h-8 rounded-[4px] flex items-center justify-center group focus:outline-none"
          title="Expand sidebar"
          aria-label="Expand sidebar"
        >
          {/* Default state: Logo */}
          <div className="relative w-7 h-7 rounded-[4px] overflow-hidden flex items-center justify-center transition-opacity duration-150 group-hover:opacity-0">
            <Image
              src="/logo-icon.png"
              alt="Texpart Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          {/* Hover state: Expand icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-blue-50 text-[#0066CC] rounded-[4px]">
            <PanelLeftOpen className="w-5 h-5" />
          </div>
        </button>
      </div>

      {/* Nav Icons rail */}
      <nav className="flex-1 py-4 space-y-2 w-full px-2 flex flex-col items-center overflow-y-auto">
        {/* Overview */}
        <Link
          href="/"
          title="Overview"
          className={`w-11 h-11 flex items-center justify-center rounded-[4px] transition-colors ${
            isOverview
              ? "bg-[#0066CC] text-white shadow-xs"
              : "text-slate-500 hover:text-[#0066CC] hover:bg-slate-100"
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
        </Link>

        {/* Hero Banners */}
        <Link
          href="/hero-banners"
          title="Hero Banners"
          className={`w-11 h-11 flex items-center justify-center rounded-[4px] transition-colors relative ${
            isHeroBanners
              ? "bg-[#0066CC] text-white shadow-xs"
              : "text-slate-500 hover:text-[#0066CC] hover:bg-slate-100"
          }`}
        >
          <ImageIcon className="w-5 h-5" />
        </Link>

        {/* Products */}
        <Link
          href="/products"
          title="Products (Custom & Commercial Jobs)"
          className={`w-11 h-11 flex items-center justify-center rounded-[4px] transition-colors relative ${
            isProducts
              ? "bg-[#0066CC] text-white shadow-xs"
              : "text-slate-500 hover:text-[#0066CC] hover:bg-slate-100"
          }`}
        >
          <Package className="w-5 h-5" />
        </Link>

        {/* Client Partners */}
        <Link
          href="/partners"
          title="Client Partners"
          className={`w-11 h-11 flex items-center justify-center rounded-[4px] transition-colors relative ${
            isPartners
              ? "bg-[#0066CC] text-white shadow-xs"
              : "text-slate-500 hover:text-[#0066CC] hover:bg-slate-100"
          }`}
        >
          <Users className="w-5 h-5" />
        </Link>

        {/* Certifications */}
        <Link
          href="/certifications"
          title="Certifications"
          className={`w-11 h-11 flex items-center justify-center rounded-[4px] transition-colors relative ${
            isCertifications
              ? "bg-[#0066CC] text-white shadow-xs"
              : "text-slate-500 hover:text-[#0066CC] hover:bg-slate-100"
          }`}
        >
          <Award className="w-5 h-5" />
        </Link>

        {/* Gallery Archive */}
        <Link
          href="/gallery"
          title="Gallery Archive"
          className={`w-11 h-11 flex items-center justify-center rounded-[4px] transition-colors relative ${
            isGallery
              ? "bg-[#0066CC] text-white shadow-xs"
              : "text-slate-500 hover:text-[#0066CC] hover:bg-slate-100"
          }`}
        >
          <Camera className="w-5 h-5" />
        </Link>

        {/* Quotations */}
        <Link
          href="/quotations"
          title="Quotations"
          className={`w-11 h-11 flex items-center justify-center rounded-[4px] transition-colors relative ${
            isQuotations
              ? "bg-[#0066CC] text-white shadow-xs"
              : "text-slate-500 hover:text-[#0066CC] hover:bg-slate-100"
          }`}
        >
          <FileText className="w-5 h-5" />
          {counts.newQuotations ? (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-[4px] bg-rose-500 ring-2 ring-white" />
          ) : null}
        </Link>

        {/* Contact Messages */}
        <Link
          href="/inquiries"
          title="Contact Messages"
          className={`w-11 h-11 flex items-center justify-center rounded-[4px] transition-colors relative ${
            isInquiries
              ? "bg-[#0066CC] text-white shadow-xs"
              : "text-slate-500 hover:text-[#0066CC] hover:bg-slate-100"
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          {counts.newInquiries ? (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-[4px] bg-amber-500 ring-2 ring-white" />
          ) : null}
        </Link>
      </nav>

      {/* Collapsed bottom profile icon */}
      <div className="p-3 border-t border-slate-100 flex items-center justify-center w-full">
        <div
          className="w-9 h-9 rounded-[4px] bg-[#0066CC] text-white flex items-center justify-center shadow-xs cursor-pointer"
          title="Super Admin (admin@texpart.com)"
        >
          <ShieldCheck className="w-4.5 h-4.5" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between z-40 sticky top-0 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="relative w-32 h-8 overflow-hidden">
            <Image
              src="/logo-full.png"
              alt="Texpart Logo"
              fill
              className="object-contain object-left"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="p-1.5 text-slate-600 hover:text-[#0A2540] hover:bg-slate-100 rounded-[4px] transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Slide-Out Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl z-10">
            {expandedContent}
          </div>
        </div>
      )}

      {/* Desktop Sidebar (Collapsible with smooth width transition) */}
      <aside
        className={`hidden lg:flex lg:flex-col flex-shrink-0 border-r border-slate-200 min-h-screen sticky top-0 h-screen transition-[width] duration-200 ease-in-out shadow-[1px_0_2px_rgba(0,0,0,0.02)] ${
          isCollapsed ? "lg:w-[70px]" : "lg:w-64"
        }`}
      >
        {isCollapsed ? collapsedContent : expandedContent}
      </aside>
    </>
  );
}
