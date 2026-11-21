import React from "react";
import AdminNavbar from "@/components/AdminNavbar";
import ProductManagementView from "@/components/ProductManagementView";

export default function PrivateJobsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminNavbar title="Products & Range" subtitle="Private Jobs" />
      <ProductManagementView
        division="private-jobs"
        title="Private Jobs (Apparel Accessories & Packaging)"
        subtitle="Create, update, and manage garment trims, labels, zippers, packaging cartons, and accessories."
        icon="shirt"
      />
    </div>
  );
}
