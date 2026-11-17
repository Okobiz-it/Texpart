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
  LayoutGrid,
  List,
  CheckCircle2,
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
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/products?division=${division}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.products)) {
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

  // Featured count for this division
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
          text: data.error || "Maximum 5 featured products allowed for this division. Unfeature another product first.",
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
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto w-full">
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
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#0066CC] font-bold">
                Catalog Management
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[3px] text-[10px] font-mono font-bold uppercase bg-amber-50 text-amber-800 border border-amber-200">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                Home Featured: {featuredCount} / 5
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
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
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

        {/* View Toggle (Table / Grid) */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-[4px] flex-shrink-0">
          <button
            type="button"
            onClick={() => setViewMode("table")}
            className={`p-1.5 rounded-[3px] transition-all ${
              viewMode === "table"
                ? "bg-white text-[#0066CC] shadow-sm"
                : "text-slate-400 hover:text-slate-700"
            }`}
            title="Table View"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-[3px] transition-all ${
              viewMode === "grid"
                ? "bg-white text-[#0066CC] shadow-sm"
                : "text-slate-400 hover:text-slate-700"
            }`}
            title="Grid Cards View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content: Table or Grid */}
      {viewMode === "table" ? (
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
                Clear search
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-heading uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="px-4 py-3">Product Name &amp; Cover</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3 text-center">Home Featured (Max 5)</th>
                  <th className="px-4 py-3">Images</th>
                  <th className="px-4 py-3">Slug Preview</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Loader2 className="w-6 h-6 animate-spin text-[#0066CC]" />
                        <span>Loading {title} from MongoDB...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center space-y-2">
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
                    const isToggling = togglingId === prod.id;

                    return (
                      <tr key={prod.id} className="hover:bg-slate-50/70 transition-colors">
                        {/* Thumbnail & Name */}
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

                        {/* Category */}
                        <td className="px-4 py-3">
                          <span className="inline-block px-2 py-0.5 rounded-[3px] bg-slate-100 text-slate-700 font-heading text-[11px] font-bold">
                            {prod.category}
                          </span>
                        </td>

                        {/* Home Featured Toggle */}
                        <td className="px-4 py-3 text-center">
                          <button
                            type="button"
                            onClick={() => handleToggleFeatured(prod)}
                            disabled={isToggling}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] text-xs font-heading font-bold transition-all ${
                              prod.isFeatured
                                ? "bg-amber-500 hover:bg-amber-600 text-white shadow-sm"
                                : "bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-300/80"
                            } disabled:opacity-50`}
                            title={
                              prod.isFeatured
                                ? "Click to remove from Home Featured"
                                : "Click to feature on Home Page (Max 5 allowed)"
                            }
                          >
                            {isToggling ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Star
                                className={`w-3.5 h-3.5 ${
                                  prod.isFeatured ? "fill-white text-white" : "text-slate-400"
                                }`}
                              />
                            )}
                            <span>{prod.isFeatured ? "★ Featured" : "Feature"}</span>
                          </button>
                        </td>

                        {/* Images count */}
                        <td className="px-4 py-3 font-mono text-[11px] text-slate-500">
                          {prod.images?.length || 1} asset(s)
                        </td>

                        {/* Slug */}
                        <td className="px-4 py-3 font-mono text-[11px] text-slate-500">
                          /products/{prod.slug}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <a
                              href={`http://localhost:3000/products/${prod.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 text-slate-400 hover:text-[#0066CC] hover:bg-blue-50 rounded-[3px] transition-colors"
                              title="View on Live Storefront"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                            <button
                              type="button"
                              onClick={() => handleEdit(prod)}
                              className="p-1.5 text-slate-400 hover:text-[#0066CC] hover:bg-blue-50 rounded-[3px] transition-colors"
                              title="Edit product"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(prod.id, prod.name)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-[3px] transition-colors"
                              title="Delete product"
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
      ) : (
        /* Grid Cards View */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-[4px] border border-slate-200 hover:border-[#0066CC] p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] rounded-[3px] overflow-hidden bg-slate-100 border border-slate-100 mb-3">
                  {prod.frontImage ? (
                    <Image
                      src={prod.frontImage}
                      alt={prod.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}
                  {prod.isFeatured && (
                    <div className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-heading font-bold px-2 py-0.5 rounded-[3px] flex items-center gap-1 shadow-md">
                      <Star className="w-3 h-3 fill-white text-white" />
                      Featured
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    {prod.category}
                  </span>
                  <h3 className="text-sm font-heading font-bold text-[#0A2540] truncate" title={prod.name}>
                    {prod.name}
                  </h3>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleToggleFeatured(prod)}
                  className={`text-[10px] font-heading font-bold px-2 py-1 rounded-[3px] transition-colors ${
                    prod.isFeatured
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {prod.isFeatured ? "★ Featured" : "Feature"}
                </button>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleEdit(prod)}
                    className="p-1.5 text-slate-400 hover:text-[#0066CC] hover:bg-blue-50 rounded-[3px] transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(prod.id, prod.name)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-[3px] transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Form Modal */}
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
