"use client";

import React from "react";
import { Star } from "lucide-react";

interface ProductFormFeaturedToggleProps {
  isFeatured: boolean;
  setIsFeatured: (val: boolean) => void;
}

export default function ProductFormFeaturedToggle({
  isFeatured,
  setIsFeatured,
}: ProductFormFeaturedToggleProps) {
  return (
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
            <span className="text-xs font-heading font-black uppercase tracking-wider text-[#0A2540]">
              Feature on Home Page
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
            Featured products display prominently in the &ldquo;Our Product Range&rdquo; carousel on the home page. Total limit is 10 products across all divisions.
          </p>
        </div>
      </label>
    </div>
  );
}
