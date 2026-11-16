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
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#061730] text-slate-300 border-t border-white/10 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-white/10">
          {/* Col 1: Brand & Buying House Positioning (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative w-52 sm:w-60 h-12 sm:h-14 bg-white rounded-[4px] px-3 py-1.5 shadow-sm">
                <Image
                  src="/footer-logo.png"
                  alt="Texpart — Design & Packaging Solutions"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-xs text-slate-300/90 leading-relaxed max-w-md font-light">
              &ldquo;We co-operate you build a strong identity for your brand with the perfect accessories and packaging.&rdquo; &mdash; Operating from our Motijheel, Dhaka headquarters to serve international fashion houses, buying offices, and apparel brands worldwide.
            </p>
            {/* Social links with official brand colors */}
            <div className="flex items-center gap-2.5 pt-1">
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

          {/* Col 2: Quick Links (No arrows per request) */}
          <div>
            <h4 className="font-heading text-xs uppercase tracking-wider font-bold text-white mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors block py-0.5">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors block py-0.5">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services/private-jobs" className="hover:text-blue-400 transition-colors block py-0.5">
                  Private Jobs
                </Link>
              </li>
              <li>
                <Link href="/services/commercial-jobs" className="hover:text-blue-400 transition-colors block py-0.5">
                  Commercial Jobs
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-blue-400 transition-colors block py-0.5">
                  Gallery Archive
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors block py-0.5">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Corporate & Factory Contact */}
          <div>
            <h4 className="font-heading text-xs uppercase tracking-wider font-bold text-white mb-3">
              Contact Info
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>263, Fakirapool, Motijheel, Dhaka &mdash; Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span>+880 161 308 4465</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span>texpartdesign@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span>Sat &ndash; Thu: 9:00 AM &ndash; 7:00 PM (BST)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar (Privacy & Terms removed per request, clean developer attribution) */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <div>
            &copy; 2026 Texpart Design &amp; Packaging Solutions. All rights reserved.
          </div>
          <div>
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
