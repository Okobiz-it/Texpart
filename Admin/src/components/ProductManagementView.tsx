"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Shirt,
  Printer,
  Sparkles,
  Layers,
  Image as ImageIcon,
  CheckCircle,
  Star,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { ProductItem, JobDivision } from "@/types";
import ProductFormModal from "@/components/ProductFormModal";

interface ProductManagementViewProps {
  division: JobDivision;
  title: string;
  subtitle: string;
  icon: "shirt" | "printer";
}

export default function ProductManagementView({
  division,
  title,
  subtitle,
  icon,
}: ProductManagementViewProps) {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/products?division=${division}`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [division]);

  // Featured products count across this view
  const featuredCount = products.filter((p) => p.isFeatured).length;

  const handleToggleFeatured = async (prod: ProductItem) => {
    setTogglingId(prod.id);
    setFeedbackMessage(null);
    try {
      const newStatus = !prod.isFeatured;
      const res = await fetch(`/api/products/${prod.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: newStatus }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setFeedbackMessage({
          type: "error",
          text: data.error || "Maximum 5 featured products allowed. Please unfeature another product first.",
        });
        setTimeout(() => setFeedbackMessage(null), 5000);
      } else {
        setFeedbackMessage({
          type: "success",
          text: newStatus
            ? `"${prod.name}" is now featured on the Home Page!`
            : `"${prod.name}" unfeatured from the Home Page.`,
        });
        setTimeout(() => setFeedbackMessage(null), 3500);
        fetchProducts();
      }
    } catch (err) {
      setFeedbackMessage({ type: "error", text: "Error connecting to server" });
      setTimeout(() => setFeedbackMessage(null), 4000);
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        setFeedbackMessage({ type: "success", text: `Product "${name}" deleted successfully.` });
        setTimeout(() => setFeedbackMessage(null), 3000);
        fetchProducts();
      } else {
        alert(data.error || "Failed to delete product");
      }
    } catch (err) {
      alert("Error connecting to server");
    }
  };

  const handleEdit = (prod: ProductItem) => {
    setEditingProduct(prod);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  // Categories list
  const categories = Array.from(new Set(products.map((p) => p.category))).filter(Boolean);

  // Filtered products
  const filteredProducts = products.filter((p) => {
    const matchCat = selectedCategory === "ALL" || p.category === selectedCategory;
    const matchSearch =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase().trim());
    return matchCat && matchSearch;
  });

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-[4px] bg-[#0066CC] text-white flex items-center justify-center flex-shrink-0 shadow-md">
            {icon === "shirt" ? (
              <Shirt className="w-5 h-5" />
            ) : (
              <Printer className="w-5 h-5" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#0066CC] font-bold">
                Product Division Control
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[10px] font-heading font-bold uppercase bg-amber-50 text-amber-800 border border-amber-200">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                Home Featured: {featuredCount}/5 in division
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black uppercase text-[#0A2540] tracking-tight">
              {title}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
          </div>
        </div>

        <button
          onClick={handleAddNew}
          className="px-5 py-2.5 bg-[#0066CC] hover:bg-[#0052CC] text-white text-xs font-heading font-bold uppercase rounded-[4px] inline-flex items-center gap-1.5 shadow-sm transition-all flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Floating Alert / Toast Message */}
      {feedbackMessage && (
        <div
          className={`p-3.5 rounded-[4px] text-xs font-medium border flex items-center gap-2 transition-all ${
            feedbackMessage.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-rose-50 text-rose-800 border-rose-200"
          }`}
        >
          {feedbackMessage.type === "success" ? (
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          )}
          <span>{feedbackMessage.text}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-[4px] border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product name, category, or slug..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
          />
        </div>

        {/* Category Filter */}
        <div className="sm:w-60">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all cursor-pointer font-medium"
          >
            <option value="ALL">All Categories ({products.length})</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat} ({products.filter((p) => p.category === cat).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-[4px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>
            Displaying <strong className="text-[#0A2540]">{filteredProducts.length}</strong> of{" "}
            {products.length} products
          </span>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("ALL");
              }}
              className="text-[#0066CC] hover:underline font-bold"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-heading uppercase text-[11px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Product Name &amp; Front Image</th>
                <th className="px-4 py-3">Slug (Auto-Generated)</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3 text-center">Featured on Home (Max 5)</th>
                <th className="px-4 py-3">Images</th>
                <th className="px-4 py-3">Description Preview</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    Loading {title} from MongoDB...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-10 text-center space-y-2">
                    <p className="font-heading font-bold text-slate-600 text-sm">
                      No products found
                    </p>
                    <p className="text-xs text-slate-400">
                      Click &ldquo;Add New Product&rdquo; above to create your first item in this division.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((prod) => {
                  const plainDesc = prod.description
                    ? prod.description.replace(/<[^>]*>/g, " ").trim()
                    : "No description provided";

                  const isToggling = togglingId === prod.id;

                  return (
                    <tr key={prod.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Product Thumbnail & Name */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-[4px] overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                            {prod.frontImage ? (
                              <Image
                                src={prod.frontImage}
                                alt={prod.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300">
                                <ImageIcon className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                          <div>
                            <strong className="text-xs font-heading font-bold text-[#0A2540] block hover:text-[#0066CC] transition-colors">
                              {prod.name}
                            </strong>
                            <span className="text-[10px] text-emerald-600 font-mono font-medium flex items-center gap-1">
                              <CheckCircle className="w-2.5 h-2.5" /> Front Image Active
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Auto Slug */}
                      <td className="px-4 py-3 font-mono text-slate-600 text-[11px]">
                        <span className="px-2 py-0.5 bg-slate-100 rounded-[4px] border border-slate-200/60">
                          {prod.slug}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-[4px] bg-blue-50 text-[#0066CC] font-medium text-[11px] border border-blue-100">
                          {prod.category}
                        </span>
                      </td>

                      {/* Featured on Home (Max 5) Interactive Toggle */}
                      <td className="px-4 py-3 text-center">
                        <button
                          type="button"
                          disabled={isToggling}
                          onClick={() => handleToggleFeatured(prod)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] text-[11px] font-heading font-bold transition-all shadow-xs ${
                            prod.isFeatured
                              ? "bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200"
                              : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200"
                          } disabled:opacity-50`}
                          title={
                            prod.isFeatured
                              ? "Click to remove from Home Page featured products"
                              : "Click to feature on Home Page (Max 5 allowed)"
                          }
                        >
                          {isToggling ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Star
                              className={`w-3.5 h-3.5 ${
                                prod.isFeatured
                                  ? "text-amber-500 fill-amber-500"
                                  : "text-slate-400"
                              }`}
                            />
                          )}
                          <span>{prod.isFeatured ? "Featured" : "Feature"}</span>
                        </button>
                      </td>

                      {/* Images Count */}
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 text-slate-500 text-[11px]">
                          <Layers className="w-3.5 h-3.5 text-slate-400" />
                          <span>{prod.images?.length || 1} image(s)</span>
                        </span>
                      </td>

                      {/* Description Preview */}
                      <td className="px-4 py-3 max-w-xs">
                        <p className="text-slate-500 text-[11px] line-clamp-2 leading-relaxed">
                          {plainDesc}
                        </p>
                      </td>

                      {/* Action Buttons */}
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleEdit(prod)}
                            className="p-1.5 rounded-[4px] border border-slate-200 text-slate-600 hover:text-[#0066CC] hover:bg-blue-50 transition-colors"
                            aria-label={`Edit ${prod.name}`}
                            title="Edit Product"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(prod.id, prod.name)}
                            className="p-1.5 rounded-[4px] border border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            aria-label={`Delete ${prod.name}`}
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={fetchProducts}
        initialDivision={division}
        editingProduct={editingProduct}
      />
    </div>
  );
}
