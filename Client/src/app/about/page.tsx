"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuote } from "@/context/QuoteContext";
import {
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
  Award,
  Layers,
  Scissors,
  Printer,
  Package,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function AboutPage() {
  const { openQuote } = useQuote();

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-36 bg-charcoal text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=2000&q=85"
            alt="Texpart Garment Craftsmanship"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block">
              About Texpart &bull; Design &amp; Packaging Solutions
            </span>
            <h1 className="text-4xl sm:text-6xl font-heading font-black uppercase tracking-tight text-white leading-tight">
              Built on Craftsmanship. <br />
              <span className="text-orange">Driven by Quality.</span>
            </h1>
            <p className="text-base sm:text-lg text-beige-light leading-relaxed font-light pt-2">
              We are a dedicated manufacturing and creative production partner headquartered in Dhaka, Bangladesh &mdash; serving international fashion brands and corporate institutions with uncompromising precision.
            </p>
          </div>
        </div>
      </section>

      {/* 1. Company Introduction */}
      <section className="py-20 sm:py-28 bg-offwhite text-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block">
                01. Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-tight text-charcoal">
                Your Complete Production Partner in Bangladesh
              </h2>
              <p className="text-sm sm:text-base text-grey-dark leading-relaxed">
                Texpart brings together two vital industrial strengths under one roof: full-spectrum apparel product development and manufacturing (Private Jobs), and state-of-the-art commercial printing and customized promotional packaging (Commercial Jobs).
              </p>
              <p className="text-sm sm:text-base text-grey-dark leading-relaxed">
                Operating within Bangladesh&apos;s world-renowned textile and printing corridor, we provide foreign fashion buyers, design agencies, and corporate clients direct access to competitive production infrastructure while maintaining stringent international standards for fabric compliance, trim durability, and color fidelity.
              </p>
              <div className="pt-2 grid grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-white border border-charcoal/10 rounded-sm">
                  <span className="font-heading font-extrabold uppercase text-charcoal block mb-1">
                    Private Jobs Division
                  </span>
                  <span className="text-grey-dark">
                    Tech pack development, sample prototyping, outerwear &amp; garment manufacturing.
                  </span>
                </div>
                <div className="p-4 bg-white border border-charcoal/10 rounded-sm">
                  <span className="font-heading font-extrabold uppercase text-charcoal block mb-1">
                    Commercial Print Division
                  </span>
                  <span className="text-grey-dark">
                    Catalogues, luxury boxes, branded stationery, calendars &amp; promotional gifts.
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl border border-charcoal/10">
                <Image
                  src="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1200&q=80"
                  alt="Industrial Garment Sewing in Dhaka"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-forest-dark text-offwhite p-5 rounded-sm shadow-xl max-w-xs hidden sm:block">
                <span className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-orange block mb-1">
                  Dhaka Manufacturing Ecosystem
                </span>
                <p className="text-xs text-beige-light leading-relaxed">
                  Leveraging Bangladesh&apos;s premier apparel supply chain for global export.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Story (Storytelling with editable placeholders) */}
      <section className="py-20 sm:py-28 bg-white text-charcoal border-t border-b border-charcoal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block">
              02. Our Story
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-charcoal">
              Founded on Precision. Built for Scale.
            </h2>
            <div className="text-sm sm:text-base text-grey-dark leading-relaxed space-y-4">
              <p>
                Texpart was established to eliminate the traditional fragmentation between apparel manufacturing and brand packaging. In conventional supply chains, fashion houses must liaise with fabric mills, trim weavers, print shops, and packaging converters separately &mdash; resulting in color discrepancies, mismatched lead times, and administrative friction.
              </p>
              <p>
                By integrating apparel accessories, luxury packaging, and commercial printing alongside end-to-end garment production, Texpart delivers seamless consistency. Whether producing a high-performance winter jacket or the embossed hangtag and rigid magnetic box it ships in, every component is harmonized.
              </p>
              <div className="p-4 bg-offwhite-alt/60 border-l-4 border-charcoal text-xs text-grey-dark italic">
                Note for management: Company establishment milestones, factory expansion timeline, and founder details can be updated here directly as company documentation evolves.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our 5 Areas of Core Expertise */}
      <section className="py-20 sm:py-28 bg-offwhite text-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14 space-y-3">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block">
              03. Manufacturing Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-tight text-charcoal">
              Our Five Areas of Technical Expertise
            </h2>
            <p className="text-sm text-grey-dark">
              Specialized infrastructure supporting every phase of product creation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Apparel Development */}
            <div className="bg-white p-7 rounded-sm border border-charcoal/10 hover:border-orange transition-all duration-300 space-y-3">
              <div className="w-10 h-10 rounded-sm bg-orange/10 text-orange flex items-center justify-center">
                <Scissors className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-heading font-extrabold uppercase text-charcoal">
                1. Apparel Development
              </h3>
              <p className="text-xs text-grey-dark leading-relaxed">
                Technical pattern drafting, 3D garment visualization, grading, and rapid sample prototyping from client design briefs and tech packs.
              </p>
            </div>

            {/* 2. Garment Manufacturing */}
            <div className="bg-white p-7 rounded-sm border border-charcoal/10 hover:border-orange transition-all duration-300 space-y-3">
              <div className="w-10 h-10 rounded-sm bg-orange/10 text-orange flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-heading font-extrabold uppercase text-charcoal">
                2. Garment Manufacturing
              </h3>
              <p className="text-xs text-grey-dark leading-relaxed">
                Industrial garment cutting, multi-needle assembly lines, seam sealing, in-line quality checkpoints, and export packaging.
              </p>
            </div>

            {/* 3. Apparel Accessories */}
            <div className="bg-white p-7 rounded-sm border border-charcoal/10 hover:border-orange transition-all duration-300 space-y-3">
              <div className="w-10 h-10 rounded-sm bg-orange/10 text-orange flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-heading font-extrabold uppercase text-charcoal">
                3. Apparel Accessories
              </h3>
              <p className="text-xs text-grey-dark leading-relaxed">
                High-density woven labels, printed care tags, luxury hangtags, jacquard tapes, drawcords, metal zippers, pullers, and leather badges.
              </p>
            </div>

            {/* 4. Commercial Printing */}
            <div className="bg-white p-7 rounded-sm border border-charcoal/10 hover:border-orange transition-all duration-300 space-y-3">
              <div className="w-10 h-10 rounded-sm bg-orange/10 text-orange flex items-center justify-center">
                <Printer className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-heading font-extrabold uppercase text-charcoal">
                4. Commercial Printing
              </h3>
              <p className="text-xs text-grey-dark leading-relaxed">
                Heidelberg offset multi-color printing, corporate annual reports, product catalogues, executive diaries, calendars, and large format banners.
              </p>
            </div>

            {/* 5. Customized Packaging */}
            <div className="bg-white p-7 rounded-sm border border-charcoal/10 hover:border-orange transition-all duration-300 space-y-3">
              <div className="w-10 h-10 rounded-sm bg-orange/10 text-orange flex items-center justify-center">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-heading font-extrabold uppercase text-charcoal">
                5. Customized Packaging
              </h3>
              <p className="text-xs text-grey-dark leading-relaxed">
                Rigid magnetic setup boxes, folding carton packaging, FSC kraft shopping bags, printed polybags, and custom tissue paper wrapping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Values */}
      <section className="py-20 sm:py-28 bg-charcoal text-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14 space-y-3">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block">
              04. Guiding Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-tight text-white">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="p-6 bg-charcoal-card border border-white/10 rounded-sm space-y-3">
              <ShieldCheck className="w-8 h-8 text-orange" />
              <h4 className="font-heading font-extrabold uppercase text-white">Quality</h4>
              <p className="text-xs text-grey-light">
                Uncompromising standard of craftsmanship verified at every assembly stage.
              </p>
            </div>

            <div className="p-6 bg-charcoal-card border border-white/10 rounded-sm space-y-3">
              <Sparkles className="w-8 h-8 text-orange" />
              <h4 className="font-heading font-extrabold uppercase text-white">Innovation</h4>
              <p className="text-xs text-grey-light">
                Adopting sustainable materials, biodegradable polybags, and modern printing finishes.
              </p>
            </div>

            <div className="p-6 bg-charcoal-card border border-white/10 rounded-sm space-y-3">
              <Truck className="w-8 h-8 text-orange" />
              <h4 className="font-heading font-extrabold uppercase text-white">Reliability</h4>
              <p className="text-xs text-grey-light">
                Dependable delivery timelines aligned with global retail seasonal calendars.
              </p>
            </div>

            <div className="p-6 bg-charcoal-card border border-white/10 rounded-sm space-y-3">
              <Award className="w-8 h-8 text-orange" />
              <h4 className="font-heading font-extrabold uppercase text-white">Professionalism</h4>
              <p className="text-xs text-grey-light">
                Technical merchandising teams ensuring transparent communication and exact specs.
              </p>
            </div>

            <div className="p-6 bg-charcoal-card border border-white/10 rounded-sm space-y-3">
              <Users className="w-8 h-8 text-orange" />
              <h4 className="font-heading font-extrabold uppercase text-white">Client Success</h4>
              <p className="text-xs text-grey-light">
                Building long-term collaborative manufacturing partnerships across borders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Working Philosophy */}
      <section className="py-20 sm:py-28 bg-offwhite text-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80"
                  alt="Precision Paper & Packaging Craft"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block">
                05. Production Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-tight text-charcoal">
                Attention to Detail. Respect for Material.
              </h2>
              <p className="text-sm sm:text-base text-grey-dark leading-relaxed">
                Manufacturing at international grade is not merely about machinery; it is about an ingrained discipline of care. From testing thread tensile strength to calibrating ink viscosities under Dhaka&apos;s ambient conditions, we treat every production run as an expression of the art of making.
              </p>

              <div className="space-y-3 pt-2 text-xs text-charcoal">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
                  <span><strong>Material Integrity:</strong> We verify all yarn counts, paperboard calipers, and zipper coatings against client specifications.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
                  <span><strong>Collaborative Sampling:</strong> Physical prototypes and digital color drawdown proofs are shared before bulk production.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
                  <span><strong>Responsible Manufacturing:</strong> Utilizing OEKO-TEX Standard 100 Class I certified threads and FSC certified paper stocks.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Closing Call to Action */}
      <section className="py-24 sm:py-32 bg-forest-dark text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-orange block">
            Start Your Next Production Run
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-white">
            Let&apos;s Create Something Together.
          </h2>
          <p className="text-sm sm:text-base text-beige-light max-w-xl mx-auto font-light leading-relaxed">
            Connect with our merchandising team in Dhaka to explore material swatches, request samples, or review your apparel tech pack.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => openQuote("New B2B Project Discussion")}
              className="bg-orange hover:bg-orange-hover text-white px-8 py-4 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest inline-flex items-center gap-2 transition-all shadow-lg"
            >
              Request a Quote
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/contact"
              className="bg-transparent hover:bg-white/10 text-white border border-white/30 px-8 py-4 rounded-sm font-heading text-xs font-extrabold uppercase tracking-widest inline-flex items-center gap-2 transition-all"
            >
              Contact Dhaka Office
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

