"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Award,
  UploadCloud,
  Plus,
  Trash2,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Search,
  ShieldCheck,
} from "lucide-react";
import AdminNavbar from "@/components/AdminNavbar";
import { PartnerItem } from "@/types";

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<PartnerItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Form State
  const [certName, setCertName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const fetchCertifications = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/partners?category=certification");
      const data = await res.json();
      if (data.success && Array.isArray(data.partners)) {
        setCertifications(data.partners);
      }
    } catch (err) {
      console.error("Failed to load certifications", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFormError(null);
    }
  };

  const handleCreateCertification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setFormError("Please select an accreditation badge file to upload");
      return;
    }

    setIsUploading(true);
    setFormError(null);
    setFormSuccess(null);

    let logoUrl = "";

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("folder", "texpart/certifications");

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok || !uploadData.success) {
        throw new Error(uploadData.error || "Failed to upload image to Cloudinary");
      }
      logoUrl = uploadData.url;

      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: certName.trim(),
          logoUrl,
          category: "certification",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save certification");
      }

      setFormSuccess(`Certification badge registered successfully!`);
      setCertName("");
      setSelectedFile(null);
      setPreviewUrl(null);

      fetchCertifications();
    } catch (err: any) {
      setFormError(err.message || "An error occurred");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteCertification = async (id: string, name?: string) => {
    if (
      !confirm(
        `Are you sure you want to delete ${
          name ? `"${name}"` : "this certification"
        }? It will immediately be removed from "We Are Certified By" on the website.`
      )
    ) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/partners/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCertifications((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete certification badge");
      }
    } catch (err) {
      alert("Failed to delete certification badge");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredCerts = certifications.filter((p) => {
    if (!searchQuery.trim()) return true;
    return (p.name || "").toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A2540]">
      <AdminNavbar title="Certifications" subtitle="We Are Certified By" />

      <div className="w-full px-6 sm:px-8 py-6 space-y-6">
        {/* Sleek, Uncluttered Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-heading font-black text-[#0A2540] tracking-tight">
                Certifications &amp; Accreditations
              </h1>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-[4px] bg-purple-50 text-purple-700 border border-purple-200">
                {certifications.length} registered
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage official accreditation standards (OEKO-TEX, FSC, RCS) displayed on the website.
            </p>
          </div>
        </div>

        {/* 2-Column Layout: Left = Upload Form (4 cols), Right = Badges Grid (8 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* UPLOAD FORM (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-[4px] p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-[#0A2540] flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-purple-600" />
                <span>Upload New Certification</span>
              </h3>
            </div>

            {formSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-[4px] text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                <span>{formSuccess}</span>
              </div>
            )}

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-[4px] text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateCertification} className="space-y-4">
              {/* File Upload Drop Area */}
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1.5">
                  Certification Badge Image <span className="text-purple-600">*</span>
                </label>
                <div className="border-2 border-dashed border-slate-200 hover:border-purple-600 rounded-[4px] p-4 text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-purple-50/20 relative group">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />
                  {previewUrl ? (
                    <div className="space-y-2">
                      <div className="relative w-36 h-20 mx-auto bg-white p-2 border border-slate-200 rounded-[4px] shadow-xs">
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <span className="text-[11px] text-purple-600 font-semibold block">
                        Click or drag to change image
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-2 py-2">
                      <div className="w-9 h-9 rounded-[4px] bg-purple-50 text-purple-600 flex items-center justify-center mx-auto shadow-xs">
                        <UploadCloud className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-[#0A2540] block">
                          Click to select badge file
                        </span>
                        <span className="text-[10.5px] text-slate-400 block mt-0.5">
                          PNG or high-res vector recommended
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Certification Name */}
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                  Certification / Standard Name
                </label>
                <input
                  type="text"
                  value={certName}
                  onChange={(e) => setCertName(e.target.value)}
                  placeholder="e.g. OEKO-TEX Standard 100, FSC Certified"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-[4px] focus:outline-none focus:border-purple-600"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isUploading}
                className="w-full py-2.5 rounded-[4px] bg-purple-600 hover:bg-purple-700 text-white font-heading text-xs font-bold uppercase tracking-wider shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Uploading &amp; Saving...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Certification</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* REGISTERED CERTIFICATION BADGES (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-[4px] p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-600" />
                <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-[#0A2540]">
                  Registered Certifications ({filteredCerts.length})
                </h3>
              </div>

              {/* Search input */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search certifications..."
                  className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-[4px] focus:outline-none focus:border-purple-600 w-48 sm:w-56"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {isLoading ? (
              <div className="py-16 text-center text-xs text-slate-400">Loading certifications...</div>
            ) : filteredCerts.length === 0 ? (
              <div className="py-16 text-center text-xs text-slate-400">
                {searchQuery ? "No certifications match your search." : "No certifications registered yet."}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                {filteredCerts.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-white border border-slate-200 rounded-[4px] hover:border-slate-300 hover:shadow-xs transition-all group relative flex flex-col justify-between"
                  >
                    <div className="relative w-full h-20 bg-slate-50/60 rounded-[4px] p-2 flex items-center justify-center">
                      <Image
                        src={item.logoUrl}
                        alt={item.name || "Certification Badge"}
                        fill
                        className="object-contain p-2"
                      />
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="font-heading font-bold text-xs text-[#0A2540] truncate max-w-[110px]">
                        {item.name || "Accreditation"}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleDeleteCertification(item.id, item.name)}
                        disabled={deletingId === item.id}
                        className="p-1 text-slate-400 hover:text-red-600 rounded-[4px] hover:bg-red-50 transition-colors"
                        title="Delete this certification"
                      >
                        {deletingId === item.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-red-600" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
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
