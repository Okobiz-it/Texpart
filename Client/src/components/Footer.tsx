"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuote } from "@/context/QuoteContext";
import { MapPin, Phone, Mail, ArrowUpRight, ShieldCheck, Clock } from "lucide-react";

export default function Footer() {
  const { openQuote } = useQuote();

  return (
    <footer className="bg-[#101211] text-grey-light border-t border-white/10 pt-16 pb-8 bg-fabric-oxford-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative w-48 h-12">
                <Image
                  src="/nav-logo.png"
                  alt="Texpart — Design & Packaging Solutions"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-sm text-grey-light/90 leading-relaxed max-w-sm pt-2 font-light">
              &ldquo;We co-operate you build a strong identity for your brand with the perfect accessories and packaging.&rdquo;
            </p>
            <div className="pt-2 text-xs font-heading font-extrabold tracking-widest uppercase text-beige">
              iNTEGRITY • iNNOVATIVE • iN-DEPTH
            </div>
            <div className="text-xs text-orange font-semibold pt-1">
              &ldquo;LET&apos;S CREATE. LET&apos;S DEVELOP. LET&apos;S DELIVER.&rdquo;
            </div>
          </div>

          {/* Col 2: Divisions & Navigation */}
          <div>
            <h4 className="font-heading text-xs uppercase tracking-widest font-extrabold text-offwhite mb-4">
              Two Core Solutions
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/services/private-jobs" className="hover:text-orange transition-colors">
                  01. Private Jobs (Apparel Development)
                </Link>
              </li>
              <li>
                <Link href="/services/commercial-jobs" className="hover:text-orange transition-colors">
                  02. Commercial Jobs (Printing &amp; Promo)
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-orange transition-colors">
                  All Services &amp; Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange transition-colors">
                  Our 3 i Commitment &amp; Story
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
                <Link href="/products/labels" className="hover:text-orange transition-colors">
                  Woven &amp; Printed Labels
                </Link>
              </li>
              <li>
                <Link href="/products/hangtags" className="hover:text-orange transition-colors">
                  Architectural Hangtags
                </Link>
              </li>
              <li>
                <Link href="/products/zippers" className="hover:text-orange transition-colors">
                  Zippers &amp; Metal Hardware
                </Link>
              </li>
              <li>
                <Link href="/products/brochures-catalogues" className="hover:text-orange transition-colors">
                  Brochures &amp; Catalogues
                </Link>
              </li>
              <li>
                <Link href="/products/diaries-notebooks" className="hover:text-orange transition-colors">
                  Executive Diaries &amp; Planners
                </Link>
              </li>
              <li>
                <Link href="/products/gift-boxes-premium-packaging" className="hover:text-orange transition-colors">
                  Rigid Magnetic Gift Boxes
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Dhaka HQ & Inquiry (Official from PDF Brochure) */}
          <div>
            <h4 className="font-heading text-xs uppercase tracking-widest font-extrabold text-offwhite mb-4">
              Dhaka Headquarters
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange flex-shrink-0 mt-0.5" />
                <span>263, Fakirapool, Motijheel, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange flex-shrink-0" />
                <span>+880 161 308 4465</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange flex-shrink-0" />
                <span>+880 171 308 4465 (WhatsApp)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange flex-shrink-0" />
                <span>texpartdesign@gmail.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-orange flex-shrink-0" />
                <span>Sat &ndash; Thu: 9:00 AM &ndash; 7:00 PM (BST)</span>
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
