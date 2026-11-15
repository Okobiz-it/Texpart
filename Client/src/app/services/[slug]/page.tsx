import React from "react";
import { notFound } from "next/navigation";
import { SERVICES_DATA } from "@/data/services";
import ServiceDetailClient from "./ServiceDetailClient";

export function generateStaticParams() {
  return [
    { slug: "private-jobs" },
    { slug: "commercial-jobs" },
  ];
}

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export function generateMetadata({ params }: ServicePageProps) {
  const service = SERVICES_DATA[params.slug];
  if (!service) {
    return {
      title: "Service Not Found — Texpart",
    };
  }

  return {
    title: `${service.title} — Texpart`,
    description: service.description,
  };
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = SERVICES_DATA[params.slug];

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}

