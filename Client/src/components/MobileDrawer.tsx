"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuote } from "@/context/QuoteContext";
import { X, ArrowRight, Phone, Mail, MapPin } from "lucide-react";

export default function MobileDrawer() {
  const { isMobileDrawerOpen, closeMobileDrawer, openQuote } = useQuote();

  if (!isMobileDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeMobileDrawer}
      />

      {/* Drawer panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-charcoal text-offwhite p-6 flex flex-col justify-between shadow-2xl border-l border-white/10">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="relative w-36 h-9">
                <Image
                  src="/logo-white.svg"
                  alt="Texpart Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <button
                onClick={closeMobileDrawer}
                className="p-2 text-offwhite hover:text-orange focus:outline-none"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation links */}
            <nav className="mt-8 flex flex-col space-y-5">
              <Link
                href="/"
                onClick={closeMobileDrawer}
                className="font-heading text-lg uppercase tracking-wider font-extrabold hover:text-orange transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={closeMobileDrawer}
                className="font-heading text-lg uppercase tracking-wider font-extrabold hover:text-orange transition-colors"
              >
                About Us
              </Link>
              <div className="space-y-2 pt-1">
                <Link
                  href="/services"
                  onClick={closeMobileDrawer}
                  className="font-heading text-lg uppercase tracking-wider font-extrabold hover:text-orange transition-colors block"
                >
                  Services
                </Link>
                <div className="pl-4 flex flex-col space-y-2 text-xs uppercase tracking-wider font-semibold text-grey-light border-l border-white/10">
                  <Link
                    href="/services#private-jobs"
                    onClick={closeMobileDrawer}
                    className="hover:text-orange transition-colors"
                  >
                    01. Private Jobs (Apparel Manufacturing)
                  </Link>
                  <Link
                    href="/services#commercial-jobs"
                    onClick={closeMobileDrawer}
                    className="hover:text-orange transition-colors"
                  >
                    02. Commercial Jobs (Printing &amp; Promo)
                  </Link>
                </div>
              </div>
              <Link
                href="/gallery"
                onClick={closeMobileDrawer}
                className="font-heading text-lg uppercase tracking-wider font-extrabold hover:text-orange transition-colors"
              >
                Gallery
              </Link>
              <Link
                href="/contact"
                onClick={closeMobileDrawer}
                className="font-heading text-lg uppercase tracking-wider font-extrabold hover:text-orange transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Bottom Actions & Contact */}
          <div className="pt-6 border-t border-white/10 space-y-4">
            <button
              onClick={() => {
                closeMobileDrawer();
                openQuote();
              }}
              className="w-full flex items-center justify-center gap-2 bg-orange hover:bg-orange-hover text-white py-3 rounded-sm font-heading text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
            >
              Request a Quote
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-xs text-grey-light space-y-2 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange flex-shrink-0" />
                <span>Tejgaon I/A, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-orange flex-shrink-0" />
                <span>inquiry@texpart.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-orange flex-shrink-0" />
                <span>+880 1712 345678 (WhatsApp)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

