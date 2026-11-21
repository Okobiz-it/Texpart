"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useQuote } from "@/context/QuoteContext";
import { X, ArrowRight, Phone, Mail, MapPin, ChevronDown } from "lucide-react";

export default function MobileDrawer() {
  const { isMobileDrawerOpen, closeMobileDrawer, openGeneralQuote } = useQuote();
  const pathname = usePathname();
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  // Automatically open services dropdown if user is currently viewing a services route
  useEffect(() => {
    if (pathname.startsWith("/services") || pathname.startsWith("/products")) {
      setIsServicesOpen(true);
    }
  }, [pathname]);

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden lg:hidden transition-all duration-300 ${
        isMobileDrawerOpen ? "pointer-events-auto visible" : "pointer-events-none invisible"
      }`}
    >
      {/* Smooth Fade Backdrop */}
      <div
        className={`absolute inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isMobileDrawerOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeMobileDrawer}
        aria-hidden="true"
      />

      {/* Smooth Slide-in Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none">
        <div
          className={`w-screen max-w-sm bg-[#061730] text-white p-6 flex flex-col justify-between shadow-2xl border-l border-white/10 pointer-events-auto transform transition-transform duration-300 ease-in-out ${
            isMobileDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
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

            {/* Navigation links */}
            <nav className="mt-8 flex flex-col space-y-4">
              <Link
                href="/"
                onClick={closeMobileDrawer}
                className="font-heading text-base uppercase tracking-wider font-bold text-white hover:text-blue-400 transition-colors py-1"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={closeMobileDrawer}
                className="font-heading text-base uppercase tracking-wider font-bold text-white hover:text-blue-400 transition-colors py-1"
              >
                About Us
              </Link>

              {/* Services Dropdown (Smooth Dropdown like Desktop) */}
              <div className="py-1">
                <button
                  type="button"
                  onClick={() => setIsServicesOpen((prev) => !prev)}
                  className={`w-full flex items-center justify-between font-heading text-base uppercase tracking-wider font-bold transition-colors py-1 focus:outline-none ${
                    pathname.startsWith("/services") || pathname.startsWith("/products")
                      ? "text-blue-400"
                      : "text-white hover:text-blue-400"
                  }`}
                  aria-expanded={isServicesOpen}
                >
                  <span>Our Services</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isServicesOpen ? "rotate-180 text-blue-400" : "text-slate-400"
                    }`}
                  />
                </button>

                {/* Dropdown Menu Items */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isServicesOpen
                      ? "max-h-48 opacity-100 mt-2 pointer-events-auto"
                      : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="pl-3 py-1 space-y-2 border-l border-white/20 ml-1">
                    <Link
                      href="/services/private-jobs"
                      onClick={closeMobileDrawer}
                      className={`block py-1 text-xs tracking-wide uppercase transition-colors ${
                        pathname.startsWith("/services/private-jobs")
                          ? "text-blue-400 font-bold"
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      01. Private Jobs (Apparel Development)
                    </Link>
                    <Link
                      href="/services/commercial-jobs"
                      onClick={closeMobileDrawer}
                      className={`block py-1 text-xs tracking-wide uppercase transition-colors ${
                        pathname.startsWith("/services/commercial-jobs")
                          ? "text-blue-400 font-bold"
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      02. Commercial Jobs (Printing &amp; Packaging)
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                href="/gallery"
                onClick={closeMobileDrawer}
                className="font-heading text-base uppercase tracking-wider font-bold text-white hover:text-blue-400 transition-colors py-1"
              >
                Gallery Archive
              </Link>

              <Link
                href="/contact"
                onClick={closeMobileDrawer}
                className="font-heading text-base uppercase tracking-wider font-bold text-white hover:text-blue-400 transition-colors py-1"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Footer Contacts (Quote button hidden on mobile sidebar per request) */}
          <div className="pt-6 border-t border-white/10 space-y-3">
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>+880 161 308 4465</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>texpartdesign@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Motijheel, Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
