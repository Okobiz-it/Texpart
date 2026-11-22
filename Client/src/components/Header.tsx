"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useQuote } from "@/context/QuoteContext";
import {
  ChevronDown,
  Menu,
  ArrowRight,
  Printer,
  Shirt,
  Package,
  Gift,
  Briefcase,
  Scissors,
  Layers,
  ChevronRight,
  Phone,
  FileText,
  Tag,
  Calendar,
  Check,
} from "lucide-react";
import {
  BRAND_INFO,
  OUR_WORK_VERTICALS,
  getCategorySlug,
  getCategoryNameFromSlug,
} from "@/data/siteNavigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isWorkMenuOpen, setIsWorkMenuOpen] = useState(false);
  const [selectedWorkId, setSelectedWorkId] = useState<string>("commercial-printing");
  const [activeCategoryParam, setActiveCategoryParam] = useState<string>("");
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const pathname = usePathname();
  const { openGeneralQuote, openMobileDrawer } = useQuote();

  // Helper to read category param directly from window.location
  const syncFromUrl = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setActiveCategoryParam(params.get("category") || "");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync category & auto-align division on route changes
  useEffect(() => {
    setIsWorkMenuOpen(false);
    syncFromUrl();

    const matchedVertical = OUR_WORK_VERTICALS.find(
      (v) =>
        pathname === v.href ||
        pathname.startsWith(v.href) ||
        pathname === `/work/${v.id}` ||
        pathname === `/services/${v.id}`
    );
    if (matchedVertical) {
      setSelectedWorkId(matchedVertical.id);
    }

    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, [pathname]);

  const handleWorkMenuEnter = () => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    syncFromUrl();

    // Align division with current route if visiting one
    const matchedVertical = OUR_WORK_VERTICALS.find(
      (v) =>
        pathname === v.href ||
        pathname.startsWith(v.href) ||
        pathname === `/work/${v.id}` ||
        pathname === `/services/${v.id}`
    );
    if (matchedVertical) {
      setSelectedWorkId(matchedVertical.id);
    }

    setIsWorkMenuOpen(true);
  };

  const handleWorkMenuLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setIsWorkMenuOpen(false);
    }, 220);
  };

  const isHomeActive = () => pathname === "/";
  const isAboutActive = () => pathname.startsWith("/about");
  const isCapabilitiesActive = () => pathname.startsWith("/capabilities");
  const isWorkActive = () => pathname.startsWith("/work") || pathname.startsWith("/gallery");
  const isContactActive = () => pathname.startsWith("/contact");

  // Selected vertical in OUR WORK mega menu
  const currentWorkVertical =
    OUR_WORK_VERTICALS.find((v) => v.id === selectedWorkId) || OUR_WORK_VERTICALS[0];

  const isCurrentVerticalActive = Boolean(
    pathname === currentWorkVertical.href ||
    pathname.startsWith(currentWorkVertical.href) ||
    pathname === `/work/${currentWorkVertical.id}` ||
    pathname === `/services/${currentWorkVertical.id}`
  );

  const isItemSelected = (item: { name: string; slug: string }) => {
    if (!isCurrentVerticalActive || !activeCategoryParam) return false;
    const cleanParam = activeCategoryParam.trim().toLowerCase();
    if (cleanParam === "all") return false;
    if (cleanParam === item.slug.toLowerCase()) return true;
    const itemSlug = getCategorySlug(item.name);
    if (cleanParam === itemSlug) return true;
    const resolvedFromParam = getCategoryNameFromSlug(cleanParam, currentWorkVertical.items).toLowerCase();
    if (resolvedFromParam === item.name.toLowerCase()) return true;
    if (cleanParam === item.name.toLowerCase()) return true;
    return false;
  };

  const getWorkIcon = (iconName: string, className = "w-4.5 h-4.5") => {
    switch (iconName) {
      case "printer":
        return <Printer className={className} />;
      case "shirt":
        return <Shirt className={className} />;
      case "package":
        return <Package className={className} />;
      case "gift":
        return <Gift className={className} />;
      case "briefcase":
        return <Briefcase className={className} />;
      case "scissors":
        return <Scissors className={className} />;
      default:
        return <Layers className={className} />;
    }
  };

  const getCategoryOutlineIcon = (catName: string, className = "w-4 h-4") => {
    const name = catName.toLowerCase();
    if (
      name.includes("card") ||
      name.includes("stationery") ||
      name.includes("flyer") ||
      name.includes("brochure") ||
      name.includes("publication") ||
      name.includes("form") ||
      name.includes("pad") ||
      name.includes("paper")
    ) {
      return <FileText className={className} />;
    }
    if (name.includes("tag") || name.includes("label") || name.includes("barcode")) {
      return <Tag className={className} />;
    }
    if (name.includes("box") || name.includes("bag") || name.includes("carton") || name.includes("pack")) {
      return <Package className={className} />;
    }
    if (name.includes("diary") || name.includes("notebook") || name.includes("calendar")) {
      return <Calendar className={className} />;
    }
    if (
      name.includes("cord") ||
      name.includes("tape") ||
      name.includes("patch") ||
      name.includes("trim") ||
      name.includes("button") ||
      name.includes("denim")
    ) {
      return <Scissors className={className} />;
    }
    if (name.includes("gift") || name.includes("mug") || name.includes("pen") || name.includes("key")) {
      return <Gift className={className} />;
    }
    return <Layers className={className} />;
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-200">
      {/* SINGLE UNIFIED CLEAN HEADER BAR */}
      <nav
        className={`w-full bg-white/95 backdrop-blur-md transition-all duration-200 border-b ${
          isScrolled
            ? "border-slate-200 shadow-sm py-2.5"
            : "border-slate-150 shadow-xs py-3.5 sm:py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
          {/* 1. LEFT: OFFICIAL LOGO */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="relative w-44 sm:w-52 md:w-56 h-10 sm:h-11 transition-transform duration-200">
                <Image
                  src="/nav-logo.png"
                  alt="Texpart — Design & Accessories"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* 2. CENTER: CLEAN UNCLUTTERED MAIN NAVIGATION */}
          <div className="hidden lg:flex items-center gap-1.5 sm:gap-2 xl:gap-2.5 text-[13px] font-heading font-bold uppercase tracking-wider">
            {/* 1. HOME */}
            <Link
              href="/"
              className={`px-3 py-2 rounded-[4px] transition-colors ${
                isHomeActive()
                  ? "text-[#0066CC] font-black bg-blue-50/70"
                  : "text-[#0A2540] hover:text-[#0066CC] hover:bg-slate-50"
              }`}
            >
              HOME
            </Link>

            {/* 2. ABOUT TEXPART */}
            <Link
              href="/about"
              className={`px-3 py-2 rounded-[4px] transition-colors ${
                isAboutActive()
                  ? "text-[#0066CC] font-black bg-blue-50/70"
                  : "text-[#0A2540] hover:text-[#0066CC] hover:bg-slate-50"
              }`}
            >
              ABOUT TEXPART
            </Link>

            {/* 3. OUR CAPABILITIES (DIRECT LINK, NO DROPDOWN) */}
            <Link
              href="/capabilities"
              className={`px-3 py-2 rounded-[4px] transition-colors ${
                isCapabilitiesActive()
                  ? "text-[#0066CC] font-black bg-blue-50/70"
                  : "text-[#0A2540] hover:text-[#0066CC] hover:bg-slate-50"
              }`}
            >
              OUR CAPABILITIES
            </Link>

            {/* 4. OUR WORK (BEAUTIFIED MEGA MENU WITH 6 VERTICALS & CLICK-TO-SELECT) */}
            <div
              className="relative"
              onMouseEnter={handleWorkMenuEnter}
              onMouseLeave={handleWorkMenuLeave}
            >
              <Link
                href="/work"
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-[4px] transition-colors ${
                  isWorkActive() || isWorkMenuOpen
                    ? "text-[#0066CC] font-black bg-blue-50/70"
                    : "text-[#0A2540] hover:text-[#0066CC] hover:bg-slate-50"
                }`}
              >
                <span>OUR SERVICES</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isWorkMenuOpen ? "rotate-180 text-[#0066CC]" : "text-slate-400"
                  }`}
                />
              </Link>
            </div>

            {/* 5. CONTACT */}
            <Link
              href="/contact"
              className={`px-3 py-2 rounded-[4px] transition-colors ${
                isContactActive()
                  ? "text-[#0066CC] font-black bg-blue-50/70"
                  : "text-[#0A2540] hover:text-[#0066CC] hover:bg-slate-50"
              }`}
            >
              CONTACT
            </Link>
          </div>

          {/* 3. RIGHT: REQUEST QUOTE CTA + MOBILE HAMBURGER */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Request a Quote CTA */}
            <button
              onClick={openGeneralQuote}
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#0066CC] hover:bg-[#0052CC] text-white px-5 py-2.5 rounded-[4px] font-heading text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={openMobileDrawer}
              className="p-2 rounded-[4px] lg:hidden text-[#0A2540] hover:text-[#0066CC] hover:bg-slate-100 cursor-pointer"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* BEAUTIFIED OUR WORK MEGA MENU (SLICK STUDIO / MOONDAY REFERENCE DESIGN) */}
      <div
        className={`absolute left-0 right-0 top-full -mt-px pt-0 transition-all duration-200 z-50 pointer-events-none px-4 sm:px-6 lg:px-8 ${
          isWorkMenuOpen
            ? "opacity-100 visible pointer-events-auto translate-y-0"
            : "opacity-0 invisible pointer-events-none -translate-y-1"
        }`}
        onMouseEnter={handleWorkMenuEnter}
        onMouseLeave={handleWorkMenuLeave}
      >
        <div className="max-w-6xl mx-auto">
          <div
            className="bg-white rounded-b-2xl rounded-t-none shadow-2xl border border-slate-200 border-t-0 overflow-hidden ring-1 ring-slate-900/5"
            onMouseEnter={handleWorkMenuEnter}
            onMouseLeave={handleWorkMenuLeave}
          >
            {/* MAIN TWO-COLUMN LAYOUT */}
            <div className="grid grid-cols-12 min-h-[420px]">
              {/* LEFT COLUMN: DIRECTIONS (6 VERTICALS) */}
              <div className="col-span-4 bg-slate-50/70 p-4 border-r border-slate-200 space-y-1">
                <div className="px-2 pb-2">
                  <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-400">
                    DIRECTIONS
                  </span>
                </div>

                {OUR_WORK_VERTICALS.map((vertical) => {
                  const isSelected = selectedWorkId === vertical.id;
                  return (
                    <button
                      key={vertical.id}
                      type="button"
                      onClick={() => setSelectedWorkId(vertical.id)}
                      className={`w-full text-left rounded-xl p-3 transition-all duration-150 flex items-center gap-3 cursor-pointer ${
                        isSelected
                          ? "bg-white shadow-md border border-slate-200 text-[#0066CC]"
                          : "hover:bg-white/70 text-slate-700 border border-transparent"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? "bg-[#0066CC] text-white shadow-xs"
                            : "bg-slate-200/70 text-slate-600"
                        }`}
                      >
                        {getWorkIcon(vertical.icon, "w-5 h-5")}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-heading font-bold text-[14px] tracking-tight leading-snug">
                            {vertical.name}
                          </h4>
                        </div>
                        <p className="text-[12px] text-slate-500 line-clamp-1 mt-0.5 font-normal">
                          {vertical.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* RIGHT PANEL: SOLUTIONS FOR {VERTICAL} */}
              <div className="col-span-8 p-6 flex flex-col justify-between bg-white">
                <div>
                  {/* Clean Header: SOLUTIONS FOR [NAME] and View All Products */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                    <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-400">
                      SOLUTIONS FOR {currentWorkVertical.name.toUpperCase()}
                    </span>

                    <Link
                      href={currentWorkVertical.href}
                      onClick={() => setIsWorkMenuOpen(false)}
                      className={`text-xs font-heading font-bold inline-flex items-center gap-1 shrink-0 transition-colors ${
                        isCurrentVerticalActive && (!activeCategoryParam || activeCategoryParam.toLowerCase() === "all")
                          ? "text-[#0066CC] underline bg-blue-50/80 px-2 py-0.5 rounded"
                          : "text-[#0066CC] hover:underline"
                      }`}
                    >
                      <span>View All Products</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Subcategories Grid with Clear Active & Hover Distinction */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 max-h-[440px] overflow-y-auto pr-1">
                    {currentWorkVertical.items.map((item) => {
                      const isSelected = isItemSelected(item);
                      return (
                        <Link
                          key={item.slug}
                          href={`${currentWorkVertical.href}?category=${getCategorySlug(item.name)}`}
                          onClick={() => setIsWorkMenuOpen(false)}
                          className={`group flex items-center justify-between gap-2.5 py-2 px-3 rounded-lg transition-all ${
                            isSelected
                              ? "bg-blue-50/90 border border-blue-200/90 text-[#0066CC] font-bold shadow-2xs hover:bg-blue-100/70"
                              : "hover:bg-slate-50/90 text-slate-700 hover:text-[#0066CC] border border-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 shadow-2xs ${
                                isSelected
                                  ? "bg-[#0066CC] text-white"
                                  : "bg-blue-50 text-[#0066CC] group-hover:bg-[#0066CC] group-hover:text-white"
                              }`}
                            >
                              {isSelected ? (
                                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                              ) : (
                                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                              )}
                            </div>
                            <span
                              className={`truncate text-[13.5px] sm:text-[14px] leading-snug transition-colors ${
                                isSelected
                                  ? "text-[#0066CC] font-bold"
                                  : "text-[#0A2540] font-semibold group-hover:text-[#0066CC]"
                              }`}
                            >
                              {item.name}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Action Strip: Request a Quote CTA */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setIsWorkMenuOpen(false);
                      openGeneralQuote();
                    }}
                    className="px-4 py-2 rounded-[4px] bg-[#0066CC] hover:bg-[#0052CC] text-white text-xs font-bold tracking-wide shadow-xs transition-all cursor-pointer shrink-0 inline-flex items-center gap-1.5"
                  >
                    <span>Request a Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
