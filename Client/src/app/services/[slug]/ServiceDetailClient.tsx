"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ServiceDetail } from "@/data/services";
import { PRODUCTS } from "@/data/products";
import { getCategorySlug, getCategoryNameFromSlug } from "@/data/siteNavigation";
import ProductCard from "@/components/ProductCard";
import { useQuote } from "@/context/QuoteContext";
import {
  ArrowRight,
  ChevronRight,
  Search,
  X,
  Loader2,
  Sparkles,
  Layers,
} from "lucide-react";

interface ServiceDetailClientProps {
  service: ServiceDetail;
}

const ITEMS_PER_PAGE = 18;

export default function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  const { openQuote } = useQuote();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Categories list: built from official sub-items + categories present in products
  const categoryOptions = React.useMemo(() => {
    const set = new Set<string>();
    if (service.categoryItems && service.categoryItems.length > 0) {
      service.categoryItems.forEach((item) => set.add(item.name));
    }
    products.forEach((p) => {
      if (p.category && p.category !== "General") set.add(p.category);
    });
    return ["All", ...Array.from(set)];
  }, [service.categoryItems, products]);

  // Sync category from URL search params on client mount and when URL changes
  useEffect(() => {
    const syncFromUrl = () => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const cat = params.get("category");
        if (cat) {
          const candidatePool = [
            ...(service.categoryItems || []),
            ...categoryOptions.filter((c) => c !== "All"),
          ];
          const resolvedName = getCategoryNameFromSlug(cat, candidatePool);
          setSelectedCategory(resolvedName);
          setCurrentPage(1);
          // Standardize address bar using slugify
          const cleanSlug = getCategorySlug(resolvedName);
          if (cleanSlug === "all") {
            window.history.replaceState(null, "", window.location.pathname);
          } else if (cat !== cleanSlug) {
            window.history.replaceState(null, "", `${window.location.pathname}?category=${cleanSlug}`);
          }
        } else {
          setSelectedCategory("All");
          setCurrentPage(1);
        }
      }
    };

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, [service.categoryItems, categoryOptions]);

  useEffect(() => {
    let isMounted = true;
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/products?division=${service.slug}`);
        const data = await res.json();
        if (isMounted) {
          if (data.success && Array.isArray(data.products) && data.products.length > 0) {
            setProducts(data.products);
          } else {
            // Intelligent fallback from PRODUCTS dataset based on division
            let fallback: any[] = [];
            if (service.slug === "commercial-printing" || service.slug === "commercial-jobs") {
              fallback = PRODUCTS.filter((p) => p.collectionId === "commercial");
            } else if (service.slug === "garments-accessories" || service.slug === "private-jobs") {
              fallback = PRODUCTS.filter((p) => p.collectionId === "accessories");
            } else if (service.slug === "packaging-solutions") {
              fallback = PRODUCTS.filter(
                (p) =>
                  p.name.toLowerCase().includes("box") ||
                  p.name.toLowerCase().includes("packaging") ||
                  p.category.toLowerCase().includes("packaging") ||
                  p.id === "boxes-cartons"
              );
            } else if (service.slug === "promotional-products") {
              fallback = PRODUCTS.filter(
                (p) =>
                  p.collectionId === "commercial" ||
                  p.name.toLowerCase().includes("calendar") ||
                  p.name.toLowerCase().includes("notebook")
              );
            }
            if (fallback.length === 0) {
              fallback = PRODUCTS.slice(0, 8);
            }
            setProducts(fallback);
          }
        }
      } catch (err) {
        console.error("Failed to load products from API", err);
        if (isMounted) {
          setProducts(PRODUCTS.slice(0, 8));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, [service.slug]);


  // Filter products by category and search query
  const filteredProducts = products.filter((p) => {
    // Category match
    if (selectedCategory !== "All") {
      const matchCat =
        p.category?.toLowerCase() === selectedCategory.toLowerCase() ||
        p.name?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        selectedCategory.toLowerCase().includes(p.name?.toLowerCase());
      if (!matchCat) return false;
    }

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.shortDesc && p.shortDesc.toLowerCase().includes(q)) ||
        (p.fullDesc && p.fullDesc.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q));
      if (!matchSearch) return false;
    }

    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const section = document.getElementById("products-catalog");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    if (typeof window !== "undefined") {
      const cleanSlug = getCategorySlug(cat);
      const newUrl =
        cleanSlug === "all"
          ? window.location.pathname
          : `${window.location.pathname}?category=${cleanSlug}`;
      window.history.replaceState(null, "", newUrl);
      window.dispatchEvent(new Event("popstate"));
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setCurrentPage(1);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", window.location.pathname);
      window.dispatchEvent(new Event("popstate"));
    }
  };

  return (
    <div className="bg-white min-h-screen text-[#0A2540]">
      {/* 1. HERO BANNER */}
      <section className="pt-24 sm:pt-28 pb-12 sm:pb-16 bg-gradient-to-r from-[#061730] via-[#0A2540] to-[#003B73] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-heading font-medium text-slate-300 mb-3 uppercase tracking-wider">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-blue-400">{service.title}</span>
          </nav>

          <div className="max-w-4xl space-y-3">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black uppercase tracking-tight text-white leading-tight">
              YOUR COMPLETE PARTNER <br />
              <span className="text-blue-400">FOR {service.title}</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-light leading-relaxed">
              {service.description}
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => openQuote(`${service.title} Inquiries`, service.title)}
                className="px-5 py-2.5 rounded-[4px] bg-[#0066CC] hover:bg-[#0052CC] text-white text-xs font-heading font-bold uppercase tracking-wider transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCTS CATALOG SECTION */}
      <section id="products-catalog" className="py-8 sm:py-12 bg-slate-50 border-b border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Bar with Search & Clean Layout */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
            <div className="space-y-1 max-w-xl">
              <h2 className="text-xl sm:text-2xl font-heading font-black text-[#0A2540]">
                {service.title} Range
              </h2>
              <p className="text-xs text-slate-500 font-normal">
                Authentic product categories manufactured with export-grade standards. Click any item to explore specifications.
              </p>
            </div>

            {/* Clean, Senior UI Search Bar */}
            <div className="relative w-full md:w-80 lg:w-96 flex-shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search products by name or keyword..."
                className="w-full pl-10 pr-9 py-2 bg-white border border-slate-300 hover:border-slate-400 focus:border-[#0066CC] rounded-[4px] text-xs text-[#0A2540] placeholder:text-slate-400 shadow-xs focus:outline-none focus:ring-1 focus:ring-[#0066CC] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Clean Category Filter Pills (Recolored Sleek Custom Scrollbar) */}
          {categoryOptions.length > 1 && (
            <div className="mb-6 overflow-x-auto pb-2 category-scrollbar">
              <div className="flex items-center gap-1.5 min-w-max">
                {categoryOptions.map((cat) => {
                  const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategorySelect(cat)}
                      className={`px-3 py-1.5 rounded-[4px] text-xs font-heading font-semibold transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#0066CC] text-white shadow-xs"
                          : "bg-white text-slate-600 hover:bg-slate-100 hover:text-[#0A2540] border border-slate-200"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Active Filter Indicator */}
          {(searchQuery || selectedCategory !== "All") && (
            <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
              <span>
                Showing <strong className="text-[#0A2540]">{filteredProducts.length}</strong> products
                {selectedCategory !== "All" && (
                  <> in category &ldquo;<strong className="text-[#0A2540]">{selectedCategory}</strong>&rdquo;</>
                )}
                {searchQuery && (
                  <> matching &ldquo;<strong className="text-[#0A2540]">{searchQuery}</strong>&rdquo;</>
                )}
              </span>
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-[#0066CC] hover:underline font-bold cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Loading State */}
          {isLoading ? (
            <div className="bg-white border border-slate-200 rounded-[4px] py-20 px-4 text-center flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-8 h-8 text-[#0066CC] animate-spin" />
              <p className="text-xs font-heading font-bold text-slate-600 uppercase tracking-wider">
                Loading products catalog...
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            /* Elegant, Spacious Vector Empty State */
            <div className="bg-white border border-slate-200/90 rounded-2xl py-14 sm:py-20 px-8 sm:px-14 text-center max-w-2xl mx-auto my-8 shadow-xs">
              <div className="w-20 h-20 rounded-2xl bg-blue-50/80 border border-blue-100 text-[#0066CC] mx-auto flex items-center justify-center mb-5 shadow-xs">
                <svg
                  className="w-10 h-10 text-[#0066CC]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                  <circle cx="17.5" cy="17.5" r="2.5" stroke="#0066CC" strokeWidth="1.8" fill="white" />
                  <line x1="19.3" y1="19.3" x2="21" y2="21" stroke="#0066CC" strokeWidth="1.8" />
                </svg>
              </div>

              <h3 className="text-xl sm:text-2xl font-heading font-black text-[#0A2540] tracking-tight">
                No Products Found
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-lg mx-auto leading-relaxed font-normal">
                No products currently match category &ldquo;<span className="text-[#0A2540] font-semibold">{selectedCategory}</span>&rdquo;. You can explore all items in {service.title} or request a custom manufactured production quote.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="px-5 py-2.5 border border-slate-300 text-slate-700 hover:text-[#0A2540] text-xs font-heading font-bold uppercase tracking-wider rounded-[4px] hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  View All Products
                </button>
                <button
                  type="button"
                  onClick={() => openQuote(selectedCategory !== "All" ? selectedCategory : service.title, service.title)}
                  className="px-5 py-2.5 bg-[#0066CC] hover:bg-[#0052CC] text-white text-xs font-heading font-bold uppercase tracking-wider rounded-[4px] transition-colors cursor-pointer inline-flex items-center gap-2 shadow-xs"
                >
                  <span>Request a Custom Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Product Cards Grid — Exactly Matching Home Page Scale & Previous Services Design */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id || product.slug} product={product} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-8 sm:mt-10 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-slate-500 font-normal">
                    Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                    {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of{" "}
                    {filteredProducts.length} products
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="px-3 py-1.5 text-xs font-heading font-semibold rounded-[4px] border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handlePageChange(num)}
                        className={`w-7 h-7 text-xs font-heading font-semibold rounded-[4px] transition-colors ${
                          currentPage === num
                            ? "bg-[#0066CC] text-white"
                            : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-300"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="px-3 py-1.5 text-xs font-heading font-semibold rounded-[4px] border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
