import React from "react";
import ProductManagementView from "@/components/ProductManagementView";

export default function PrivateJobsPage() {
  return (
    <ProductManagementView
      division="private-jobs"
      title="Privet Jobs (Apparel Accessories & Packaging)"
      subtitle="Create, update, and manage garment trims, labels, zippers, packaging cartons, and accessories."
      icon="shirt"
    />
  );
}
