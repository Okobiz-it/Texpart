"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  Users,
  Award,
  Image as ImageIcon,
  FileText,
  MessageSquare,
  Plus,
  ArrowRight,
  ExternalLink,
  Clock,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Eye,
  X,
  Phone,
  Mail,
  Building,
} from "lucide-react";
import AdminNavbar from "@/components/AdminNavbar";
import { DashboardStats, QuotationItem, ContactMessageItem } from "@/types";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Storefront Section Visibility Settings State
  const [sectionSettings, setSectionSettings] = useState<{
    show_certifications_section: boolean;
    show_clients_section: boolean;
  }>({
    show_certifications_section: true,
    show_clients_section: true,
  });
  const [isUpdatingSetting, setIsUpdatingSetting] = useState(false);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      if (data.success && data.settings) {
        setSectionSettings({
          show_certifications_section: data.settings.show_certifications_section ?? true,
          show_clients_section: data.settings.show_clients_section ?? true,
        });
      }
    } catch (err) {
      console.error("Failed to load settings in dashboard", err);
    }
  };

  const handleToggleSetting = async (key: "show_certifications_section" | "show_clients_section") => {
    const nextVal = !sectionSettings[key];
    setSectionSettings((prev) => ({ ...prev, [key]: nextVal }));
    setIsUpdatingSetting(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: nextVal }),
      });
      const data = await res.json();
      if (!data.success) {
        setSectionSettings((prev) => ({ ...prev, [key]: !nextVal }));
      }
    } catch (err) {
      setSectionSettings((prev) => ({ ...prev, [key]: !nextVal }));
    } finally {
      setIsUpdatingSetting(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/stats");
      const data = await res.json();
      if (data.success && data.stats) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Failed to load dashboard stats", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Combine quotations and contact inquiries into latest 5 activities max
  const recentActivities = useMemo(() => {
    const quotes = (stats?.recentQuotations || []).map((q: any) => ({
      id: q.id,
      kind: "quote" as const,
      docType: q.doc_type || (q.fullName ? "INQUIRY" : "QUOTATION"),
      title: q.fullName || "Prospective Client",
      subtitle: q.companyName || "",
      status: q.status || "NEW",
      meta: `Product: ${q.productName || "General Production"} • MOQ: ${q.moqQuantity || "Flexible"}`,
      raw: q,
      date: new Date(q.createdAt).getTime(),
    }));

    const inqs = (stats?.recentInquiries || []).map((i: any) => ({
      id: i.id,
      kind: "inquiry" as const,
      docType: "INQUIRY",
      title: i.name || "Website Visitor",
      subtitle: i.email || "",
      status: i.status || "NEW",
      meta: (i.comment || "").replace(/<[^>]*>/g, ""),
      raw: i,
      date: new Date(i.createdAt).getTime(),
    }));

    return [...quotes, ...inqs]
      .sort((a, b) => b.date - a.date)
      .slice(0, 5);
  }, [stats]);

  useEffect(() => {
    fetchStats();
    fetchSettings();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A2540]">
      {/* Top Navbar */}
      <AdminNavbar title="Dashboard" subtitle="Overview" />

      {/* Main Content Area */}
      <div className="w-full px-6 sm:px-8 py-6 space-y-6">
        {/* =================================================================
            1. HERO CONTROL DASHBOARD BANNER (MATCHES REFERENCE SCREENSHOT)
            ================================================================= */}
        <div className="relative rounded-[4px] overflow-hidden bg-gradient-to-r from-[#061730] via-[#0A2540] to-[#0052CC] p-7 sm:p-9 text-white shadow-lg border border-white/10">
          {/* Subtle Ambient Decorative Circles */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-1/4 -top-10 w-48 h-48 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="inline-block px-2.5 py-1 rounded-[4px] bg-white/15 text-[10.5px] font-mono font-bold uppercase tracking-wider text-blue-200 border border-white/20">
              Control Dashboard
            </span>

            <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-white leading-tight">
              Welcome to Texpart Admin
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal max-w-2xl">
              Manage your corporate web presentation, client portfolio, products, hero banners, and quotation inquiries with instant live synchronization.
            </p>

            {/* Quick Action Buttons inside Hero Banner */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[4px] bg-white text-[#0066CC] font-heading text-xs font-bold hover:bg-blue-50 transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Product</span>
              </Link>

              <Link
                href="/hero-banners"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[4px] bg-white/15 hover:bg-white/25 text-white font-heading text-xs font-bold border border-white/20 transition-colors backdrop-blur-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Upload Hero Slide</span>
              </Link>

              <Link
                href="/quotations"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[4px] bg-white/15 hover:bg-white/25 text-white font-heading text-xs font-bold border border-white/20 transition-colors backdrop-blur-xs"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Quotations</span>
              </Link>

              <Link
                href="/gallery"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[4px] bg-white/15 hover:bg-white/25 text-white font-heading text-xs font-bold border border-white/20 transition-colors backdrop-blur-xs"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Upload Media</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Storefront Section Visibility Controls (Global Toggle Bar) */}
        <div className="bg-white border border-slate-200 rounded-[4px] p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[4px] bg-blue-50 text-[#0066CC] flex items-center justify-center shrink-0 border border-blue-200">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-heading font-black text-[#0A2540] uppercase tracking-wider">
                Storefront Section Visibility
              </h3>
              <p className="text-[11px] text-slate-500">
                Instant toggles to show or hide global sections across Home and About pages.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {/* Toggle 1: We Are Certified By */}
            <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/80 rounded-[4px] px-3 py-1.5">
              <Award className="w-4 h-4 text-purple-600 shrink-0" />
              <div className="text-left">
                <span className="text-[11px] font-heading font-bold text-[#0A2540] block leading-tight">
                  We Are Certified By
                </span>
                <span className="text-[10px] text-slate-400 font-mono block leading-tight">
                  {sectionSettings.show_certifications_section ? "Visible" : "Hidden"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleToggleSetting("show_certifications_section")}
                disabled={isUpdatingSetting}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ml-1 ${
                  sectionSettings.show_certifications_section ? "bg-[#0066CC]" : "bg-slate-300"
                }`}
                title="Toggle Certifications Section Visibility"
                aria-label="Toggle Certifications Section"
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                    sectionSettings.show_certifications_section ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Toggle 2: Our Clients */}
            <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/80 rounded-[4px] px-3 py-1.5">
              <Users className="w-4 h-4 text-indigo-600 shrink-0" />
              <div className="text-left">
                <span className="text-[11px] font-heading font-bold text-[#0A2540] block leading-tight">
                  Our Clients
                </span>
                <span className="text-[10px] text-slate-400 font-mono block leading-tight">
                  {sectionSettings.show_clients_section ? "Visible" : "Hidden"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleToggleSetting("show_clients_section")}
                disabled={isUpdatingSetting}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ml-1 ${
                  sectionSettings.show_clients_section ? "bg-[#0066CC]" : "bg-slate-300"
                }`}
                title="Toggle Clients Section Visibility"
                aria-label="Toggle Clients Section"
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                    sectionSettings.show_clients_section ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* =================================================================
            2. STAT KPI CARDS (6 CARDS ROW MATCHING SCREENSHOT)
            ================================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {/* Card 1: Products */}
          <Link
            href="/products"
            className="bg-white p-4 rounded-[4px] border border-slate-200 shadow-xs hover:border-[#0066CC] transition-all group"
          >
            <div className="w-9 h-9 rounded-[4px] bg-blue-50 text-[#0066CC] flex items-center justify-center mb-3">
              <Package className="w-4 h-4" />
            </div>
            <div className="text-2xl font-heading font-black text-[#0A2540] group-hover:text-[#0066CC] transition-colors">
              {isLoading ? "..." : stats?.totalProducts ?? 0}
            </div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">
              Products &amp; Items
            </div>
          </Link>

          {/* Card 2: Client Partners */}
          <Link
            href="/partners"
            className="bg-white p-4 rounded-[4px] border border-slate-200 shadow-xs hover:border-[#0066CC] transition-all group"
          >
            <div className="w-9 h-9 rounded-[4px] bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <Users className="w-4 h-4" />
            </div>
            <div className="text-2xl font-heading font-black text-[#0A2540] group-hover:text-indigo-600 transition-colors">
              {isLoading ? "..." : stats?.clientPartnersCount ?? 0}
            </div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">
              Client Partners
            </div>
          </Link>

          {/* Card 3: Certifications */}
          <Link
            href="/certifications"
            className="bg-white p-4 rounded-[4px] border border-slate-200 shadow-xs hover:border-[#0066CC] transition-all group"
          >
            <div className="w-9 h-9 rounded-[4px] bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <Award className="w-4 h-4" />
            </div>
            <div className="text-2xl font-heading font-black text-[#0A2540] group-hover:text-purple-600 transition-colors">
              {isLoading ? "..." : stats?.certificationsCount ?? 0}
            </div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">
              Certifications
            </div>
          </Link>

          {/* Card 4: Hero Slides */}
          <Link
            href="/hero-banners"
            className="bg-white p-4 rounded-[4px] border border-slate-200 shadow-xs hover:border-[#0066CC] transition-all group"
          >
            <div className="w-9 h-9 rounded-[4px] bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div className="text-2xl font-heading font-black text-[#0A2540] group-hover:text-emerald-600 transition-colors">
              {isLoading ? "..." : stats?.heroSlidesCount ?? 0}
            </div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">
              Hero Slides
            </div>
          </Link>

          {/* Card 5: Gallery Media */}
          <Link
            href="/gallery"
            className="bg-white p-4 rounded-[4px] border border-slate-200 shadow-xs hover:border-[#0066CC] transition-all group"
          >
            <div className="w-9 h-9 rounded-[4px] bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div className="text-2xl font-heading font-black text-[#0A2540] group-hover:text-amber-600 transition-colors">
              {isLoading ? "..." : stats?.galleryMediaCount ?? 0}
            </div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">
              Media Assets
            </div>
          </Link>

          {/* Card 6: Customer Leads / Quotes */}
          <Link
            href="/quotations"
            className="bg-white p-4 rounded-[4px] border border-slate-200 shadow-xs hover:border-[#0066CC] transition-all group relative"
          >
            {stats?.newQuotationsCount ? (
              <span className="absolute top-3 right-3 text-[10px] font-mono px-1.5 py-0.5 rounded-[4px] bg-rose-50 text-rose-600 border border-rose-200 font-bold">
                {stats.newQuotationsCount} new
              </span>
            ) : null}
            <div className="w-9 h-9 rounded-[4px] bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
              <FileText className="w-4 h-4" />
            </div>
            <div className="text-2xl font-heading font-black text-[#0A2540] group-hover:text-rose-600 transition-colors">
              {isLoading ? "..." : (stats?.quotationsCount ?? 0) + (stats?.inquiriesCount ?? 0)}
            </div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">
              Quotations &amp; Leads
            </div>
          </Link>
        </div>

        {/* =================================================================
            3. TWO-COLUMN SPLIT (MATCHES DEMO SCREENSHOT)
               Left: Recent Customer Inquiries
               Right: Active Hero Slides
            ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Recent Customer Inquiries (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-[4px] border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#0066CC]" />
                <h2 className="font-heading font-bold text-sm text-[#0A2540]">
                  Recent Customer Inquiries &amp; Quotations
                </h2>
              </div>
              <Link
                href="/quotations"
                className="text-xs font-semibold text-[#0066CC] hover:text-[#0052CC] flex items-center gap-1 group"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Inquiries & Quotes List (Latest 5 Max) */}
            {isLoading ? (
              <div className="py-8 text-center text-xs text-slate-400">Loading inquiries...</div>
            ) : recentActivities.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                No inquiries or quote requests received yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentActivities.map((item) => {
                  const detailUrl =
                    item.kind === "inquiry"
                      ? `/inquiries/${item.id}`
                      : item.docType === "INQUIRY"
                      ? `/quotations/incoming/${item.id}`
                      : `/quotations/${item.id}/print`;

                  return (
                    <div
                      key={`${item.kind}-${item.id}`}
                      className="py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50/80 px-2 -mx-2 rounded-[4px] transition-colors group"
                    >
                      <Link href={detailUrl} className="min-w-0 space-y-1 flex-1 block">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-heading font-bold text-xs text-[#0A2540] group-hover:text-[#0066CC] transition-colors">
                            {item.title}
                          </span>
                          <span
                            className={`text-[9.5px] font-mono uppercase font-bold px-1.5 py-0.5 rounded-[4px] ${
                              item.status === "NEW"
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : item.status === "IN_PROGRESS"
                                ? "bg-blue-50 text-blue-700 border border-blue-200"
                                : item.status === "ACCEPTED" || item.status === "QUOTED"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-slate-50 text-slate-700 border border-slate-200"
                            }`}
                          >
                            {item.status}
                          </span>
                          {item.subtitle && (
                            <span className="text-[10px] text-slate-400 font-mono">
                              {item.subtitle}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 truncate max-w-md">
                          {item.meta}
                        </p>
                      </Link>

                      <Link
                        href={detailUrl}
                        className="px-3 py-1.5 rounded-[4px] bg-slate-50 hover:bg-[#0066CC] hover:text-white border border-slate-200 text-xs font-semibold text-slate-700 transition-colors flex-shrink-0"
                      >
                        Details
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Active Hero Slides (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-[4px] border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                <h2 className="font-heading font-bold text-sm text-[#0A2540]">
                  Active Hero Slides
                </h2>
              </div>
              <Link
                href="/hero-banners"
                className="text-xs font-semibold text-[#0066CC] hover:text-[#0052CC] flex items-center gap-1 group"
              >
                <span>Manage Slides</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Hero Slides List */}
            {isLoading ? (
              <div className="py-8 text-center text-xs text-slate-400">Loading slides...</div>
            ) : (!stats?.activeHeroSlides || stats.activeHeroSlides.length === 0) ? (
              <div className="py-12 text-center text-xs text-slate-400">
                No hero slides uploaded.
              </div>
            ) : (
              <div className="space-y-3">
                {stats.activeHeroSlides.map((slide, idx) => (
                  <div
                    key={slide.id || idx}
                    className="p-2.5 rounded-[4px] border border-slate-100 hover:border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-16 h-10 rounded-[4px] overflow-hidden bg-slate-200 flex-shrink-0 border border-slate-200">
                        <Image
                          src={slide.imageUrl}
                          alt={slide.title || "Slide"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-heading font-bold text-xs text-[#0A2540] truncate">
                          {slide.title || `Hero Slide #${slide.order || idx + 1}`}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono block">
                          Order #{slide.order || idx + 1} &bull; {slide.linkUrl}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 flex-shrink-0">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
