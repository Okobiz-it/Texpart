"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  MessageSquare,
  User,
  Building,
  Mail,
  Phone,
  Calendar,
  Save,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  Loader2,
  Send,
} from "lucide-react";
import AdminNavbar from "@/components/AdminNavbar";
import RichTextContent from "@/components/RichTextContent";
import { format } from "@/lib/date";

export default function ContactMessageDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [message, setMessage] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Workflow states
  const [status, setStatus] = useState<"NEW" | "IN_PROGRESS" | "RESOLVED">("NEW");
  const [adminNotes, setAdminNotes] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchMessage = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/contact/${id}`);
        const data = await res.json();
        if (data.success && data.data) {
          const item = data.data;
          setMessage(item);
          setStatus(item.status || "IN_PROGRESS");
          setAdminNotes(item.adminNotes || "");
          window.dispatchEvent(new Event("texpart_stats_updated"));
        } else {
          setError(data.error || "Contact message not found");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load contact message");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessage();
  }, [id]);

  const handleSaveWorkflow = async () => {
    if (!id) return;
    setIsUpdating(true);
    setSaveSuccess(false);
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          adminNotes: adminNotes.trim(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSaveSuccess(true);
        window.dispatchEvent(new Event("texpart_stats_updated"));
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        alert(data.error || "Failed to update contact message");
      }
    } catch {
      alert("Network error updating message");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to permanently delete this contact message?")) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        window.dispatchEvent(new Event("texpart_stats_updated"));
        router.push("/inquiries");
      } else {
        alert(data.error || "Failed to delete");
        setIsDeleting(false);
      }
    } catch {
      alert("Network error deleting contact message");
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <AdminNavbar title="Contact Message" subtitle="Loading..." />
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-[#0066CC] mb-3" />
          <p className="text-sm font-semibold text-slate-600">Loading message details...</p>
        </div>
      </div>
    );
  }

  if (error || !message) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <AdminNavbar title="Contact Message" subtitle="Error" />
        <div className="max-w-2xl mx-auto py-16 px-4 text-center">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
          <h2 className="text-xl font-heading font-bold text-slate-800">Message Not Found</h2>
          <p className="text-xs text-slate-500 mt-1 mb-6">{error || "The requested message does not exist."}</p>
          <Link
            href="/inquiries"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0066CC] text-white text-xs font-heading font-bold rounded-[4px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Contact Messages</span>
          </Link>
        </div>
      </div>
    );
  }

  const senderName = message.name || "Anonymous Sender";
  const senderEmail = message.email || "";
  const senderPhone = message.phone || "";
  const senderCompany = message.companyName || "";

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminNavbar title="Contact Message" subtitle={`Message from ${senderName}`} />

      <div className="w-full px-6 sm:px-8 py-6 space-y-6">
        {/* Top Breadcrumb & Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Link
                href="/inquiries"
                className="hover:text-[#0066CC] flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Contact Messages</span>
              </Link>
              <span>/</span>
              <span className="text-[#0A2540]">Message Details</span>
            </div>

            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-heading font-black text-[#0A2540] tracking-tight">
                {senderName}
              </h1>
              {senderCompany && (
                <span className="px-2.5 py-0.5 rounded-[4px] bg-blue-50 text-[#0066CC] font-heading font-bold text-xs border border-blue-100">
                  {senderCompany}
                </span>
              )}
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[4px] text-[10.5px] font-heading font-bold uppercase tracking-wider ${
                  status === "NEW"
                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                    : status === "IN_PROGRESS"
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                }`}
              >
                {status.replace("_", " ")}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            {senderEmail && (
              <a
                href={`mailto:${senderEmail}?subject=Re: Inquiring about Texpart Design & Packaging Solutions`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0066CC] hover:bg-blue-700 text-white text-xs font-heading font-bold rounded-[4px] shadow-xs transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Reply via Email</span>
              </a>
            )}

            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-200 bg-white hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-heading font-bold rounded-[4px] shadow-xs transition-colors cursor-pointer"
              title="Delete this message"
            >
              {isDeleting ? (
                <Loader2 className="w-4 h-4 animate-spin text-rose-600" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              <span>Delete</span>
            </button>
          </div>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Left Column (2 Cols): Sender Info & Message Body */}
          <div className="lg:col-span-2 space-y-6">
            {/* 1. Sender Information Card */}
            <div className="bg-white border border-slate-200 rounded-[4px] shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-[4px] bg-blue-50 text-[#0066CC] flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-heading font-bold text-[#0A2540]">
                      Sender Information
                    </h3>
                    <p className="text-[11px] text-slate-400">Communication &amp; contact channels</p>
                  </div>
                </div>

                <div className="text-right text-xs text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    Received: {format(new Date(message.createdAt || new Date()), "dd MMMM, yyyy 'at' hh:mm a")}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1 bg-slate-50/70 p-3 rounded-[4px] border border-slate-100">
                  <span className="text-[10.5px] font-heading font-bold uppercase tracking-wider text-slate-400 block">
                    Sender Name
                  </span>
                  <span className="font-bold text-[#0A2540] text-sm block">
                    {senderName}
                  </span>
                </div>

                <div className="space-y-1 bg-slate-50/70 p-3 rounded-[4px] border border-slate-100">
                  <span className="text-[10.5px] font-heading font-bold uppercase tracking-wider text-slate-400 block">
                    Company / Organization
                  </span>
                  <span className="font-bold text-slate-700 text-sm block">
                    {senderCompany || "Not specified"}
                  </span>
                </div>

                <div className="space-y-1 bg-slate-50/70 p-3 rounded-[4px] border border-slate-100">
                  <span className="text-[10.5px] font-heading font-bold uppercase tracking-wider text-slate-400 block">
                    Email Address
                  </span>
                  {senderEmail ? (
                    <a
                      href={`mailto:${senderEmail}`}
                      className="font-semibold text-[#0066CC] hover:underline flex items-center gap-1.5 text-sm"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{senderEmail}</span>
                    </a>
                  ) : (
                    <span className="text-slate-400">Not provided</span>
                  )}
                </div>

                <div className="space-y-1 bg-slate-50/70 p-3 rounded-[4px] border border-slate-100">
                  <span className="text-[10.5px] font-heading font-bold uppercase tracking-wider text-slate-400 block">
                    Phone Number
                  </span>
                  {senderPhone ? (
                    <div className="flex items-center gap-3">
                      <a
                        href={`tel:${senderPhone}`}
                        className="font-semibold text-slate-800 hover:text-[#0066CC] flex items-center gap-1.5 text-sm"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{senderPhone}</span>
                      </a>
                      <a
                        href={`https://wa.me/${senderPhone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] font-bold px-2 py-0.5 rounded-[4px] bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                      >
                        WhatsApp
                      </a>
                    </div>
                  ) : (
                    <span className="text-slate-400">Not provided</span>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Message Body Card */}
            <div className="bg-white border border-slate-200 rounded-[4px] shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-[4px] bg-blue-50 text-[#0066CC] flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-heading font-bold text-[#0A2540]">
                      Message Content
                    </h3>
                    <p className="text-[11px] text-slate-400">Inquiry message submitted from website</p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-[4px] bg-slate-50 border border-slate-200 text-[13px] text-slate-800 font-sans">
                <RichTextContent
                  content={message.comment || message.message}
                  fallbackText="No message content."
                />
              </div>
            </div>
          </div>

          {/* Right Column (1 Col): Admin Workflow & Internal Notes */}
          <div className="space-y-6">
            {/* Status Management Card */}
            <div className="bg-white border border-slate-200 rounded-[4px] shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#0066CC]" />
                  <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540]">
                    Message Status
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-heading font-bold text-slate-700 block">
                  Resolution Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full h-9 px-3 text-xs rounded-[4px] border border-slate-200 focus:outline-none focus:border-[#0066CC] bg-white font-medium text-slate-700"
                >
                  <option value="NEW">New (Unread/Action Pending)</option>
                  <option value="IN_PROGRESS">In Progress (Replied/Investigating)</option>
                  <option value="RESOLVED">Resolved (Completed)</option>
                </select>
                <p className="text-[11px] text-slate-400">
                  Mark as Resolved once customer support has completed the inquiry.
                </p>
              </div>

              {/* Admin Internal Notes */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-heading font-bold text-slate-700">
                    Internal Admin Notes
                  </label>
                  <span className="text-[10px] text-slate-400">Private</span>
                </div>
                <textarea
                  rows={4}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Record customer support follow-up notes, phone discussions, or internal tasks..."
                  className="w-full p-2.5 text-xs rounded-[4px] border border-slate-200 focus:outline-none focus:border-[#0066CC] font-sans resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                {saveSuccess ? (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Changes Saved!
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400">Auto-timestamps on save</span>
                )}

                <button
                  type="button"
                  onClick={handleSaveWorkflow}
                  disabled={isUpdating}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0066CC] hover:bg-blue-700 text-white text-xs font-heading font-bold rounded-[4px] shadow-xs transition-colors cursor-pointer"
                >
                  {isUpdating ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Save className="w-3 h-3" />
                  )}
                  <span>Save Status</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
