"use client";

import React, { useState, useEffect } from "react";
import { ProductItem, JobDivision } from "@/types";
import { slugify } from "@/lib/slugify";
import ImageUploader from "@/components/ImageUploader";
import AdminRichTextEditor from "@/components/AdminRichTextEditor";
import { X, Loader2, Save, Sparkles, Star } from "lucide-react";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  initialDivision?: JobDivision;
  editingProduct?: ProductItem | null;
}

export default function ProductFormModal({
  isOpen,
  onClose,
  onSaved,
  initialDivision = "private-jobs",
  editingProduct,
}: ProductFormModalProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [division, setDivision] = useState<JobDivision>(initialDivision);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [frontImage, setFrontImage] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setSlug(editingProduct.slug);
      setDivision(editingProduct.division);
      setCategory(editingProduct.category);
      setDescription(editingProduct.description || "");
      setFrontImage(editingProduct.frontImage);
      setImages(editingProduct.images || (editingProduct.frontImage ? [editingProduct.frontImage] : []));
      setIsFeatured(!!editingProduct.isFeatured);
    } else {
      setName("");
      setSlug("");
      setDivision(initialDivision);
      setCategory("");
      setDescription("");
      setFrontImage("");
      setImages([]);
      setIsFeatured(false);
    }
    setError(null);
  }, [editingProduct, initialDivision, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  // Auto-generate slug when name changes (if creating or if slug is synchronized)
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    setSlug(slugify(newName));
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter a product name");
      return;
    }
    if (images.length === 0 && !frontImage) {
      setError("Please upload at least one product image");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const payload = {
      name: name.trim(),
      slug: slug || slugify(name),
      division,
      category: category.trim() || "General",
      description,
      frontImage: frontImage || images[0] || "",
      images,
      isFeatured,
    };

    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : "/api/products";
      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save product");
      }

      onSaved();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to save product to database");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
      <div
        className="fixed inset-0"
        onClick={() => {
          if (!isSubmitting) onClose();
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 bg-white w-full max-w-4xl rounded-[4px] shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#0066CC] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-blue-200" />
            <div>
              <h3 className="text-base font-heading font-black uppercase tracking-wide">
                {editingProduct ? `Edit Product: ${editingProduct.name}` : "Create New Product"}
              </h3>
              <p className="text-[11px] text-blue-100 font-light">
                {division === "private-jobs" ? "Private Jobs Division" : "Commercial Jobs Division"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-[4px] hover:bg-white/10 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-grow space-y-6 bg-slate-50/50">
          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-[4px] font-medium">
              {error}
            </div>
          )}

          {/* Section 1: Basic Information */}
          <div className="bg-white p-5 rounded-[4px] border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-xs font-heading font-black uppercase tracking-wider text-[#0A2540] border-b border-slate-100 pb-2">
              1. Basic Identification
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#0A2540] mb-1">
                  Product Name <span className="text-[#0066CC]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={handleNameChange}
                  placeholder="e.g. Woven Labels, Rigid Boxes, Hangtags"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#0A2540] mb-1">
                  Auto-Generated Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="auto-generated-slug"
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-[4px] text-xs font-mono text-slate-600 focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#0A2540] mb-1">
                  Job Division <span className="text-[#0066CC]">*</span>
                </label>
                <select
                  value={division}
                  onChange={(e) => setDivision(e.target.value as JobDivision)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all cursor-pointer font-medium"
                >
                  <option value="commercial-printing">Commercial Printing</option>
                  <option value="garments-accessories">Garments Accessories</option>
                  <option value="packaging-solutions">Packaging</option>
                  <option value="promotional-products">Promotional Products</option>
                  <option value="corporate-projects">Corporate Projects</option>
                  <option value="apparel-projects">Apparel Projects</option>
                  <option value="private-jobs">Private Jobs (Legacy)</option>
                  <option value="commercial-jobs">Commercial Jobs (Legacy)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#0A2540] mb-1">
                  Category Tag
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Garment Identification, Luxury Packaging"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
                />
              </div>
            </div>

            {/* Featured Product on Home Page Checkbox */}
            <div className="pt-2 border-t border-slate-100">
              <label className="flex items-center gap-3 p-3 bg-amber-50/60 border border-amber-200 rounded-[4px] cursor-pointer hover:bg-amber-50 transition-colors">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 text-[#0066CC] rounded-[4px] focus:ring-[#0066CC] cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <Star className={`w-4 h-4 ${isFeatured ? "text-amber-500 fill-amber-500" : "text-amber-400"}`} />
                    <span className="text-xs font-heading font-bold text-[#0A2540]">
                      Feature on Home Page (Maximum 10 items allowed across all products)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    When enabled, this product is highlighted in the Home Page Featured Products section.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Section 2: Images Upload & Select as Front */}
          <div className="bg-white p-5 rounded-[4px] border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-xs font-heading font-black uppercase tracking-wider text-[#0A2540]">
                2. Product Images &amp; Front Image Selection
              </h4>
              <span className="text-[11px] text-slate-400">
                High-Resolution Assets
              </span>
            </div>

            <ImageUploader
              images={images}
              frontImage={frontImage}
              onImagesChange={setImages}
              onFrontImageChange={setFrontImage}
            />
          </div>

          {/* Section 3: Description with Advanced Rich Text Editor */}
          <div className="bg-white p-5 rounded-[4px] border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-xs font-heading font-black uppercase tracking-wider text-[#0A2540]">
                3. Product Description (Rich Text Editor)
              </h4>
              <span className="text-[11px] text-slate-400">
                Supports headings, font sizes, text color &amp; highlight
              </span>
            </div>

            <AdminRichTextEditor
              value={description}
              onChange={setDescription}
              placeholder="Provide comprehensive details, technical parameters, washing endurance..."
              minHeight="220px"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-heading font-bold text-slate-600 hover:text-[#0A2540] border border-slate-200 rounded-[4px] hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#0066CC] hover:bg-[#0052CC] text-white text-xs font-heading font-bold uppercase rounded-[4px] shadow-sm inline-flex items-center gap-1.5 transition-colors disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving to MongoDB...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>{editingProduct ? "Update Product" : "Save Product"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
