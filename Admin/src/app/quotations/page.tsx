"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Trash2,
  Mail,
  Phone,
  Building,
  ExternalLink,
  Loader2,
  Eye,
  X,
  AlertCircle,
  Save,
} from "lucide-react";
import AdminNavbar from "@/components/AdminNavbar";
import AdminPagination from "@/components/AdminPagination";
import { QuotationItem } from "@/types";

export default function QuotationsAdminPage() {
  const [quotations, setQuotations] = useState<QuotationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;
  const [activeItem, setActiveItem] = useState<QuotationItem | null>(null);

  // Modal edit state
  const [modalStatus, setModalStatus] = useState<"NEW" | "IN_PROGRESS" | "QUOTED" | "CLOSED">("NEW");
  const [modalAdminNotes, setModalAdminNotes] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMsg, setUpdateMsg] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchQuotations = async () => {
    setIsLoading(true);
    try {
      const url =
        selectedStatus === "ALL"
          ? "/api/quotations"
          : `/api/quotations?status=${selectedStatus}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setQuotations(data.data);
      }
    } catch (err) {
      console.error("Failed to load quotations", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, [selectedStatus]);

  const handleOpenDetails = async (item: QuotationItem) => {
    setActiveItem(item);
    setModalStatus(item.status === "NEW" ? "IN_PROGRESS" : item.status);
    setModalAdminNotes(item.adminNotes || "");
    setUpdateMsg("");

    // If quotation was NEW, viewing it automatically marks it as seen (IN_PROGRESS)
    if (item.status === "NEW") {
      setQuotations((prev) =>
        prev.map((q) => (q.id === item.id ? { ...q, status: "IN_PROGRESS" } : q))
      );
      try {
        await fetch(`/api/quotations/${item.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "IN_PROGRESS" }),
        });
        window.dispatchEvent(new Event("texpart_stats_updated"));
      } catch (err) {
        console.error("Failed to auto-mark quotation as seen", err);
      }
    }
  };

  const handleSaveModal = async () => {
    if (!activeItem) return;
    setIsUpdating(true);
    setUpdateMsg("");

    try {
      const res = await fetch(`/api/quotations/${activeItem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: modalStatus,
          adminNotes: modalAdminNotes.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update quotation");
      }

      setUpdateMsg("Status and internal notes saved successfully!");
      setQuotations((prev) =>
        prev.map((q) =>
          q.id === activeItem.id
            ? { ...q, status: modalStatus, adminNotes: modalAdminNotes }
            : q
        )
      );
      window.dispatchEvent(new Event("texpart_stats_updated"));
    } catch (err: any) {
      alert(err.message || "Failed to update quotation");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete quotation request from "${name}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/quotations/${id}`, { method: "DELETE" });
      if (res.ok) {
        setQuotations((prev) => prev.filter((q) => q.id !== id));
        if (activeItem?.id === id) setActiveItem(null);
        window.dispatchEvent(new Event("texpart_stats_updated"));
      } else {
        alert("Failed to delete quotation");
      }
    } catch (err) {
      alert("Failed to delete quotation");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = quotations.filter((q) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      q.fullName.toLowerCase().includes(query) ||
      q.companyName.toLowerCase().includes(query) ||
      q.email.toLowerCase().includes(query) ||
      q.phone.toLowerCase().includes(query) ||
      q.productName.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatus, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedQuotations = filtered.slice(
    (safeCurrentPage - 1) * PAGE_SIZE,
    safeCurrentPage * PAGE_SIZE
  );

  const newCount = quotations.filter((q) => q.status === "NEW").length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A2540]">
      <AdminNavbar title="Quotations" subtitle="Client Price & BOM Inquiries" />

      <div className="w-full px-6 sm:px-8 py-6 space-y-6">
        {/* Sleek, Uncluttered Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-heading font-black text-[#0A2540] tracking-tight">
                Quotation Requests
              </h1>
              {newCount > 0 ? (
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-[4px] bg-rose-50 text-rose-600 border border-rose-200">
                  {newCount} new
                </span>
              ) : (
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-[4px] bg-slate-100 text-slate-600">
                  {quotations.length} total
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage custom price estimates and Bill of Materials (BOM) inquiries from the website.
            </p>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-white p-4 rounded-[4px] border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {["ALL", "NEW", "IN_PROGRESS", "QUOTED", "CLOSED"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-[4px] transition-colors whitespace-nowrap ${
                  selectedStatus === st
                    ? "bg-[#0066CC] text-white shadow-xs"
                    : "bg-slate-50 text-slate-600 hover:text-[#0A2540] hover:bg-slate-100"
                }`}
              >
                {st === "ALL" ? "All Requests" : st.replace("_", " ")}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search buyer, company, email..."
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#0066CC]"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Quotations Table */}
        <div className="bg-white border border-slate-200 rounded-[4px] shadow-xs overflow-hidden">
          {isLoading ? (
            <div className="py-20 text-center text-xs text-slate-400">Loading quotations...</div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-xs text-slate-400">
              {searchQuery ? "No quotation inquiries match your search." : "No quotations found."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10.5px] font-heading font-bold uppercase tracking-wider text-slate-500">
                    <th className="px-4 py-3">Client / Company</th>
                    <th className="px-4 py-3">Product Requested</th>
                    <th className="px-4 py-3">MOQ Quantity</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {paginatedQuotations.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-blue-50/30 transition-colors group cursor-pointer"
                      onClick={() => handleOpenDetails(item)}
                    >
                      {/* Client / Company */}
                      <td className="px-4 py-3.5">
                        <div className="font-heading font-bold text-[#0A2540]">
                          {item.fullName}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <Building className="w-3 h-3 text-slate-400" />
                          <span>{item.companyName}</span>
                          <span className="text-slate-300">&bull;</span>
                          <span>{item.email}</span>
                        </div>
                      </td>

                      {/* Product Requested */}
                      <td className="px-4 py-3.5">
                        <span className="font-semibold text-[#0A2540]">{item.productName}</span>
                      </td>

                      {/* MOQ */}
                      <td className="px-4 py-3.5">
                        <span className="font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded-[4px] text-[11px]">
                          {item.moqQuantity}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3.5 text-slate-400 text-[11px] font-mono whitespace-nowrap">
                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span
                          className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-[4px] ${
                            item.status === "NEW"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : item.status === "IN_PROGRESS"
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : item.status === "QUOTED"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-slate-100 text-slate-500 border border-slate-200"
                          }`}
                        >
                          {item.status.replace("_", " ")}
                        </span>
                      </td>

                      {/* Actions */}
                      <td
                        className="px-4 py-3.5 text-right whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenDetails(item)}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-[#0066CC] hover:text-white rounded-[4px] text-xs font-semibold text-slate-700 transition-colors"
                          >
                            Details
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id, item.fullName)}
                            disabled={deletingId === item.id}
                            className="p-1 text-slate-400 hover:text-red-600 rounded-[4px] hover:bg-red-50 transition-colors"
                            title="Delete this quote"
                          >
                            {deletingId === item.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-red-600" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <AdminPagination
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            totalItems={filtered.length}
            pageSize={PAGE_SIZE}
            onPageChange={setCurrentPage}
            itemLabel="quotations"
          />
        </div>
      </div>

      {/* =================================================================
          DRAWER / MODAL: QUOTATION FULL SPECIFICATIONS & STATUS
          ================================================================= */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-[4px] shadow-2xl border border-slate-200 max-w-2xl w-full p-6 space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0066CC]">
                  Quotation Details &mdash; ID: {activeItem.id.slice(-6)}
                </span>
                <h3 className="text-lg font-heading font-black text-[#0A2540]">
                  {activeItem.fullName} &bull; {activeItem.companyName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-[4px]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {updateMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-[4px] text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{updateMsg}</span>
              </div>
            )}

            {/* Quick Coordinates Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-[4px] border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">
                  Email
                </span>
                <a
                  href={`mailto:${activeItem.email}`}
                  className="font-medium text-[#0066CC] hover:underline truncate block"
                >
                  {activeItem.email}
                </a>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-[4px] border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">
                  Phone
                </span>
                <a
                  href={`tel:${activeItem.phone}`}
                  className="font-medium text-[#0066CC] hover:underline truncate block"
                >
                  {activeItem.phone}
                </a>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-[4px] border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">
                  Requested Item
                </span>
                <span className="font-bold text-[#0A2540] truncate block">
                  {activeItem.productName}
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-[4px] border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">
                  MOQ
                </span>
                <span className="font-bold text-[#0A2540] truncate block">
                  {activeItem.moqQuantity}
                </span>
              </div>
            </div>

            {/* Technical Instructions & Rich Text Notes */}
            <div className="space-y-1">
              <span className="text-[10.5px] font-heading font-bold uppercase text-slate-500 block">
                Technical Instructions &amp; Specifications:
              </span>
              <div
                className="p-3 bg-slate-50/70 rounded-[4px] border border-slate-200 text-xs leading-relaxed max-h-56 overflow-y-auto [&_blockquote]:border-l-4 [&_blockquote]:border-[#0066CC] [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:my-2 [&_blockquote]:bg-white [&_blockquote]:py-1 [&_ol]:list-decimal [&_ol]:ml-5 [&_ul]:list-disc [&_ul]:ml-5"
                dangerouslySetInnerHTML={{
                  __html: activeItem.noteContent || "<em>No additional specifications entered.</em>",
                }}
              />
            </div>

            {/* Status Change & Admin Internal Notes */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                    Order Status
                  </label>
                  <select
                    value={modalStatus}
                    onChange={(e) => setModalStatus(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#0066CC] bg-white"
                  >
                    <option value="NEW">NEW &mdash; Awaiting Review</option>
                    <option value="IN_PROGRESS">IN_PROGRESS &mdash; Calculating BOM</option>
                    <option value="QUOTED">QUOTED &mdash; Sent to Customer</option>
                    <option value="CLOSED">CLOSED &mdash; Finished / Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                    Internal Merchandiser Note
                  </label>
                  <input
                    type="text"
                    value={modalAdminNotes}
                    onChange={(e) => setModalAdminNotes(e.target.value)}
                    placeholder="e.g. Sent pricing USD 0.12/pc on Nov 17"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#0066CC]"
                  />
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 flex items-center justify-between border-t border-slate-200">
              <a
                href={`mailto:${activeItem.email}?subject=Quote%20Estimate%20for%20${encodeURIComponent(
                  activeItem.productName
                )}%20-%20Texpart%20Garment%20Accessories&body=Dear%20${encodeURIComponent(
                  activeItem.fullName
                )},%0D%0A%0D%0AThank%20you%20for%20your%20interest%20in%20Texpart%20Garment%20Accessories.%20Here%20is%20the%20estimate%20for%20${encodeURIComponent(
                  activeItem.productName
                )}%20(Quantity:%20${encodeURIComponent(activeItem.moqQuantity)}):%0D%0A%0D%0A`}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-[4px] flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#0066CC]" />
                <span>Send Email to Buyer</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-[4px]"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleSaveModal}
                  disabled={isUpdating}
                  className="px-4 py-2 bg-[#0066CC] hover:bg-[#0052CC] text-white text-xs font-bold rounded-[4px] flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  {isUpdating ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  <span>Save Status</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
