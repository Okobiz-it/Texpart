"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuote } from "@/context/QuoteContext";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Check,
  ChevronRight,
  ChevronLeft,
  Award,
  Globe,
  Shirt,
  Pencil,
  Layers,
  Factory,
  Package,
  Handshake,
  Lightbulb,
  Search,
  CheckCircle2,
  Loader2,
} from "lucide-react";

// 3 Provided Hero Banners for Sliding Back & Forth
const HERO_BANNERS = [
  {
    id: 1,
    src: "/banners/banner-1.jpg",
    alt: "Texpart Garment Accessories Manufacturing",
  },
  {
    id: 2,
    src: "/banners/banner-2.jpg",
    alt: "Texpart Apparel Trims & Sourcing",
  },
  {
    id: 3,
    src: "/banners/banner-3.jpg",
    alt: "Texpart Packaging & Commercial Printing",
  },
];

// Row 1: Private Jobs Products (Apparel Accessories & Packaging)
const PRIVATE_JOBS_RANGE = [
  {
    name: "Threads",
    image: "/images/products/range-threads.jpg",
    href: "/products/trims-tapes",
  },
  {
    name: "Zippers",
    image: "/images/products/range-zippers.jpg",
    href: "/products/zippers",
  },
  {
    name: "Buttons & Buckles",
    image: "/images/products/range-buttons.jpg",
    href: "/products/buttons",
  },
  {
    name: "Labels & Tags",
    image: "/images/products/range-labels.jpg",
    href: "/products/labels",
  },
  {
    name: "Elastic Tapes",
    image: "/images/products/range-elastic.jpg",
    href: "/products/trims-tapes",
  },
  {
    name: "Cords & Drawstrings",
    image: "/images/products/range-drawstrings.jpg",
    href: "/products/cords-drawstrings",
  },
];

// Row 2: Commercial Jobs Products (Commercial Printing & Promotional Products)
const COMMERCIAL_JOBS_RANGE = [
  {
    name: "Brochures & Catalogues",
    image: "/images/products/comm-brochures.jpg",
    href: "/products/brochures-catalogues",
  },
  {
    name: "Leaflets & Flyers",
    image: "/images/products/comm-flyers.jpg",
    href: "/products/leaflets-flyers",
  },
  {
    name: "Business Cards & Stationery",
    image: "/images/products/comm-stationery.jpg",
    href: "/products/business-card-stationery",
  },
  {
    name: "Diaries & Notebooks",
    image: "/images/products/comm-notebooks.jpg",
    href: "/products/diaries-notebooks",
  },
  {
    name: "Wall & Desk Calendars",
    image: "/images/products/comm-calendars.jpg",
    href: "/products/wall-desk-calendars",
  },
  {
    name: "Gift Boxes & Packaging",
    image: "/images/products/comm-boxes.jpg",
    href: "/products/gift-boxes-premium-packaging",
  },
];

// Official Global Certifications
const CERTIFICATIONS = [
  {
    id: "rcs-100",
    name: "Recycled 100 Claim Standard",
    image: "/images/certifications/rcs-100.png",
  },
  {
    id: "rcs-blended",
    name: "Recycled Blended Claim Standard",
    image: "/images/certifications/rcs-blended.png",
  },
  {
    id: "oeko-tex",
    name: "OEKO-TEX Standard 100",
    image: "/images/certifications/oeko-tex.png",
  },
  {
    id: "fsc",
    name: "FSC Certified (Forest Stewardship Council)",
    image: "/images/certifications/fsc.png",
  },
];

// Global Clients
const CLIENTS = [
  { name: "Kappa", image: "/images/clients/kappa.png" },
  { name: "FILA", image: "/images/clients/fila.png" },
  { name: "ellesse", image: "/images/clients/ellesse.png" },
  { name: "Admiral", image: "/images/clients/admiral.png" },
  { name: "arena", image: "/images/clients/arena.png" },
  { name: "CONNOR", image: "/images/clients/connor.png" },
  { name: "PETROL", image: "/images/clients/petrol.png" },
  { name: "STEVE'S JEANS", image: "/images/clients/steves-jeans.png" },
  { name: "CARRY", image: "/images/clients/carry.png" },
  { name: "SALTROCK", image: "/images/clients/saltrock.png" },
  { name: "CARNET", image: "/images/clients/carnet.png" },
  { name: "Marcus:", image: "/images/clients/marcus.png" },
  { name: "RIP CURL", image: "/images/clients/rip-curl.png" },
  { name: "Engelbert Strauss", image: "/images/clients/engelbert-strauss.png" },
  { name: "PRIMARK", image: "/images/clients/primark.png" },
];

export default function HomePage() {
  const { openGeneralQuote } = useQuote();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [heroBanners, setHeroBanners] = useState<any[]>(HERO_BANNERS);
  const [privateFeatured, setPrivateFeatured] = useState<any[]>([]);
  const [commercialFeatured, setCommercialFeatured] = useState<any[]>([]);
  const [dbClients, setDbClients] = useState<any[]>([]);
  const [dbCertifications, setDbCertifications] = useState<any[]>([]);
  const [isLoadingFeatured, setIsLoadingFeatured] = useState(true);
  const [isLoadingPartners, setIsLoadingPartners] = useState(true);
  const [isLoadingCertifications, setIsLoadingCertifications] = useState(true);

  // Fetch hero banners, up to 5 featured products per division, partners and certifications from MongoDB Atlas
  useEffect(() => {
    let isMounted = true;
    async function loadDynamicData() {
      // Dynamic Hero Banners
      try {
        const bannerRes = await fetch("/api/hero-banners");
        const bannerData = await bannerRes.json();
        if (isMounted && bannerData.success && Array.isArray(bannerData.data) && bannerData.data.length > 0) {
          setHeroBanners(bannerData.data);
        }
      } catch (err) {
        console.error("Failed to load hero banners from database", err);
      }

      try {
        const featRes = await fetch("/api/featured-products");
        const featData = await featRes.json();
        if (isMounted && featData.success) {
          if (Array.isArray(featData.privateFeatured)) {
            setPrivateFeatured(featData.privateFeatured.slice(0, 5));
          }
          if (Array.isArray(featData.commercialFeatured)) {
            setCommercialFeatured(featData.commercialFeatured.slice(0, 5));
          }
        }
      } catch (err) {
        console.error("Failed to load featured products from database", err);
      } finally {
        if (isMounted) setIsLoadingFeatured(false);
      }

      try {
        const clientRes = await fetch("/api/partners?category=client");
        const clientData = await clientRes.json();
        if (isMounted) {
          if (clientData.success && Array.isArray(clientData.partners)) {
            setDbClients(clientData.partners);
          }
        }
      } catch (err) {
        console.error("Failed to load client partners from database", err);
      } finally {
        if (isMounted) setIsLoadingPartners(false);
      }

      try {
        const certRes = await fetch("/api/partners?category=certification");
        const certData = await certRes.json();
        if (isMounted) {
          if (certData.success && Array.isArray(certData.partners)) {
            setDbCertifications(certData.partners);
          }
        }
      } catch (err) {
        console.error("Failed to load certifications from database", err);
      } finally {
        if (isMounted) setIsLoadingCertifications(false);
      }
    }
    loadDynamicData();
    return () => {
      isMounted = false;
    };
  }, []);

  const displayPrivate = privateFeatured;
  const displayCommercial = commercialFeatured;
  const displayClients = dbClients;
  const displayCertifications = dbCertifications;

  // Auto-slide back and forth every 5 seconds
  useEffect(() => {
    if (isPaused || heroBanners.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, heroBanners.length]);

  const prevSlide = () => {
    if (heroBanners.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + heroBanners.length) % heroBanners.length);
  };

  const nextSlide = () => {
    if (heroBanners.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
  };

  return (
    <div className="bg-white min-h-screen text-[#0A2540]">
      {/* =================================================================
          1. HERO SLIDER SECTION (PRESERVES EXACT 3584x1184 RATIO ACROSS ALL SCREENS)
          ================================================================= */}
      <section
        className="relative pt-14 sm:pt-16 bg-white border-b border-slate-200 overflow-hidden group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative w-full aspect-[3584/1184] overflow-hidden bg-slate-100 shadow-sm">
          {/* Sliding Track */}
          <div
            className="flex h-full w-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {heroBanners.map((banner: any, idx: number) => (
              <div key={banner.id || idx} className="w-full h-full flex-shrink-0 relative">
                <Image
                  src={banner.src || banner.imageUrl}
                  alt={banner.alt || banner.title || "Texpart Banner"}
                  fill
                  className="object-contain sm:object-cover"
                  priority={idx === 0}
                  sizes="100vw"
                />
              </div>
            ))}
          </div>

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-1.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-10 sm:h-10 rounded-[4px] bg-black/40 hover:bg-[#0066CC] text-white flex items-center justify-center transition-all shadow-md backdrop-blur-sm opacity-80 group-hover:opacity-100"
            aria-label="Previous Banner"
          >
            <ChevronLeft className="w-3.5 sm:w-5 h-3.5 sm:h-5" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-1.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-10 sm:h-10 rounded-[4px] bg-black/40 hover:bg-[#0066CC] text-white flex items-center justify-center transition-all shadow-md backdrop-blur-sm opacity-80 group-hover:opacity-100"
            aria-label="Next Banner"
          >
            <ChevronRight className="w-3.5 sm:w-5 h-3.5 sm:h-5" />
          </button>

          {/* Slider Dots Indicator */}
          <div className="absolute bottom-1.5 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 sm:gap-2 bg-black/30 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-[4px]">
            {heroBanners.map((_: any, idx: number) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 sm:h-2 rounded-[4px] transition-all duration-300 ${
                  currentSlide === idx ? "w-4 sm:w-6 bg-[#0066CC]" : "w-1.5 sm:w-2 bg-white/70 hover:bg-white"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          2. OUR PRODUCT RANGE (RESTORED TWO SECTIONS: PRIVATE JOBS & COMMERCIAL JOBS)
          ================================================================= */}
      <section id="product-range" className="py-8 sm:py-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Centered Section Header with Accent Lines */}
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0066CC] flex items-center justify-center gap-3">
              <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block" />
              <span>Our Product Range</span>
              <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block" />
            </h2>
            <p className="text-xs text-slate-500 font-normal">
              A comprehensive range of garment accessories and commercial print solutions for your brand
            </p>
          </div>

          {/* Part 1: Private Jobs (Up to 5 Featured Products) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#0066CC] rounded-[2px]" />
                <h3 className="text-sm sm:text-base font-heading font-black uppercase tracking-wider text-[#0A2540]">
                  Private Jobs
                </h3>
                <span className="text-xs text-slate-400 font-normal hidden sm:inline">
                  &bull; Apparel Accessories &amp; Packaging
                </span>
              </div>
              <Link
                href="/services/private-jobs"
                className="text-xs font-heading font-bold text-[#0066CC] hover:underline inline-flex items-center gap-1"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 5 Cards for Private Jobs */}
            {isLoadingFeatured ? (
              <div className="py-12 bg-white rounded-[4px] border border-slate-200 flex flex-col items-center justify-center space-y-2">
                <Loader2 className="w-6 h-6 text-[#0066CC] animate-spin" />
                <span className="text-xs font-heading font-medium text-slate-500 uppercase tracking-wider">
                  Loading Private Jobs...
                </span>
              </div>
            ) : displayPrivate.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400 bg-slate-50 rounded-[4px]">
                No featured private products selected.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                {displayPrivate.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href || `/products/${item.slug || item.id}`}
                    className="group bg-white rounded-[4px] border border-slate-200 hover:border-[#0066CC] overflow-hidden flex flex-col transition-all duration-200 hover:shadow-sm"
                  >
                    <div className="relative w-full aspect-square overflow-hidden bg-slate-100">
                      <Image
                        src={item.frontImage || item.image || item.logoUrl}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="220px"
                      />
                    </div>
                    <div className="p-2 sm:p-2.5 text-center bg-white border-t border-slate-100 flex-grow flex items-center justify-center">
                      <h4 className="text-xs font-heading font-bold text-[#0A2540] group-hover:text-[#0066CC] transition-colors leading-tight">
                        {item.name}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Part 2: Commercial Jobs (Up to 5 Featured Products) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#0066CC] rounded-[2px]" />
                <h3 className="text-sm sm:text-base font-heading font-black uppercase tracking-wider text-[#0A2540]">
                  Commercial Jobs
                </h3>
                <span className="text-xs text-slate-400 font-normal hidden sm:inline">
                  &bull; Commercial Printing &amp; Promotional Products
                </span>
              </div>
              <Link
                href="/services/commercial-jobs"
                className="text-xs font-heading font-bold text-[#0066CC] hover:underline inline-flex items-center gap-1"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 5 Cards for Commercial Jobs */}
            {isLoadingFeatured ? (
              <div className="py-12 bg-white rounded-[4px] border border-slate-200 flex flex-col items-center justify-center space-y-2">
                <Loader2 className="w-6 h-6 text-[#0066CC] animate-spin" />
                <span className="text-xs font-heading font-medium text-slate-500 uppercase tracking-wider">
                  Loading Commercial Jobs...
                </span>
              </div>
            ) : displayCommercial.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400 bg-slate-50 rounded-[4px]">
                No featured commercial products selected.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                {displayCommercial.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href || `/products/${item.slug || item.id}`}
                    className="group bg-white rounded-[4px] border border-slate-200 hover:border-[#0066CC] overflow-hidden flex flex-col transition-all duration-200 hover:shadow-sm"
                  >
                    <div className="relative w-full aspect-square overflow-hidden bg-slate-100">
                      <Image
                        src={item.frontImage || item.image || item.logoUrl}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="220px"
                      />
                    </div>
                    <div className="p-2 sm:p-2.5 text-center bg-white border-t border-slate-100 flex-grow flex items-center justify-center">
                      <h4 className="text-xs font-heading font-bold text-[#0A2540] group-hover:text-[#0066CC] transition-colors leading-tight">
                        {item.name}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =================================================================
          3. ABOUT BUYING HOUSE SECTION WITH "WHY TEXPART?"
          ================================================================= */}
      <section className="py-8 sm:py-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Image (Factory Floor Crop) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-[4px] overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                <Image
                  src="/images/about-texpart-factory.jpg"
                  alt="Garment Accessories Factory Floor in Bangladesh"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Narrative & Why Texpart Feature Box (White Theme & Blue Ticks) */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-heading font-black text-[#0A2540]">
                  About Texpart Ltd.
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mt-2">
                  We are a leading buying house in Bangladesh, specializing in high-quality garment accessories. With strong sourcing capability and industry experience, we are committed to deliver the best products and services to our valued customers worldwide.
                </p>
              </div>

              {/* WHY TEXPART? Feature Container (Clean White Theme & Blue Ticks) */}
              <div className="bg-white text-[#0A2540] rounded-[4px] p-5 sm:p-6 shadow-sm border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                  <div className="sm:border-r sm:border-slate-200 sm:pr-5 flex-shrink-0">
                    <h3 className="text-xl sm:text-2xl font-heading font-black text-[#0A2540] uppercase tracking-wide">
                      Why <br className="hidden sm:inline" />
                      Texpart?
                    </h3>
                  </div>

                  <div className="space-y-2 flex-grow text-xs sm:text-[13px] text-slate-700 font-medium">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#0066CC] flex-shrink-0" />
                      <span>Wide Range of Accessories &amp; Packaging Solutions</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#0066CC] flex-shrink-0" />
                      <span>Customized Design &amp; Development</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#0066CC] flex-shrink-0" />
                      <span>High Quality Materials &amp; Finishing</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#0066CC] flex-shrink-0" />
                      <span>Competitive Price</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#0066CC] flex-shrink-0" />
                      <span>On-time Delivery &amp; After Sales Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          4. TWO CORE DIVISIONS (MINIMAL, ACCURATE, ELEGANT)
          ================================================================= */}
      <section className="py-8 sm:py-10 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-6 space-y-1">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0066CC] flex items-center justify-center gap-3">
              <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block" />
              <span>Two Core Divisions</span>
              <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block" />
            </h2>
            <p className="text-xs text-slate-500 font-normal">
              Specialized B2B manufacturing and high-precision print solutions tailored to your brand scale.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
            {/* Division 01: Private Jobs */}
            <div className="bg-white border border-slate-200 hover:border-[#0066CC] rounded-[4px] overflow-hidden flex flex-col justify-between shadow-sm transition-all duration-200">
              <div>
                <Link href="/services/private-jobs" className="relative aspect-[16/9] w-full overflow-hidden block bg-slate-100 group">
                  <Image
                    src="/images/divisions/private-jobs.jpg"
                    alt="Private Jobs Apparel Accessories & Packaging"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>

                <div className="p-5 sm:p-6 space-y-2.5">
                  <Link href="/services/private-jobs">
                    <h3 className="text-base sm:text-lg font-heading font-bold uppercase text-[#0A2540] hover:text-[#0066CC] transition-colors">
                      Apparel Accessories &amp; Packaging
                    </h3>
                  </Link>
                  <p className="text-xs text-[#0066CC] font-heading font-semibold">
                    &ldquo;One Partner. Multiple Solutions.&rdquo;
                  </p>
                  <ul className="space-y-1.5 text-xs text-[#0A2540] pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066CC] flex-shrink-0" />
                      <span>Labels, Hangtags, Trims &amp; Tapes, Cords &amp; Drawstrings</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066CC] flex-shrink-0" />
                      <span>Zippers, Buttons &amp; Buckles, Patches &amp; Badges</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066CC] flex-shrink-0" />
                      <span>Poly Bags, Paper Bags, Boxes &amp; Cartons, Tissue Wrapping</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0">
                <Link
                  href="/services/private-jobs"
                  className="text-xs font-heading font-bold text-[#0066CC] hover:underline inline-flex items-center gap-1"
                >
                  <span>Explore Private Jobs</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Division 02: Commercial Jobs */}
            <div className="bg-white border border-slate-200 hover:border-[#0066CC] rounded-[4px] overflow-hidden flex flex-col justify-between shadow-sm transition-all duration-200">
              <div>
                <Link href="/services/commercial-jobs" className="relative aspect-[16/9] w-full overflow-hidden block bg-slate-100 group">
                  <Image
                    src="/images/divisions/commercial-jobs.jpg"
                    alt="Commercial Printing & Promotional Products"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>

                <div className="p-5 sm:p-6 space-y-2.5">
                  <Link href="/services/commercial-jobs">
                    <h3 className="text-base sm:text-lg font-heading font-bold uppercase text-[#0A2540] hover:text-[#0066CC] transition-colors">
                      Commercial Printing &amp; Promotion
                    </h3>
                  </Link>
                  <p className="text-xs text-[#0066CC] font-heading font-semibold">
                    &ldquo;One Partner. Multiple Print Solutions.&rdquo;
                  </p>
                  <ul className="space-y-1.5 text-xs text-[#0A2540] pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066CC] flex-shrink-0" />
                      <span>Brochures, Catalogues, Leaflets &amp; Flyers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066CC] flex-shrink-0" />
                      <span>Business Cards &amp; Stationery, Diaries &amp; Notebooks</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066CC] flex-shrink-0" />
                      <span>Wall &amp; Desk Calendars, Posters, Banners, Rigid Gift Boxes</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0">
                <Link
                  href="/services/commercial-jobs"
                  className="text-xs font-heading font-bold text-[#0066CC] hover:underline inline-flex items-center gap-1"
                >
                  <span>Explore Commercial Jobs</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          5. FROM CONCEPT TO DELIVERY STRIP (BLUE & WHITE THEME)
          ================================================================= */}
      <section className="py-7 sm:py-9 bg-[#F0F7FD] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Strip Header with Blue Accent Lines and Subheading */}
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-1">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0066CC] flex items-center justify-center gap-3">
              <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block" />
              <span>From Concept To Delivery</span>
              <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block" />
            </h2>
            <p className="text-xs text-slate-500 font-normal">
              A seamless, structured 5-stage manufacturing cycle ensuring precision and quality at every step
            </p>
          </div>

          {/* 5-Step Process with Connecting Blue Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-3 items-start">
            {/* Step 1: DESIGN */}
            <div className="flex flex-col items-center text-center px-2 group">
              <div className="w-12 h-12 rounded-full bg-[#0066CC] text-white flex items-center justify-center mb-2.5 shadow-sm transition-transform duration-200 group-hover:scale-105">
                <Pencil className="w-5 h-5" />
              </div>
              <h4 className="text-xs sm:text-sm font-heading font-black uppercase tracking-wider text-[#0A2540]">
                Design
              </h4>
              <p className="text-[11px] text-slate-500 font-normal mt-0.5 leading-tight">
                Creative &amp; Customized Solutions
              </p>
            </div>

            {/* Step 2: DEVELOP */}
            <div className="flex flex-col items-center text-center px-2 group">
              <div className="w-12 h-12 rounded-full bg-[#0066CC] text-white flex items-center justify-center mb-2.5 shadow-sm transition-transform duration-200 group-hover:scale-105">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="text-xs sm:text-sm font-heading font-black uppercase tracking-wider text-[#0A2540]">
                Develop
              </h4>
              <p className="text-[11px] text-slate-500 font-normal mt-0.5 leading-tight">
                Sample &amp; Product Development
              </p>
            </div>

            {/* Step 3: PRODUCE */}
            <div className="flex flex-col items-center text-center px-2 group">
              <div className="w-12 h-12 rounded-full bg-[#0066CC] text-white flex items-center justify-center mb-2.5 shadow-sm transition-transform duration-200 group-hover:scale-105">
                <Factory className="w-5 h-5" />
              </div>
              <h4 className="text-xs sm:text-sm font-heading font-black uppercase tracking-wider text-[#0A2540]">
                Produce
              </h4>
              <p className="text-[11px] text-slate-500 font-normal mt-0.5 leading-tight">
                Quality Manufacturing &amp; Quality Control
              </p>
            </div>

            {/* Step 4: PACK */}
            <div className="flex flex-col items-center text-center px-2 group">
              <div className="w-12 h-12 rounded-full bg-[#0066CC] text-white flex items-center justify-center mb-2.5 shadow-sm transition-transform duration-200 group-hover:scale-105">
                <Package className="w-5 h-5" />
              </div>
              <h4 className="text-xs sm:text-sm font-heading font-black uppercase tracking-wider text-[#0A2540]">
                Pack
              </h4>
              <p className="text-[11px] text-slate-500 font-normal mt-0.5 leading-tight">
                Smart &amp; Secure Packaging
              </p>
            </div>

            {/* Step 5: DELIVER */}
            <div className="flex flex-col items-center text-center px-2 group">
              <div className="w-12 h-12 rounded-full bg-[#0066CC] text-white flex items-center justify-center mb-2.5 shadow-sm transition-transform duration-200 group-hover:scale-105">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="text-xs sm:text-sm font-heading font-black uppercase tracking-wider text-[#0A2540]">
                Deliver
              </h4>
              <p className="text-[11px] text-slate-500 font-normal mt-0.5 leading-tight">
                On-time Delivery Every Time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          6. WE ARE CERTIFIED BY (SLIDING SINGLE ROW, HOVER PAUSES & ZOOMS)
          ================================================================= */}
      <section className="py-7 sm:py-9 bg-white border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-6 space-y-1">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0066CC] flex items-center justify-center gap-3">
              <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block" />
              <span>We Are Certified By</span>
              <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block" />
            </h2>
            <p className="text-xs text-slate-500 font-normal">
              Internationally recognized quality, organic, and sustainability certifications
            </p>
          </div>

          <div className="relative w-full overflow-hidden py-2">
            {/* Edge fade gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            {isLoadingCertifications ? (
              <div className="py-8 flex flex-col items-center justify-center space-y-2">
                <Loader2 className="w-6 h-6 text-[#0066CC] animate-spin" />
                <span className="text-xs font-heading text-slate-400 uppercase tracking-wider">
                  Loading Certifications...
                </span>
              </div>
            ) : displayCertifications.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400 font-heading">
                No certifications registered yet.
              </div>
            ) : (
              <div className="flex gap-4 sm:gap-6 animate-marquee hover:[animation-play-state:paused] w-max py-2">
                {[
                  ...displayCertifications,
                  ...displayCertifications,
                  ...displayCertifications,
                  ...displayCertifications,
                ].map((cert, idx) => (
                  <div
                    key={cert.id || idx}
                    className="w-28 sm:w-32 h-28 sm:h-32 bg-white border border-slate-200 hover:border-[#0066CC] rounded-[4px] p-3 flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-200 hover:scale-110 hover:shadow-md cursor-pointer z-10"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={cert.logoUrl || cert.image}
                        alt={cert.name || "Certification"}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =================================================================
          7. OUR CLIENTS (STACKED 5x3 GRID, SQUARE CARDS 1.25x BIGGER, NOT SLIDING)
          ================================================================= */}
      <section className="py-8 sm:py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-1">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0066CC] flex items-center justify-center gap-3">
              <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block" />
              <span>Our Clients</span>
              <span className="w-8 sm:w-16 h-[2px] bg-[#0066CC] inline-block" />
            </h2>
            <p className="text-xs text-slate-500 font-normal">
              Trusted apparel accessories and packaging manufacturing partner for global fashion brands
            </p>
          </div>

          {isLoadingPartners ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-2">
              <Loader2 className="w-6 h-6 text-[#0066CC] animate-spin" />
              <span className="text-xs font-heading text-slate-400 uppercase tracking-wider">
                Loading client brands...
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 max-w-5xl mx-auto">
              {displayClients.map((client, idx) => (
                <div
                  key={idx}
                  className="aspect-square sm:aspect-[4/3] bg-white border border-slate-200 hover:border-[#0066CC] rounded-[4px] p-3 sm:p-4 flex items-center justify-center shadow-sm hover:shadow-md transition-all group cursor-pointer"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={client.logoUrl || client.image}
                      alt={client.name || "Client"}
                      fill
                      className="object-contain p-1 group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =================================================================
          9. "LET'S GROW TOGETHER" BANNER
          ================================================================= */}
      <section className="py-6 sm:py-8 bg-gradient-to-r from-[#003B73] via-[#0056B3] to-[#002D59] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-[4px] bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 text-white">
                <Shirt className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-heading font-bold text-white tracking-tight">
                  Let&apos;s Grow Together
                </h2>
                <p className="text-slate-200 text-xs font-light mt-0.5">
                  Partner with Texpart for your garment accessories and sourcing needs.
                </p>
              </div>
            </div>

            <div className="flex-shrink-0">
              <button
                onClick={openGeneralQuote}
                className="bg-white hover:bg-slate-100 text-[#0056B3] px-5 py-2.5 rounded-[4px] font-heading text-xs font-bold inline-flex items-center gap-1.5 shadow-md transition-all"
              >
                <span>Contact Us Today</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
