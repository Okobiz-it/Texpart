"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Package,
  Shirt,
  Printer,
  Menu,
  Gift,
  Briefcase,
  Scissors,
} from "lucide-react";
import AdminCollapsedRail from "./sidebar/AdminCollapsedRail";
import AdminExpandedNav from "./sidebar/AdminExpandedNav";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [productsOpen, setProductsOpen] = useState(true);
  const [quotationsOpen, setQuotationsOpen] = useState(true);

  const handleLogout = async () => {
    if (confirm("Are you sure you want to sign out of the Admin Portal?")) {
      try {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/login");
        router.refresh();
      } catch (err) {
        window.location.href = "/login";
      }
    }
  };

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

  const searchParams = useSearchParams();
  const currentDivisionParam = searchParams.get("division");

  const getDivisionIcon = (iconName: string) => {
    switch (iconName) {
      case "printer":
        return <Printer className="w-3.5 h-3.5 shrink-0" />;
      case "shirt":
        return <Shirt className="w-3.5 h-3.5 shrink-0" />;
      case "package":
        return <Package className="w-3.5 h-3.5 shrink-0" />;
      case "gift":
        return <Gift className="w-3.5 h-3.5 shrink-0" />;
      case "briefcase":
        return <Briefcase className="w-3.5 h-3.5 shrink-0" />;
      case "scissors":
        return <Scissors className="w-3.5 h-3.5 shrink-0" />;
      default:
        return <Package className="w-3.5 h-3.5 shrink-0" />;
    }
  };

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Keep products open if current path is under /products
  useEffect(() => {
    if (pathname.startsWith("/products")) {
      setProductsOpen(true);
    }
    if (pathname.startsWith("/quotations")) {
      setQuotationsOpen(true);
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

  const isPartners = pathname === "/partners";
  const isCertifications = pathname === "/certifications";
  const isGallery = pathname === "/gallery";
  const isIncomingQuotations = pathname.startsWith("/quotations/incoming");
  const isQuotationsParent = pathname.startsWith("/quotations") && !isIncomingQuotations;
  const isCreateQuotation = pathname === "/quotations/create";
  const isManageQuotation = isQuotationsParent && !isCreateQuotation;
  const isInquiries = pathname.startsWith("/inquiries");

  if (pathname === "/login") {
    return null;
  }

  const expandedNavElement = (
    <AdminExpandedNav
      mobileOpen={mobileOpen}
      setMobileOpen={setMobileOpen}
      setIsCollapsed={setIsCollapsed}
      pathname={pathname}
      currentDivisionParam={currentDivisionParam}
      productsOpen={productsOpen}
      setProductsOpen={setProductsOpen}
      quotationsOpen={quotationsOpen}
      setQuotationsOpen={setQuotationsOpen}
      isOverview={isOverview}
      isHeroBanners={isHeroBanners}
      isProducts={isProducts}
      isPartners={isPartners}
      isCertifications={isCertifications}
      isGallery={isGallery}
      isIncomingQuotations={isIncomingQuotations}
      isQuotationsParent={isQuotationsParent}
      isCreateQuotation={isCreateQuotation}
      isManageQuotation={isManageQuotation}
      isInquiries={isInquiries}
      counts={counts}
      handleLogout={handleLogout}
      getDivisionIcon={getDivisionIcon}
    />
  );

  const collapsedRailElement = (
    <AdminCollapsedRail
      setIsCollapsed={setIsCollapsed}
      pathname={pathname}
      currentDivisionParam={currentDivisionParam}
      isOverview={isOverview}
      isHeroBanners={isHeroBanners}
      isProducts={isProducts}
      isPartners={isPartners}
      isCertifications={isCertifications}
      isGallery={isGallery}
      isIncomingQuotations={isIncomingQuotations}
      isQuotationsParent={isQuotationsParent}
      isCreateQuotation={isCreateQuotation}
      isManageQuotation={isManageQuotation}
      isInquiries={isInquiries}
      counts={counts}
      handleLogout={handleLogout}
      getDivisionIcon={getDivisionIcon}
    />
  );

  return (
    <>
      {/* Mobile Top Header */}
      <div className="no-print print:hidden lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between z-40 sticky top-0 shadow-xs">
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
        <div className="no-print print:hidden fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl z-10">
            {expandedNavElement}
          </div>
        </div>
      )}

      {/* Desktop Sidebar (Collapsible with smooth width transition & flyout submenus) */}
      <aside
        className={`no-print print:hidden hidden lg:flex lg:flex-col flex-shrink-0 border-r border-slate-200 min-h-screen sticky top-0 h-screen transition-[width] duration-200 ease-in-out shadow-[1px_0_2px_rgba(0,0,0,0.02)] z-30 ${
          isCollapsed ? "lg:w-[70px] overflow-visible" : "lg:w-64"
        }`}
      >
        {isCollapsed ? collapsedRailElement : expandedNavElement}
      </aside>
    </>
  );
}
