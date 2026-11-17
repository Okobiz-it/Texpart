"use client";

import React from "react";
import { useParams } from "next/navigation";
import AdminNavbar from "@/components/AdminNavbar";
import ProductForm from "@/components/ProductForm";

export default function EditProductPage() {
  const params = useParams();
  const productId = typeof params?.id === "string" ? params.id : Array.isArray(params?.id) ? params.id[0] : "";

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminNavbar title="Products & Range" subtitle="Edit Product" />
      <ProductForm productId={productId} />
    </div>
  );
}
