"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AdminNavbar from "@/components/AdminNavbar";
import ProductForm from "@/components/ProductForm";
import { JobDivision } from "@/types";
import { Loader2 } from "lucide-react";

function ProductNewContent() {
  const searchParams = useSearchParams();
  const rawDivision = searchParams.get("division");
  const initialDivision: JobDivision =
    rawDivision === "commercial-jobs" ? "commercial-jobs" : "private-jobs";

  return <ProductForm initialDivision={initialDivision} />;
}

export default function NewProductPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminNavbar title="Products & Range" subtitle="Create New Product" />
      <Suspense
        fallback={
          <div className="w-full px-6 py-16 flex items-center justify-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-[#0066CC]" />
            <span className="text-xs font-heading font-medium text-slate-500">
              Initializing product creator...
            </span>
          </div>
        }
      >
        <ProductNewContent />
      </Suspense>
    </div>
  );
}
