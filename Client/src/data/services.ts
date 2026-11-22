import {
  COMMERCIAL_PRINTING_ITEMS,
  GARMENTS_ACCESSORIES_ITEMS,
  PACKAGING_SOLUTIONS_ITEMS,
  PROMOTIONAL_PRODUCTS_ITEMS,
  DropdownItem,
} from "./siteNavigation";

export interface ServiceDetail {
  slug: string;
  id: string;
  title: string;
  subtitle: string;
  headline: string;
  divisionLabel: string;
  badge: string;
  heroImage: string;
  description: string;
  categoryItems?: DropdownItem[];
  longDescription?: string[];
  capabilities?: {
    title: string;
    description: string;
    metric?: string;
  }[];
  specifications?: {
    label: string;
    value: string;
  }[];
}

export const SERVICES_DATA: Record<string, ServiceDetail> = {
  "commercial-printing": {
    slug: "commercial-printing",
    id: "commercial-printing",
    title: "Commercial Printing",
    subtitle: "High-Precision Commercial Offset, Corporate Collateral & Publications",
    headline: "Your Design. Our Printing Expertise.",
    divisionLabel: "SERVICES &bull; DIVISION 01",
    badge: "Heidelberg Offset Precision",
    heroImage: "https://images.unsplash.com/photo-1589363460779-cd717d7e8fa5?auto=format&fit=crop&w=2000&q=85",
    description: "High-speed offset and digital printing for corporate stationery, brochures, catalogues, calendars, posters, stickers, and business publications.",
    categoryItems: COMMERCIAL_PRINTING_ITEMS,
  },

  "garments-accessories": {
    slug: "garments-accessories",
    id: "garments-accessories",
    title: "Garments Accessories",
    subtitle: "Export Grade Apparel Trims, Woven Labels & Construction Hardware",
    headline: "Precision Engineered Garment Trims & Accessories.",
    divisionLabel: "SERVICES &bull; DIVISION 02",
    badge: "OEKO-TEX & FSC Certified",
    heroImage: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=2000&q=85",
    description: "Woven labels, hangtags, heat transfers, leather patches, drawstrings, tapes, buttons, and comprehensive apparel trims.",
    categoryItems: GARMENTS_ACCESSORIES_ITEMS,
  },

  "packaging-solutions": {
    slug: "packaging-solutions",
    id: "packaging-solutions",
    title: "Packaging Solutions",
    subtitle: "Luxury Rigid Boxes, Paper Bags & Retail Presentation Packaging",
    headline: "Smart, Secure & Sustainable Packaging Solutions.",
    divisionLabel: "SERVICES &bull; DIVISION 03",
    badge: "Structural Dieline Engineering",
    heroImage: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=2000&q=85",
    description: "Kraft paper shopping bags, printed folding cartons, product boxes, luxury rigid gift boxes, poly bags, and retail packaging.",
    categoryItems: PACKAGING_SOLUTIONS_ITEMS,
  },

  "promotional-products": {
    slug: "promotional-products",
    id: "promotional-products",
    title: "Promotional Products",
    subtitle: "Customized Corporate Gifts, Branded Merchandise & Event Materials",
    headline: "Branded Promotional Items That Leave a Lasting Impression.",
    divisionLabel: "SERVICES &bull; DIVISION 04",
    badge: "Custom Laser & Silk Screen",
    heroImage: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=2000&q=85",
    description: "Promotional pens, notebooks, diaries, calendars, mugs, key rings, lanyards, ID badges, event apparel, and premium corporate gift sets.",
    categoryItems: PROMOTIONAL_PRODUCTS_ITEMS,
  },

  "packaging": {
    slug: "packaging",
    id: "packaging",
    title: "Packaging Solutions",
    subtitle: "Luxury Rigid Boxes, Paper Shopping Bags & Cartons",
    headline: "Smart, Secure & Sustainable Packaging Solutions.",
    divisionLabel: "SERVICES &bull; PACKAGING",
    badge: "Structural Dieline Engineering",
    heroImage: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=2000&q=85",
    description: "Kraft paper shopping bags, printed folding cartons, product boxes, luxury rigid gift boxes, poly bags, and customized retail packaging.",
    categoryItems: PACKAGING_SOLUTIONS_ITEMS,
  },

  // Legacy mappings for backwards compatibility
  "private-jobs": {
    slug: "private-jobs",
    id: "private-jobs",
    title: "Private Jobs — Apparel Accessories & Packaging",
    subtitle: "End-to-End Fashion & Technical Garment Trims",
    headline: "From Tech Pack To Finished Trims.",
    divisionLabel: "LEGACY DIVISION 01",
    badge: "Export Grade Manufacturing",
    heroImage: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=2000&q=85",
    description: "We provide comprehensive apparel product development and manufacturing solutions for global fashion labels.",
    categoryItems: GARMENTS_ACCESSORIES_ITEMS,
  },

  "commercial-jobs": {
    slug: "commercial-jobs",
    id: "commercial-jobs",
    title: "Commercial Jobs — Printing & Packaging",
    subtitle: "High-Definition Commercial Offset & Promotional Merchandise",
    headline: "Your Design. Our Printing Expertise.",
    divisionLabel: "LEGACY DIVISION 02",
    badge: "Heidelberg Speedmaster Precision",
    heroImage: "https://images.unsplash.com/photo-1589363460779-cd717d7e8fa5?auto=format&fit=crop&w=2000&q=85",
    description: "Whether you already have finalized artwork or need creative brand design support from scratch.",
    categoryItems: COMMERCIAL_PRINTING_ITEMS,
  },
};
