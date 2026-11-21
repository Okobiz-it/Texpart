import React from "react";
import { Metadata } from "next";
import { SERVICES_DATA } from "@/data/services";
import ServiceDetailClient from "../../services/[slug]/ServiceDetailClient";

export const metadata: Metadata = {
  title: "Corporate Projects Work & Products — Texpart Design & Accessories",
  description: "Browse annual reports, corporate identity packages, event backdrops, folders, and executive gifts.",
};

export default function WorkCorporateProjectsPage() {
  return <ServiceDetailClient service={SERVICES_DATA["corporate-projects"]} />;
}
