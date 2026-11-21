import React from "react";
import { Metadata } from "next";
import { SERVICES_DATA } from "@/data/services";
import ServiceDetailClient from "../../services/[slug]/ServiceDetailClient";

export const metadata: Metadata = {
  title: "Commercial Printing Work & Products — Texpart Design & Accessories",
  description: "Browse commercial printing products, brochures, flyers, catalogues, calendars, posters, stickers, and business publications.",
};

export default function WorkCommercialPrintingPage() {
  return <ServiceDetailClient service={SERVICES_DATA["commercial-printing"]} />;
}
