"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AdminNavbar from "@/components/AdminNavbar";
import QuotationForm from "@/components/quotation/quotation-form";
import { Loader2 } from "lucide-react";

function CreateQuotationContent() {
  const searchParams = useSearchParams();

  const initialData = {
    client_name: searchParams.get("name") || searchParams.get("client_name") || "",
    organization_name: searchParams.get("org") || searchParams.get("organization_name") || "",
    email: searchParams.get("email") || "",
    phone: searchParams.get("phone") || "",
    subject: searchParams.get("subject") || "",
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminNavbar title="Quotations" subtitle="Create Quotation" />
      <QuotationForm initialData={initialData} isEdit={false} />
    </div>
  );
}

export default function CreateQuotationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#0066CC] animate-spin" />
        </div>
      }
    >
      <CreateQuotationContent />
    </Suspense>
  );
}
