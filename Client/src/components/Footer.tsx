"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Linkedin,
  Facebook,
  Youtube,
  ArrowRight,
  MessageSquare,
  Shirt,
} from "lucide-react";
import { BRAND_INFO } from "@/data/siteNavigation";

export default function Footer() {
  return (
    <footer className="bg-[#061730] text-slate-300 border-t border-white/10 relative overflow-hidden">
      {/* Master Bottom CTA Strip — Consistent across every single page */}
      <div className="py-6 sm:py-8 bg-gradient-to-r from-[#003B73] via-[#0056B3] to-[#002D59] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-left">
              <div className="w-11 h-11 rounded-[4px] bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 text-white">
                <Shirt className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h2 className="text-sm sm:text-base md:text-lg font-heading font-black uppercase tracking-wide text-white leading-tight">
                  YOUR COMPLETE PARTNER FOR PRINTING, GARMENTS ACCESSORIES &amp; PACKAGING SOLUTIONS
                </h2>
                <p className="text-slate-200 text-xs sm:text-sm font-light">
                  Design &bull; Develop &bull; Produce &bull; Pack &bull; Deliver &bull; ONE PARTNER. MULTIPLE SOLUTIONS.
                </p>
              </div>
            </div>

            <div className="flex-shrink-0">
              <Link
                href="/quote"
                className="bg-white hover:bg-slate-100 text-[#0056B3] px-5 py-2.5 rounded-[4px] font-heading text-xs font-bold inline-flex items-center gap-1.5 shadow-md transition-all shrink-0 uppercase tracking-wider"
              >
                <span>Contact Us Today</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-8 border-b border-white/10">
          {/* Col 1: Brand & Positioning (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative w-56 sm:w-64 h-12 sm:h-14 bg-white rounded-[4px] px-3 py-1.5 shadow-sm">
                <Image
                  src="/footer-logo.png"
                  alt="Texpart — Design & Packaging Solutions"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-xs text-slate-300/90 leading-relaxed font-light">
              <strong>{BRAND_INFO.name}</strong> &mdash; Operating from our Motijheel, Dhaka headquarters with full in-house capabilities for German Heidelberg multi-color offset presses, precision die-cutting, woven label looms, and luxury rigid box packaging.
            </p>
            <div className="text-[11px] text-blue-300 font-mono">
              {BRAND_INFO.architecture}
            </div>
            {/* Social links */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-[4px] bg-[#0A66C2] hover:opacity-90 text-white flex items-center justify-center transition-all shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 fill-current" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-[4px] bg-[#1877F2] hover:opacity-90 text-white flex items-center justify-center transition-all shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 fill-current" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-[4px] bg-[#FF0000] hover:opacity-90 text-white flex items-center justify-center transition-all shadow-sm"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Core Divisions (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-xs uppercase tracking-wider font-bold text-white mb-3">
              Core Divisions
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/commercial-printing" className="hover:text-blue-400 transition-colors block py-0.5">
                  Commercial Printing
                </Link>
              </li>
              <li>
                <Link href="/garments-accessories" className="hover:text-blue-400 transition-colors block py-0.5">
                  Garments Accessories &amp; Trims
                </Link>
              </li>
              <li>
                <Link href="/packaging-solutions" className="hover:text-blue-400 transition-colors block py-0.5">
                  Packaging Solutions
                </Link>
              </li>
              <li>
                <Link href="/promotional-products" className="hover:text-blue-400 transition-colors block py-0.5">
                  Promotional Products
                </Link>
              </li>
              <li>
                <Link href="/capabilities" className="hover:text-blue-400 transition-colors block py-0.5">
                  Our Capabilities (Workflow)
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-blue-400 transition-colors block py-0.5">
                  Our Work &amp; Portfolio
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-heading text-xs uppercase tracking-wider font-bold text-white mb-3">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors block py-0.5">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors block py-0.5">
                  About Texpart
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-blue-400 transition-colors block py-0.5">
                  Gallery Archive
                </Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-blue-400 transition-colors block py-0.5">
                  Request a Quote
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors block py-0.5">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate Coordinates (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-xs uppercase tracking-wider font-bold text-white mb-3">
              Office Coordinates
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>{BRAND_INFO.contact.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href={`tel:${BRAND_INFO.contact.mobile.replace(/[^+\d]/g, '')}`} className="hover:text-blue-400 transition-colors">
                  {BRAND_INFO.contact.mobile}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href={`tel:${BRAND_INFO.contact.mobileSecondary.replace(/[^+\d]/g, '')}`} className="hover:text-blue-400 transition-colors">
                  {BRAND_INFO.contact.mobileSecondary}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a
                  href={BRAND_INFO.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-300 font-medium"
                >
                  WhatsApp: {BRAND_INFO.contact.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{BRAND_INFO.contact.emailSecondary}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>{BRAND_INFO.contact.businessHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <div>
            &copy; 2026 Texpart Design &amp; Accessories. All rights reserved.
          </div>
          <div className="text-slate-400 font-light">
            Devoloped by{" "}
            <a
              href="https://okobiz.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline font-medium"
            >
              Okobiz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
