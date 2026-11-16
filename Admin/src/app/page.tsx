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
} from "lucide-react";
import { DashboardStats, ProductItem } from "@/types";
import ProductFormModal from "@/components/ProductFormModal";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDivision, setModalDivision] = useState<"private-jobs" | "commercial-jobs">("private-jobs");
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/stats");
      const data = await res.json();
      if (data.success) {
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
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#0066CC] font-bold">
            Administration &amp; Control
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-black uppercase text-[#0A2540] tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time management for Texpart garment accessories, commercial print catalog &amp; partner brands.
          </p>
        </div>

        {/* Quick Add CTA Buttons */}
        <div className="flex flex-wrap items-center gap-2">
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

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Products */}
        <div className="bg-white p-5 rounded-[4px] border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider block">
              Total Products
            </span>
            <span className="text-3xl font-heading font-black text-[#0A2540] mt-1 block">
              {isLoading ? "..." : stats?.totalProducts || 0}
            </span>
            <span className="text-[11px] text-emerald-600 font-mono mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Live in Catalog
            </span>
          </div>
          <div className="w-12 h-12 rounded-[4px] bg-blue-50 text-[#0066CC] flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Home Page Featured Products (Max 5 per division) */}
        <div className="bg-white p-5 rounded-[4px] border border-amber-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider block">
              Home Featured
            </span>
            <span className="text-3xl font-heading font-black text-amber-600 mt-1 block">
              {isLoading ? "..." : `${stats?.featuredCount ?? 0} / 10`}
            </span>
            <span className="text-[11px] text-amber-700 font-mono mt-1 flex items-center gap-1">
              ★ Max 5 per division
            </span>
          </div>
          <div className="w-12 h-12 rounded-[4px] bg-amber-50 text-amber-600 flex items-center justify-center">
            <Star className="w-6 h-6 fill-amber-500 text-amber-500" />
          </div>
        </div>

        {/* Privet Jobs */}
        <Link
          href="/products/private-jobs"
          className="group bg-white p-5 rounded-[4px] border border-slate-200 hover:border-[#0066CC] shadow-sm flex items-center justify-between transition-all"
        >
          <div>
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider block">
              Privet Jobs
            </span>
            <span className="text-3xl font-heading font-black text-[#0066CC] mt-1 block">
              {isLoading ? "..." : stats?.privateJobsCount || 0}
            </span>
            <span className="text-[11px] text-slate-500 mt-1 flex items-center gap-1 group-hover:text-[#0066CC]">
              Apparel Accessories &rarr;
            </span>
          </div>
          <div className="w-12 h-12 rounded-[4px] bg-sky-50 text-sky-600 flex items-center justify-center">
            <Shirt className="w-6 h-6" />
          </div>
        </Link>

        {/* Commercial Jobs */}
        <Link
          href="/products/commercial-jobs"
          className="group bg-white p-5 rounded-[4px] border border-slate-200 hover:border-[#0066CC] shadow-sm flex items-center justify-between transition-all"
        >
          <div>
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider block">
              Commercial Jobs
            </span>
            <span className="text-3xl font-heading font-black text-[#0A2540] mt-1 block">
              {isLoading ? "..." : stats?.commercialJobsCount || 0}
            </span>
            <span className="text-[11px] text-slate-500 mt-1 flex items-center gap-1 group-hover:text-[#0066CC]">
              Printing &amp; Promotion &rarr;
            </span>
          </div>
          <div className="w-12 h-12 rounded-[4px] bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Printer className="w-6 h-6" />
          </div>
        </Link>

        {/* Our Clients */}
        <Link
          href="/partners"
          className="group bg-white p-5 rounded-[4px] border border-slate-200 hover:border-[#0066CC] shadow-sm flex items-center justify-between transition-all"
        >
          <div>
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider block">
              Our Clients
            </span>
            <span className="text-3xl font-heading font-black text-emerald-700 mt-1 block">
              {isLoading ? "..." : stats?.partnersCount || 0}
            </span>
            <span className="text-[11px] text-slate-500 mt-1 flex items-center gap-1 group-hover:text-[#0066CC]">
              Brand Partners &rarr;
            </span>
          </div>
          <div className="w-12 h-12 rounded-[4px] bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </Link>
      </div>

      {/* Cloudinary Integration Status Bar */}
      <div className="bg-gradient-to-r from-[#061730] to-[#0A2540] text-white p-5 rounded-[4px] shadow-sm border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-[4px] bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30 flex-shrink-0">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-heading font-bold text-white uppercase tracking-wider">
                Cloudinary Storage Engine Active
              </h3>
              <span className="px-2 py-0.5 rounded-[3px] bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Connected
              </span>
            </div>
            <p className="text-xs text-slate-300 font-light mt-0.5">
              Secure Cloud Engine &bull; Product photos &amp; partner logos upload securely with signed REST uploads.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/products/private-jobs"
            className="text-xs font-heading font-bold text-blue-400 hover:text-white px-3 py-1.5 bg-white/10 rounded-[4px] hover:bg-white/20 transition-all inline-flex items-center gap-1"
          >
            <span>Manage Products</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
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
              Latest items synchronized across Private and Commercial job divisions.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/products/private-jobs"
              className="text-xs font-heading font-bold text-[#0066CC] hover:underline"
            >
              View All &rarr;
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-heading uppercase text-[11px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Division</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    Loading catalog records...
                  </td>
                </tr>
              ) : !stats?.recentProducts || stats.recentProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    No products added yet. Click &ldquo;Add Product&rdquo; above to start.
                  </td>
                </tr>
              ) : (
                stats.recentProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Front Image & Name */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-[3px] overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
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
                          <strong className="text-xs font-bold text-[#0A2540] block">
                            {prod.name}
                          </strong>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {prod.images?.length || 1} image(s)
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

                    {/* Slug */}
                    <td className="px-4 py-3 text-slate-500 font-mono text-[11px]">
                      /{prod.slug}
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
