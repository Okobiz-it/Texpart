"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
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
  LogOut,
  PanelLeftOpen,
  FolderTree,
  FileSpreadsheet,
} from "lucide-react";

interface AdminCollapsedRailProps {
  setIsCollapsed: (val: boolean) => void;
  pathname: string;
  currentDivisionParam: string | null;
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
    newQuotations?: number;
    newInquiries?: number;
  };
  handleLogout: () => void;
  getDivisionIcon: (iconName: string) => React.ReactNode;
}

export default function AdminCollapsedRail({
  setIsCollapsed,
  pathname,
  currentDivisionParam,
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
}: AdminCollapsedRailProps) {
  return (
    <div className="flex flex-col h-full bg-white text-slate-700 select-none items-center overflow-visible">
      {/* Brand Header: Logo only, on hover shows expand icon */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-center w-full">
        <button
          type="button"
          onClick={() => setIsCollapsed(false)}
          className="relative w-8 h-8 rounded-[4px] flex items-center justify-center group focus:outline-none cursor-pointer"
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
      <nav className="flex-1 py-4 space-y-2 w-full px-2 flex flex-col items-center overflow-visible">
        {/* Overview */}
        <div className="relative group w-full flex justify-center">
          <Link
            href="/"
            className={`w-11 h-11 flex items-center justify-center rounded-[4px] transition-colors ${
              isOverview
                ? "bg-[#0066CC] text-white shadow-xs"
                : "text-slate-500 hover:text-[#0066CC] hover:bg-slate-100"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
          </Link>
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-heading font-bold rounded shadow-lg whitespace-nowrap opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
            Overview
          </div>
        </div>

        {/* Hero Banners */}
        <div className="relative group w-full flex justify-center">
          <Link
            href="/hero-banners"
            className={`w-11 h-11 flex items-center justify-center rounded-[4px] transition-colors relative ${
              isHeroBanners
                ? "bg-[#0066CC] text-white shadow-xs"
                : "text-slate-500 hover:text-[#0066CC] hover:bg-slate-100"
            }`}
          >
            <ImageIcon className="w-5 h-5" />
          </Link>
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-heading font-bold rounded shadow-lg whitespace-nowrap opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
            Hero Banners
          </div>
        </div>

        {/* Products with Hover Flyout Submenu */}
        <div className="relative group w-full flex justify-center">
          <Link
            href="/products"
            className={`w-11 h-11 flex items-center justify-center rounded-[4px] transition-colors relative ${
              isProducts
                ? "bg-[#0066CC] text-white shadow-xs"
                : "text-slate-500 hover:text-[#0066CC] hover:bg-slate-100 group-hover:bg-blue-50 group-hover:text-[#0066CC]"
            }`}
          >
            <Package className="w-5 h-5" />
          </Link>

          {/* Floating Flyout Submenu on Hover */}
          <div className="absolute left-full top-0 ml-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 p-2.5 space-y-1 opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto transition-all duration-150 z-50 before:absolute before:-left-3 before:top-0 before:w-3 before:h-full before:content-['']">
            <div className="px-2.5 py-1.5 border-b border-slate-100 mb-1">
              <span className="font-heading font-black text-xs uppercase tracking-wider text-[#0A2540]">
                Products &amp; Range
              </span>
            </div>

            <Link
              href="/products?division=all"
              className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-[4px] text-xs font-semibold transition-colors ${
                pathname === "/products" && (!currentDivisionParam || currentDivisionParam === "all")
                  ? "bg-[#0066CC] text-white font-bold"
                  : "text-slate-700 hover:bg-slate-50 hover:text-[#0066CC]"
              }`}
            >
              <Package className="w-3.5 h-3.5 shrink-0" />
              <span>All Products</span>
            </Link>

            {[
              { id: "commercial-printing", label: "Commercial Printing", icon: "printer" },
              { id: "garments-accessories", label: "Garments Accessories", icon: "shirt" },
              { id: "packaging-solutions", label: "Packaging", icon: "package" },
              { id: "promotional-products", label: "Promotional Products", icon: "gift" },
            ].map((div) => {
              const isActive = currentDivisionParam === div.id;
              return (
                <Link
                  key={div.id}
                  href={`/products?division=${div.id}`}
                  className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-[4px] text-xs transition-colors ${
                    isActive
                      ? "bg-blue-50 text-[#0066CC] font-bold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-[#0066CC]"
                  }`}
                >
                  {getDivisionIcon(div.icon)}
                  <span className="truncate">{div.label}</span>
                </Link>
              );
            })}

            <div className="pt-1 border-t border-slate-100 mt-1">
              <Link
                href="/categories"
                className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-[4px] text-xs font-medium transition-colors ${
                  pathname === "/categories"
                    ? "bg-blue-50 text-[#0066CC] font-bold"
                    : "text-slate-700 hover:bg-slate-50 hover:text-[#0066CC]"
                }`}
              >
                <FolderTree className="w-3.5 h-3.5 shrink-0 text-[#0066CC]" />
                <span className="truncate">Manage Categories</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Client Partners */}
        <div className="relative group w-full flex justify-center">
          <Link
            href="/partners"
            className={`w-11 h-11 flex items-center justify-center rounded-[4px] transition-colors relative ${
              isPartners
                ? "bg-[#0066CC] text-white shadow-xs"
                : "text-slate-500 hover:text-[#0066CC] hover:bg-slate-100"
            }`}
          >
            <Users className="w-5 h-5" />
          </Link>
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-heading font-bold rounded shadow-lg whitespace-nowrap opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
            Client Partners
          </div>
        </div>

        {/* Certifications */}
        <div className="relative group w-full flex justify-center">
          <Link
            href="/certifications"
            className={`w-11 h-11 flex items-center justify-center rounded-[4px] transition-colors relative ${
              isCertifications
                ? "bg-[#0066CC] text-white shadow-xs"
                : "text-slate-500 hover:text-[#0066CC] hover:bg-slate-100"
            }`}
          >
            <Award className="w-5 h-5" />
          </Link>
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-heading font-bold rounded shadow-lg whitespace-nowrap opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
            Certifications
          </div>
        </div>

        {/* Gallery Archive */}
        <div className="relative group w-full flex justify-center">
          <Link
            href="/gallery"
            className={`w-11 h-11 flex items-center justify-center rounded-[4px] transition-colors relative ${
              isGallery
                ? "bg-[#0066CC] text-white shadow-xs"
                : "text-slate-500 hover:text-[#0066CC] hover:bg-slate-100"
            }`}
          >
            <Camera className="w-5 h-5" />
          </Link>
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-heading font-bold rounded shadow-lg whitespace-nowrap opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
            Gallery Archive
          </div>
        </div>

        {/* Incoming Quotations */}
        <div className="relative group w-full flex justify-center">
          <Link
            href="/quotations/incoming"
            className={`w-11 h-11 flex items-center justify-center rounded-[4px] transition-colors relative ${
              isIncomingQuotations
                ? "bg-[#0066CC] text-white shadow-xs"
                : "text-slate-500 hover:text-[#0066CC] hover:bg-slate-100"
            }`}
          >
            <Inbox className="w-5 h-5" />
            {counts.newQuotations && counts.newQuotations > 0 ? (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-[4px] bg-rose-500 ring-2 ring-white" />
            ) : null}
          </Link>
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-heading font-bold rounded shadow-lg whitespace-nowrap opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
            Incoming Quotations
          </div>
        </div>

        {/* Quotations with Hover Flyout Submenu */}
        <div className="relative group w-full flex justify-center">
          <Link
            href="/quotations"
            className={`w-11 h-11 flex items-center justify-center rounded-[4px] transition-colors relative ${
              isQuotationsParent
                ? "bg-[#0066CC] text-white shadow-xs"
                : "text-slate-500 hover:text-[#0066CC] hover:bg-slate-100 group-hover:bg-blue-50 group-hover:text-[#0066CC]"
            }`}
          >
            <FileText className="w-5 h-5" />
          </Link>

          {/* Floating Flyout Submenu on Hover */}
          <div className="absolute left-full top-0 ml-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 p-2.5 space-y-1 opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto transition-all duration-150 z-50 before:absolute before:-left-3 before:top-0 before:w-3 before:h-full before:content-['']">
            <div className="px-2.5 py-1.5 border-b border-slate-100 flex items-center justify-between mb-1">
              <span className="font-heading font-black text-xs uppercase tracking-wider text-[#0A2540]">
                Quotation Engine
              </span>
            </div>

            <Link
              href="/quotations/create"
              className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-[4px] text-xs transition-colors ${
                isCreateQuotation
                  ? "bg-[#0066CC] text-white font-bold"
                  : "text-slate-700 hover:bg-slate-50 hover:text-[#0066CC]"
              }`}
            >
              <Plus className="w-3.5 h-3.5 shrink-0" />
              <span>Create Quotation</span>
            </Link>

            <Link
              href="/quotations"
              className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-[4px] text-xs transition-colors ${
                isManageQuotation
                  ? "bg-[#0066CC] text-white font-bold"
                  : "text-slate-700 hover:bg-slate-50 hover:text-[#0066CC]"
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5 shrink-0" />
              <span>Manage Quotation</span>
            </Link>
          </div>
        </div>

        {/* Contact Messages */}
        <div className="relative group w-full flex justify-center">
          <Link
            href="/inquiries"
            className={`w-11 h-11 flex items-center justify-center rounded-[4px] transition-colors relative ${
              isInquiries
                ? "bg-[#0066CC] text-white shadow-xs"
                : "text-slate-500 hover:text-[#0066CC] hover:bg-slate-100"
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            {counts.newInquiries && counts.newInquiries > 0 ? (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-[4px] bg-amber-500 ring-2 ring-white" />
            ) : null}
          </Link>
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-heading font-bold rounded shadow-lg whitespace-nowrap opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
            Contact Messages
          </div>
        </div>
      </nav>

      {/* Collapsed bottom profile icon */}
      <div className="p-3 border-t border-slate-100 flex items-center justify-center w-full">
        <button
          type="button"
          onClick={handleLogout}
          className="w-9 h-9 rounded-[4px] bg-[#0066CC] hover:bg-red-600 text-white flex items-center justify-center shadow-xs cursor-pointer transition-colors"
          title="Sign Out: Super Admin (texpartdesign@gmail.com)"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
