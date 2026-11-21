"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Inbox,
  User,
  Building,
  Mail,
  Phone,
  Calendar,
  Package,
  Layers,
  FileText,
  Save,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  Loader2,
  MessageSquare,
} from "lucide-react";
import AdminNavbar from "@/components/AdminNavbar";
import { format } from "@/lib/date";

export default function IncomingQuotationDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [inquiry, setInquiry] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Workflow states
  const [status, setStatus] = useState("NEW");
  const [adminNotes, setAdminNotes] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchInquiry = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/quotations/${id}`);
        const data = await res.json();
        if (data.success && data.data) {
          const item = data.data;
          setInquiry(item);
          setStatus(item.status || "IN_PROGRESS");
          setAdminNotes(item.adminNotes || "");
          window.dispatchEvent(new Event("texpart_stats_updated"));
        } else {
          setError(data.error || "Quotation inquiry not found");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load quotation inquiry");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInquiry();
  }, [id]);

  const handleSaveWorkflow = async () => {
    if (!id) return;
    setIsUpdating(true);
    setSaveSuccess(false);
    try {
      const res = await fetch(`/api/quotations/${id}`, {
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
        alert(data.error || "Failed to update inquiry");
      }
    } catch {
      alert("Network error updating inquiry");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to permanently delete this quotation inquiry?")) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/quotations/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        window.dispatchEvent(new Event("texpart_stats_updated"));
        router.push("/quotations/incoming");
      } else {
        alert(data.error || "Failed to delete");
        setIsDeleting(false);
      }
    } catch {
      alert("Network error deleting inquiry");
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <AdminNavbar title="Incoming Quotation" subtitle="Loading..." />
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-[#0066CC] mb-3" />
          <p className="text-sm font-semibold text-slate-600">Loading inquiry details...</p>
        </div>
      </div>
    );
  }

  if (error || !inquiry) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <AdminNavbar title="Incoming Quotation" subtitle="Error" />
        <div className="max-w-2xl mx-auto py-16 px-4 text-center">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
          <h2 className="text-xl font-heading font-bold text-slate-800">Inquiry Not Found</h2>
          <p className="text-xs text-slate-500 mt-1 mb-6">{error || "The requested inquiry does not exist."}</p>
          <Link
            href="/quotations/incoming"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0066CC] text-white text-xs font-heading font-bold rounded-[4px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Incoming Quotations</span>
          </Link>
        </div>
      </div>
    );
  }

  // Pre-fill query params for official quotation builder
  const clientName = inquiry.fullName || inquiry.client_name || "";
  const companyName = inquiry.companyName || inquiry.organization_name || "";
  const clientPhone = inquiry.phone || "";
  const clientEmail = inquiry.email || "";
  const targetSubject = inquiry.productName
    ? `Quotation for ${inquiry.productName}`
    : inquiry.subject || "Quotation for Garment Packaging & Apparel Development Solutions";

  const createQuoteUrl = `/quotations/create?name=${encodeURIComponent(clientName)}&org=${encodeURIComponent(companyName)}&phone=${encodeURIComponent(clientPhone)}&email=${encodeURIComponent(clientEmail)}&subject=${encodeURIComponent(targetSubject)}`;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminNavbar title="Incoming Quotation" subtitle={`Inquiry #${id.slice(-6)}`} />

      <div className="w-full px-6 sm:px-8 py-6 space-y-6">
        {/* Top Breadcrumb & Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Link
                href="/quotations/incoming"
                className="hover:text-[#0066CC] flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Incoming Quotations</span>
              </Link>
              <span>/</span>
              <span className="text-[#0A2540]">Inquiry Details</span>
            </div>

            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-heading font-black text-[#0A2540] tracking-tight">
                {clientName || "Prospective Client"}
              </h1>
              {companyName && (
                <span className="px-2.5 py-0.5 rounded-[4px] bg-blue-50 text-[#0066CC] font-heading font-bold text-xs border border-blue-100">
                  {companyName}
                </span>
              )}
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[4px] text-[10.5px] font-heading font-bold uppercase tracking-wider ${
                  status === "NEW"
                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                    : status === "IN_PROGRESS"
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : status === "QUOTED" || status === "ACCEPTED"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-slate-100 text-slate-600 border border-slate-200"
                }`}
              >
                {status}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            <Link
              href={createQuoteUrl}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0066CC] hover:bg-blue-700 text-white text-xs font-heading font-bold rounded-[4px] shadow-xs transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Create Official Quotation</span>
            </Link>

            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-200 bg-white hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-heading font-bold rounded-[4px] shadow-xs transition-colors cursor-pointer"
              title="Delete this inquiry"
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
          {/* Main Left Column (2 Cols): Client Profile & Requirements */}
          <div className="lg:col-span-2 space-y-6">
            {/* 1. Client Profile Card */}
            <div className="bg-white border border-slate-200 rounded-[4px] shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-[4px] bg-blue-50 text-[#0066CC] flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-heading font-bold text-[#0A2540]">
                      Client Contact Information
                    </h3>
                    <p className="text-[11px] text-slate-400">Personal &amp; organization details</p>
                  </div>
                </div>

                <div className="text-right text-xs text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    Received: {format(new Date(inquiry.createdAt || inquiry.quote_date), "dd MMMM, yyyy 'at' hh:mm a")}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1 bg-slate-50/70 p-3 rounded-[4px] border border-slate-100">
                  <span className="text-[10.5px] font-heading font-bold uppercase tracking-wider text-slate-400 block">
                    Full Name
                  </span>
                  <span className="font-bold text-[#0A2540] text-sm block">
                    {clientName || "N/A"}
                  </span>
                </div>

                <div className="space-y-1 bg-slate-50/70 p-3 rounded-[4px] border border-slate-100">
                  <span className="text-[10.5px] font-heading font-bold uppercase tracking-wider text-slate-400 block">
                    Organization / Factory
                  </span>
                  <span className="font-bold text-slate-700 text-sm block">
                    {companyName || "Independent Client"}
                  </span>
                </div>

                <div className="space-y-1 bg-slate-50/70 p-3 rounded-[4px] border border-slate-100">
                  <span className="text-[10.5px] font-heading font-bold uppercase tracking-wider text-slate-400 block">
                    Email Address
                  </span>
                  {clientEmail ? (
                    <a
                      href={`mailto:${clientEmail}`}
                      className="font-semibold text-[#0066CC] hover:underline flex items-center gap-1.5 text-sm"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{clientEmail}</span>
                    </a>
                  ) : (
                    <span className="text-slate-400">Not provided</span>
                  )}
                </div>

                <div className="space-y-1 bg-slate-50/70 p-3 rounded-[4px] border border-slate-100">
                  <span className="text-[10.5px] font-heading font-bold uppercase tracking-wider text-slate-400 block">
                    Phone / WhatsApp
                  </span>
                  {clientPhone ? (
                    <div className="flex items-center gap-3">
                      <a
                        href={`tel:${clientPhone}`}
                        className="font-semibold text-slate-800 hover:text-[#0066CC] flex items-center gap-1.5 text-sm"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{clientPhone}</span>
                      </a>
                      <a
                        href={`https://wa.me/${clientPhone.replace(/[^0-9]/g, "")}`}
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

                {inquiry.designation && (
                  <div className="space-y-1 bg-slate-50/70 p-3 rounded-[4px] border border-slate-100 sm:col-span-2">
                    <span className="text-[10.5px] font-heading font-bold uppercase tracking-wider text-slate-400 block">
                      Client Designation / Role
                    </span>
                    <span className="font-bold text-[#0A2540] text-sm block">
                      {inquiry.designation}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Order Scope & Technical Requirements */}
            <div className="bg-white border border-slate-200 rounded-[4px] shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-[4px] bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-heading font-bold text-[#0A2540]">
                      Packaging Requirements &amp; Specifications
                    </h3>
                    <p className="text-[11px] text-slate-400">Requested scope, materials, and quantity</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-[4px] bg-slate-50/70 border border-slate-100 space-y-1">
                  <span className="text-[10.5px] font-heading font-bold uppercase tracking-wider text-slate-400 block">
                    Product / Job Interest
                  </span>
                  <span className="font-heading font-bold text-[#0066CC] text-sm block">
                    {inquiry.productName || inquiry.subject || "Custom Garment Packaging Solution"}
                  </span>
                </div>

                <div className="p-3 rounded-[4px] bg-slate-50/70 border border-slate-100 space-y-1">
                  <span className="text-[10.5px] font-heading font-bold uppercase tracking-wider text-slate-400 block">
                    Minimum Order Quantity (MOQ)
                  </span>
                  <span className="font-mono font-bold text-slate-800 text-sm block">
                    {inquiry.moqQuantity || "Flexible / Not Specified"}
                  </span>
                </div>

                {inquiry.requiredDeliveryDate && (
                  <div className="p-3 rounded-[4px] bg-slate-50/70 border border-slate-100 space-y-1 sm:col-span-2">
                    <span className="text-[10.5px] font-heading font-bold uppercase tracking-wider text-slate-400 block">
                      Required Delivery Date
                    </span>
                    <span className="font-mono font-bold text-[#0A2540] text-sm block">
                      {inquiry.requiredDeliveryDate}
                    </span>
                  </div>
                )}
              </div>

              {/* Uploaded Artwork / Specification File */}
              {inquiry.artworkUrl && (
                <div className="p-4 rounded-[4px] bg-blue-50/60 border border-blue-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#0066CC] block">
                      Client Uploaded Artwork / Specification
                    </span>
                    <span className="text-[10.5px] text-slate-500 font-mono">
                      {inquiry.artworkName || "Specification Attachment"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={inquiry.artworkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0066CC] hover:bg-blue-700 text-white rounded-[4px] text-xs font-heading font-bold transition-colors shadow-xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open / Download Artwork</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Detailed Notes / Client Request Message */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-500 block">
                  Client Requirements &amp; Project Description
                </span>
                <div className="p-4 rounded-[4px] bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap font-sans">
                  {inquiry.noteContent || inquiry.comment || inquiry.additional_notes || (
                    <span className="text-slate-400 italic">No additional custom notes provided by the client.</span>
                  )}
                </div>
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
                    Inquiry Status
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-heading font-bold text-slate-700 block">
                  Workflow Stage
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full h-9 px-3 text-xs rounded-[4px] border border-slate-200 focus:outline-none focus:border-[#0066CC] bg-white font-medium text-slate-700"
                >
                  <option value="NEW">New (Unread/Action Pending)</option>
                  <option value="IN_PROGRESS">In Progress (Under Review)</option>
                  <option value="QUOTED">Quoted (Official Quotation Generated)</option>
                  <option value="ACCEPTED">Accepted / Approved</option>
                  <option value="CLOSED">Closed / Archived</option>
                </select>
                <p className="text-[11px] text-slate-400">
                  Update this status to keep your team aligned on client follow-up.
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
                  placeholder="Record internal pricing calculations, client conversations, or follow-up notes..."
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

            {/* Fast Handoff to Official Quotation Builder */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200 rounded-[4px] p-5 space-y-3">
              <div className="flex items-center text-[#0066CC]">
                <h4 className="text-xs font-heading font-bold uppercase tracking-wider">
                  Convert to Official Quote
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clicking below will pre-load <strong>{clientName}</strong>&apos;s contact information, organization, and requested product into the Quotation Builder on the official Texpart letterhead.
              </p>
              <Link
                href={createQuoteUrl}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#0066CC] hover:bg-[#0055b3] text-white text-xs font-heading font-bold rounded-[4px] shadow-xs transition-all"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Open Quotation Builder</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
