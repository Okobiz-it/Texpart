import React from "react";
import AdminNavbar from "@/components/AdminNavbar";
import ProductManagementView from "@/components/ProductManagementView";

export default function CommercialJobsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminNavbar title="Products & Range" subtitle="Commercial Jobs" />
      <ProductManagementView
        division="commercial-jobs"
        title="Commercial Jobs (Printing & Packaging Solutions)"
        subtitle="Create, update, and manage corporate stationery, brochures, flyers, calendars, and luxury packaging."
        icon="printer"
      />
    </div>
  );
}
