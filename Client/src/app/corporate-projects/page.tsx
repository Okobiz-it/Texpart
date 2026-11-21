import React from "react";
import { Metadata } from "next";
import { SERVICES_DATA } from "@/data/services";
import ServiceDetailClient from "../services/[slug]/ServiceDetailClient";

export const metadata: Metadata = {
  title: "Corporate Projects — Texpart Design & Accessories",
  description: "Annual reports, corporate identity suites, presentation folders, exhibition backdrops, and executive gifts.",
};

export default function CorporateProjectsPage() {
  return <ServiceDetailClient service={SERVICES_DATA["corporate-projects"]} />;
}
