import { ProductItem, PartnerItem } from "@/types";

export const INITIAL_PRODUCTS: ProductItem[] = [
  // ================= PRIVATE JOBS (Apparel Accessories & Packaging) =================
  {
    id: "labels",
    slug: "labels",
    name: "Labels",
    division: "private-jobs",
    category: "Garment Identification",
    description: "<p>Our garment labels are produced with high-definition Swiss looms and precision digital printing presses. Engineered to withstand rigorous industrial laundering and dry cleaning while retaining ultra-soft skin feel, crisp text definition, and vibrant color fidelity.</p>",
    frontImage: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80"
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "hangtags",
    slug: "hangtags",
    name: "Hangtags",
    division: "private-jobs",
    category: "Branding & Retail",
    description: "<p>High-impact retail hangtags that define luxury and brand pedigree at point-of-sale. Available in textured artisanal stocks, heavyweight duplex cards, and FSC-certified virgin kraft boards with bespoke stringing and custom metal eyelet finishes.</p>",
    frontImage: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80"
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "trims-tapes",
    slug: "trims-tapes",
    name: "Trims & Tapes",
    division: "private-jobs",
    category: "Trims & Elastics",
    description: "<p>Engineered jacquard elastic bands, twill tapes, and binding ribbons manufactured with high-modulus elastomer yarns. Specially developed for athletic stretch recovery, soft edge-comfort against skin, and zero color bleeding.</p>",
    frontImage: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1000&q=80"
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cords-drawstrings",
    slug: "cords-drawstrings",
    name: "Cords & Drawstrings",
    division: "private-jobs",
    category: "Trims & Elastics",
    description: "<p>Custom braided, knitted, and tipped drawstrings designed for hoodies, swim shorts, and performance joggers. Offered with engraved silicone dipped aglets, brushed metal bullet tips, and reflective 3M safety threads.</p>",
    frontImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80"
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "zippers",
    slug: "zippers",
    name: "Zippers",
    division: "private-jobs",
    category: "Fasteners & Closures",
    description: "<p>Heavy-duty and concealable zippers built for export apparel and extreme outerwear. Tested for crosswise chain strength, cyclic reciprocating endurance, and corrosion-free salt spray resistance.</p>",
    frontImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80"
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "buttons-buckles",
    slug: "buttons-buckles",
    name: "Buttons & Buckles",
    division: "private-jobs",
    category: "Fasteners & Closures",
    description: "<p>Precision cast and machined apparel buttons crafted from sustainable horn, corozo nut, shell, polyester resin, and alloy zinc. Each button is rigorously calibrated for buttoning machine feeders and pull-test safety.</p>",
    frontImage: "/images/products/range-buttons.jpg",
    images: [
      "/images/products/range-buttons.jpg"
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "patches-badges",
    slug: "patches-badges",
    name: "Patches & Badges",
    division: "private-jobs",
    category: "Embellishments",
    description: "<p>Tactile brand identifiers engineered to add dimensional texture to jackets, caps, denim, and outdoor apparel. Available in needlework embroidery, high-frequency molded TPU, and genuine Italian leather.</p>",
    frontImage: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=1000&q=80"
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "boxes-cartons",
    slug: "boxes-cartons",
    name: "Boxes & Cartons",
    division: "private-jobs",
    category: "Garment Packaging",
    description: "<p>Engineered box packaging designed to protect garments from factory floor in Bangladesh to retail distribution centers in North America and Europe. Built with moisture-resistant fluting and high ECT crush resistance.</p>",
    frontImage: "/images/products/comm-boxes.jpg",
    images: [
      "/images/products/comm-boxes.jpg"
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // ================= COMMERCIAL JOBS (Commercial Printing & Promotion) =================
  {
    id: "leaflets-flyers",
    slug: "leaflets-flyers",
    name: "Leaflets & Flyers",
    division: "commercial-jobs",
    category: "Marketing Collaterals",
    description: "<p>Vibrant promotional flyers and distribution leaflets engineered for high-volume advertising campaigns and trade retail events. Printed with Heidelberg speedmaster presses for pin-sharp typography and rich color depth.</p>",
    frontImage: "/images/products/comm-flyers.jpg",
    images: [
      "/images/products/comm-flyers.jpg"
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "brochures-catalogues",
    slug: "brochures-catalogues",
    name: "Brochures & Catalogues",
    division: "commercial-jobs",
    category: "Marketing Collaterals",
    description: "<p>Comprehensive corporate showcase brochures and multi-page seasonal lookbooks that command authority and tell your story with editorial elegance. Produced with precise section-sewn and PUR glue binding.</p>",
    frontImage: "/images/products/comm-brochures.jpg",
    images: [
      "/images/products/comm-brochures.jpg"
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "business-card-stationery",
    slug: "business-card-stationery",
    name: "Business Card & Stationery",
    division: "commercial-jobs",
    category: "Corporate Identity",
    description: "<p>Authoritative corporate letterheads, branded executive envelopes, presentation folders, and tactile business cards crafted for seamless executive correspondence.</p>",
    frontImage: "/images/products/comm-stationery.jpg",
    images: [
      "/images/products/comm-stationery.jpg"
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "diaries-notebooks",
    slug: "diaries-notebooks",
    name: "Diaries & Notebooks",
    division: "commercial-jobs",
    category: "Corporate Gifting",
    description: "<p>Hand-bound corporate executive planners, leatherette hardbound diaries, and ribbon-marked journals engineered for corporate gifting and boardroom prestige.</p>",
    frontImage: "/images/products/comm-notebooks.jpg",
    images: [
      "/images/products/comm-notebooks.jpg"
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "wall-desk-calendars",
    slug: "wall-desk-calendars",
    name: "Wall & Desk Calendars",
    division: "commercial-jobs",
    category: "Corporate Gifting",
    description: "<p>Architectural desk standees, wire-o bound flip calendars, and oversized wall charts designed to maintain year-round executive desk presence for your brand.</p>",
    frontImage: "/images/products/comm-calendars.jpg",
    images: [
      "/images/products/comm-calendars.jpg"
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "gift-boxes-premium-packaging",
    slug: "gift-boxes-premium-packaging",
    name: "Gift Boxes & Premium Packaging",
    division: "commercial-jobs",
    category: "Luxury Packaging",
    description: "<p>Bespoke magnetic closure rigid boxes, drawer slide-out presentation cases, and custom luxury unboxing sets crafted with precision die-cutting and artisanal lining.</p>",
    frontImage: "/images/products/comm-boxes.jpg",
    images: [
      "/images/products/comm-boxes.jpg"
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export const INITIAL_PARTNERS: PartnerItem[] = [
  {
    id: "partner-1",
    name: "Kappa",
    logoUrl: "https://res.cloudinary.com/wpttnkjq/image/upload/v1794806630/Gemini_Generated_Image_bro3avbro3avbro3_wlmrho.jpg",
    category: "client",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "partner-2",
    name: "FILA",
    logoUrl: "https://res.cloudinary.com/wpttnkjq/image/upload/v1794806630/Ba_ir3ryv.jpg",
    category: "client",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "partner-3",
    name: "OEKO-TEX Certification",
    logoUrl: "https://res.cloudinary.com/wpttnkjq/image/upload/v1794806630/Gemini_Generated_Image_dxyq57dxyq57dxyq_iw5qst.jpg",
    category: "certification",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
