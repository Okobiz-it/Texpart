"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  Users,
  Shirt,
  Printer,
  Plus,
  ArrowRight,
  TrendingUp,
  Cloud,
  CheckCircle2,
  Trash2,
  Edit,
  ExternalLink,
  Star,
  Award,
  Database,
  Sparkles,
  Layers,
  Clock,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import { DashboardStats, ProductItem } from "@/types";
import ProductFormModal from "@/components/ProductFormModal";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDivision, setModalDivision] = useState<"private-jobs" | "commercial-jobs">("private-jobs");
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [currentDate, setCurrentDate] = useState("");

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/stats");
      const data = await res.json();
      if (data.success && data.stats) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Failed to load stats", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const now = new Date();
    setCurrentDate(
      now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    );
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchStats();
      }
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">
      {/* Top Header & Executive Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#0066CC] font-bold">
              Administration &amp; Control
            </span>
            <span className="text-slate-300">&bull;</span>
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {currentDate || "Live Session"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black uppercase text-[#0A2540] tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time management for Texpart garment accessories, commercial print catalog &amp; partner relationships.
          </p>
        </div>

        {/* Quick Add CTA Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              setModalDivision("private-jobs");
              setEditingProduct(null);
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-[#0066CC] hover:bg-[#0052CC] text-white text-xs font-heading font-bold uppercase rounded-[4px] inline-flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Privet Job</span>
          </button>

          <button
            onClick={() => {
              setModalDivision("commercial-jobs");
              setEditingProduct(null);
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-[#0A2540] hover:bg-[#061730] text-white text-xs font-heading font-bold uppercase rounded-[4px] inline-flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Commercial Job</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid (6 High-Impact Metric Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
        {/* 1. Total Products */}
        <div className="bg-white p-4 sm:p-5 rounded-[4px] border border-slate-200 shadow-sm flex flex-col justify-between space-y-3 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-500">
              Total Products
            </span>
            <div className="w-8 h-8 rounded-[4px] bg-blue-50 text-[#0066CC] flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-heading font-black text-[#0A2540]">
              {isLoading ? "..." : stats?.totalProducts ?? 0}
            </span>
            <span className="text-[10px] text-emerald-600 font-mono flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-2.5 h-2.5" /> Live in Atlas DB
            </span>
          </div>
        </div>

        {/* 2. Privet Jobs */}
        <Link
          href="/products/private-jobs"
          className="group bg-white p-4 sm:p-5 rounded-[4px] border border-slate-200 hover:border-[#0066CC] shadow-sm flex flex-col justify-between space-y-3 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-500">
              Privet Jobs
            </span>
            <div className="w-8 h-8 rounded-[4px] bg-sky-50 text-sky-600 flex items-center justify-center group-hover:bg-[#0066CC] group-hover:text-white transition-colors">
              <Shirt className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-heading font-black text-[#0066CC]">
              {isLoading ? "..." : stats?.privateJobsCount ?? 0}
            </span>
            <span className="text-[10px] text-slate-400 group-hover:text-[#0066CC] font-mono flex items-center gap-1 mt-0.5">
              Apparel Range &rarr;
            </span>
          </div>
        </Link>

        {/* 3. Commercial Jobs */}
        <Link
          href="/products/commercial-jobs"
          className="group bg-white p-4 sm:p-5 rounded-[4px] border border-slate-200 hover:border-[#0066CC] shadow-sm flex flex-col justify-between space-y-3 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-500">
              Commercial
            </span>
            <div className="w-8 h-8 rounded-[4px] bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-[#0A2540] group-hover:text-white transition-colors">
              <Printer className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-heading font-black text-[#0A2540]">
              {isLoading ? "..." : stats?.commercialJobsCount ?? 0}
            </span>
            <span className="text-[10px] text-slate-400 group-hover:text-[#0066CC] font-mono flex items-center gap-1 mt-0.5">
              Printing &amp; Pack &rarr;
            </span>
          </div>
        </Link>

        {/* 4. Home Featured */}
        <div className="bg-white p-4 sm:p-5 rounded-[4px] border border-amber-200 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-amber-800">
              Home Featured
            </span>
            <div className="w-8 h-8 rounded-[4px] bg-amber-50 text-amber-600 flex items-center justify-center">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-heading font-black text-amber-600">
              {isLoading ? "..." : `${stats?.featuredCount ?? 0} / 10`}
            </span>
            <span className="text-[10px] text-amber-700 font-mono block mt-0.5">
              Max 5 per division
            </span>
          </div>
        </div>

        {/* 5. Client Brands */}
        <Link
          href="/partners"
          className="group bg-white p-4 sm:p-5 rounded-[4px] border border-slate-200 hover:border-[#0066CC] shadow-sm flex flex-col justify-between space-y-3 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-500">
              Our Clients
            </span>
            <div className="w-8 h-8 rounded-[4px] bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-heading font-black text-emerald-700">
              {isLoading ? "..." : stats?.clientBrandsCount ?? stats?.partnersCount ?? 0}
            </span>
            <span className="text-[10px] text-slate-400 group-hover:text-emerald-700 font-mono flex items-center gap-1 mt-0.5">
              Global Brands &rarr;
            </span>
          </div>
        </Link>

        {/* 6. Certifications */}
        <Link
          href="/partners"
          className="group bg-white p-4 sm:p-5 rounded-[4px] border border-slate-200 hover:border-[#0066CC] shadow-sm flex flex-col justify-between space-y-3 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-500">
              Certified By
            </span>
            <div className="w-8 h-8 rounded-[4px] bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-heading font-black text-teal-700">
              {isLoading ? "..." : stats?.certificationsCount ?? 4}
            </span>
            <span className="text-[10px] text-slate-400 group-hover:text-teal-700 font-mono flex items-center gap-1 mt-0.5">
              Accreditations &rarr;
            </span>
          </div>
        </Link>
      </div>

      {/* Cloud & Database Health Bar */}
      <div className="bg-gradient-to-r from-[#061730] to-[#0A2540] text-white p-5 rounded-[4px] shadow-sm border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-[4px] bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30 flex-shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-heading font-bold text-white uppercase tracking-wider">
                System Infrastructure Synchronized
              </h3>
              <span className="px-2 py-0.5 rounded-[3px] bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> MongoDB + Cloudinary Active
              </span>
            </div>
            <p className="text-xs text-slate-300 font-light mt-0.5">
              Products, client logos and certifications are synced with live website endpoints and persistent Cloudinary media.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-heading font-bold text-white px-3.5 py-2 bg-white/10 hover:bg-[#0066CC] rounded-[4px] transition-all inline-flex items-center gap-1.5 shadow-sm"
          >
            <span>Preview Client Storefront</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Recent Products Table */}
      <div className="bg-white rounded-[4px] border border-slate-200 shadow-sm overflow-hidden space-y-3">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-heading font-bold uppercase text-[#0A2540]">
              Recent Catalog Entries
            </h2>
            <p className="text-xs text-slate-500">
              Latest items synchronized across Privet and Commercial job divisions.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/products/private-jobs"
              className="text-xs font-heading font-bold text-[#0066CC] hover:underline flex items-center gap-1"
            >
              <span>View All Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-heading uppercase text-[11px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Product Name &amp; Cover</th>
                <th className="px-4 py-3">Division</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Home Featured</th>
                <th className="px-4 py-3">URL Slug</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    Loading catalog records...
                  </td>
                </tr>
              ) : !stats?.recentProducts || stats.recentProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No products added yet. Click &ldquo;Add Privet Job&rdquo; above to start.
                  </td>
                </tr>
              ) : (
                stats.recentProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Front Image & Name */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-11 h-11 rounded-[3px] overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                          {prod.frontImage ? (
                            <Image
                              src={prod.frontImage}
                              alt={prod.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">
                              N/A
                            </div>
                          )}
                        </div>
                        <div>
                          <strong className="text-xs font-bold text-[#0A2540] block hover:text-[#0066CC] transition-colors">
                            {prod.name}
                          </strong>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {prod.images?.length || 1} image asset(s)
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Division */}
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-[3px] text-[10px] font-mono font-bold uppercase ${
                          prod.division === "private-jobs"
                            ? "bg-sky-50 text-sky-700 border border-sky-200"
                            : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                        }`}
                      >
                        {prod.division === "private-jobs" ? "Privet Jobs" : "Commercial Jobs"}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3 text-slate-600 font-medium">
                      {prod.category}
                    </td>

                    {/* Featured Status */}
                    <td className="px-4 py-3">
                      {prod.isFeatured ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-[3px] bg-amber-50 text-amber-800 border border-amber-200">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                          Featured (Max 5)
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-mono">&mdash; Standard</span>
                      )}
                    </td>

                    {/* Slug */}
                    <td className="px-4 py-3 text-slate-500 font-mono text-[11px]">
                      /products/{prod.slug}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProduct(prod);
                            setModalDivision(prod.division);
                            setIsModalOpen(true);
                          }}
                          className="p-1.5 text-slate-500 hover:text-[#0066CC] hover:bg-blue-50 rounded-[3px] transition-colors"
                          title="Edit Product"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(prod.id, prod.name)}
                          className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-[3px] transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Form Modal */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={fetchStats}
        initialDivision={modalDivision}
        editingProduct={editingProduct}
      />
    </div>
  );
}
