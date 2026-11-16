"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ServiceDetail } from "@/data/services";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useQuote } from "@/context/QuoteContext";
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Shirt,
  Search,
  X,
  Loader2,
} from "lucide-react";

interface ServiceDetailClientProps {
  service: ServiceDetail;
}

const ITEMS_PER_PAGE = 18;

export default function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  const { openQuote } = useQuote();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isPrivate = service.slug === "private-jobs";

  useEffect(() => {
    let isMounted = true;
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const divisionKey = isPrivate ? "private-jobs" : "commercial-jobs";
        const res = await fetch(`/api/products?division=${divisionKey}`);
        const data = await res.json();
        if (isMounted) {
          if (data.success && Array.isArray(data.products) && data.products.length > 0) {
            setProducts(data.products);
          } else {
            // Fallback only if database is completely empty
            const defaultProducts = PRODUCTS.filter((p) =>
              isPrivate ? p.collectionId === "accessories" : p.collectionId === "commercial"
            );
            setProducts(defaultProducts);
          }
        }
      } catch (err) {
        console.error("Failed to load products from API", err);
        if (isMounted) {
          const defaultProducts = PRODUCTS.filter((p) =>
            isPrivate ? p.collectionId === "accessories" : p.collectionId === "commercial"
          );
          setProducts(defaultProducts);
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
  }, [isPrivate]);

  // Filter products across all products using search query
  const filteredProducts = products.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.shortDesc && p.shortDesc.toLowerCase().includes(q)) ||
      (p.fullDesc && p.fullDesc.toLowerCase().includes(q))
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const section = document.getElementById("products");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <div className="bg-white min-h-screen text-[#0A2540]">
      {/* 1. BANNER (Height properly padded per request) */}
      <section className="pt-32 sm:pt-36 pb-14 sm:pb-16 bg-gradient-to-r from-[#061730] via-[#0A2540] to-[#003B73] text-white border-b border-white/10">
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
            <span className="text-blue-400">{isPrivate ? "Private Jobs" : "Commercial Jobs"}</span>
          </nav>

          <div className="max-w-4xl space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black uppercase tracking-tight text-white leading-tight">
              {isPrivate ? (
                <>
                  YOUR COMPLETE PARTNER <br />
                  <span className="text-blue-400">
                    FOR APPAREL ACCESSORIES &amp; PACKAGING
                  </span>
                </>
              ) : (
                <>
                  YOUR COMPLETE PARTNER <br />
                  <span className="text-blue-400">
                    FOR COMMERCIAL PRINTING &amp; PROMOTION
                  </span>
                </>
              )}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-light leading-relaxed">
              {isPrivate
                ? "End-to-end apparel development, custom trim engineering, and export packaging solutions built from scratch under one roof in Dhaka, Bangladesh."
                : "High-precision commercial offset printing, corporate stationery, luxury rigid packaging, and customized promotional products for modern brands."}
            </p>
          </div>
        </div>
      </section>

      {/* 2. DESCRIPTION (Proper full max-w-7xl width) */}
      <section className="py-8 sm:py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-black text-[#0A2540]">
              {service.headline || service.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {service.description}
            </p>

            {service.longDescription && (
              <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-1">
                {service.longDescription.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. PRODUCTS OFFERED (CLEAN SEARCH BAR UI & NO FLASHING FALLBACK DATA) */}
      <section id="products" className="py-8 sm:py-12 bg-slate-50 border-b border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header with Sleek Integrated Search Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-slate-200">
            <div className="space-y-1 max-w-2xl">
              <h2 className="text-xl sm:text-2xl font-heading font-black text-[#0A2540]">
                {isPrivate ? "Apparel Accessories & Packaging Range" : "Commercial Print & Promotional Products"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                {isPrivate
                  ? "Authentic garment trim categories directly from our Apparel Accessories brochure. Click any category for technical specifications and quotation."
                  : "Authentic commercial printing and branding items straight from our Commercial Printing brochure. Choose your products and request instant pricing."}
              </p>
            </div>

            {/* Sleek, professional search bar without nested container */}
            <div className="relative w-full md:w-80 lg:w-96 flex-shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={
                  isPrivate
                    ? "Search accessories, labels, zippers..."
                    : "Search prints, brochures, packaging..."
                }
                className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-300 hover:border-slate-400 focus:border-[#0066CC] rounded-[4px] text-xs text-[#0A2540] placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-1 focus:ring-[#0066CC] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Notice */}
          {searchQuery && !isLoading && (
            <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
              <span>
                Showing <strong className="text-[#0A2540]">{filteredProducts.length}</strong> of{" "}
                {products.length} products for &ldquo;{searchQuery}&rdquo;
              </span>
              <button
                type="button"
                onClick={handleClearSearch}
                className="text-[#0066CC] hover:underline font-bold"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Loading State: Clean Loading Icon Without Flashing Fallback Data */}
          {isLoading ? (
            <div className="bg-white border border-slate-200 rounded-[4px] py-20 px-4 text-center flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-8 h-8 text-[#0066CC] animate-spin" />
              <p className="text-xs font-heading font-bold text-slate-600 uppercase tracking-wider">
                Loading products catalogue...
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-[4px] p-10 text-center space-y-3">
              <p className="text-sm font-heading font-bold text-[#0A2540]">
                No products found matching &ldquo;{searchQuery}&rdquo;
              </p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Try searching for different keywords or clear your search to view all {products.length} items.
              </p>
              <button
                type="button"
                onClick={handleClearSearch}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0066CC] text-white text-xs font-heading font-bold uppercase rounded-[4px] hover:bg-[#0052CC] transition-colors"
              >
                Show All Products
              </button>
            </div>
          ) : (
            <>
              {/* Universal 6-column product cards grid matching home page scale */}
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
                      className="p-2 border border-slate-200 rounded-[4px] bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      aria-label="Previous Page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pageNum = idx + 1;
                      const isActive = currentPage === pageNum;
                      return (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-8 h-8 rounded-[4px] text-xs font-heading font-bold transition-colors ${
                            isActive
                              ? "bg-[#0066CC] text-white shadow-sm"
                              : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="p-2 border border-slate-200 rounded-[4px] bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      aria-label="Next Page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-[#061730] to-[#0A2540] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black uppercase text-white tracking-tight">
            Let&rsquo;s Build Your Next Export Collection
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Send us your tech packs, Pantone color targets, and quantity forecasts. Our engineering desk in Motijheel will reply with lab dips and itemized pricing within 24 hours.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => openQuote(undefined, service.title)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0066CC] hover:bg-[#0052CC] text-white px-8 py-3 rounded-[4px] font-heading text-xs font-bold uppercase tracking-wider transition-all shadow-md"
            >
              <span>Request A Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3 rounded-[4px] font-heading text-xs font-bold uppercase tracking-wider transition-all"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
