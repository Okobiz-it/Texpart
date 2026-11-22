import React from "react";
import { Metadata } from "next";
import { SERVICES_DATA } from "@/data/services";
import ServiceDetailClient from "../services/[slug]/ServiceDetailClient";

export const metadata: Metadata = {
  title: "Garments Accessories — Texpart Design & Accessories",
  description: "Certified woven labels, hangtags, heat transfers, drawstrings, leather patches, and apparel trims for global brands.",
};

export default function GarmentsAccessoriesPage() {
  return <ServiceDetailClient service={SERVICES_DATA["garments-accessories"]} />;
}
