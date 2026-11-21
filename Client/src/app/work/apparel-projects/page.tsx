import React from "react";
import { Metadata } from "next";
import { SERVICES_DATA } from "@/data/services";
import ServiceDetailClient from "../../services/[slug]/ServiceDetailClient";

export const metadata: Metadata = {
  title: "Apparel Projects Work & Products — Texpart Design & Accessories",
  description: "Browse denim trims, outerwear molded badges, sportswear heat transfers, and export apparel accessories.",
};

export default function WorkApparelProjectsPage() {
  return <ServiceDetailClient service={SERVICES_DATA["apparel-projects"]} />;
}
