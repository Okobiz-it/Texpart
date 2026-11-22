"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function ClientsSection() {
  const [clients, setClients] = useState<any[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const [settingsRes, clientsRes] = await Promise.all([
          fetch("/api/settings").then((r) => r.json()).catch(() => ({})),
          fetch("/api/partners?category=client").then((r) => r.json()).catch(() => ({})),
        ]);

        if (!isMounted) return;

        const isEnabled = settingsRes?.settings?.show_clients_section !== false;

        if (isEnabled) {
          if (clientsRes?.success && Array.isArray(clientsRes.partners)) {
            setClients(clientsRes.partners);
          }
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } catch (err) {
        console.error("Failed to load client partners", err);
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

        {clients.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400 font-heading">
            No client brands registered yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {clients.map((client, idx) => (
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
  );
}
