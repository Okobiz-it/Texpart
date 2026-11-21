"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import AdminNavbar from "@/components/AdminNavbar";
import {
  Printer,
  Shirt,
  Package,
  Gift,
  Briefcase,
  Scissors,
  Plus,
  Search,
  Edit2,
  Trash2,
  Loader2,
  CheckCircle2,
  AlertCircle,
  FolderTree,
  ExternalLink,
  Layers,
  ArrowRight,
  X,
} from "lucide-react";
import { JobDivision } from "@/types";

interface CategoryData {
  id: string;
  name: string;
  slug: string;
  division: string;
  order: number;
  description: string;
  productCount: number;
}

const DIVISIONS: { id: JobDivision; label: string; icon: any }[] = [
  { id: "commercial-printing", label: "Commercial Printing", icon: Printer },
  { id: "garments-accessories", label: "Garments Accessories", icon: Shirt },
  { id: "packaging-solutions", label: "Packaging", icon: Package },
  { id: "promotional-products", label: "Promotional Products", icon: Gift },
  { id: "corporate-projects", label: "Corporate Projects", icon: Briefcase },
  { id: "apparel-projects", label: "Apparel Projects", icon: Scissors },
];

function CategoriesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const divParam = searchParams.get("division");
  const [selectedDivision, setSelectedDivision] = useState<JobDivision>(
    divParam && DIVISIONS.some((d) => d.id === divParam)
      ? (divParam as JobDivision)
      : "commercial-printing"
  );

  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states for Create & Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryData | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [modalError, setModalError] = useState("");

  // Delete states
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Load categories
  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/categories?division=${selectedDivision}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.categories)) {
        setCategories(data.categories);
      }
    } catch (err: any) {
      console.error("Failed to load categories", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [selectedDivision]);

  const handleDivisionChange = (divId: JobDivision) => {
    setSelectedDivision(divId);
    setSearchQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.set("division", divId);
    router.push(`/categories?${params.toString()}`);
  };

  // Open Create Modal
  const openCreateModal = () => {
    setEditingCategory(null);
    setFormData({ name: "", description: "" });
    setModalError("");
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (cat: CategoryData) => {
    setEditingCategory(cat);
    setFormData({ name: cat.name, description: cat.description || "" });
    setModalError("");
    setIsModalOpen(true);
  };

  // Save (Create or Update)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setModalError("Category name is required.");
      return;
    }

    setIsSaving(true);
    setModalError("");
    try {
      if (editingCategory) {
        // Update
        const res = await fetch(`/api/categories/${editingCategory.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name.trim(),
            description: formData.description.trim(),
            division: selectedDivision,
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to update category.");
        }
        setFeedback({ type: "success", message: `Updated category "${formData.name.trim()}" successfully.` });
      } else {
        // Create
        const res = await fetch("/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name.trim(),
            division: selectedDivision,
            description: formData.description.trim(),
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to create category.");
        }
        setFeedback({ type: "success", message: `Added category "${formData.name.trim()}" successfully.` });
      }

      setIsModalOpen(false);
      fetchCategories();
      setTimeout(() => setFeedback(null), 4000);
    } catch (err: any) {
      setModalError(err.message || "Failed to save category.");
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Category
  const handleDelete = async (cat: CategoryData) => {
    if (!confirm(`Are you sure you want to delete child category "${cat.name}"?`)) {
      return;
    }

    setDeletingId(cat.id);
    try {
      const res = await fetch(`/api/categories/${cat.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.error || "Failed to delete category.");
      } else {
        setFeedback({ type: "success", message: `Category "${cat.name}" deleted successfully.` });
        fetchCategories();
        setTimeout(() => setFeedback(null), 4000);
      }
    } catch (err: any) {
      alert("Failed to delete category.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const activeDivConfig = DIVISIONS.find((d) => d.id === selectedDivision) || DIVISIONS[0];
  const IconComponent = activeDivConfig.icon;

  return (
    <div className="w-full px-6 sm:px-8 py-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
            <Link href="/products" className="hover:text-[#0066CC] transition-colors">
              Products &amp; Range
            </Link>
            <span>/</span>
            <span className="text-[#0A2540] font-bold">Category Management</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-black text-[#0A2540] tracking-tight flex items-center gap-2.5">
            <FolderTree className="w-6 h-6 text-[#0066CC]" />
            <span>Child Category Management</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure, add, update, and manage child categories for all 6 core manufacturing divisions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/products?division=${selectedDivision}`}
            className="px-3.5 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-heading font-bold rounded-[4px] shadow-xs inline-flex items-center gap-2 transition-colors"
          >
            <Package className="w-4 h-4 text-slate-500" />
            <span>View Division Products</span>
          </Link>

          <button
            type="button"
            onClick={openCreateModal}
            className="px-4 py-2 bg-[#0066CC] hover:bg-[#0052CC] text-white text-xs font-heading font-bold uppercase rounded-[4px] shadow-sm inline-flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Child Category</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-[4px] border text-xs font-semibold flex items-center gap-2.5 ${
            feedback.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 6 Division Selectors (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white border border-slate-200 rounded-[4px] p-4 shadow-sm">
            <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-slate-400 mb-3 px-1">
              Main Manufacturing Divisions
            </h3>

            <div className="space-y-1.5">
              {DIVISIONS.map((div) => {
                const DivIcon = div.icon;
                const isSelected = selectedDivision === div.id;

                return (
                  <button
                    key={div.id}
                    type="button"
                    onClick={() => handleDivisionChange(div.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-[4px] text-xs font-bold transition-all text-left cursor-pointer ${
                      isSelected
                        ? "bg-[#0066CC] text-white shadow-xs font-black"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <DivIcon className={`w-4 h-4 shrink-0 ${isSelected ? "text-white" : "text-[#0066CC]"}`} />
                      <span>{div.label}</span>
                    </div>
                    {isSelected && <ArrowRight className="w-3.5 h-3.5 text-white shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Child Categories Table & List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white border border-slate-200 rounded-[4px] shadow-sm overflow-hidden">
            {/* Header with Search */}
            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[4px] bg-blue-50 text-[#0066CC] flex items-center justify-center">
                  <IconComponent className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-heading font-black text-[#0A2540]">
                    {activeDivConfig.label}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {filteredCategories.length} child categor{filteredCategories.length === 1 ? "y" : "ies"} registered
                  </p>
                </div>
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter categories..."
                  className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:outline-none focus:border-[#0066CC]"
                />
              </div>
            </div>

            {/* List */}
            {isLoading ? (
              <div className="p-12 flex flex-col items-center justify-center gap-2 text-slate-400">
                <Loader2 className="w-6 h-6 animate-spin text-[#0066CC]" />
                <span className="text-xs">Loading categories...</span>
              </div>
            ) : filteredCategories.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <FolderTree className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs text-slate-500 font-medium">
                  {searchQuery ? "No categories matched your search." : "No child categories found for this division."}
                </p>
                <button
                  type="button"
                  onClick={openCreateModal}
                  className="px-3.5 py-1.5 bg-[#0066CC] text-white text-xs font-bold rounded-[4px] inline-flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create First Category</span>
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredCategories.map((cat, idx) => (
                  <div
                    key={cat.id}
                    className="p-3.5 sm:px-5 flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-6 h-6 rounded-[4px] bg-slate-100 text-slate-500 font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-xs font-bold text-[#0A2540] tracking-tight">
                            {cat.name}
                          </h4>
                        </div>
                        {cat.description && (
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {cat.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {/* Products Badge */}
                      <Link
                        href={`/products?division=${selectedDivision}&category=${encodeURIComponent(cat.name)}`}
                        className="px-2 py-1 rounded bg-slate-100 hover:bg-blue-50 hover:text-[#0066CC] text-slate-600 font-mono text-[11px] font-semibold transition-colors flex items-center gap-1"
                        title="View products in this category"
                      >
                        <span>{cat.productCount} prod</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </Link>

                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() => openEditModal(cat)}
                        className="p-1.5 text-slate-500 hover:text-[#0066CC] hover:bg-blue-50 rounded transition-colors cursor-pointer"
                        title="Edit category"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleDelete(cat)}
                        disabled={deletingId === cat.id}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer disabled:opacity-50"
                        title="Delete category"
                      >
                        {deletingId === cat.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-600" />
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

      {/* Modal for Create / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[4px] border border-slate-200 shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-heading font-black text-sm text-[#0A2540]">
                {editingCategory ? "Edit Child Category" : "Add New Child Category"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4">
              {modalError && (
                <div className="p-3 rounded-[4px] bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
                  {modalError}
                </div>
              )}

              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#0A2540] mb-1">
                  Main Division (Fixed)
                </label>
                <div className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-[4px] text-xs font-bold text-slate-700 flex items-center gap-2">
                  <IconComponent className="w-3.5 h-3.5 text-[#0066CC]" />
                  <span>{activeDivConfig.label}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#0A2540] mb-1">
                  Child Category Name <span className="text-[#0066CC]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Rigid Gift Boxes, Woven Labels"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] font-semibold focus:bg-white focus:outline-none focus:border-[#0066CC]"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[#0A2540] mb-1">
                  Description (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Briefly describe what products belong to this category..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSaving}
                  className="px-3.5 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-heading font-bold rounded-[4px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-1.5 bg-[#0066CC] hover:bg-[#0052CC] text-white text-xs font-heading font-bold rounded-[4px] inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  {isSaving && <Loader2 className="w-3 h-3 animate-spin" />}
                  <span>{editingCategory ? "Update Category" : "Create Category"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminNavbar title="Products & Range" subtitle="Category Management" />
      <Suspense
        fallback={
          <div className="w-full p-16 flex items-center justify-center gap-2 text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin text-[#0066CC]" />
            <span className="text-xs">Loading taxonomy manager...</span>
          </div>
        }
      >
        <CategoriesContent />
      </Suspense>
    </div>
  );
}
