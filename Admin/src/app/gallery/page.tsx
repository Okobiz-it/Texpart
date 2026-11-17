"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ImageIcon,
  UploadCloud,
  Plus,
  Trash2,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Search,
  X,
} from "lucide-react";
import AdminNavbar from "@/components/AdminNavbar";
import { GalleryItemType } from "@/types";

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Add Photo Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const fetchGallery = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setItems(data.data);
      }
    } catch (err) {
      console.error("Failed to load gallery items", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFormError(null);
    }
  };

  const handleCloseModal = () => {
    if (isSubmitting) return;
    setIsAddModalOpen(false);
    setTitle("");
    setDescription("");
    setSelectedFile(null);
    setPreviewUrl(null);
    setFormError(null);
  };

  const handleCreatePhoto = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      setFormError("Please select an image file to upload");
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      // 1. Upload photo to Cloudinary
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("folder", "texpart/gallery");

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok || !uploadData.success) {
        throw new Error(uploadData.error || "Failed to upload image file");
      }

      const imageUrl = uploadData.url;

      // 2. Save Gallery item in MongoDB (title is optional, defaults to "Gallery Photo")
      const finalTitle = title.trim() || "Gallery Photo";

      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: finalTitle,
          image: imageUrl,
          description: description.trim(),
          category: "general",
          categoryLabel: "Gallery",
          aspect: "square",
          location: "Dhaka Facility",
          meta: "",
          order: items.length + 1,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save photo to database");
      }

      setFeedbackMessage("Gallery photo uploaded successfully!");
      setTimeout(() => setFeedbackMessage(null), 3500);

      handleCloseModal();
      fetchGallery();
    } catch (err: any) {
      setFormError(err.message || "An error occurred while uploading photo");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteItem = async (id: string, itemTitle?: string) => {
    if (
      !confirm(
        `Are you sure you want to delete ${
          itemTitle ? `"${itemTitle}"` : "this gallery photo"
        }?`
      )
    ) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== id));
        setFeedbackMessage("Photo removed from gallery.");
        setTimeout(() => setFeedbackMessage(null), 3000);
      } else {
        alert("Failed to delete gallery item");
      }
    } catch (err) {
      alert("Failed to delete gallery item");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredItems = items.filter((item) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A2540]">
      <AdminNavbar title="Gallery Archive" subtitle="Media & Assets Management" />

      <div className="w-full px-6 sm:px-8 py-6 space-y-6">
        {/* Sleek, Uncluttered Header with + Add Photo Button on Top */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-heading font-black text-[#0A2540] tracking-tight">
                Gallery Media Archive
              </h1>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-[4px] bg-amber-50 text-amber-700 border border-amber-200">
                {items.length} assets
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Upload and manage factory production photos and accessories showcases across the site.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-[#0066CC] hover:bg-[#0052CC] text-white text-xs font-heading font-bold uppercase rounded-[4px] inline-flex items-center gap-1.5 shadow-xs transition-colors flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Photo</span>
          </button>
        </div>

        {/* Floating Feedback Notification */}
        {feedbackMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-[4px] text-xs flex items-center gap-2 transition-all">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
            <span>{feedbackMessage}</span>
          </div>
        )}

        {/* Full-Width Gallery Container (NO SIDEBAR) */}
        <div className="bg-white border border-slate-200 rounded-[4px] p-5 sm:p-6 shadow-xs space-y-5">
          {/* Top Search Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#0066CC]" />
              <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-[#0A2540]">
                All Gallery Photos ({filteredItems.length})
              </h3>
            </div>

            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search photos by title or keyword..."
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#0066CC]"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Photos Grid */}
          {isLoading ? (
            <div className="py-20 text-center text-xs text-slate-400 flex flex-col items-center justify-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-[#0066CC]" />
              <span>Loading gallery photos...</span>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="py-20 text-center space-y-2">
              <p className="font-heading font-bold text-slate-600 text-sm">
                No gallery assets found
              </p>
              <p className="text-xs text-slate-400">
                Click &ldquo;Add Photo&rdquo; above to upload your first factory photo.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-[4px] overflow-hidden hover:border-[#0066CC] hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title || "Gallery photo"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Delete Quick Button on Hover */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(item.id, item.title)}
                        disabled={deletingId === item.id}
                        className="p-1.5 bg-white/90 hover:bg-rose-600 text-slate-700 hover:text-white rounded-[4px] shadow-sm transition-colors"
                        title="Delete photo"
                      >
                        {deletingId === item.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-600" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Caption & Footer */}
                  <div className="p-2.5 border-t border-slate-100 flex items-center justify-between gap-1">
                    <span
                      className="text-xs font-heading font-bold text-[#0A2540] truncate block"
                      title={item.title}
                    >
                      {item.title || "Untitled Photo"}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item.id, item.title)}
                      disabled={deletingId === item.id}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded-[4px] transition-colors flex-shrink-0"
                      title="Delete"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* =================================================================
          UPLOAD PHOTO MODAL (Clean, Focused, No Clutter)
          ================================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[4px] shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="bg-[#0066CC] text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-blue-200" />
                <div>
                  <h3 className="text-sm font-heading font-black uppercase tracking-wide">
                    Add Gallery Photo
                  </h3>
                  <p className="text-[11px] text-blue-100">
                    Upload a high-resolution photo file to the gallery
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                disabled={isSubmitting}
                className="p-1 rounded-[4px] hover:bg-white/10 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreatePhoto} className="p-5 overflow-y-auto space-y-4">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-[4px] text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Photo File Upload Area (Strictly File Upload - NO Direct URL) */}
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1.5">
                  Media Photo File <span className="text-[#0066CC]">*</span>
                </label>
                <div className="border-2 border-dashed border-slate-200 hover:border-[#0066CC] rounded-[4px] p-4 text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-blue-50/20 relative group">
                  <input
                    type="file"
                    required
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />
                  {previewUrl ? (
                    <div className="space-y-2">
                      <div className="relative w-full h-44 bg-slate-100 rounded-[4px] overflow-hidden border border-slate-200 shadow-xs">
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-[11px] text-[#0066CC] font-heading font-bold block">
                        Click or drag to change image file
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-2 py-4">
                      <div className="w-10 h-10 rounded-[4px] bg-blue-50 text-[#0066CC] flex items-center justify-center mx-auto shadow-xs">
                        <UploadCloud className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-heading font-bold text-[#0A2540] block">
                          Click to select photo file
                        </span>
                        <span className="text-[10.5px] text-slate-400 block mt-0.5">
                          High-resolution PNG, JPG, or WebP photography
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Title / Caption (Optional) */}
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                  Title / Caption (Optional)
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Automated Multi-Ply Fabric Cutting"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#0066CC]"
                />
              </div>

              {/* Description (Optional) */}
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] mb-1">
                  Description / Note (Optional)
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief context or technical detail..."
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#0066CC] resize-none"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-xs font-heading font-bold text-slate-600 hover:text-[#0A2540] border border-slate-200 rounded-[4px] hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-[#0066CC] hover:bg-[#0052CC] text-white text-xs font-heading font-bold uppercase rounded-[4px] shadow-sm inline-flex items-center gap-1.5 transition-colors disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Upload Photo</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
