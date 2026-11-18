"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Inbox,
  Search,
  Filter,
  Eye,
  Trash2,
  Mail,
  Phone,
  Building,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Plus,
  Loader2,
  Package,
} from "lucide-react";
import AdminNavbar from "@/components/AdminNavbar";
import AdminPagination from "@/components/AdminPagination";
import { format } from "@/lib/date";

export default function IncomingQuotationsPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedStatus !== "ALL") params.append("status", selectedStatus);
      if (searchQuery.trim()) params.append("search", searchQuery.trim());
      params.append("doc_type", "INQUIRY");

      const res = await fetch(`/api/quotations?${params.toString()}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setInquiries(data.data);
      }
    } catch (err) {
      console.error("Failed to load incoming quotations", err);
    } finally {
      setIsLoading(false);
    }
  };

  const isInitialSearchMount = useRef(true);

  useEffect(() => {
    fetchInquiries();
    setCurrentPage(1);
  }, [selectedStatus]);

  useEffect(() => {
    if (isInitialSearchMount.current) {
      isInitialSearchMount.current = false;
      return;
    }
    const timer = setTimeout(() => {
      fetchInquiries();
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const stats = useMemo(() => {
    const total = inquiries.length;
    const newCount = inquiries.filter((q) => q.status === "NEW").length;
    const inProgressCount = inquiries.filter((q) => q.status === "IN_PROGRESS").length;
    const quotedCount = inquiries.filter((q) => q.status === "QUOTED" || q.status === "ACCEPTED").length;
    return { total, newCount, inProgressCount, quotedCount };
  }, [inquiries]);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return inquiries.slice(start, start + PAGE_SIZE);
  }, [inquiries, currentPage]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this quotation inquiry?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/quotations/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) => prev.filter((item) => item.id !== id && item._id !== id));
        window.dispatchEvent(new Event("texpart_stats_updated"));
      } else {
        alert(data.error || "Failed to delete");
      }
    } catch {
      alert("Network error deleting inquiry");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminNavbar title="Incoming Quotations" subtitle="Storefront Client Inquiries & Requests" />

      <div className="w-full px-6 sm:px-8 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-heading font-black text-[#0A2540] tracking-tight flex items-center gap-2.5">
              <Inbox className="w-6 h-6 text-[#0066CC]" />
              <span>Incoming Quotations</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Review and process custom quotation requests submitted by clients via the storefront.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/quotations/create"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0066CC] hover:bg-blue-700 text-white text-xs font-heading font-bold rounded-[4px] shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Official Quotation</span>
            </Link>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-[4px] p-4 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-heading font-bold text-slate-400 uppercase tracking-wider block">
                Total Inquiries
              </span>
              <span className="text-2xl font-heading font-black text-[#0A2540] mt-1 block">
                {stats.total}
              </span>
            </div>
            <div className="w-10 h-10 rounded-[4px] bg-blue-50 text-[#0066CC] flex items-center justify-center">
              <Inbox className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[4px] p-4 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-heading font-bold text-slate-400 uppercase tracking-wider block">
                New Requests
              </span>
              <span className="text-2xl font-heading font-black text-rose-600 mt-1 block">
                {stats.newCount}
              </span>
            </div>
            <div className="w-10 h-10 rounded-[4px] bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[4px] p-4 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-heading font-bold text-slate-400 uppercase tracking-wider block">
                In Review
              </span>
              <span className="text-2xl font-heading font-black text-amber-600 mt-1 block">
                {stats.inProgressCount}
              </span>
            </div>
            <div className="w-10 h-10 rounded-[4px] bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[4px] p-4 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-heading font-bold text-slate-400 uppercase tracking-wider block">
                Quoted / Converted
              </span>
              <span className="text-2xl font-heading font-black text-emerald-600 mt-1 block">
                {stats.quotedCount}
              </span>
            </div>
            <div className="w-10 h-10 rounded-[4px] bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white border border-slate-200 rounded-[4px] shadow-xs">
          <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by client name, organization, product, email, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-[4px] border border-slate-200 focus:outline-none focus:border-[#0066CC] font-medium"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-semibold text-slate-500">Status:</span>
              <div className="flex items-center gap-1">
                {(["ALL", "NEW", "IN_PROGRESS", "QUOTED", "CLOSED"] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setSelectedStatus(st)}
                    className={`px-2.5 py-1 text-[11px] font-heading font-bold rounded-[4px] transition-colors cursor-pointer ${
                      selectedStatus === st
                        ? "bg-[#0066CC] text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {st === "ALL" ? "All" : st.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-500 font-heading font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Client &amp; Organization</th>
                  <th className="py-3 px-4">Contact Info</th>
                  <th className="py-3 px-4">Target Product / Subject</th>
                  <th className="py-3 px-4">MOQ</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#0066CC] mb-2" />
                      Loading incoming quotations...
                    </td>
                  </tr>
                ) : paginatedItems.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      <Inbox className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="font-semibold text-slate-600 text-sm">No quotation requests found</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Client requests submitted via the storefront will appear here.
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedItems.map((item) => (
                    <tr
                      key={item.id || item._id}
                      onClick={() => router.push(`/quotations/incoming/${item.id || item._id}`)}
                      className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#0A2540] text-[13px] group-hover:text-[#0066CC] transition-colors">
                          {item.fullName || item.client_name || "Prospective Client"}
                        </div>
                        {(item.companyName || item.organization_name) && (
                          <div className="text-slate-500 text-[11px] flex items-center gap-1 mt-0.5">
                            <Building className="w-3 h-3 text-slate-400" />
                            <span>{item.companyName || item.organization_name}</span>
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-slate-600">
                        {item.email && (
                          <div className="flex items-center gap-1.5 text-[11.5px]">
                            <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{item.email}</span>
                          </div>
                        )}
                        {item.phone && (
                          <div className="flex items-center gap-1.5 text-[11.5px] mt-0.5">
                            <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{item.phone}</span>
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 font-medium text-slate-800">
                        <div className="flex items-center gap-1.5">
                          <Package className="w-3.5 h-3.5 text-[#0066CC] shrink-0" />
                          <span className="truncate max-w-[220px]">
                            {item.productName || item.subject || "Custom Packaging Order"}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 font-mono text-[11.5px]">
                        {item.moqQuantity || "Flexible"}
                      </td>

                      <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{format(new Date(item.quote_date || item.createdAt), "dd MMM, yyyy")}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[4px] text-[10.5px] font-heading font-bold uppercase tracking-wider ${
                            item.status === "NEW"
                              ? "bg-rose-50 text-rose-700 border border-rose-200"
                              : item.status === "IN_PROGRESS"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : item.status === "QUOTED" || item.status === "ACCEPTED"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
                          }`}
                        >
                          {item.status === "NEW" && (
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                          )}
                          {item.status || "NEW"}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/quotations/incoming/${item.id || item._id}`}
                            className="p-1.5 rounded-[4px] text-[#0066CC] hover:bg-blue-50 transition-colors"
                            title="View Full Inquiry Details"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={(e) => handleDelete(item.id || item._id, e)}
                            disabled={deletingId === (item.id || item._id)}
                            className="p-1.5 rounded-[4px] text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete Inquiry"
                          >
                            {deletingId === (item.id || item._id) ? (
                              <Loader2 className="w-4 h-4 animate-spin text-rose-600" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-slate-100">
            <AdminPagination
              currentPage={currentPage}
              totalPages={Math.ceil(inquiries.length / PAGE_SIZE) || 1}
              totalItems={inquiries.length}
              pageSize={PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
