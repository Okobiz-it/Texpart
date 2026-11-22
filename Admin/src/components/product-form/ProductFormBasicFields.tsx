"use client";

import React from "react";
import Link from "next/link";
import { Package, Lock, ExternalLink } from "lucide-react";
import { JobDivision } from "@/types";
import { slugify } from "@/lib/slugify";

const DIVISION_LABELS: Record<string, string> = {
  "commercial-printing": "Commercial Printing",
  "garments-accessories": "Garments Accessories",
  "packaging-solutions": "Packaging",
  "promotional-products": "Promotional Products",
  "private-jobs": "Private Jobs",
  "commercial-jobs": "Commercial Jobs",
};

interface ProductFormBasicFieldsProps {
  name: string;
  setName: (name: string) => void;
  slug: string;
  setSlug: (slug: string) => void;
  division: JobDivision;
  setDivision: (div: JobDivision) => void;
  category: string;
  setCategory: (cat: string) => void;
  isDivisionLocked?: boolean;
  isEditMode: boolean;
  currentCategorySuggestions: string[];
}

export default function ProductFormBasicFields({
  name,
  setName,
  slug,
  setSlug,
  division,
  setDivision,
  category,
  setCategory,
  isDivisionLocked,
  isEditMode,
  currentCategorySuggestions,
}: ProductFormBasicFieldsProps) {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (!isEditMode) {
      setSlug(slugify(newName));
    }
  };

  return (
    <div className="bg-white p-5 sm:p-6 rounded-[4px] border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-[#0066CC]" />
          <h3 className="text-xs font-heading font-black uppercase tracking-wider text-[#0A2540]">
            1. Basic Identification &amp; Division
          </h3>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">
          Catalog Assignment
        </span>
      </div>

      {/* Row 1: 1. Product Name & 2. Division (Fixed) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* 1. Product Name */}
        <div>
          <label className="block text-xs font-heading font-bold uppercase text-[#0A2540] mb-1.5">
            Product Name <span className="text-[#0066CC]">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={handleNameChange}
            placeholder="e.g. Luxury Rigid Gift Box, Damask Woven Label"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] font-medium focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
          />
        </div>

        {/* 2. Division */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-heading font-bold uppercase text-[#0A2540]">
              Division <span className="text-[#0066CC]">*</span>
            </label>
            {isDivisionLocked && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">
                <Lock className="w-2.5 h-2.5" />
                Fixed for this section
              </span>
            )}
          </div>

          {isDivisionLocked ? (
            <div className="w-full px-3.5 py-2.5 bg-slate-100/90 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] font-bold flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0066CC]" />
                <span>{DIVISION_LABELS[division] || division}</span>
              </div>
              <Lock className="w-3.5 h-3.5 text-slate-400" />
            </div>
          ) : (
            <select
              value={division}
              onChange={(e) => {
                const newDiv = e.target.value as JobDivision;
                setDivision(newDiv);
              }}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] font-semibold focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all cursor-pointer"
            >
              <option value="commercial-printing">Commercial Printing</option>
              <option value="garments-accessories">Garments Accessories</option>
              <option value="packaging-solutions">Packaging</option>
              <option value="promotional-products">Promotional Products</option>
              <option value="private-jobs">Private Jobs (Legacy)</option>
              <option value="commercial-jobs">Commercial Jobs (Legacy)</option>
            </select>
          )}
        </div>
      </div>

      {/* Row 2: 3. Child Category & 4. Slug */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
        {/* 3. Child Category Select */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-heading font-bold uppercase text-[#0A2540]">
              Child Category <span className="text-[#0066CC]">*</span>
            </label>
            <Link
              href={`/categories?division=${division}`}
              target="_blank"
              className="text-[10px] text-[#0066CC] hover:underline font-bold inline-flex items-center gap-0.5"
            >
              <span>Manage Categories</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </Link>
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] font-semibold focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all cursor-pointer"
            required
          >
            <option value="">Select Child Category...</option>
            {currentCategorySuggestions.map((catName) => (
              <option key={catName} value={catName}>
                {catName}
              </option>
            ))}
          </select>
        </div>

        {/* 4. Slug */}
        <div>
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
            onChange={(e) => setSlug(slugify(e.target.value))}
            placeholder="product-slug"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-[#0A2540] font-mono focus:bg-white focus:outline-none focus:border-[#0066CC] transition-all"
          />
          <p className="text-[10px] text-slate-400 mt-1 font-mono">
            Live URI: /products/{slug || "slug"}
          </p>
        </div>
      </div>
    </div>
  );
}
