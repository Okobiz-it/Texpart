"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AdminNavbar from "@/components/AdminNavbar";
import ProductManagementView from "@/components/ProductManagementView";
import { JobDivision } from "@/types";
import { Loader2 } from "lucide-react";

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const divParam = searchParams.get("division");
  const selectedDivision: JobDivision | "all" =
    divParam && [
      "all",
      "commercial-printing",
      "garments-accessories",
      "packaging-solutions",
      "promotional-products",
      "corporate-projects",
      "apparel-projects",
      "private-jobs",
      "commercial-jobs",
    ].includes(divParam)
      ? (divParam as any)
      : "all";

  const selectedCategory = searchParams.get("category") || "";

  const divisionsList: {
    id: JobDivision | "all";
    label: string;
    title: string;
    subtitle: string;
    icon: string;
  }[] = [
    {
      id: "all",
      label: "All Products",
      title: "All Products & Catalog",
      subtitle: "Comprehensive overview of all products across all manufacturing divisions.",
      icon: "package",
    },
    {
      id: "commercial-printing",
      label: "Commercial Printing",
      title: "Commercial Printing Solutions",
      subtitle: "Manage business cards, flyers, brochures, catalogues, calendars, posters, stickers, and books.",
      icon: "printer",
    },
    {
      id: "garments-accessories",
      label: "Garments Accessories",
      title: "Garments Accessories & Trims",
      subtitle: "Manage woven labels, hangtags, heat transfers, leather patches, drawstrings, tapes, and buttons.",
      icon: "shirt",
    },
    {
      id: "packaging-solutions",
      label: "Packaging",
      title: "Packaging Solutions & Cartons",
      subtitle: "Manage paper bags, printed cartons, luxury rigid gift boxes, self-adhesive bags, and tissue wraps.",
      icon: "package",
    },
    {
      id: "promotional-products",
      label: "Promotional Products",
      title: "Promotional Products & Merchandise",
      subtitle: "Manage promotional pens, branded notebooks, diaries, calendars, mugs, key rings, and corporate gifts.",
      icon: "gift",
    },
    {
      id: "corporate-projects",
      label: "Corporate Projects",
      title: "Corporate Projects & Branding",
      subtitle: "Manage annual reports, corporate identity suites, presentation folders, and event collateral.",
      icon: "briefcase",
    },
    {
      id: "apparel-projects",
      label: "Apparel Projects",
      title: "Apparel Projects & Trims",
      subtitle: "Manage complete denim trim packages, outerwear badges, heat transfers, and export trims.",
      icon: "scissors",
    },
    {
      id: "private-jobs",
      label: "Private Jobs (Legacy)",
      title: "Private Apparel Trims",
      subtitle: "Legacy trims, woven labels, and apparel accessories.",
      icon: "shirt",
    },
    {
      id: "commercial-jobs",
      label: "Commercial Jobs (Legacy)",
      title: "Commercial Jobs (Print & Promo)",
      subtitle: "Legacy commercial print items.",
      icon: "printer",
    },
  ];

  const currentDiv = divisionsList.find((d) => d.id === selectedDivision) || divisionsList[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminNavbar title="Products & Range" subtitle={currentDiv.title} />

      <ProductManagementView
        key={`${currentDiv.id}-${selectedCategory}`}
        division={currentDiv.id}
        title={currentDiv.title}
        subtitle={currentDiv.subtitle}
        icon={currentDiv.icon as any}
        initialCategory={selectedCategory}
      />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#0066CC]" />
        </div>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
}
