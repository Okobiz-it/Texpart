"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useQuote } from "@/context/QuoteContext";
import {
  ChevronDown,
  Menu,
  ArrowRight,
} from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesTimerRef = useRef<NodeJS.Timeout | null>(null);

  const pathname = usePathname();
  const { openGeneralQuote, openMobileDrawer } = useQuote();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsServicesOpen(false);
  }, [pathname]);

  const handleServicesEnter = () => {
    if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
    setIsServicesOpen(true);
  };
  const handleServicesLeave = () => {
    servicesTimerRef.current = setTimeout(() => setIsServicesOpen(false), 200);
  };

  const linkActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-200">
      {/* MAIN NAVBAR (Clean White, Scaled 1.25x) */}
      <div
        className={`w-full bg-white transition-all duration-200 border-b border-slate-200 ${
          isScrolled ? "py-2.5 shadow-md" : "py-3.5 sm:py-4 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo (1.25x Bigger) */}
          <Link href="/" className="flex items-center group">
            <div className="relative w-52 sm:w-64 h-10 sm:h-12 transition-transform duration-200">
              <Image
                src="/nav-logo.png"
                alt="Texpart — Design & Packaging Solutions"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links (1.25x Bigger) */}
          <nav className="hidden lg:flex items-center space-x-8 sm:space-x-9 text-[15.5px] font-heading font-bold text-[#0A2540]">
            <Link
              href="/"
              className={`transition-colors hover:text-[#0066CC] py-1 ${
                linkActive("/") ? "text-[#0066CC]" : "text-[#0A2540]"
              }`}
            >
              <span>Home</span>
            </Link>

            <Link
              href="/about"
              className={`transition-colors hover:text-[#0066CC] py-1 ${
                linkActive("/about") ? "text-[#0066CC]" : "text-[#0A2540]"
              }`}
            >
              About Us
            </Link>

            {/* Our Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <button
                type="button"
                onClick={() => setIsServicesOpen((prev) => !prev)}
                className={`flex items-center gap-1.5 transition-colors hover:text-[#0066CC] py-1 ${
                  pathname.startsWith("/services") || pathname.startsWith("/products")
                    ? "text-[#0066CC]"
                    : "text-[#0A2540]"
                }`}
              >
                <span>Our Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    pathname.startsWith("/services") || pathname.startsWith("/products")
                      ? "text-[#0066CC]"
                      : "text-slate-400"
                  } ${isServicesOpen ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`absolute top-full left-0 pt-2 w-72 transition-all duration-150 z-50 ${
                  isServicesOpen
                    ? "opacity-100 visible pointer-events-auto translate-y-0"
                    : "opacity-0 invisible pointer-events-none -translate-y-1"
                }`}
              >
                <div className="bg-white border border-slate-200 rounded-[4px] shadow-xl py-2.5 text-sm">
                  <Link
                    href="/services/private-jobs"
                    onClick={() => setIsServicesOpen(false)}
                    className="block px-4 py-2.5 hover:bg-slate-50 hover:text-[#0066CC] transition-colors"
                  >
                    Private Jobs (Apparel Development)
                  </Link>
                  <Link
                    href="/services/commercial-jobs"
                    onClick={() => setIsServicesOpen(false)}
                    className="block px-4 py-2.5 hover:bg-slate-50 hover:text-[#0066CC] transition-colors"
                  >
                    Commercial Jobs (Printing &amp; Packaging)
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/gallery"
              className={`transition-colors hover:text-[#0066CC] py-1 ${
                linkActive("/gallery") ? "text-[#0066CC]" : "text-[#0A2540]"
              }`}
            >
              Gallery
            </Link>

            <Link
              href="/contact"
              className={`transition-colors hover:text-[#0066CC] py-1 ${
                linkActive("/contact") ? "text-[#0066CC]" : "text-[#0A2540]"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action: Get a Quote Button (Hidden on Mobile/Tablet to keep clean navbar) */}
          <div className="flex items-center gap-3">
            <button
              onClick={openGeneralQuote}
              className="hidden lg:inline-flex items-center gap-2 bg-[#0066CC] hover:bg-[#0052CC] text-white px-6 py-2.5 sm:py-3 rounded-[4px] font-heading text-sm font-bold transition-all shadow-sm"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={openMobileDrawer}
              className="p-2.5 rounded-[4px] lg:hidden text-[#0A2540] hover:text-[#0066CC] hover:bg-slate-100"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
