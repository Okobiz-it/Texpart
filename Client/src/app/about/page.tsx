"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useQuote } from "@/context/QuoteContext";
import { ArrowRight, Loader2 } from "lucide-react";
import AboutOverviewSection from "@/components/about/AboutOverviewSection";
import AboutPositioningSection from "@/components/about/AboutPositioningSection";
import VisionMissionSection from "@/components/about/VisionMissionSection";
import ThreeICommitmentSection from "@/components/about/ThreeICommitmentSection";
import CoreValuesSection from "@/components/about/CoreValuesSection";

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
      {/* 1. ABOUT HERO BANNER */}
      <section className="pt-32 sm:pt-36 pb-14 sm:pb-16 bg-gradient-to-r from-[#061730] via-[#0A2540] to-[#003B73] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black uppercase tracking-tight text-white leading-tight">
              About Texpart <br className="hidden sm:inline" />
              <span className="text-blue-400">Design &amp; Accessories</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              DESIGN &bull; DEVELOP &bull; PRODUCE &bull; PACK &bull; DELIVER &mdash; One Partner. Multiple Solutions. Operating from our Motijheel, Dhaka headquarters to serve international fashion houses, buying offices, and corporate organizations worldwide.
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

      {/* 2. ABOUT TEXPART (EXACT SPECIFIED OVERVIEW WITHOUT OUTDATED HEADING) */}
      <AboutOverviewSection />

      {/* 3. OUR POSITIONING */}
      <AboutPositioningSection />

      {/* 4. OUR LONG-TERM VISION & MISSION */}
      <VisionMissionSection />

      {/* 5. OUR 3I COMMITMENT */}
      <ThreeICommitmentSection />

      {/* 6. OUR CORE VALUES */}
      <CoreValuesSection />

      {/* 7. WE ARE CERTIFIED BY (HONORS ADMIN TOGGLE, NO LOADER FLASH) */}
      {showCertifications && (
        <section className="py-10 sm:py-14 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-6 space-y-1">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0066CC] flex items-center justify-center gap-3">
                <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block" />
                <span>We Are Certified By</span>
                <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block" />
              </h2>
              <p className="text-xs text-slate-500 font-normal">
                Internationally recognized environmental, recycled material, and chemical safety standards
              </p>
            </div>

            {displayCertifications.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400 font-heading">
                No certifications registered yet.
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                {displayCertifications.map((cert, idx) => (
                  <div
                    key={cert._id || cert.id || idx}
                    className="w-24 sm:w-28 h-24 sm:h-28 bg-white border border-slate-200 rounded-[4px] p-2.5 flex items-center justify-center shadow-sm hover:border-[#0066CC] transition-colors"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={cert.logoUrl || cert.image || "/placeholder.jpg"}
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

      {/* 8. OUR CLIENTS (HONORS ADMIN TOGGLE, NO LOADER FLASH) */}
      {showClients && (
        <section className="py-10 sm:py-14 bg-slate-50 border-b border-slate-200">
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

            {displayClients.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400 font-heading">
                No client partners registered yet.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 max-w-5xl mx-auto">
                {displayClients.map((client, idx) => (
                  <div
                    key={client._id || client.id || idx}
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
