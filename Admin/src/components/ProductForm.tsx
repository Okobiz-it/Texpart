"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Loader2,
  ExternalLink,
  Star,
  CheckCircle2,
  AlertCircle,
  Package,
  Layers,
  Sparkles,
} from "lucide-react";
import { ProductItem, JobDivision } from "@/types";
import { slugify } from "@/lib/slugify";
import ImageUploader from "@/components/ImageUploader";
import AdminRichTextEditor from "@/components/AdminRichTextEditor";

interface ProductFormProps {
  initialDivision?: JobDivision;
  productId?: string;
}

export default function ProductForm({
  initialDivision = "private-jobs",
  productId,
}: ProductFormProps) {
  const router = useRouter();
  const isEditMode = Boolean(productId);

  const [isLoadingProduct, setIsLoadingProduct] = useState(isEditMode);
  const [productNotFound, setProductNotFound] = useState(false);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [division, setDivision] = useState<JobDivision>(initialDivision);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [frontImage, setFrontImage] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isFeatured, setIsFeatured] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Initial notification of active division for side nav
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("texpart_active_division", initialDivision);
        window.dispatchEvent(
          new CustomEvent("texpart_active_division", { detail: initialDivision })
        );
      } catch (_) {}
    }
  }, [initialDivision]);

  // If in edit mode, fetch product details
  useEffect(() => {
    if (!productId) return;

    let isMounted = true;
    setIsLoadingProduct(true);
    setProductNotFound(false);

    fetch(`/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.success && data.product) {
          const prod: ProductItem = data.product;
          const prodDiv = prod.division || initialDivision;
          setName(prod.name || "");
          setSlug(prod.slug || "");
          setDivision(prodDiv);
          setCategory(prod.category || "");
          setDescription(prod.description || "");
          setFrontImage(prod.frontImage || "");
          setImages(prod.images || (prod.frontImage ? [prod.frontImage] : []));
          setIsFeatured(Boolean(prod.isFeatured));

          if (typeof window !== "undefined") {
            try {
              sessionStorage.setItem("texpart_active_division", prodDiv);
              window.dispatchEvent(
                new CustomEvent("texpart_active_division", { detail: prodDiv })
              );
            } catch (_) {}
          }
        } else {
          setProductNotFound(true);
        }
      })
      .catch((err) => {
        console.error("Failed to load product details", err);
        if (isMounted) setProductNotFound(true);
      })
      .finally(() => {
        if (isMounted) setIsLoadingProduct(false);
      });

    return () => {
      isMounted = false;
    };
  }, [productId, initialDivision]);

  // Handle product name change and auto-generate slug
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (!isEditMode) {
      setSlug(slugify(newName));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMessage("Please enter a product name.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (images.length === 0 && !frontImage) {
      setErrorMessage("Please upload at least one product image.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const finalSlug = slug.trim() ? slugify(slug) : slugify(name);
    const finalFront = frontImage || images[0] || "";

    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const payload = {
      name: name.trim(),
      slug: finalSlug,
      division,
      category: category.trim() || "General",
      description,
      frontImage: finalFront,
      images,
      isFeatured,
    };

    try {
      const url = isEditMode ? `/api/products/${productId}` : "/api/products";
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save product.");
      }

      setSuccessMessage(
        isEditMode
          ? `Product "${name}" updated successfully.`
          : `Product "${name}" created successfully.`
      );

      // Short delay so the user sees success feedback, then redirect back to catalog
      setTimeout(() => {
        router.push(`/products/${division}`);
      }, 1200);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to save product to database.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const backUrl = `/products/${division}`;

  if (isLoadingProduct) {
    return (
      <div className="w-full px-6 sm:px-8 py-16 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#0066CC]" />
        <span className="text-sm font-heading font-medium text-slate-500">
          Loading product information...
        </span>
      </div>
    );
  }

  if (productNotFound) {
    return (
      <div className="w-full px-6 sm:px-8 py-16 flex flex-col items-center justify-center gap-4 text-center max-w-md mx-auto">
        <div className="w-12 h-12 rounded-[4px] bg-rose-50 text-rose-600 flex items-center justify-center">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-heading font-bold text-[#0A2540]">
          Product Not Found
        </h2>
        <p className="text-xs text-slate-500">
          The product you are trying to edit does not exist or may have been deleted.
        </p>
        <Link
          href="/products"
          className="px-4 py-2 bg-[#0066CC] hover:bg-[#0052CC] text-white text-xs font-heading font-bold uppercase rounded-[4px] inline-flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Catalog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full px-6 sm:px-8 py-6 space-y-6">
      {/* Sleek Header & Breadcrumb Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link
              href={backUrl}
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-[#0066CC] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Products</span>
            </Link>
            <span>/</span>
            <span className="text-[#0A2540] font-bold">
              {isEditMode ? "Edit Product" : "New Product"}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-heading font-black text-[#0A2540] tracking-tight">
            {isEditMode ? `Edit Product: ${name || "Untitled"}` : "Add New Product"}
          </h1>
        </div>

        {/* Top Action Buttons */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <Link
            href={backUrl}
            className="px-4 py-2 text-xs font-heading font-bold uppercase text-slate-600 hover:text-[#0A2540] border border-slate-200 rounded-[4px] hover:bg-slate-100 transition-colors"
          >
            Cancel
          </Link>

          {isEditMode && slug && (
            <a
              href={`http://localhost:3000/products/${slug}`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 text-xs font-heading font-bold text-slate-600 hover:text-[#0066CC] border border-slate-200 rounded-[4px] hover:bg-blue-50/50 inline-flex items-center gap-1.5 transition-colors"
              title="View this product on the live storefront"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Storefront</span>
            </a>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-5 py-2 bg-[#0066CC] hover:bg-[#0052CC] text-white text-xs font-heading font-bold uppercase rounded-[4px] shadow-sm inline-flex items-center gap-2 transition-colors disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>{isEditMode ? "Update Product" : "Save Product"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Alert / Feedback Messages */}
      {errorMessage && (
        <div className="p-4 rounded-[4px] bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-4 rounded-[4px] bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Main Form Form Body */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2 Cols): Basic Info & Description */}
          <div className="lg:col-span-2 space-y-6">
            {/* Card 1: Basic Identification */}
            <div className="bg-white p-5 sm:p-6 rounded-[4px] border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#0066CC]" />
                  <h3 className="text-xs font-heading font-black uppercase tracking-wider text-[#0A2540]">
                    1. Basic Identification
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  General Attributes
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Product Name */}
                <div className="sm:col-span-1">
                  <label className="block text-xs font-heading font-bold uppercase text-[#0A2540] mb-1.5">
                    Product Name <span className="text-[#0066CC]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={handleNameChange}
                    placeholder="e.g. Boxes & Cartons, Woven Labels"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
                  />
                </div>

                {/* Slug */}
                <div className="sm:col-span-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-heading font-bold uppercase text-[#0A2540]">
                      Slug <span className="text-[#0066CC]">*</span>
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">
                      URL Slug
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="product-slug"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-[4px] text-xs font-mono text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
                  />
                  <p className="text-[10px] text-slate-400 mt-1 font-mono">
                    Live URL: /products/{slug || "slug"}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Description (Rich Text Editor) */}
            <div className="bg-white p-5 sm:p-6 rounded-[4px] border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#0066CC]" />
                  <h3 className="text-xs font-heading font-black uppercase tracking-wider text-[#0A2540]">
                    2. Product Description &amp; Specifications
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400">
                  Rich Text Editor
                </span>
              </div>

              <p className="text-xs text-slate-500">
                Add comprehensive technical specifications, material certifications, minimum order quantities, and styling guidelines.
              </p>

              <AdminRichTextEditor
                value={description}
                onChange={setDescription}
                placeholder="Write detailed product specifications, material properties, washing endurance, customization options..."
                minHeight="280px"
              />
            </div>
          </div>

          {/* Right Column (1 Col): Product Images & Meta Card */}
          <div className="space-y-6">
            {/* Card 3: Images Upload & Select Front Image */}
            <div className="bg-white p-5 sm:p-6 rounded-[4px] border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-xs font-heading font-black uppercase tracking-wider text-[#0A2540]">
                  3. Product Images
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Upload file assets &amp; select primary front cover.
                </p>
              </div>

              <ImageUploader
                images={images}
                frontImage={frontImage}
                onImagesChange={setImages}
                onFrontImageChange={setFrontImage}
              />
            </div>

            {/* Feature on Home Page Card */}
            <div className="bg-white p-5 rounded-[4px] border border-slate-200 shadow-sm space-y-3">
              <label className="flex items-start gap-3 p-3.5 bg-amber-50/60 border border-amber-200 rounded-[4px] cursor-pointer hover:bg-amber-50 transition-colors">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 mt-0.5 text-[#0066CC] rounded-[4px] focus:ring-[#0066CC] cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <Star
                      className={`w-4 h-4 ${
                        isFeatured
                          ? "text-amber-500 fill-amber-500"
                          : "text-amber-400"
                      }`}
                    />
                    <span className="text-xs font-heading font-bold text-[#0A2540]">
                      Feature on Home Page
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Maximum 5 items per division. Highlighted on the Homepage Featured Products grid.
                  </p>
                </div>
              </label>
            </div>

            {/* Card 4: Summary Card */}
            <div className="bg-white p-5 rounded-[4px] border border-slate-200 shadow-sm space-y-3">
              <h4 className="text-xs font-heading font-bold uppercase text-[#0A2540] border-b border-slate-100 pb-2">
                Product Summary
              </h4>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Division:</span>
                  <span className="font-bold text-[#0A2540]">
                    {division === "private-jobs" ? "Custom Jobs" : "Commercial Jobs"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Images:</span>
                  <span className="font-mono font-medium text-[#0A2540]">
                    {images.length} asset(s)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Homepage Featured:</span>
                  <span
                    className={`font-bold ${
                      isFeatured ? "text-amber-600" : "text-slate-400"
                    }`}
                  >
                    {isFeatured ? "Yes (Featured)" : "No"}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 bg-[#0066CC] hover:bg-[#0052CC] text-white text-xs font-heading font-bold uppercase rounded-[4px] shadow-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving to Catalog...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>{isEditMode ? "Update Product" : "Save Product"}</span>
                    </>
                  )}
                </button>

                <Link
                  href={backUrl}
                  className="w-full py-2 text-center text-xs font-heading font-bold uppercase text-slate-500 hover:text-slate-800 border border-slate-200 rounded-[4px] hover:bg-slate-50 transition-colors"
                >
                  Cancel &amp; Discard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
