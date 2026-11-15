"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-offwhite border-t border-white/10 relative overflow-hidden bg-fabric-twill-dark">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal to-charcoal-surface opacity-95 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
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
            <p className="text-sm text-grey-light/90 leading-relaxed max-w-md pt-2 font-light">
              &ldquo;We co-operate you build a strong identity for your brand with the perfect accessories and packaging.&rdquo; &mdash; Operating from our Motijheel, Dhaka headquarters to serve international fashion houses and corporations worldwide.
            </p>
          </div>

          {/* Col 2: Key Product Categories */}
          <div>
            <h4 className="font-heading text-xs uppercase tracking-widest font-extrabold text-offwhite mb-4">
              Key Trims &amp; Media
            </h4>
            <ul className="space-y-2 text-xs text-grey-light">
              <li>Damask Woven Labels</li>
              <li>Cast Metal Zippers (#3, #5, #8)</li>
              <li>FSC Architectural Hangtags</li>
              <li>Jacquard Elastic Waistbands</li>
              <li>Heidelberg Offset Catalogues</li>
              <li>Luxury Rigid Presentation Boxes</li>
            </ul>
          </div>

          {/* Col 3: Factory Contacts */}
          <div>
            <h4 className="font-heading text-xs uppercase tracking-widest font-extrabold text-offwhite mb-4">
              Manufacturing Hub
            </h4>
            <ul className="space-y-3 text-xs text-grey-light">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange flex-shrink-0 mt-0.5" />
                <span>263, Fakirapool, Motijheel, Dhaka &mdash; Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange flex-shrink-0" />
                <span>+880 161 308 4465</span>
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
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-grey gap-3">
          <div>
            &copy; {new Date().getFullYear()} Texpart Design &amp; Packaging Solutions. All rights reserved.
          </div>
          <div>
            <span className="text-grey-light">
              Devoloped by{" "}
              <a
                href="https://okobiz.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange hover:underline font-medium"
              >
                Okobiz
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
