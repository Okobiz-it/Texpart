"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MessageSquare,
  Search,
  Filter,
  CheckCircle2,
  Trash2,
  Mail,
  Phone,
  Loader2,
  Eye,
} from "lucide-react";
import AdminNavbar from "@/components/AdminNavbar";
import AdminPagination from "@/components/AdminPagination";
import { ContactMessageItem } from "@/types";

export default function InquiriesAdminPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const url =
        selectedStatus === "ALL"
          ? "/api/contact"
          : `/api/contact?status=${selectedStatus}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setMessages(data.data);
      }
    } catch (err) {
      console.error("Failed to load contact messages", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedStatus]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete the inquiry from "${name}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        window.dispatchEvent(new Event("texpart_stats_updated"));
      } else {
        alert(data.error || "Failed to delete inquiry");
      }
    } catch (err) {
      console.error("Delete failed", err);
      alert("Network error while deleting");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredMessages = messages.filter((m) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.phone.toLowerCase().includes(q) ||
      m.comment.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filteredMessages.length / PAGE_SIZE) || 1;
  const paginatedMessages = filteredMessages.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminNavbar title="Contact Messages" subtitle="Public Inquiries" />

      <div className="w-full px-6 sm:px-8 py-6 space-y-6">
        {/* Metric / Status Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-[4px] border border-slate-200 shadow-xs">
            <span className="text-[11px] font-heading font-bold text-slate-400 uppercase tracking-wider block">
              Total Inquiries
            </span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-2xl font-heading font-black text-[#0A2540]">
                {messages.length}
              </span>
              <MessageSquare className="w-5 h-5 text-slate-300" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-[4px] border border-slate-200 shadow-xs">
            <span className="text-[11px] font-heading font-bold text-slate-400 uppercase tracking-wider block">
              New Messages
            </span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-2xl font-heading font-black text-amber-600">
                {messages.filter((m) => m.status === "NEW").length}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-[4px] border border-slate-200 shadow-xs">
            <span className="text-[11px] font-heading font-bold text-slate-400 uppercase tracking-wider block">
              Resolved Cases
            </span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-2xl font-heading font-black text-emerald-600">
                {messages.filter((m) => m.status === "RESOLVED").length}
              </span>
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white p-4 rounded-[4px] border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, email, phone, keyword..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#0066CC] font-medium"
            />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <Filter className="w-3.5 h-3.5 text-slate-400 mr-1" />
            {(["ALL", "NEW", "IN_PROGRESS", "RESOLVED"] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => {
                  setSelectedStatus(status);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-[4px] text-xs font-heading font-bold transition-colors cursor-pointer ${
                  selectedStatus === status
                    ? "bg-[#0066CC] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {status === "ALL" ? "All" : status.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="bg-white rounded-[4px] border border-slate-200 shadow-xs overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#0066CC] mb-2" />
              Loading messages...
            </div>
          ) : paginatedMessages.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <MessageSquare className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              <p className="font-semibold text-slate-600 text-sm">No contact messages found</p>
              <p className="text-xs text-slate-400 mt-0.5">
                Messages submitted via the contact page will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-heading font-bold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Sender Name</th>
                    <th className="px-4 py-3">Contact Coordinates</th>
                    <th className="px-4 py-3">Message Preview</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {paginatedMessages.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-blue-50/30 transition-colors group cursor-pointer"
                      onClick={() => router.push(`/inquiries/${item.id}`)}
                    >
                      {/* Sender Name */}
                      <td className="px-4 py-3.5">
                        <div className="font-heading font-bold text-[#0A2540] group-hover:text-[#0066CC] transition-colors">
                          {item.name}
                        </div>
                      </td>

                      {/* Coordinates */}
                      <td className="px-4 py-3.5">
                        <div className="space-y-0.5 text-[11px] text-slate-500">
                          <div className="flex items-center gap-1.5">
                            <Mail className="w-3 h-3 text-slate-400" />
                            <span>{item.email}</span>
                          </div>
                          <div className="flex items-center gap-1.5 font-mono">
                            <Phone className="w-3 h-3 text-slate-400" />
                            <span>{item.phone}</span>
                          </div>
                        </div>
                      </td>

                      {/* Message Preview */}
                      <td className="px-4 py-3.5 max-w-md">
                        <p className="text-slate-600 line-clamp-1">
                          {item.comment.replace(/<[^>]*>/g, "")}
                        </p>
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
                              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
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
                          <Link
                            href={`/inquiries/${item.id}`}
                            className="p-1.5 text-[#0066CC] hover:bg-blue-50 rounded-[4px] transition-colors"
                            title="View Message Details"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id, item.name)}
                            disabled={deletingId === item.id}
                            className="p-1 text-slate-400 hover:text-red-600 rounded-[4px] hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete this message"
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

          {/* Pagination */}
          <div className="p-4 border-t border-slate-100">
            <AdminPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredMessages.length}
              pageSize={PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
