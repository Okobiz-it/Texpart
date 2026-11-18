"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  Search,
  Plus,
  Printer,
  Edit,
  Trash2,
  Building,
  Calendar,
  Clock,
  TrendingUp,
  Loader2,
  Inbox,
  CheckCircle2,
} from "lucide-react";
import AdminNavbar from "@/components/AdminNavbar";
import AdminPagination from "@/components/AdminPagination";
import { format } from "@/lib/date";

export default function QuotationsPage() {
  const router = useRouter();
  const [quotations, setQuotations] = useState<any[]>([]);
  const [nextRefNo, setNextRefNo] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchQuotations = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.append("search", searchQuery.trim());
      params.append("doc_type", "QUOTATION");

      const res = await fetch(`/api/quotations?${params.toString()}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setQuotations(data.data);
        if (data.nextRefNo) setNextRefNo(data.nextRefNo);
      }
    } catch (err) {
      console.error("Failed to load quotations", err);
    } finally {
      setIsLoading(false);
    }
  };

  const isInitialSearchMount = useRef(true);

  useEffect(() => {
    fetchQuotations();
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    if (isInitialSearchMount.current) {
      isInitialSearchMount.current = false;
      return;
    }
    const timer = setTimeout(() => {
      fetchQuotations();
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const stats = useMemo(() => {
    const total = quotations.length;
    const totalValue = quotations.reduce((acc, q) => acc + (Number(q.grand_total) || 0), 0);
    return { total, totalValue };
  }, [quotations]);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return quotations.slice(start, start + PAGE_SIZE);
  }, [quotations, currentPage]);

  const handleDeleteQuotation = async (id: string, refNo: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm(`Are you sure you want to permanently delete quotation ${refNo}?`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/quotations/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setQuotations((prev) => prev.filter((q) => q.id !== id && q._id !== id));
        window.dispatchEvent(new Event("texpart_stats_updated"));
      } else {
        alert(data.error || "Failed to delete quotation");
      }
    } catch {
      alert("Network error while deleting");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminNavbar title="Quotation Management" subtitle="Official Corporate Documents" />

      <div className="w-full px-6 sm:px-8 py-6 space-y-6">
        {/* Sleek Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-heading font-black text-[#0A2540] tracking-tight flex items-center gap-2.5">
              <FileText className="w-6 h-6 text-[#0066CC]" />
              <span>Manage Quotations</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              All official generated quotations saved in the system, ready for printing and PDF export.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/quotations/incoming"
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-heading font-bold rounded-[4px] shadow-xs transition-colors cursor-pointer"
            >
              <Inbox className="w-4 h-4 text-[#0066CC]" />
              <span>Incoming Requests</span>
            </Link>

            <Link
              href="/quotations/create"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0066CC] hover:bg-blue-700 text-white text-xs font-heading font-bold rounded-[4px] shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Quotation</span>
            </Link>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-[4px] p-4 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-heading font-bold text-slate-400 uppercase tracking-wider block">
                Total Quotations
              </span>
              <span className="text-2xl font-heading font-black text-[#0A2540] mt-1 block">
                {stats.total}
              </span>
            </div>
            <div className="w-10 h-10 rounded-[4px] bg-blue-50 text-[#0066CC] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[4px] p-4 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-heading font-bold text-slate-400 uppercase tracking-wider block">
                Next Ref Number
              </span>
              <span className="text-xs font-mono font-bold text-[#0066CC] mt-2 block bg-blue-50 px-2 py-1 rounded-[4px] border border-blue-100">
                {nextRefNo || "texpart/quote/..."}
              </span>
            </div>
            <div className="w-10 h-10 rounded-[4px] bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[4px] p-4 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-heading font-bold text-slate-400 uppercase tracking-wider block">
                Total Invoiced Value
              </span>
              <span className="text-xl font-heading font-black text-emerald-600 mt-1 block">
                ৳ {stats.totalValue.toLocaleString("en-IN")}/-
              </span>
            </div>
            <div className="w-10 h-10 rounded-[4px] bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Search & Content Card */}
        <div className="bg-white border border-slate-200 rounded-[4px] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-slate-200 gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by Ref No, client name, organization, subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-[4px] border border-slate-200 focus:outline-none focus:border-[#0066CC] font-medium"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-500 font-heading font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Ref No. &amp; Date</th>
                  <th className="py-3 px-4">Client &amp; Organization</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4 text-right">Grand Total (BDT)</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#0066CC] mb-2" />
                      Loading quotations...
                    </td>
                  </tr>
                ) : paginatedItems.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">
                      <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="font-semibold text-slate-600 text-sm">No quotations found</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Create your first quotation with the button above.
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedItems.map((q) => (
                    <tr
                      key={q.id || q._id}
                      className="hover:bg-blue-50/40 transition-colors group"
                    >
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-[#0066CC] block text-[12px]">
                          {q.ref_no}
                        </span>
                        <span className="text-slate-400 text-[11px] flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(q.quote_date || q.createdAt), "dd MMM, yyyy")}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#0A2540] text-[13px]">
                          {q.client_name || "Official Client"}
                        </div>
                        {q.organization_name && (
                          <div className="text-slate-500 text-[11px] flex items-center gap-1 mt-0.5">
                            <Building className="w-3 h-3 text-slate-400" />
                            <span>{q.organization_name}</span>
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-slate-700 max-w-xs font-medium">
                        <span className="truncate block">{q.subject}</span>
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono font-bold text-[#0A2540] text-[13px]">
                        ৳ {Number(q.grand_total || 0).toLocaleString("en-IN")}/-
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/quotations/${q.id || q._id}/print`}
                            className="p-1.5 rounded-[4px] text-slate-600 hover:text-[#0066CC] hover:bg-blue-50 transition-colors"
                            title="Print on Official Letterhead Pad"
                          >
                            <Printer className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/quotations/${q.id || q._id}/edit`}
                            className="p-1.5 rounded-[4px] text-slate-600 hover:text-[#0066CC] hover:bg-blue-50 transition-colors"
                            title="Edit Quotation"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={(e) => handleDeleteQuotation(q.id || q._id, q.ref_no, e)}
                            disabled={deletingId === (q.id || q._id)}
                            className="p-1.5 rounded-[4px] text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete Quotation"
                          >
                            {deletingId === (q.id || q._id) ? (
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
              totalPages={Math.ceil(quotations.length / PAGE_SIZE) || 1}
              totalItems={quotations.length}
              pageSize={PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
