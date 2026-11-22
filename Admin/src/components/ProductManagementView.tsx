"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Star,
  Loader2,
  AlertCircle,
  LayoutGrid,
  List,
  CheckCircle2,
  X,
  FolderTree,
} from "lucide-react";
import { ProductItem, JobDivision } from "@/types";
import { ADMIN_DIVISIONS } from "@/data/divisions";
import AdminPagination from "@/components/AdminPagination";
import ProductTableRow from "./product-management/ProductTableRow";
import ProductGridCard from "./product-management/ProductGridCard";

interface ProductManagementViewProps {
  division: JobDivision | "all";
  title: string;
  subtitle: string;
  icon?: string;
  initialCategory?: string;
}

export default function ProductManagementView({
  division,
  title,
  subtitle,
  initialCategory,
}: ProductManagementViewProps) {
  const router = useRouter();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [totalFeaturedCount, setTotalFeaturedCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || "");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (initialCategory !== undefined) {
      setSelectedCategory(initialCategory);
      setCurrentPage(1);
    }
  }, [initialCategory]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const url = division === "all" ? `/api/products` : `/api/products?division=${division}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success && Array.isArray(data.products)) {
        setProducts(data.products);
        if (typeof data.totalFeaturedCount === "number") {
          setTotalFeaturedCount(data.totalFeaturedCount);
        } else {
          setTotalFeaturedCount(data.products.filter((p: any) => p.isFeatured).length);
        }
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

  const featuredCount = totalFeaturedCount;

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
          text:
            data.error ||
            "Maximum 10 featured products allowed in total across all products. Unfeature another product first.",
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
        setFeedbackMessage({
          type: "success",
          text: `Product "${name}" deleted successfully.`,
        });
        setTimeout(() => setFeedbackMessage(null), 3000);
        fetchProducts();
      } else {
        alert(data.error || "Failed to delete product");
      }
    } catch (err) {
      alert("Error connecting to server");
    }
  };

  const [dbCategories, setDbCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch(`/api/categories?division=${division}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success && Array.isArray(d.categories)) {
          setDbCategories(d.categories.map((c: any) => c.name));
        }
      })
      .catch(() => {});
  }, [division]);

  const currentDivConfig = ADMIN_DIVISIONS.find((d) => d.id === division);
  const staticCategories = currentDivConfig ? currentDivConfig.items.map((i) => i.name) : [];
  const divisionCategories = Array.from(new Set([...dbCategories, ...staticCategories]));

  const filteredProducts = products.filter((p) => {
    const matchSearch =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase().trim()));

    const matchCategory =
      !selectedCategory ||
      (p.category && p.category.toLowerCase() === selectedCategory.toLowerCase()) ||
      (p.name && p.name.toLowerCase().includes(selectedCategory.toLowerCase()));

    return matchSearch && matchCategory;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (safeCurrentPage - 1) * PAGE_SIZE,
    safeCurrentPage * PAGE_SIZE
  );

  return (
    <div className="w-full px-6 sm:px-8 py-6 space-y-6">
      {/* Sleek Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-heading font-black text-[#0A2540] tracking-tight">
              {title}
            </h1>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[10px] font-mono font-bold uppercase bg-amber-50 text-amber-800 border border-amber-200">
              <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
              Featured: {featuredCount}/10
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2.5 flex-shrink-0">
          <Link
            href={`/categories?division=${division === "all" ? "commercial-printing" : division}`}
            className="px-3.5 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-heading font-bold rounded-[4px] shadow-xs inline-flex items-center gap-1.5 transition-colors"
          >
            <FolderTree className="w-3.5 h-3.5 text-slate-500" />
            <span>Manage Categories</span>
          </Link>

          <Link
            href={`/products/new?division=${division}`}
            className="px-4 py-2 bg-[#0066CC] hover:bg-[#0052CC] text-white text-xs font-heading font-bold uppercase rounded-[4px] inline-flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
        </div>
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
            placeholder="Search by product name or slug..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
          />
        </div>

        {/* Category Dropdown Filter */}
        {divisionCategories.length > 0 && (
          <div className="w-full sm:w-64 flex-shrink-0">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all cursor-pointer"
            >
              <option value="">All Categories ({products.length})</option>
              {divisionCategories.map((catName) => {
                const count = products.filter(
                  (p) =>
                    p.category?.toLowerCase() === catName.toLowerCase() ||
                    p.name?.toLowerCase().includes(catName.toLowerCase())
                ).length;
                return (
                  <option key={catName} value={catName}>
                    {catName} {count > 0 ? `(${count})` : ""}
                  </option>
                );
              })}
            </select>
          </div>
        )}

        {/* View Toggle (Table / Grid) */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-[4px] flex-shrink-0">
          <button
            type="button"
            onClick={() => setViewMode("table")}
            className={`p-1.5 rounded-[4px] transition-all ${
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
            className={`p-1.5 rounded-[4px] transition-all ${
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

      {/* Active Category Filter Indicator */}
      {selectedCategory && (
        <div className="flex items-center gap-2 px-1">
          <span className="text-xs text-slate-500 font-medium">Filtered by category:</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-blue-50 text-[#0066CC] text-xs font-bold border border-blue-200">
            <span>{selectedCategory}</span>
            <button
              type="button"
              onClick={() => setSelectedCategory("")}
              className="p-0.5 hover:bg-blue-100 rounded text-blue-600 hover:text-blue-900 transition-colors"
              title="Clear category filter"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </span>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("");
              setSearchQuery("");
            }}
            className="text-xs text-slate-400 hover:text-[#0066CC] underline ml-2"
          >
            Reset all filters
          </button>
        </div>
      )}

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
                onClick={() => setSearchQuery("")}
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
                  <th className="px-4 py-3 text-center">Home Featured (Max 10)</th>
                  <th className="px-4 py-3">Images</th>
                  <th className="px-4 py-3">Slug Preview</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Loader2 className="w-6 h-6 animate-spin text-[#0066CC]" />
                        <span>Loading {title} from MongoDB...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center space-y-2">
                      <p className="font-heading font-bold text-slate-600 text-sm">
                        No products found
                      </p>
                      <p className="text-xs text-slate-400">
                        Click &ldquo;Add Product&rdquo; above to create your first item in this division.
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedProducts.map((prod) => (
                    <ProductTableRow
                      key={prod.id}
                      prod={prod}
                      isToggling={togglingId === prod.id}
                      onToggleFeatured={handleToggleFeatured}
                      onDelete={handleDelete}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          <AdminPagination
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            totalItems={filteredProducts.length}
            pageSize={PAGE_SIZE}
            onPageChange={setCurrentPage}
            itemLabel="products"
          />
        </div>
      ) : (
        /* Grid Cards View */
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginatedProducts.map((prod) => (
              <ProductGridCard
                key={prod.id}
                prod={prod}
                onToggleFeatured={handleToggleFeatured}
                onDelete={handleDelete}
              />
            ))}
          </div>

          <div className="bg-white rounded-[4px] border border-slate-200 shadow-sm overflow-hidden">
            <AdminPagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              totalItems={filteredProducts.length}
              pageSize={PAGE_SIZE}
              onPageChange={setCurrentPage}
              itemLabel="products"
            />
          </div>
        </div>
      )}
    </div>
  );
}
