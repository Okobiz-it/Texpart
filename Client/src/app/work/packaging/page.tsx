import React from "react";
import { Metadata } from "next";
import { SERVICES_DATA } from "@/data/services";
import ServiceDetailClient from "../../services/[slug]/ServiceDetailClient";

export const metadata: Metadata = {
  title: "Packaging Work & Products — Texpart Design & Accessories",
  description: "Browse paper bags, printed boxes, luxury rigid gift boxes, poly packaging, and retail boxes.",
};

export default function WorkPackagingPage() {
  return <ServiceDetailClient service={SERVICES_DATA["packaging"]} />;
}
