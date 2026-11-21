import React from "react";
import { Metadata } from "next";
import { SERVICES_DATA } from "@/data/services";
import ServiceDetailClient from "../services/[slug]/ServiceDetailClient";

export const metadata: Metadata = {
  title: "Packaging Solutions — Texpart Design & Accessories",
  description: "Paper bags, printed boxes, luxury rigid gift boxes, self-adhesive bags, tissue paper, and customized retail packaging.",
};

export default function PackagingSolutionsPage() {
  return <ServiceDetailClient service={SERVICES_DATA["packaging-solutions"]} />;
}
