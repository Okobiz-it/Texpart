"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuote } from "@/context/QuoteContext";
import { X, ArrowRight, Phone, Mail, MapPin } from "lucide-react";

export default function MobileDrawer() {
  const { isMobileDrawerOpen, closeMobileDrawer, openGeneralQuote } = useQuote();

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden md:hidden transition-all duration-300 ${
        isMobileDrawerOpen ? "pointer-events-auto visible" : "pointer-events-none invisible"
      }`}
    >
      {/* Smooth Fade Backdrop */}
      <div
        className={`absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isMobileDrawerOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeMobileDrawer}
        aria-hidden="true"
      />

      {/* Smooth Slide-in Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none">
        <div
          className={`w-screen max-w-sm bg-charcoal text-offwhite p-6 flex flex-col justify-between shadow-2xl border-l border-white/10 pointer-events-auto transform transition-transform duration-300 ease-in-out ${
            isMobileDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="relative w-36 h-9">
                <Image
                  src="/nav-logo.png"
                  alt="Texpart Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <button
                onClick={closeMobileDrawer}
                className="p-2 text-offwhite hover:text-orange focus:outline-none transition-colors"
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
                <span className="font-heading text-lg uppercase tracking-wider font-extrabold text-white block">
                  Services
                </span>
                <div className="pl-4 flex flex-col space-y-2 text-xs uppercase tracking-wider font-semibold text-grey-light border-l border-white/10">
                  <Link
                    href="/services/private-jobs"
                    onClick={closeMobileDrawer}
                    className="hover:text-orange transition-colors flex items-center justify-between py-1"
                  >
                    <span>Private Jobs</span>
                    <ArrowRight className="w-3.5 h-3.5 text-orange" />
                  </Link>
                  <Link
                    href="/services/commercial-jobs"
                    onClick={closeMobileDrawer}
                    className="hover:text-orange transition-colors flex items-center justify-between py-1"
                  >
                    <span>Commercial Jobs</span>
                    <ArrowRight className="w-3.5 h-3.5 text-orange" />
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
                openGeneralQuote();
              }}
              className="w-full flex items-center justify-center gap-2 bg-orange hover:bg-orange-hover text-white py-3 rounded-sm font-heading text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
            >
              Request a Quote
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-xs text-grey-light space-y-2 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange flex-shrink-0" />
                <span>263, Fakirapool, Motijheel, Dhaka</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-orange flex-shrink-0" />
                <span>texpartdesign@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-orange flex-shrink-0" />
                <span>+880 161 308 4465 / +880 171 308 4465</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
