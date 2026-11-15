"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuote } from "@/context/QuoteContext";
import { MapPin, Phone, Mail, ArrowUpRight, ShieldCheck, Clock } from "lucide-react";

export default function Footer() {
  const { openQuote } = useQuote();

  return (
    <footer className="bg-[#101211] text-grey-light border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative w-48 h-12">
                <Image
                  src="/logo-white.svg"
                  alt="Texpart — Design & Packaging Solutions"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-sm text-grey-light/90 leading-relaxed max-w-sm pt-2">
              Premier garments manufacturing, apparel accessories, and high-precision commercial printing partner based in Dhaka, Bangladesh. Delivering craftsmanship and industrial scale to international fashion brands and corporate clients worldwide.
            </p>
            <div className="pt-2 text-xs font-heading font-extrabold tracking-widest uppercase text-beige">
              QUALITY • INNOVATION • RELIABILITY
            </div>
            <div className="text-xs text-orange font-semibold pt-1">
              &ldquo;ONE PARTNER. MULTIPLE SOLUTIONS.&rdquo;
            </div>
          </div>

          {/* Col 2: Divisions & Navigation */}
          <div>
            <h4 className="font-heading text-xs uppercase tracking-widest font-extrabold text-offwhite mb-4">
              Two Core Solutions
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/services#private-jobs" className="hover:text-orange transition-colors">
                  Private Jobs (Apparel Development)
                </Link>
              </li>
              <li>
                <Link href="/services#commercial-jobs" className="hover:text-orange transition-colors">
                  Commercial Jobs (Printing &amp; Promo)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange transition-colors">
                  Our Story &amp; Philosophy
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-orange transition-colors">
                  Manufacturing Visual Archive
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange transition-colors">
                  Schedule Factory Visit
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Product Categories (Brochure Range) */}
          <div>
            <h4 className="font-heading text-xs uppercase tracking-widest font-extrabold text-offwhite mb-4">
              Featured Products
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/#products" className="hover:text-orange transition-colors">
                  Woven &amp; Printed Labels
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-orange transition-colors">
                  Architectural Hangtags
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-orange transition-colors">
                  Zippers, Pullers &amp; Metal Hardware
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-orange transition-colors">
                  Brochures &amp; Product Catalogues
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-orange transition-colors">
                  Executive Diaries &amp; Notebooks
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-orange transition-colors">
                  Rigid Magnetic Gift Boxes
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Dhaka HQ & Inquiry */}
          <div>
            <h4 className="font-heading text-xs uppercase tracking-widest font-extrabold text-offwhite mb-4">
              Dhaka Headquarters
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange flex-shrink-0 mt-0.5" />
                <span>Tejgaon Industrial Area, Dhaka-1208, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange flex-shrink-0" />
                <span>+880 1712 345678 (Direct / WhatsApp)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange flex-shrink-0" />
                <span>inquiry@texpart.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-orange flex-shrink-0" />
                <span>Sat &ndash; Thu: 9:00 AM &ndash; 7:00 PM (GMT+6)</span>
              </li>
            </ul>

            <div className="pt-5">
              <button
                onClick={() => openQuote()}
                className="inline-flex items-center gap-1.5 text-xs font-heading font-extrabold uppercase tracking-wider text-orange hover:text-orange-hover transition-colors"
              >
                Launch Quotation Engine
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-grey gap-4">
          <div>
            &copy; {new Date().getFullYear()} Texpart Design &amp; Packaging Solutions. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-grey-light">
              <ShieldCheck className="w-3.5 h-3.5 text-forest" />
              B2B Manufacturing Portfolio &amp; Inquiry Platform
            </span>
            <Link href="/contact" className="hover:text-offwhite transition-colors">
              Privacy &amp; Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

