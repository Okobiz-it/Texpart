import { slugify } from "@/lib/slugify";

export interface DropdownItem {
  name: string;
  slug: string;
  description?: string;
}

export interface ServiceDivision {
  id: string;
  name: string;
  slug: string;
  href: string;
  subtitle: string;
  badge?: string;
  items: DropdownItem[];
}

export const BRAND_INFO = {
  name: "Texpart Design & Accessories",
  tagline: "YOUR COMPLETE PARTNER FOR PRINTING, GARMENTS ACCESSORIES & PACKAGING SOLUTIONS",
  processSteps: "Design • Develop • Produce • Pack • Deliver",
  valueProp: "ONE PARTNER. MULTIPLE SOLUTIONS.",
  architecture: "PRINTING | GARMENTS ACCESSORIES | PACKAGING | PROMOTIONAL",
  contact: {
    address: "263 Fakirapool, Box Culvert Road, Motijheel, Dhaka - 1000, Bangladesh",
    factory: "Fakirapool & Tejgaon Industrial Area, Dhaka",
    mobile: "+880 1711-234567",
    mobileSecondary: "+880 1613-084465",
    whatsapp: "+880 1711-234567",
    whatsappLink: "https://wa.me/8801711234567",
    email: "info@texpartbd.com",
    emailSecondary: "texpartdesign@gmail.com",
    businessHours: "Saturday – Thursday: 9:00 AM – 8:00 PM (Friday Closed)",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.4835695880577!2d90.41474937593256!3d23.730107389552174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b85bd17e76cb%3A0xb35a09f87425838!2s263%20Fakirapool%2C%20Dhaka%201000!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd",
  },
};

// Helper that automatically creates clean URL slugs for any category name using slugify
export const makeCategoryItem = (name: string, description?: string): DropdownItem => ({
  name,
  slug: slugify(name),
  description,
});

// 1. COMMERCIAL PRINTING (10 items)
export const COMMERCIAL_PRINTING_ITEMS: DropdownItem[] = [
  makeCategoryItem("Business Cards & Stationery"),
  makeCategoryItem("Leaflets & Flyers"),
  makeCategoryItem("Brochures & Catalogues"),
  makeCategoryItem("Diaries & Notebooks"),
  makeCategoryItem("Wall & Desk Calendars"),
  makeCategoryItem("Posters & Banners"),
  makeCategoryItem("Stickers & Labels"),
  makeCategoryItem("Forms, Pads & Office Materials"),
  makeCategoryItem("Corporate Printing"),
  makeCategoryItem("Printing & Publication"),
];

// 2. GARMENTS ACCESSORIES (11 items)
export const GARMENTS_ACCESSORIES_ITEMS: DropdownItem[] = [
  makeCategoryItem("Woven Labels / Printed Labels / Care Labels / Size Labels"),
  makeCategoryItem("Hangtags / Price Tags / Barcode Tags & Stickers"),
  makeCategoryItem("Heat Transfer Labels / Screen Print Labels"),
  makeCategoryItem("Patches & Badges / Leather & PU Patches / Silicone / Rubber Badges"),
  makeCategoryItem("Cords & Drawstrings / Twill & Cotton Tapes / Polyester Tapes / Elastic / Hanger Loops"),
  makeCategoryItem("Buttons & Rivets"),
  makeCategoryItem("Buckles, Loops & D-Rings"),
  makeCategoryItem("Neck & Back Boards"),
  makeCategoryItem("Photo Cards"),
  makeCategoryItem("Poly Bags"),
  makeCategoryItem("Other Garment Trims"),
];

// 3. PACKAGING SOLUTIONS (12 items)
export const PACKAGING_SOLUTIONS_ITEMS: DropdownItem[] = [
  makeCategoryItem("Paper Bags"),
  makeCategoryItem("Printed Boxes"),
  makeCategoryItem("Product Boxes"),
  makeCategoryItem("Premium Gift Boxes"),
  makeCategoryItem("Printed Poly Bags"),
  makeCategoryItem("Self-Adhesive Bags"),
  makeCategoryItem("Stickers & Seals"),
  makeCategoryItem("Tissue Paper"),
  makeCategoryItem("Packaging Labels"),
  makeCategoryItem("Retail Packaging"),
  makeCategoryItem("Garment Packaging"),
  makeCategoryItem("Customized Packaging"),
];

// 4. PROMOTIONAL PRODUCTS (15 items)
export const PROMOTIONAL_PRODUCTS_ITEMS: DropdownItem[] = [
  makeCategoryItem("Promotional Pens"),
  makeCategoryItem("Notebooks"),
  makeCategoryItem("Diaries"),
  makeCategoryItem("Calendars"),
  makeCategoryItem("Mugs"),
  makeCategoryItem("Key Rings"),
  makeCategoryItem("Lanyards"),
  makeCategoryItem("ID Cards & Holders"),
  makeCategoryItem("T-Shirts"),
  makeCategoryItem("Caps"),
  makeCategoryItem("Bags"),
  makeCategoryItem("Event Materials"),
  makeCategoryItem("Corporate Gifts"),
  makeCategoryItem("Premium Gift Items"),
  makeCategoryItem("Customized Promotional Products"),
];

// 4 Core Divisions Under Services
export const SERVICES_DIVISIONS: ServiceDivision[] = [
  {
    id: "commercial-printing",
    name: "COMMERCIAL PRINTING",
    slug: "commercial-printing",
    href: "/services/commercial-printing",
    subtitle: "High-Precision Offset & Publications",
    badge: "10 Categories",
    items: COMMERCIAL_PRINTING_ITEMS,
  },
  {
    id: "garments-accessories",
    name: "GARMENTS ACCESSORIES",
    slug: "garments-accessories",
    href: "/services/garments-accessories",
    subtitle: "Woven Labels, Hangtags & Trims",
    badge: "11 Categories",
    items: GARMENTS_ACCESSORIES_ITEMS,
  },
  {
    id: "packaging-solutions",
    name: "PACKAGING SOLUTIONS",
    slug: "packaging-solutions",
    href: "/services/packaging-solutions",
    subtitle: "Luxury Rigid Boxes, Bags & Cartons",
    badge: "12 Categories",
    items: PACKAGING_SOLUTIONS_ITEMS,
  },
  {
    id: "promotional-products",
    name: "PROMOTIONAL PRODUCTS",
    slug: "promotional-products",
    href: "/services/promotional-products",
    subtitle: "Corporate Gifts, Apparel & Swag",
    badge: "15 Categories",
    items: PROMOTIONAL_PRODUCTS_ITEMS,
  },
];

// 5. OUR CAPABILITIES (Workflow + 11 capabilities)
export const CAPABILITIES_WORKFLOW = [
  { step: "01", name: "DESIGN", desc: "Creative concepts & technical dielines" },
  { step: "02", name: "DEVELOP", desc: "Color separation, plate & tool development" },
  { step: "03", name: "PRODUCE", desc: "High-speed offset & precision fabrication" },
  { step: "04", name: "PACK", desc: "Strict QC, barcode check & moisture-proof packing" },
  { step: "05", name: "DELIVER", desc: "Direct distribution to factory floors worldwide" },
];

export const CAPABILITIES_ITEMS: DropdownItem[] = [
  { name: "Creative & Graphic Design", slug: "creative-graphic-design" },
  { name: "Material Sourcing & R&D", slug: "material-sourcing-rd" },
  { name: "Sampling", slug: "sampling" },
  { name: "Commercial Printing", slug: "commercial-printing-capability" },
  { name: "Label & Trim Development", slug: "label-trim-development" },
  { name: "Packaging Development", slug: "packaging-development" },
  { name: "Quality Control", slug: "quality-control" },
  { name: "Sourcing & Production", slug: "sourcing-production" },
  { name: "Finishing", slug: "finishing" },
  { name: "Packing", slug: "packing" },
  { name: "Delivery", slug: "delivery" },
];

// 6. OUR WORK (6 categories)
export const CORPORATE_PROJECTS_ITEMS: DropdownItem[] = [
  makeCategoryItem("Annual Reports & Publications"),
  makeCategoryItem("Corporate Identity & Stationery"),
  makeCategoryItem("Presentation Folders & Press Kits"),
  makeCategoryItem("Event Backdrops & Banners"),
  makeCategoryItem("Boardroom Portfolios & Folders"),
  makeCategoryItem("Commemorative Gift Sets"),
];

export const APPAREL_PROJECTS_ITEMS: DropdownItem[] = [
  makeCategoryItem("Complete Denim Trim Packages"),
  makeCategoryItem("Outerwear 3D Badges & Pullers"),
  makeCategoryItem("Sportswear Stretch Heat Transfers"),
  makeCategoryItem("Sustainable Recycled Yarn Labels"),
  makeCategoryItem("Export Barcode & Variable Runs"),
  makeCategoryItem("Garment Poly Packaging"),
];

export const OUR_WORK_ITEMS: DropdownItem[] = [
  { name: "Commercial Printing", slug: "commercial-printing" },
  { name: "Garments Accessories", slug: "garments-accessories" },
  { name: "Packaging", slug: "packaging" },
  { name: "Promotional Products", slug: "promotional-products" },
  { name: "Corporate Projects", slug: "corporate-projects" },
  { name: "Apparel Projects", slug: "apparel-projects" },
];

export interface WorkVertical {
  id: string;
  name: string;
  slug: string;
  href: string;
  subtitle: string;
  icon: "printer" | "shirt" | "package" | "gift" | "briefcase" | "scissors";
  badge: string;
  items: DropdownItem[];
}

export const OUR_WORK_VERTICALS: WorkVertical[] = [
  {
    id: "commercial-printing",
    name: "Commercial Printing",
    slug: "commercial-printing",
    href: "/commercial-printing",
    subtitle: "High-precision offset, catalogues, diaries & publications",
    icon: "printer",
    badge: "10 Categories",
    items: COMMERCIAL_PRINTING_ITEMS,
  },
  {
    id: "garments-accessories",
    name: "Garments Accessories",
    slug: "garments-accessories",
    href: "/garments-accessories",
    subtitle: "Woven labels, hangtags, heat transfers, patches & trims",
    icon: "shirt",
    badge: "11 Categories",
    items: GARMENTS_ACCESSORIES_ITEMS,
  },
  {
    id: "packaging",
    name: "Packaging",
    slug: "packaging",
    href: "/packaging-solutions",
    subtitle: "Luxury rigid boxes, paper shopping bags & product cartons",
    icon: "package",
    badge: "12 Categories",
    items: PACKAGING_SOLUTIONS_ITEMS,
  },
  {
    id: "promotional-products",
    name: "Promotional Products",
    slug: "promotional-products",
    href: "/promotional-products",
    subtitle: "Custom branded corporate gifts, mugs, apparel & merchandise",
    icon: "gift",
    badge: "15 Categories",
    items: PROMOTIONAL_PRODUCTS_ITEMS,
  },
  {
    id: "corporate-projects",
    name: "Corporate Projects",
    slug: "corporate-projects",
    href: "/corporate-projects",
    subtitle: "Integrated corporate identity, annual reports & event branding",
    icon: "briefcase",
    badge: "6 Categories",
    items: CORPORATE_PROJECTS_ITEMS,
  },
  {
    id: "apparel-projects",
    name: "Apparel Projects",
    slug: "apparel-projects",
    href: "/apparel-projects",
    subtitle: "Comprehensive trim suites for international export fashion brands",
    icon: "scissors",
    badge: "6 Categories",
    items: APPAREL_PROJECTS_ITEMS,
  },
];

// All category items aggregated for universal slug <-> name resolution
export const ALL_CATEGORY_ITEMS: DropdownItem[] = [
  ...COMMERCIAL_PRINTING_ITEMS,
  ...GARMENTS_ACCESSORIES_ITEMS,
  ...PACKAGING_SOLUTIONS_ITEMS,
  ...PROMOTIONAL_PRODUCTS_ITEMS,
  ...CORPORATE_PROJECTS_ITEMS,
  ...APPAREL_PROJECTS_ITEMS,
];

/**
 * Automatically creates a clean, URL-friendly slug for any category name using slugify.
 * E.g. "Printed Poly Bags" -> "printed-poly-bags"
 */
export function getCategorySlug(categoryName: string): string {
  if (!categoryName || categoryName.trim().toLowerCase() === "all") return "all";
  return slugify(categoryName);
}

/**
 * Resolves a category slug (or legacy name) back to its human-readable display name.
 * E.g. "printed-poly-bags" -> "Printed Poly Bags"
 */
export function getCategoryNameFromSlug(
  slugOrName: string,
  items?: (DropdownItem | string)[]
): string {
  if (!slugOrName || slugOrName.trim().toLowerCase() === "all") return "All";
  const target = slugOrName.trim().toLowerCase();

  const searchPool = (items && items.length > 0 ? items : ALL_CATEGORY_ITEMS).map((entry) =>
    typeof entry === "string" ? { name: entry, slug: slugify(entry) } : entry
  );

  // 1. Direct match with slugify(item.name)
  const matchSlugify = searchPool.find((item) => slugify(item.name) === target);
  if (matchSlugify) return matchSlugify.name;

  // 2. Direct slug property match
  const matchSlug = searchPool.find((item) => item.slug && item.slug.toLowerCase() === target);
  if (matchSlug) return matchSlug.name;

  // 3. Fallback search across ALL_CATEGORY_ITEMS if scoped
  if (items && items.length > 0) {
    const allMatchSlugify = ALL_CATEGORY_ITEMS.find((item) => slugify(item.name) === target);
    if (allMatchSlugify) return allMatchSlugify.name;

    const allMatchSlug = ALL_CATEGORY_ITEMS.find((item) => item.slug && item.slug.toLowerCase() === target);
    if (allMatchSlug) return allMatchSlug.name;
  }

  // 4. Decoded or direct name match (legacy fallback)
  let decoded = target;
  try {
    decoded = decodeURIComponent(slugOrName).trim().toLowerCase();
  } catch {
    // ignore
  }
  const matchName = searchPool.find((item) => item.name.toLowerCase() === decoded);
  if (matchName) return matchName.name;

  const allMatchName = ALL_CATEGORY_ITEMS.find((item) => item.name.toLowerCase() === decoded);
  if (allMatchName) return allMatchName.name;

  return decodeURIComponent(slugOrName);
}

