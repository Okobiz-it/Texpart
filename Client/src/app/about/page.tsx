"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useQuote } from "@/context/QuoteContext";
import {
  ArrowRight,
  Handshake,
  Lightbulb,
  Search,
  Shirt,
  Loader2,
} from "lucide-react";

const THREE_I_COMMITMENT = [
  {
    num: "1",
    title: "INTEGRITY",
    tagline: "TRUST IN EVERY TRANSACTION",
    desc: "We believe in honesty, transparency and building long-term business relationships with our clients worldwide.",
    icon: Handshake,
  },
  {
    num: "2",
    title: "INNOVATIVE",
    tagline: "IDEAS THAT ADD VALUE",
    desc: "We create modern, functional and creative solutions that make your brand stand out in competitive global markets.",
    icon: Lightbulb,
  },
  {
    num: "3",
    title: "IN-DEPTH",
    tagline: "ATTENTION TO EVERY DETAIL",
    desc: "From raw yarn selection to final carton dispatch, we focus on every micro-detail to meet your exact specifications.",
    icon: Search,
  },
];

const CERTIFICATIONS = [
  {
    id: "rcs-100",
    name: "Recycled 100 Claim Standard",
    image: "/images/certifications/rcs-100.png",
  },
  {
    id: "rcs-blended",
    name: "Recycled Blended Claim Standard",
    image: "/images/certifications/rcs-blended.png",
  },
  {
    id: "oeko-tex",
    name: "OEKO-TEX Standard 100",
    image: "/images/certifications/oeko-tex.png",
  },
  {
    id: "fsc",
    name: "FSC Certified (Forest Stewardship Council)",
    image: "/images/certifications/fsc.png",
  },
];

const CLIENTS = [
  { name: "Kappa", image: "/images/clients/kappa.png" },
  { name: "FILA", image: "/images/clients/fila.png" },
  { name: "ellesse", image: "/images/clients/ellesse.png" },
  { name: "Admiral", image: "/images/clients/admiral.png" },
  { name: "arena", image: "/images/clients/arena.png" },
  { name: "CONNOR", image: "/images/clients/connor.png" },
  { name: "PETROL", image: "/images/clients/petrol.png" },
  { name: "STEVE'S JEANS", image: "/images/clients/steves-jeans.png" },
  { name: "CARRY", image: "/images/clients/carry.png" },
  { name: "SALTROCK", image: "/images/clients/saltrock.png" },
  { name: "CARNET", image: "/images/clients/carnet.png" },
  { name: "Marcus", image: "/images/clients/marcus.png" },
  { name: "RIP CURL", image: "/images/clients/rip-curl.png" },
  { name: "Engelbert Strauss", image: "/images/clients/engelbert-strauss.png" },
  { name: "PRIMARK", image: "/images/clients/primark.png" },
];

export default function AboutPage() {
  const { openGeneralQuote } = useQuote();
  const [dbClients, setDbClients] = useState<any[]>([]);
  const [dbCertifications, setDbCertifications] = useState<any[]>([]);
  const [isLoadingPartners, setIsLoadingPartners] = useState(true);
  const [isLoadingCertifications, setIsLoadingCertifications] = useState(true);
  const [showCertifications, setShowCertifications] = useState(false);
  const [showClients, setShowClients] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const [settingsRes, clientRes, certRes] = await Promise.all([
          fetch("/api/settings").then((r) => r.json()).catch(() => ({})),
          fetch("/api/partners?category=client").then((r) => r.json()).catch(() => ({})),
          fetch("/api/partners?category=certification").then((r) => r.json()).catch(() => ({})),
        ]);

        if (!isMounted) return;

        const isCertsEnabled = settingsRes?.settings?.show_certifications_section !== false;
        const isClientsEnabled = settingsRes?.settings?.show_clients_section !== false;

        setShowCertifications(isCertsEnabled);
        setShowClients(isClientsEnabled);

        if (clientRes && clientRes.success && Array.isArray(clientRes.partners)) {
          setDbClients(clientRes.partners);
        }

        if (certRes && certRes.success && Array.isArray(certRes.partners)) {
          setDbCertifications(certRes.partners);
        }
      } catch (err) {
        console.error("Failed to load about page partner data", err);
      } finally {
        if (isMounted) {
          setIsLoadingPartners(false);
          setIsLoadingCertifications(false);
        }
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const displayClients = dbClients;
  const displayCertifications = dbCertifications;

  return (
    <div className="bg-white min-h-screen text-[#0A2540]">
      {/* 1. ABOUT BANNER */}
      <section className="pt-24 sm:pt-28 pb-14 sm:pb-16 bg-gradient-to-r from-[#061730] via-[#0A2540] to-[#003B73] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black uppercase tracking-tight text-white leading-tight">
              About Texpart <br className="hidden sm:inline" />
              <span className="text-blue-400">Design &amp; Accessories</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              DESIGN &bull; DEVELOP &bull; PRODUCE &bull; PACK &bull; DELIVER &mdash; One Partner. Multiple Solutions. Operating from our Motijheel, Dhaka headquarters to serve international fashion houses, buying offices, and apparel brands worldwide.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={openGeneralQuote}
                className="px-6 py-2.5 rounded-[4px] bg-[#0066CC] hover:bg-[#0052CC] text-white text-xs font-heading font-bold uppercase tracking-wider transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT TEXPART */}
      <section className="py-8 sm:py-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Building Image */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full flex items-center justify-center bg-transparent">
                <Image
                  src="/images/products/about-building.png"
                  alt="Texpart Design & Packaging Solutions Corporate Headquarters"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Right Narrative */}
            <div className="lg:col-span-7 space-y-3">
              <div className="space-y-1">
                <span className="text-[11px] font-heading font-bold uppercase tracking-widest text-[#0066CC] block">
                  ABOUT TEXPART
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-black text-[#0A2540] leading-tight">
                  A Leading Supplier of Garment Accessories
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Texpart is a trusted and reliable buying house in Bangladesh, dedicated to providing high-quality garment accessories to the global apparel industry. With years of experience and a strong commitment to quality, we bridge the gap between international buyers and the best local manufacturers.
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Our comprehensive range of products, professional services and customer-centric approach have made us a preferred partner for brands and buyers worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR 3 I COMMITMENT (BLUE LINES ADDED PER REQUEST) */}
      <section className="py-8 sm:py-10 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-1">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0A2540] uppercase tracking-wide flex items-center justify-center gap-3">
              <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block" />
              <span>OUR <span className="text-[#0066CC]">3 I</span> COMMITMENT</span>
              <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block" />
            </h2>
            <p className="text-xs text-slate-500 font-normal">
              Our core manufacturing philosophy ensuring exceptional standards across every partnership
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {THREE_I_COMMITMENT.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="relative bg-white rounded-[4px] border border-slate-200 hover:border-[#0066CC] p-6 shadow-sm transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl font-heading font-black text-[#0066CC]">
                      {item.num}
                    </span>
                    <div className="w-11 h-11 rounded-[4px] bg-[#0066CC] text-white flex items-center justify-center shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-heading font-bold uppercase text-[#0A2540]">
                      {item.title}
                    </h3>
                    <p className="text-xs font-heading font-bold text-[#0066CC] uppercase tracking-wider">
                      {item.tagline}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal pt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. WE ARE CERTIFIED BY */}
      {showCertifications && (
        <section className="py-6 sm:py-8 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-5 space-y-1">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0066CC] flex items-center justify-center gap-3">
                <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block" />
                <span>We Are Certified By</span>
                <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block" />
              </h2>
              <p className="text-xs text-slate-500 font-normal">
                Internationally recognized environmental, recycled material, and chemical safety standards
              </p>
            </div>

            {isLoadingCertifications ? (
              <div className="py-8 flex flex-col items-center justify-center space-y-2">
                <Loader2 className="w-6 h-6 text-[#0066CC] animate-spin" />
                <span className="text-xs font-heading text-slate-400 uppercase tracking-wider">
                  Loading Certifications...
                </span>
              </div>
            ) : displayCertifications.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400 font-heading">
                No certifications registered yet.
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                {displayCertifications.map((cert, idx) => (
                  <div
                    key={cert.id || idx}
                    className="w-24 sm:w-28 h-24 sm:h-28 bg-white border border-slate-200 rounded-[4px] p-2.5 flex items-center justify-center shadow-sm hover:border-[#0066CC] transition-colors"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={cert.logoUrl || cert.image}
                        alt={cert.name || "Certification"}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 5. OUR CLIENTS (BORROWED FROM HOME PAGE PER REQUEST) */}
      {showClients && (
        <section className="py-8 sm:py-12 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-1">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0066CC] flex items-center justify-center gap-3">
                <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block" />
                <span>Our Clients</span>
                <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block" />
              </h2>
              <p className="text-xs text-slate-500 font-normal">
                Trusted apparel accessories and packaging manufacturing partner for global fashion brands
              </p>
            </div>

            {isLoadingPartners ? (
              <div className="py-12 flex flex-col items-center justify-center space-y-2">
                <Loader2 className="w-6 h-6 text-[#0066CC] animate-spin" />
                <span className="text-xs font-heading text-slate-400 uppercase tracking-wider">
                  Loading client brands...
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 max-w-5xl mx-auto">
                {displayClients.map((client, idx) => (
                  <div
                    key={idx}
                    className="aspect-square sm:aspect-[4/3] bg-white border border-slate-200 hover:border-[#0066CC] rounded-[4px] p-3 sm:p-4 flex items-center justify-center shadow-sm hover:shadow-md transition-all group cursor-pointer"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={client.logoUrl || client.image || "/placeholder.jpg"}
                        alt={client.name || "Client"}
                        fill
                        className="object-contain p-1 group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
