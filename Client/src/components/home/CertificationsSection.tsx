"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function CertificationsSection() {
  const [certifications, setCertifications] = useState<any[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const [settingsRes, certsRes] = await Promise.all([
          fetch("/api/settings").then((r) => r.json()).catch(() => ({})),
          fetch("/api/partners?category=certification").then((r) => r.json()).catch(() => ({})),
        ]);

        if (!isMounted) return;

        const isEnabled = settingsRes?.settings?.show_certifications_section !== false;

        if (isEnabled) {
          if (certsRes?.success && Array.isArray(certsRes.partners)) {
            setCertifications(certsRes.partners);
          }
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } catch (err) {
        console.error("Failed to load certifications", err);
        if (isMounted) setIsVisible(false);
      } finally {
        if (isMounted) setIsReady(true);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Do not display anything (neither the section shell nor any loading indicator) if disabled or not yet resolved
  if (!isReady || !isVisible) {
    return null;
  }

  return (
    <section className="py-10 sm:py-14 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6 space-y-1">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0066CC] flex items-center justify-center gap-3">
            <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block" />
            <span>We Are Certified By</span>
            <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block" />
          </h2>
          <p className="text-xs text-slate-500 font-normal">
            Internationally recognized quality, organic, and sustainability certifications
          </p>
        </div>

        <div className="relative w-full overflow-hidden py-2">
          {/* Edge fade gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {certifications.length === 0 ? (
            <div className="py-6 text-center text-xs text-slate-400 font-heading">
              No certifications registered yet.
            </div>
          ) : (
            <div className="flex gap-4 sm:gap-6 animate-marquee hover:[animation-play-state:paused] w-max py-2">
              {[...certifications, ...certifications, ...certifications].map((cert, idx) => (
                <div
                  key={cert._id || cert.id || idx}
                  className="w-28 sm:w-32 h-28 sm:h-32 bg-white border border-slate-200 hover:border-[#0066CC] rounded-[4px] p-3 flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-200 hover:scale-110 hover:shadow-md cursor-pointer z-10"
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
      </div>
    </section>
  );
}
