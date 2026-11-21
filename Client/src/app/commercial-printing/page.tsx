import React from "react";
import { Metadata } from "next";
import { SERVICES_DATA } from "@/data/services";
import ServiceDetailClient from "../services/[slug]/ServiceDetailClient";

export const metadata: Metadata = {
  title: "Commercial Printing — Texpart Design & Accessories",
  description: "High-precision commercial offset printing, corporate stationery, brochures, catalogues, and marketing collateral.",
};

export default function CommercialPrintingPage() {
  return <ServiceDetailClient service={SERVICES_DATA["commercial-printing"]} />;
}
