"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useQuote } from "@/context/QuoteContext";
import { ChevronDown, Menu, ArrowRight } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const pathname = usePathname();
  const { openGeneralQuote, openMobileDrawer } = useQuote();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when pathname changes
  useEffect(() => {
    setIsServicesOpen(false);
  }, [pathname]);

  const handleMouseEnter = () => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
      dropdownTimerRef.current = null;
    }
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 200); // 200ms comfortable buffer so it never abruptly vanishes
  };

  const isHome = pathname === "/";
  const headerClass = isScrolled || !isHome
    ? "bg-charcoal/95 backdrop-blur-md border-b border-white/10 text-offwhite shadow-luxury py-3"
    : "bg-transparent text-white py-5";

  const linkActive = (path: string) => pathname === path;

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-44 h-11 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/nav-logo.png"
              alt="Texpart — Design & Packaging Solutions"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={`font-heading text-xs uppercase tracking-widest font-bold transition-colors hover:text-orange ${
              linkActive("/") ? "text-orange border-b-2 border-orange pb-1" : "text-offwhite/90"
            }`}
          >
            Home
          </Link>

          <Link
            href="/about"
            className={`font-heading text-xs uppercase tracking-widest font-bold transition-colors hover:text-orange ${
              linkActive("/about") ? "text-orange border-b-2 border-orange pb-1" : "text-offwhite/90"
            }`}
          >
            About Us
          </Link>

          {/* Services Dropdown (Click toggles, hover opens with gap-free hit zone) */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => setIsServicesOpen((prev) => !prev)}
              className={`font-heading text-xs uppercase tracking-widest font-bold flex items-center gap-1 transition-colors hover:text-orange py-2 ${
                pathname.startsWith("/services") ? "text-orange border-b-2 border-orange pb-1" : "text-offwhite/90"
              }`}
              aria-expanded={isServicesOpen}
            >
              Services
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isServicesOpen ? "rotate-180 text-orange" : ""
                }`}
              />
            </button>

            {/* Submenu with hover bridge to prevent disappearing */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72 transition-all duration-200 z-50 ${
                isServicesOpen
                  ? "opacity-100 visible pointer-events-auto translate-y-0"
                  : "opacity-0 invisible pointer-events-none -translate-y-1"
              }`}
            >
              {/* Invisible bridge element spanning top margin */}
              <div className="bg-charcoal border border-white/10 rounded-sm shadow-2xl py-2 relative before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-4">
                <Link
                  href="/services/private-jobs"
                  onClick={() => setIsServicesOpen(false)}
                  className="block px-5 py-3 hover:bg-white/5 transition-colors group/item border-b border-white/5"
                >
                  <div className="text-xs font-heading font-extrabold uppercase tracking-wider text-white group-hover/item:text-orange flex items-center justify-between transition-colors">
                    <span>Private Jobs</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white/50 group-hover/item:text-orange transition-all group-hover/item:translate-x-1" />
                  </div>
                  <div className="text-[11px] text-grey-light mt-0.5">
                    Apparel Accessories &amp; Packaging
                  </div>
                </Link>
                <Link
                  href="/services/commercial-jobs"
                  onClick={() => setIsServicesOpen(false)}
                  className="block px-5 py-3 hover:bg-white/5 transition-colors group/item"
                >
                  <div className="text-xs font-heading font-extrabold uppercase tracking-wider text-white group-hover/item:text-orange flex items-center justify-between transition-colors">
                    <span>Commercial Jobs</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white/50 group-hover/item:text-orange transition-all group-hover/item:translate-x-1" />
                  </div>
                  <div className="text-[11px] text-grey-light mt-0.5">
                    Commercial Printing &amp; Promotion
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/gallery"
            className={`font-heading text-xs uppercase tracking-widest font-bold transition-colors hover:text-orange ${
              linkActive("/gallery") ? "text-orange border-b-2 border-orange pb-1" : "text-offwhite/90"
            }`}
          >
            Gallery
          </Link>

          <Link
            href="/contact"
            className={`font-heading text-xs uppercase tracking-widest font-bold transition-colors hover:text-orange ${
              linkActive("/contact") ? "text-orange border-b-2 border-orange pb-1" : "text-offwhite/90"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Global CTA & Mobile Hamburger */}
        <div className="flex items-center gap-4">
          <button
            onClick={openGeneralQuote}
            className="hidden sm:inline-flex items-center gap-2 bg-orange hover:bg-orange-hover text-white px-5 py-2.5 rounded-sm font-heading text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-lg hover:shadow-orange/30 hover:-translate-y-0.5"
          >
            Request a Quote
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={openMobileDrawer}
            className="p-2 rounded-sm md:hidden text-offwhite hover:text-orange focus:outline-none"
            aria-label="Open mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
