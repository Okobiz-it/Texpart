"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Users,
  Award,
  UploadCloud,
  Plus,
  Trash2,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { PartnerItem } from "@/types";

type TabType = "all" | "client" | "certification";

export default function PartnersPage() {
  const [partners, setPartners] = useState<PartnerItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Form State
  const [partnerName, setPartnerName] = useState("");
  const [category, setCategory] = useState<"client" | "certification">("client");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [manualLogoUrl, setManualLogoUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const fetchPartners = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/partners");
      const data = await res.json();
      if (data.success && Array.isArray(data.partners)) {
        setPartners(data.partners);
      }
    } catch (err) {
      console.error("Failed to load partners/certifications", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  // Sync category in form when tab changes
  useEffect(() => {
    if (activeTab === "client") setCategory("client");
    if (activeTab === "certification") setCategory("certification");
  }, [activeTab]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFormError(null);
    }
  };

  const handleCreatePartner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile && !manualLogoUrl.trim()) {
      setFormError("Please select a logo image or provide a direct image URL");
      return;
    }

    setIsUploading(true);
    setFormError(null);
    setFormSuccess(null);

    let logoUrl = manualLogoUrl.trim();

    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("folder", "texpart/partners");

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok || !uploadData.success) {
          throw new Error(uploadData.error || "Failed to upload logo to Cloudinary");
        }
        logoUrl = uploadData.url;
      }

      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: partnerName.trim(),
          logoUrl,
          category,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save record to database");
      }

      setFormSuccess(
        category === "certification"
          ? "Certification logo successfully published to 'We Are Certified By'!"
          : "Client logo successfully published to 'Our Clients'!"
      );
      setPartnerName("");
      setSelectedFile(null);
      setPreviewUrl(null);
      setManualLogoUrl("");

      setTimeout(() => setFormSuccess(null), 4000);
      fetchPartners();
    } catch (err: any) {
      setFormError(err.message || "Failed to save partner/certification");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string, name?: string) => {
    const label = name ? `"${name}"` : "this logo";
    if (!confirm(`Are you sure you want to permanently delete ${label}?`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/partners/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        fetchPartners();
      } else {
        alert(data.error || "Failed to delete record");
      }
    } catch (err) {
      alert("Error connecting to server");
    } finally {
      setDeletingId(null);
    }
  };

  // Counts
  const clientCount = partners.filter((p) => p.category === "client").length;
  const certCount = partners.filter((p) => p.category === "certification").length;

  // Filtered by tab and search
  const filteredPartners = partners.filter((p) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "client" && p.category === "client") ||
      (activeTab === "certification" && p.category === "certification");

    const matchesSearch =
      !searchQuery.trim() ||
      (p.name && p.name.toLowerCase().includes(searchQuery.toLowerCase().trim())) ||
      (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase().trim()));

    return matchesTab && matchesSearch;
  });

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#0066CC] font-bold">
            Relationships &amp; Governance
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-black uppercase text-[#0A2540] tracking-tight">
            Brands &amp; Certifications
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage partner brand logos for <strong>Our Clients</strong> and official accreditation badges for <strong>We Are Certified By</strong>.
          </p>
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-2.5">
          <div className="px-3 py-1.5 rounded-[4px] bg-blue-50 border border-blue-200 text-xs font-mono font-bold text-[#0066CC] flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            <span>{clientCount} Clients</span>
          </div>
          <div className="px-3 py-1.5 rounded-[4px] bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-emerald-700 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            <span>{certCount} Certifications</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Upload & Register Form */}
        <div className="lg:col-span-4 bg-white rounded-[4px] border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5 sticky top-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-heading font-black uppercase text-[#0A2540] flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#0066CC]" />
              <span>Register New Logo</span>
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Files are automatically stored in Cloudinary folder <code className="font-mono text-[#0066CC]">texpart/partners</code>
            </p>
          </div>

          {formSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-[4px] text-xs font-medium text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{formSuccess}</span>
            </div>
          )}

          {formError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-[4px] text-xs font-medium text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleCreatePartner} className="space-y-4">
            {/* Category Selector */}
            <div>
              <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Display Destination *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as "client" | "certification")}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] font-medium focus:bg-white focus:outline-none focus:border-[#0066CC] transition-colors cursor-pointer"
              >
                <option value="client">Client Brand &rarr; &ldquo;Our Clients&rdquo; Section</option>
                <option value="certification">Certification &rarr; &ldquo;We Are Certified By&rdquo; Section</option>
              </select>
              <span className="text-[10px] text-slate-400 mt-1 block">
                {category === "client"
                  ? "Renders in the 15-item brand grid under Our Clients on Home & About pages."
                  : "Renders in the We Are Certified By animated showcase & verification badges."}
              </span>
            </div>

            {/* Logo Image File Upload */}
            <div>
              <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Logo Image *
              </label>
              <label className="group relative border-2 border-dashed border-slate-300 hover:border-[#0066CC] rounded-[4px] p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-blue-50/30">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {previewUrl ? (
                  <div className="relative w-32 h-20 flex items-center justify-center">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="text-center py-2 space-y-1">
                    <UploadCloud className="w-7 h-7 text-slate-400 group-hover:text-[#0066CC] mx-auto transition-colors" />
                    <span className="text-xs font-heading font-bold text-slate-700 block">
                      Click to choose logo file
                    </span>
                    <span className="text-[10px] text-slate-400 block font-mono">
                      PNG with transparent background recommended
                    </span>
                  </div>
                )}
              </label>
            </div>

            {/* Manual Logo URL Fallback */}
            <div>
              <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Or Direct Image URL
              </label>
              <input
                type="text"
                value={manualLogoUrl}
                onChange={(e) => {
                  setManualLogoUrl(e.target.value);
                  if (e.target.value.trim()) setPreviewUrl(e.target.value.trim());
                }}
                placeholder="https://res.cloudinary.com/... or /images/..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] font-mono focus:bg-white focus:outline-none focus:border-[#0066CC] transition-colors"
              />
            </div>

            {/* Partner / Certification Name */}
            <div>
              <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Name / Label <span className="text-slate-400 font-normal lowercase">(optional reference)</span>
              </label>
              <input
                type="text"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                placeholder={category === "certification" ? "e.g. OEKO-TEX Standard 100" : "e.g. Kappa, FILA, Primark"}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isUploading}
              className="w-full py-2.5 px-4 bg-[#0066CC] hover:bg-[#0052CC] text-white text-xs font-heading font-bold uppercase rounded-[4px] shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Uploading to Cloudinary...</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Publish to {category === "certification" ? "Certifications" : "Client Brands"}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Registered Logos List */}
        <div className="lg:col-span-8 space-y-4">
          {/* Controls: Segmented Tabs & Search */}
          <div className="bg-white p-3.5 rounded-[4px] border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Segmented Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-[4px]">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1.5 rounded-[3px] text-xs font-heading font-bold transition-all ${
                  activeTab === "all"
                    ? "bg-white text-[#0066CC] shadow-sm"
                    : "text-slate-600 hover:text-[#0A2540]"
                }`}
              >
                All ({partners.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("client")}
                className={`px-3 py-1.5 rounded-[3px] text-xs font-heading font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === "client"
                    ? "bg-white text-[#0066CC] shadow-sm"
                    : "text-slate-600 hover:text-[#0A2540]"
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Client Brands ({clientCount})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("certification")}
                className={`px-3 py-1.5 rounded-[3px] text-xs font-heading font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === "certification"
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-slate-600 hover:text-[#0A2540]"
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Certifications ({certCount})</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search logos..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-colors"
              />
            </div>
          </div>

          {/* Grid of Logos */}
          <div className="bg-white rounded-[4px] border border-slate-200 shadow-sm p-4 sm:p-5">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
              <span>
                Showing <strong>{filteredPartners.length}</strong> of {partners.length} registered assets
              </span>
              <span className="text-[11px] text-slate-400">
                Click trash icon to permanently remove
              </span>
            </div>

            {isLoading ? (
              <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-[#0066CC]" />
                <span className="text-xs font-heading uppercase tracking-wider">
                  Loading assets from MongoDB...
                </span>
              </div>
            ) : filteredPartners.length === 0 ? (
              <div className="py-16 text-center space-y-2">
                <p className="font-heading font-bold text-slate-600 text-sm">
                  No logos found matching your filter
                </p>
                <p className="text-xs text-slate-400">
                  Select a different tab or register a new logo using the form on the left.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 sm:gap-4">
                {filteredPartners.map((p) => {
                  const isCert = p.category === "certification";
                  const isDeleting = deletingId === p.id;

                  return (
                    <div
                      key={p.id}
                      className="group relative bg-white border border-slate-200 hover:border-[#0066CC] rounded-[4px] p-3 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
                    >
                      {/* Logo Thumbnail */}
                      <div className="relative w-full aspect-[4/3] bg-slate-50/60 rounded-[3px] border border-slate-100 flex items-center justify-center p-2 mb-2 group-hover:bg-white transition-colors">
                        <Image
                          src={p.logoUrl}
                          alt={p.name || "Partner Logo"}
                          fill
                          className="object-contain p-1"
                        />
                      </div>

                      {/* Info & Category Badge */}
                      <div className="space-y-1">
                        <span
                          className={`inline-flex items-center gap-1 text-[9px] font-heading font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-[3px] ${
                            isCert
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-blue-50 text-[#0066CC] border border-blue-200"
                          }`}
                        >
                          {isCert ? (
                            <>
                              <Award className="w-2.5 h-2.5" />
                              <span>CERTIFICATION</span>
                            </>
                          ) : (
                            <>
                              <Users className="w-2.5 h-2.5" />
                              <span>CLIENT BRAND</span>
                            </>
                          )}
                        </span>

                        <p className="text-xs font-heading font-bold text-[#0A2540] truncate" title={p.name || "Unnamed Logo"}>
                          {p.name || "Unnamed Logo"}
                        </p>
                      </div>

                      {/* Action Bar */}
                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                        <a
                          href={p.logoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] text-slate-400 hover:text-[#0066CC] flex items-center gap-1 transition-colors"
                          title="Open original image"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>View</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => handleDelete(p.id, p.name)}
                          disabled={isDeleting}
                          className="p-1 rounded-[3px] text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete logo"
                          aria-label="Delete logo"
                        >
                          {isDeleting ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-600" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
