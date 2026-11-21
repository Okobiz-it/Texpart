import React from "react";
import { Metadata } from "next";
import { SERVICES_DATA } from "@/data/services";
import ServiceDetailClient from "../../services/[slug]/ServiceDetailClient";

export const metadata: Metadata = {
  title: "Promotional Products Work & Catalog — Texpart Design & Accessories",
  description: "Browse promotional pens, notebooks, diaries, calendars, mugs, lanyards, caps, T-shirts, and corporate gifts.",
};

export default function WorkPromotionalProductsPage() {
  return <ServiceDetailClient service={SERVICES_DATA["promotional-products"]} />;
}
