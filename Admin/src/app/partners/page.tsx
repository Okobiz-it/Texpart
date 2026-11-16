"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Users,
  UploadCloud,
  Plus,
  Trash2,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { PartnerItem } from "@/types";

export default function PartnersPage() {
  const [partners, setPartners] = useState<PartnerItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form State
  const [partnerName, setPartnerName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [manualLogoUrl, setManualLogoUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const fetchPartners = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/partners");
      const data = await res.json();
      if (data.success) {
        setPartners(data.partners);
      }
    } catch (err) {
      console.error("Failed to load clients", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

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
      setFormError("Please select a client logo image or provide an image URL");
      return;
    }

    setIsUploading(true);
    setFormError(null);
    setFormSuccess(null);

    let logoUrl = manualLogoUrl.trim();

    try {
      // If file selected, upload to Cloudinary
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

      // Save Client Partner record (strictly category="client" for Our Clients section)
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: partnerName.trim(), // Optional, admin-only
          logoUrl,
          category: "client",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save client logo record");
      }

      setFormSuccess("Client logo uploaded and published to 'Our Clients' successfully!");
      setPartnerName("");
      setSelectedFile(null);
      setPreviewUrl(null);
      setManualLogoUrl("");
      fetchPartners();
    } catch (err: any) {
      setFormError(err.message || "An error occurred");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string, name?: string) => {
    const displayName = name || "this client logo";
    if (!confirm(`Are you sure you want to delete ${displayName}?`)) return;

    try {
      const res = await fetch(`/api/partners/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchPartners();
      }
    } catch (err) {
      alert("Failed to delete client logo");
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-5">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#0066CC] font-bold">
          Client Brands &bull; Our Clients Registry
        </span>
        <h1 className="text-2xl sm:text-3xl font-heading font-black uppercase text-[#0A2540] tracking-tight">
          Our Clients Management
        </h1>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-3xl">
          Logos uploaded here are displayed directly on the website exclusively under the{" "}
          <strong className="text-[#0A2540]">&ldquo;Our Clients&rdquo;</strong> section{" "}
          (<em>&ldquo;Trusted apparel accessories and packaging manufacturing partner for global fashion brands&rdquo;</em>).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Upload Client Form (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-[4px] border border-slate-200 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-heading font-black uppercase tracking-wider text-[#0A2540]">
              Upload New Client Logo
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Images are stored in Cloudinary folder <code className="text-blue-600 font-mono">texpart/partners</code>
            </p>
          </div>

          {formError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-[4px]">
              {formError}
            </div>
          )}

          {formSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-[4px] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{formSuccess}</span>
            </div>
          )}

          <form onSubmit={handleCreatePartner} className="space-y-4">
            {/* File Upload Box */}
            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1.5">
                Client Brand Logo Image <span className="text-[#0066CC]">*</span>
              </label>

              <div className="border-2 border-dashed border-slate-200 hover:border-[#0066CC] rounded-[4px] p-4 text-center bg-slate-50/50 transition-colors">
                <input
                  type="file"
                  id="client-file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <label htmlFor="client-file" className="cursor-pointer block">
                  {previewUrl ? (
                    <div className="space-y-2">
                      <div className="relative w-36 h-20 mx-auto bg-white border border-slate-200 rounded-[4px] p-2 flex items-center justify-center">
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <span className="text-[11px] font-heading font-bold text-[#0066CC] hover:underline block">
                        Change image
                      </span>
                    </div>
                  ) : (
                    <div className="py-2 space-y-1.5 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-[4px] bg-blue-50 text-[#0066CC] flex items-center justify-center border border-blue-100">
                        <UploadCloud className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-heading font-bold text-[#0A2540]">
                        Click to select logo file
                      </p>
                      <span className="text-[10px] text-slate-400">
                        PNG with transparent background recommended
                      </span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Optional Manual URL */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                Or Direct Image URL
              </label>
              <input
                type="url"
                value={manualLogoUrl}
                onChange={(e) => setManualLogoUrl(e.target.value)}
                placeholder="https://res.cloudinary.com/... or https://..."
                className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-[4px] text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC]"
              />
            </div>

            {/* Optional Client Brand Name [Only shown in admin] */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540]">
                  Client Brand Name
                </label>
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  [Optional &bull; Admin Only]
                </span>
              </div>
              <input
                type="text"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                placeholder="e.g. Kappa, FILA, Primark (internal reference only)"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC]"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                This name will only appear in this admin list to help your team identify logos.
              </p>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isUploading}
                className="w-full py-2.5 bg-[#0066CC] hover:bg-[#0052CC] text-white text-xs font-heading font-bold uppercase tracking-wider rounded-[4px] shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Uploading to Cloudinary...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Upload &amp; Add to Our Clients</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right: Existing Clients Grid (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-4 rounded-[4px] border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="text-sm font-heading font-bold uppercase text-[#0A2540]">
                Registered Client Logos ({partners.length})
              </h3>
              <p className="text-xs text-slate-500">
                Rendered on the live client website exclusively under &ldquo;Our Clients&rdquo;.
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-slate-400 bg-white border border-slate-200 rounded-[4px] flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 text-[#0066CC] animate-spin" />
              <span className="text-xs">Loading client logo records...</span>
            </div>
          ) : partners.length === 0 ? (
            <div className="p-12 text-center bg-white border border-slate-200 rounded-[4px] space-y-2">
              <p className="text-sm font-heading font-bold text-slate-600">
                No client logos registered yet
              </p>
              <p className="text-xs text-slate-400">
                Upload your first client brand logo using the form on the left.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="group bg-white border border-slate-200 hover:border-[#0066CC] rounded-[4px] p-3 shadow-sm flex flex-col justify-between transition-all"
                >
                  {/* Logo Display */}
                  <div className="relative aspect-[3/2] w-full bg-slate-50 rounded-[3px] border border-slate-100 p-2 flex items-center justify-center overflow-hidden">
                    <Image
                      src={partner.logoUrl}
                      alt={partner.name || "Client Logo"}
                      fill
                      className="object-contain p-2"
                      sizes="180px"
                    />
                  </div>

                  {/* Info & Admin Details */}
                  <div className="pt-2.5 mt-2 border-t border-slate-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-bold text-[#0A2540] truncate block" title={partner.name || "Untitled Logo"}>
                        {partner.name || <em className="text-slate-400 font-normal">Untitled Logo</em>}
                      </strong>
                      <span className="text-[9px] font-mono text-slate-400 uppercase bg-slate-100 px-1.5 py-0.5 rounded-[2px]">
                        Admin Only
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-[2px] font-semibold bg-blue-50 text-[#0066CC] border border-blue-200">
                        Our Clients
                      </span>

                      <button
                        type="button"
                        onClick={() => handleDelete(partner.id, partner.name)}
                        className="text-slate-400 hover:text-red-600 p-1 rounded-[3px] hover:bg-red-50 transition-colors"
                        title="Delete client logo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
