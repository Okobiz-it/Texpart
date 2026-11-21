"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useQuote } from "@/context/QuoteContext";
import {
  X,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
} from "lucide-react";
import {
  BRAND_INFO,
  OUR_WORK_VERTICALS,
} from "@/data/siteNavigation";

export default function MobileDrawer() {
  const { isMobileDrawerOpen, closeMobileDrawer, openGeneralQuote } = useQuote();
  const pathname = usePathname();

  const [workOpen, setWorkOpen] = useState(true);
  const [openVertical, setOpenVertical] = useState<string | null>("commercial-printing");

  const toggleVertical = (id: string) => {
    setOpenVertical((prev) => (prev === id ? null : id));
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden lg:hidden transition-all duration-300 ${
        isMobileDrawerOpen ? "pointer-events-auto visible" : "pointer-events-none invisible"
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-[#0A2540]/80 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isMobileDrawerOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeMobileDrawer}
        aria-hidden="true"
      />

      {/* Slide-in Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 pointer-events-none">
        <div
          className={`w-screen max-w-md bg-[#061730] text-white flex flex-col justify-between shadow-2xl border-l border-white/10 pointer-events-auto transform transition-transform duration-300 ease-in-out ${
            isMobileDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Scrollable Container */}
          <div className="overflow-y-auto flex-grow p-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div className="relative w-44 h-11 bg-white rounded-[4px] px-2.5 py-1.5 shadow-sm">
                <Image
                  src="/nav-logo.png"
                  alt="Texpart Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <button
                onClick={closeMobileDrawer}
                className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-[4px] focus:outline-none transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation links (CLEAN: Home, About, Capabilities, Our Work with 6 Verticals, Contact) */}
            <nav className="mt-6 flex flex-col space-y-2">
              {/* 1. HOME */}
              <Link
                href="/"
                onClick={closeMobileDrawer}
                className={`font-heading text-sm uppercase tracking-wider font-bold py-2 px-1 transition-colors ${
                  pathname === "/" ? "text-blue-400" : "text-white hover:text-blue-400"
                }`}
              >
                Home
              </Link>

              {/* 2. ABOUT TEXPART */}
              <Link
                href="/about"
                onClick={closeMobileDrawer}
                className={`font-heading text-sm uppercase tracking-wider font-bold py-2 px-1 transition-colors ${
                  pathname.startsWith("/about") ? "text-blue-400" : "text-white hover:text-blue-400"
                }`}
              >
                About Texpart
              </Link>

              {/* 3. OUR CAPABILITIES (DIRECT LINK) */}
              <Link
                href="/capabilities"
                onClick={closeMobileDrawer}
                className={`font-heading text-sm uppercase tracking-wider font-bold py-2 px-1 transition-colors ${
                  pathname.startsWith("/capabilities") ? "text-blue-400" : "text-white hover:text-blue-400"
                }`}
              >
                Our Capabilities
              </Link>

              {/* 4. OUR WORK (6 VERTICALS ACCORDION) */}
              <div className="py-1 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <Link
                    href="/work"
                    onClick={closeMobileDrawer}
                    className={`font-heading text-sm uppercase tracking-wider font-bold py-1.5 px-1 transition-colors ${
                      pathname.startsWith("/work") ? "text-blue-400" : "text-white hover:text-blue-400"
                    }`}
                  >
                    Our Work
                  </Link>
                  <button
                    type="button"
                    onClick={() => setWorkOpen(!workOpen)}
                    className="p-2 text-slate-400 hover:text-blue-400"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        workOpen ? "rotate-180 text-blue-400" : ""
                      }`}
                    />
                  </button>
                </div>

                {workOpen && (
                  <div className="pl-3 py-1 space-y-3 border-l border-white/20 ml-2 mt-1">
                    {OUR_WORK_VERTICALS.map((vertical) => {
                      const isOpen = openVertical === vertical.id;
                      return (
                        <div key={vertical.id} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <Link
                              href={vertical.href}
                              onClick={closeMobileDrawer}
                              className={`text-xs font-heading font-bold uppercase tracking-wider transition-colors ${
                                pathname.includes(vertical.slug) ? "text-blue-400" : "text-slate-200 hover:text-blue-400"
                              }`}
                            >
                              {vertical.name}
                            </Link>
                            <button
                              type="button"
                              onClick={() => toggleVertical(vertical.id)}
                              className="p-1 text-slate-400 hover:text-blue-400"
                            >
                              <ChevronDown
                                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                  isOpen ? "rotate-180 text-blue-400" : ""
                                }`}
                              />
                            </button>
                          </div>

                          {isOpen && (
                            <div className="pl-2.5 py-1 space-y-1 border-l border-blue-500/40 ml-1">
                              {vertical.items.map((item) => (
                                <Link
                                  key={item.slug}
                                  href={`${vertical.href}?category=${encodeURIComponent(item.name)}`}
                                  onClick={closeMobileDrawer}
                                  className="block py-0.5 text-[11px] text-slate-300 hover:text-blue-400 transition-colors truncate"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 5. CONTACT */}
              <Link
                href="/contact"
                onClick={closeMobileDrawer}
                className={`font-heading text-sm uppercase tracking-wider font-bold py-2 px-1 transition-colors border-t border-white/5 ${
                  pathname.startsWith("/contact") ? "text-blue-400" : "text-white hover:text-blue-400"
                }`}
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Footer contact info inside drawer */}
          <div className="p-6 bg-black/30 border-t border-white/10 space-y-3">
            <button
              onClick={() => {
                closeMobileDrawer();
                openGeneralQuote();
              }}
              className="w-full py-3 bg-[#0066CC] hover:bg-[#0052CC] text-white rounded-[4px] font-heading text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Request Custom Quotation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="space-y-1.5 text-xs text-slate-300 pt-2">
              <a
                href={BRAND_INFO.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:underline"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp: {BRAND_INFO.contact.whatsapp}</span>
              </a>
              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="w-3.5 h-3.5" />
                <span>{BRAND_INFO.contact.emailSecondary}</span>
              </div>
              <div className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span className="line-clamp-2">{BRAND_INFO.contact.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
