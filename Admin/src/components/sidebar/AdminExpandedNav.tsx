"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { formatBadgeCount } from "@/lib/formatNumber";
import {
  LayoutDashboard,
  Package,
  Plus,
  Users,
  Award,
  Camera,
  Image as ImageIcon,
  FileText,
  MessageSquare,
  Inbox,
  ChevronDown,
  LogOut,
  X,
  PanelLeftClose,
  ShieldCheck,
  FolderTree,
} from "lucide-react";

interface AdminExpandedNavProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  setIsCollapsed: (collapsed: boolean) => void;
  pathname: string;
  currentDivisionParam: string | null;
  productsOpen: boolean;
  setProductsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  quotationsOpen: boolean;
  setQuotationsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOverview: boolean;
  isHeroBanners: boolean;
  isProducts: boolean;
  isPartners: boolean;
  isCertifications: boolean;
  isGallery: boolean;
  isIncomingQuotations: boolean;
  isQuotationsParent: boolean;
  isCreateQuotation: boolean;
  isManageQuotation: boolean;
  isInquiries: boolean;
  counts: {
    products?: number;
    partners?: number;
    certifications?: number;
    heroSlides?: number;
    gallery?: number;
    quotations?: number;
    newQuotations?: number;
    inquiries?: number;
    newInquiries?: number;
  };
  handleLogout: () => Promise<void>;
  getDivisionIcon: (iconName: string) => React.ReactNode;
}

export default function AdminExpandedNav({
  mobileOpen,
  setMobileOpen,
  setIsCollapsed,
  pathname,
  currentDivisionParam,
  productsOpen,
  setProductsOpen,
  quotationsOpen,
  setQuotationsOpen,
  isOverview,
  isHeroBanners,
  isProducts,
  isPartners,
  isCertifications,
  isGallery,
  isIncomingQuotations,
  isQuotationsParent,
  isCreateQuotation,
  isManageQuotation,
  isInquiries,
  counts,
  handleLogout,
  getDivisionIcon,
}: AdminExpandedNavProps) {
  return (
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
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[4px] text-[14px] font-semibold transition-all ${
            isOverview
              ? "bg-[#0066CC] text-white shadow-xs"
              : "text-slate-600 hover:text-[#0A2540] hover:bg-slate-50"
          }`}
        >
          <LayoutDashboard
            className={`w-[19px] h-[19px] ${isOverview ? "text-white" : "text-slate-400"}`}
          />
          <span>Overview</span>
        </Link>

        {/* 2. Hero Banners */}
        <Link
          href="/hero-banners"
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-[4px] text-[14px] font-semibold transition-all ${
            isHeroBanners
              ? "bg-[#0066CC] text-white shadow-xs"
              : "text-slate-600 hover:text-[#0A2540] hover:bg-slate-50"
          }`}
        >
          <div className="flex items-center gap-3">
            <ImageIcon
              className={`w-[19px] h-[19px] ${isHeroBanners ? "text-white" : "text-slate-400"}`}
            />
            <span>Hero Banners</span>
          </div>
        </Link>

        {/* 3. Products (Parent Menu with 6 Manufacturing Divisions) */}
        <div className="pt-0.5">
          <button
            type="button"
            onClick={() => setProductsOpen((prev) => !prev)}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-[4px] text-[14px] font-semibold transition-colors cursor-pointer ${
              isProducts
                ? "bg-blue-50/70 text-[#0066CC] font-bold"
                : "text-slate-600 hover:text-[#0A2540] hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <Package
                className={`w-[19px] h-[19px] ${
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
            <div className="ml-3 pl-2.5 border-l-2 border-slate-200 mt-1 space-y-1">
              {/* All Products */}
              <Link
                href="/products?division=all"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-[4px] text-[13px] font-semibold transition-colors ${
                  pathname === "/products" && (!currentDivisionParam || currentDivisionParam === "all")
                    ? "bg-[#0066CC] text-white font-bold shadow-xs"
                    : "text-slate-600 hover:text-[#0A2540] hover:bg-slate-50"
                }`}
              >
                <Package className="w-4 h-4 shrink-0" />
                <span>All Products</span>
              </Link>

              {/* 6 Core Divisions (No grandchild subcategories) */}
              {[
                { id: "commercial-printing", label: "Commercial Printing", icon: "printer" },
                { id: "garments-accessories", label: "Garments Accessories", icon: "shirt" },
                { id: "packaging-solutions", label: "Packaging", icon: "package" },
                { id: "promotional-products", label: "Promotional Products", icon: "gift" },
                { id: "corporate-projects", label: "Corporate Projects", icon: "briefcase" },
                { id: "apparel-projects", label: "Apparel Projects", icon: "scissors" },
              ].map((div) => {
                const isDivActive = currentDivisionParam === div.id;

                return (
                  <Link
                    key={div.id}
                    href={`/products?division=${div.id}`}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-[4px] text-[12.5px] font-medium transition-colors ${
                      isDivActive
                        ? "bg-blue-50/90 text-[#0066CC] font-bold"
                        : "hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    {getDivisionIcon(div.icon)}
                    <span className="truncate uppercase tracking-wide">
                      {div.label}
                    </span>
                  </Link>
                );
              })}

              {/* Category Manager Link */}
              <Link
                href="/categories"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-[4px] text-[12.5px] font-medium transition-colors ${
                  pathname === "/categories"
                    ? "bg-blue-50/90 text-[#0066CC] font-bold"
                    : "hover:bg-slate-50 text-slate-700"
                }`}
              >
                <FolderTree
                  className={`w-3.5 h-3.5 shrink-0 ${
                    pathname === "/categories" ? "text-[#0066CC]" : "text-slate-400"
                  }`}
                />
                <span className="truncate">Manage Categories</span>
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

        {/* 7. Incoming Quotations */}
        <Link
          href="/quotations/incoming"
          className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-[4px] text-[13.5px] font-semibold transition-all ${
            isIncomingQuotations
              ? "bg-[#0066CC] text-white shadow-xs"
              : "text-slate-600 hover:text-[#0A2540] hover:bg-slate-50"
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <Inbox
              className={`w-[18px] h-[18px] shrink-0 ${
                isIncomingQuotations ? "text-white" : "text-slate-400"
              }`}
            />
            <span className="truncate">Incoming Quotations</span>
          </div>
          {counts.newQuotations && counts.newQuotations > 0 ? (
            <span className="shrink-0 px-2 py-0.5 text-[10px] font-mono font-bold rounded-[4px] bg-rose-50 text-rose-600 border border-rose-200 leading-none">
              {formatBadgeCount(counts.newQuotations)}
            </span>
          ) : null}
        </Link>

        {/* 8. Quotation (Create & Manage Saved Official Quotations) */}
        <div className="pt-0.5">
          <button
            type="button"
            onClick={() => setQuotationsOpen((prev) => !prev)}
            className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-[4px] text-[13.5px] font-semibold transition-colors ${
              isQuotationsParent
                ? "bg-blue-50/70 text-[#0066CC] font-bold"
                : "text-slate-600 hover:text-[#0A2540] hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <FileText
                className={`w-[18px] h-[18px] shrink-0 ${
                  isQuotationsParent ? "text-[#0066CC]" : "text-slate-400"
                }`}
              />
              <span className="truncate">Quotation</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                isQuotationsParent ? "text-[#0066CC]" : "text-slate-400"
              } ${quotationsOpen ? "" : "-rotate-90"}`}
            />
          </button>

          {quotationsOpen && (
            <div className="ml-4 pl-3 border-l-2 border-slate-100 mt-1 space-y-1">
              {/* Submenu 1: Create Quotation */}
              <Link
                href="/quotations/create"
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-[4px] text-[13px] font-medium transition-colors ${
                  isCreateQuotation
                    ? "bg-[#0066CC] text-white font-bold shadow-xs"
                    : "text-slate-600 hover:text-[#0A2540] hover:bg-slate-50"
                }`}
              >
                <Plus className={`w-4 h-4 shrink-0 ${isCreateQuotation ? "text-white" : "text-slate-400"}`} />
                <span className="truncate">Create Quotation</span>
              </Link>

              {/* Submenu 2: Manage Quotation */}
              <Link
                href="/quotations"
                className={`flex items-center justify-between px-2.5 py-2 rounded-[4px] text-[13px] font-medium transition-colors ${
                  isManageQuotation
                    ? "bg-[#0066CC] text-white font-bold shadow-xs"
                    : "text-slate-600 hover:text-[#0A2540] hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <FileText className={`w-4 h-4 shrink-0 ${isManageQuotation ? "text-white" : "text-slate-400"}`} />
                  <span className="truncate">Manage Quotation</span>
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* 9. Contact Messages */}
        <Link
          href="/inquiries"
          className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-[4px] text-[13.5px] font-semibold transition-all ${
            isInquiries
              ? "bg-[#0066CC] text-white shadow-xs"
              : "text-slate-600 hover:text-[#0A2540] hover:bg-slate-50"
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <MessageSquare
              className={`w-[18px] h-[18px] shrink-0 ${isInquiries ? "text-white" : "text-slate-400"}`}
            />
            <span className="truncate">Contact Messages</span>
          </div>
          {counts.newInquiries && counts.newInquiries > 0 ? (
            <span className="shrink-0 px-2 py-0.5 text-[10px] font-mono font-bold rounded-[4px] bg-amber-50 text-amber-700 border border-amber-200 leading-none">
              {formatBadgeCount(counts.newInquiries)}
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
              <span className="text-[11px] text-slate-400 truncate block leading-tight font-mono">
                texpartdesign@gmail.com
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            title="Sign Out (Log out of Admin Portal)"
            className="p-1.5 text-slate-400 hover:text-red-600 rounded-[4px] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
