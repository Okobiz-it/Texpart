"use client";

import React, { useState } from "react";
import AdminNavbar from "@/components/AdminNavbar";
import ProductManagementView from "@/components/ProductManagementView";

export default function ProductsPage() {
  const [selectedDivision, setSelectedDivision] = useState<"private-jobs" | "commercial-jobs">("private-jobs");

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminNavbar title="Products & Range" subtitle="Catalog Management" />

      {/* Division Selector Header */}
      <div className="bg-white border-b border-slate-200 px-6 sm:px-8 pt-3 pb-0 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedDivision("private-jobs")}
            className={`px-4 py-2.5 text-xs font-heading font-bold uppercase tracking-wider border-b-2 transition-colors ${
              selectedDivision === "private-jobs"
                ? "border-[#0066CC] text-[#0066CC]"
                : "border-transparent text-slate-500 hover:text-[#0A2540]"
            }`}
          >
            Private Jobs (Apparel Accessories &amp; Packaging)
          </button>
          <button
            type="button"
            onClick={() => setSelectedDivision("commercial-jobs")}
            className={`px-4 py-2.5 text-xs font-heading font-bold uppercase tracking-wider border-b-2 transition-colors ${
              selectedDivision === "commercial-jobs"
                ? "border-[#0066CC] text-[#0066CC]"
                : "border-transparent text-slate-500 hover:text-[#0A2540]"
            }`}
          >
            Commercial Jobs (Printing &amp; Packaging)
          </button>
        </div>
      </div>

      {selectedDivision === "private-jobs" ? (
        <ProductManagementView
          division="private-jobs"
          title="Private Jobs (Apparel Accessories & Packaging)"
          subtitle="Create, update, and manage garment trims, labels, zippers, packaging cartons, and accessories."
          icon="shirt"
        />
      ) : (
        <ProductManagementView
          division="commercial-jobs"
          title="Commercial Jobs (Printing & Packaging)"
          subtitle="Manage corporate brochures, calendars, luxury gift boxes, notebooks, and commercial print items."
          icon="printer"
        />
      )}
    </div>
  );
}
