import React from "react";
import { Metadata } from "next";
import { SERVICES_DATA } from "@/data/services";
import ServiceDetailClient from "../services/[slug]/ServiceDetailClient";

export const metadata: Metadata = {
  title: "Promotional Products — Texpart Design & Accessories",
  description: "Promotional pens, notebooks, diaries, calendars, mugs, key rings, lanyards, ID cards, t-shirts, caps, and corporate gift items.",
};

export default function PromotionalProductsPage() {
  return <ServiceDetailClient service={SERVICES_DATA["promotional-products"]} />;
}
