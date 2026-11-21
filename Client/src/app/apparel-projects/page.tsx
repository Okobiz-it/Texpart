import React from "react";
import { Metadata } from "next";
import { SERVICES_DATA } from "@/data/services";
import ServiceDetailClient from "../services/[slug]/ServiceDetailClient";

export const metadata: Metadata = {
  title: "Apparel Projects — Texpart Design & Accessories",
  description: "Denim trim suites, outerwear badges, sportswear stretch transfers, and global garment accessories.",
};

export default function ApparelProjectsPage() {
  return <ServiceDetailClient service={SERVICES_DATA["apparel-projects"]} />;
}
