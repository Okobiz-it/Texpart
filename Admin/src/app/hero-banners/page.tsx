"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ImageIcon,
  UploadCloud,
  Plus,
  Trash2,
  Edit,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Eye,
  Check,
  X,
  ExternalLink,
} from "lucide-react";
import AdminNavbar from "@/components/AdminNavbar";
import { HeroBannerItem } from "@/types";

export default function HeroBannersPage() {
  const [banners, setBanners] = useState<HeroBannerItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form State
  const [editingBannerId, setEditingBannerId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("/services/private-jobs");
  const [order, setOrder] = useState(1);
  const [isActive, setIsActive] = useState(true);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const fetchBanners = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/hero-banners");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setBanners(data.data);
      }
    } catch (err) {
      console.error("Failed to load hero banners", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFormError(null);
    }
  };

  const handleStartEdit = (b: HeroBannerItem) => {
    setEditingBannerId(b.id);
    setTitle(b.title);
    setSubtitle(b.subtitle);
    setLinkUrl(b.linkUrl);
    setOrder(b.order);
    setIsActive(b.isActive);
    setPreviewUrl(b.imageUrl);
    setSelectedFile(null);
    setFormError(null);
    setFormSuccess(null);
  };

  const handleCancelEdit = () => {
    setEditingBannerId(null);
    setTitle("");
    setSubtitle("");
    setLinkUrl("/services/private-jobs");
    setOrder(banners.length + 1);
    setIsActive(true);
    setPreviewUrl(null);
    setSelectedFile(null);
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewUrl && !selectedFile) {
      setFormError("Banner image is required");
      return;
    }

    setIsSubmitting(true);
    setFormError(null);
    setFormSuccess(null);

    let imageUrl = previewUrl || "";

    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("folder", "texpart/banners");

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok || !uploadData.success) {
          throw new Error(uploadData.error || "Failed to upload banner image to Cloudinary");
        }
        imageUrl = uploadData.url;
      }

      if (editingBannerId) {
        // Update existing banner
        const res = await fetch(`/api/hero-banners/${editingBannerId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title.trim(),
            subtitle: subtitle.trim(),
            linkUrl: linkUrl.trim(),
            order: Number(order) || 1,
            isActive,
            imageUrl,
          }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to update banner");
        }

        setFormSuccess("Hero banner updated successfully!");
        handleCancelEdit();
      } else {
        // Create new banner
        const res = await fetch("/api/hero-banners", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title.trim(),
            subtitle: subtitle.trim(),
            linkUrl: linkUrl.trim(),
            order: Number(order) || (banners.length + 1),
            isActive,
            imageUrl,
          }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to create banner");
        }

        setFormSuccess("New hero banner created successfully!");
        handleCancelEdit();
      }

      fetchBanners();
    } catch (err: any) {
      setFormError(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleActive = async (b: HeroBannerItem) => {
    try {
      const res = await fetch(`/api/hero-banners/${b.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !b.isActive }),
      });
      if (res.ok) {
        setBanners((prev) =>
          prev.map((item) => (item.id === b.id ? { ...item, isActive: !item.isActive } : item))
        );
      }
    } catch (err) {
      alert("Failed to toggle banner status");
    }
  };

  const handleDeleteBanner = async (id: string, bannerTitle?: string) => {
    if (
      !confirm(
        `Are you sure you want to delete ${
          bannerTitle ? `"${bannerTitle}"` : "this hero banner"
        }?`
      )
    ) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/hero-banners/${id}`, { method: "DELETE" });
      if (res.ok) {
        setBanners((prev) => prev.filter((b) => b.id !== id));
      } else {
        alert("Failed to delete banner");
      }
    } catch (err) {
      alert("Failed to delete banner");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A2540]">
      <AdminNavbar title="Hero Banners" subtitle="Homepage Slider Management" />

      <div className="w-full px-6 sm:px-8 py-6 space-y-6">
        {/* Sleek, Uncluttered Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-heading font-black text-[#0A2540] tracking-tight">
                Homepage Hero Banners
              </h1>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-[4px] bg-emerald-50 text-emerald-700 border border-emerald-200">
                {banners.filter((b) => b.isActive).length} active slides
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage hero slide images (recommended 3584&times;1184) and display order on the homepage.
            </p>
          </div>
        </div>

        {/* 2-Column Split: Form (5 cols) & Current Slides (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* UPLOAD / EDIT FORM (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-[4px] p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-[#0A2540] flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-[#0066CC]" />
                <span>{editingBannerId ? "Edit Hero Slide" : "Upload New Hero Banner"}</span>
              </h3>
              {editingBannerId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
              )}
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

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Upload Area */}
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1.5">
                  Banner Image (3584&times;1184 px) <span className="text-[#0066CC]">*</span>
                </label>
                <div className="border-2 border-dashed border-slate-200 hover:border-[#0066CC] rounded-[4px] p-4 text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-blue-50/20 relative group">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />
                  {previewUrl ? (
                    <div className="space-y-2">
                      <div className="relative w-full aspect-[3584/1184] bg-slate-100 rounded-[4px] overflow-hidden border border-slate-200 shadow-xs">
                        <Image
                          src={previewUrl}
                          alt="Banner Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-[11px] text-[#0066CC] font-semibold block">
                        Click or drag to change image
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-2 py-4">
                      <div className="w-10 h-10 rounded-[4px] bg-blue-50 text-[#0066CC] flex items-center justify-center mx-auto shadow-xs">
                        <UploadCloud className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-[#0A2540] block">
                          Click to select banner image
                        </span>
                        <span className="text-[10.5px] text-slate-400 block mt-0.5">
                          High resolution JPEG, PNG, or WebP
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                    Slide Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Garment Accessories"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#0066CC]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#0066CC]"
                  />
                </div>
              </div>

              {/* Link Target URL */}
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                  Target Destination URL
                </label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="/services/private-jobs or /services/commercial-jobs"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#0066CC]"
                />
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 rounded-[4px] text-[#0066CC] focus:ring-[#0066CC]"
                />
                <label htmlFor="isActiveToggle" className="text-xs font-semibold text-[#0A2540] cursor-pointer">
                  Active (show this slide in the homepage carousel)
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-[4px] bg-[#0066CC] hover:bg-[#0052CC] text-white font-heading text-xs font-bold uppercase tracking-wider shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving Slide...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>{editingBannerId ? "Save Changes" : "Add Hero Slide"}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* ACTIVE & CONFIGURED SLIDES LIST (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-[4px] p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-[#0A2540] flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                <span>Configured Slides ({banners.length})</span>
              </h3>
            </div>

            {isLoading ? (
              <div className="py-16 text-center text-xs text-slate-400">Loading hero slides...</div>
            ) : banners.length === 0 ? (
              <div className="py-16 text-center text-xs text-slate-400">
                No hero banners configured yet.
              </div>
            ) : (
              <div className="space-y-3.5">
                {banners.map((b, idx) => (
                  <div
                    key={b.id || idx}
                    className="p-3.5 bg-white border border-slate-200 rounded-[4px] hover:border-slate-300 hover:shadow-xs transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div className="relative w-28 sm:w-36 aspect-[3584/1184] bg-slate-100 rounded-[4px] overflow-hidden flex-shrink-0 border border-slate-200">
                        <Image
                          src={b.imageUrl}
                          alt={b.title || "Slide"}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-black text-xs text-[#0A2540] truncate">
                            {b.title || `Slide #${b.order || idx + 1}`}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-[4px] bg-slate-100 text-slate-600 font-bold">
                            Order: #{b.order}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          Destination: <span className="font-mono text-slate-600">{b.linkUrl}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(b)}
                        className={`text-[10px] font-mono font-bold px-2 py-1 rounded-[4px] transition-colors ${
                          b.isActive
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-500 border border-slate-200"
                        }`}
                      >
                        {b.isActive ? "Active" : "Inactive"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleStartEdit(b)}
                        className="p-1.5 text-slate-400 hover:text-[#0066CC] hover:bg-blue-50 rounded-[4px] transition-colors"
                        title="Edit this slide"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteBanner(b.id, b.title)}
                        disabled={deletingId === b.id}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-[4px] transition-colors"
                        title="Delete this slide"
                      >
                        {deletingId === b.id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
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
