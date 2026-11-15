"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useQuote } from "@/context/QuoteContext";
import { ChevronDown, Menu, ArrowRight } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { openQuote, openMobileDrawer } = useQuote();

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

  const isHome = pathname === "/";
  // On home, before scroll, header is transparent with white text; otherwise dark solid glassmorphism
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

          {/* Services Dropdown */}
          <div className="relative group">
            <Link
              href="/services"
              className={`font-heading text-xs uppercase tracking-widest font-bold flex items-center gap-1 transition-colors hover:text-orange ${
                pathname.startsWith("/services") ? "text-orange border-b-2 border-orange pb-1" : "text-offwhite/90"
              }`}
            >
              Services
              <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
            </Link>

            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-charcoal border border-white/10 rounded-sm shadow-2xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
              <Link
                href="/services"
                className="block px-5 py-2.5 hover:bg-white/5 transition-colors border-b border-white/5"
              >
                <div className="text-[11px] font-heading font-black uppercase tracking-widest text-white">
                  All Services &amp; Products
                </div>
                <div className="text-[11px] text-grey-light">
                  View complete product catalog for both divisions
                </div>
              </Link>
              <Link
                href="/services/private-jobs"
                className="block px-5 py-3 hover:bg-white/5 transition-colors group/item"
              >
                <div className="text-xs font-heading font-extrabold uppercase tracking-wider text-orange group-hover/item:text-orange-hover flex items-center justify-between">
                  <span>01. Private Jobs</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 bg-orange/20 rounded">PAGE</span>
                </div>
                <div className="text-xs text-grey-light mt-0.5">
                  Apparel Product Development, Sampling &amp; Manufacturing
                </div>
              </Link>
              <Link
                href="/services/commercial-jobs"
                className="block px-5 py-3 hover:bg-white/5 transition-colors group/item"
              >
                <div className="text-xs font-heading font-extrabold uppercase tracking-wider text-cyan group-hover/item:text-orange flex items-center justify-between">
                  <span>02. Commercial Jobs</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 bg-cyan/20 rounded">PAGE</span>
                </div>
                <div className="text-xs text-grey-light mt-0.5">
                  Commercial Printing &amp; Customized Promotional Packaging
                </div>
              </Link>
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
            onClick={() => openQuote()}
            className="hidden sm:inline-flex items-center gap-2 bg-orange hover:bg-orange-hover text-white px-5 py-2.5 rounded-sm font-heading text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-lg hover:shadow-orange/30 hover:-translate-y-0.5"
          >
            Request a Quote
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={openMobileDrawer}
            className="md:hidden p-2 text-offwhite hover:text-orange focus:outline-none"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
