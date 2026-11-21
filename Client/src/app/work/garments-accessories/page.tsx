import React from "react";
import { Metadata } from "next";
import { SERVICES_DATA } from "@/data/services";
import ServiceDetailClient from "../../services/[slug]/ServiceDetailClient";

export const metadata: Metadata = {
  title: "Garments Accessories Work & Products — Texpart Design & Accessories",
  description: "Browse export-grade garment accessories, woven labels, hangtags, heat transfers, leather patches, and apparel trims.",
};

export default function WorkGarmentsAccessoriesPage() {
  return <ServiceDetailClient service={SERVICES_DATA["garments-accessories"]} />;
}
