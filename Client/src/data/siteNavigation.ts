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
    company: "“texpart design & accessories”",
    divisions: "Commercial Printing | Garments Accessories | Packaging Solutions | Promotional Products",
    proprietor: "Tarkik HASAN",
    title: "Proprietor",
    address: "119, Arambagh, Motijheel, Dhaka-1000, Bangladesh",
    factory: "119, Arambagh, Motijheel, Dhaka-1000, Bangladesh",
    mobile: "+880 197 308 4465",
    mobileSecondary: "+880 171 308 4465",
    whatsapp: "+880 171 308 4465",
    whatsappLink: "https://wa.me/8801713084465",
    email: "info@texpartdesign.com",
    emailSecondary: "info@texpartdesign.com",
    website: "www.texpartdesign.com",
    websiteUrl: "https://www.texpartdesign.com",
    businessHours: "Saturday – Thursday: 9:00 AM – 8:00 PM (Friday Closed)",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.4835695880577!2d90.41474937593256!3d23.730107389552174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b85bd17e76cb%3A0xb35a09f87425838!2s119%20Arambagh%2C%20Dhaka%201000!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd",
  },
};

// Helper that automatically creates clean URL slugs for any category name using slugify
export const makeCategoryItem = (name: string, description?: string): DropdownItem => ({
  name,
  slug: slugify(name),
  description,
});

// A. COMMERCIAL PRINTING (20 items from Official Profile)
export const COMMERCIAL_PRINTING_ITEMS: DropdownItem[] = [
  makeCategoryItem("Corporate Brochures"),
  makeCategoryItem("Company Profiles"),
  makeCategoryItem("Leaflets & Flyers"),
  makeCategoryItem("Product Catalogues"),
  makeCategoryItem("Annual Reports"),
  makeCategoryItem("Business Cards"),
  makeCategoryItem("Letterheads"),
  makeCategoryItem("Envelopes"),
  makeCategoryItem("Corporate Folders"),
  makeCategoryItem("Diaries & Notebooks"),
  makeCategoryItem("Wall Calendars"),
  makeCategoryItem("Desk Calendars"),
  makeCategoryItem("Posters & Banners"),
  makeCategoryItem("Stickers & Labels"),
  makeCategoryItem("Invitation Cards"),
  makeCategoryItem("Certificates"),
  makeCategoryItem("Training Materials"),
  makeCategoryItem("Event Materials"),
  makeCategoryItem("Promotional Print Materials"),
  makeCategoryItem("Customized Corporate Stationery"),
];

// B. GARMENTS ACCESSORIES (24 items from Official Profile)
export const GARMENTS_ACCESSORIES_ITEMS: DropdownItem[] = [
  makeCategoryItem("Woven Labels"),
  makeCategoryItem("Printed Labels"),
  makeCategoryItem("Care Labels"),
  makeCategoryItem("Size Labels"),
  makeCategoryItem("Heat Transfer Labels"),
  makeCategoryItem("Screen Printed Labels"),
  makeCategoryItem("Hangtags"),
  makeCategoryItem("Price Tags"),
  makeCategoryItem("Barcode Tags & Stickers"),
  makeCategoryItem("Brand Labels"),
  makeCategoryItem("Leather & PU Patches"),
  makeCategoryItem("Silicone & Rubber Badges"),
  makeCategoryItem("Woven Patches"),
  makeCategoryItem("Cotton, Polyester & Twill Tapes"),
  makeCategoryItem("Elastic & Loops"),
  makeCategoryItem("Cords & Drawstrings"),
  makeCategoryItem("Buttons"),
  makeCategoryItem("Rivets"),
  makeCategoryItem("Buckles"),
  makeCategoryItem("D-Rings"),
  makeCategoryItem("O-Rings"),
  makeCategoryItem("Suspender Accessories"),
  makeCategoryItem("Garment Branding Components"),
  makeCategoryItem("Other Customized Garments Accessories"),
];

// C. PACKAGING SOLUTIONS (14 items from Official Profile)
export const PACKAGING_SOLUTIONS_ITEMS: DropdownItem[] = [
  makeCategoryItem("Printed Paper Bags"),
  makeCategoryItem("Shopping Bags"),
  makeCategoryItem("Printed Boxes"),
  makeCategoryItem("Folding Cartons"),
  makeCategoryItem("Gift Boxes"),
  makeCategoryItem("Premium Packaging"),
  makeCategoryItem("Product Boxes"),
  makeCategoryItem("Stickers & Seals"),
  makeCategoryItem("Printed Poly Bags"),
  makeCategoryItem("Sealed Poly Bags"),
  makeCategoryItem("Barcode Stickers"),
  makeCategoryItem("Product Labels"),
  makeCategoryItem("Packaging Accessories"),
  makeCategoryItem("Customized Branding Materials"),
];

// D. PROMOTIONAL PRODUCTS (14 items from Official Profile)
export const PROMOTIONAL_PRODUCTS_ITEMS: DropdownItem[] = [
  makeCategoryItem("Promotional T-Shirts"),
  makeCategoryItem("Caps"),
  makeCategoryItem("Pens"),
  makeCategoryItem("Mugs"),
  makeCategoryItem("Bags"),
  makeCategoryItem("Lanyards"),
  makeCategoryItem("Key Rings"),
  makeCategoryItem("Umbrellas"),
  makeCategoryItem("Notebooks"),
  makeCategoryItem("Diaries"),
  makeCategoryItem("Calendars"),
  makeCategoryItem("Corporate Gifts"),
  makeCategoryItem("Event Giveaways"),
  makeCategoryItem("Customized Promotional Items"),
];

// 4 Core Work Menu Items
export const OUR_WORK_ITEMS: DropdownItem[] = [
  { name: "Commercial Printing", slug: "commercial-printing" },
  { name: "Garments Accessories", slug: "garments-accessories" },
  { name: "Packaging", slug: "packaging" },
  { name: "Promotional Products", slug: "promotional-products" },
];

export interface WorkVertical {
  id: string;
  name: string;
  slug: string;
  href: string;
  subtitle: string;
  icon: "printer" | "shirt" | "package" | "gift";
  badge: string;
  items: DropdownItem[];
}

// 4 Core Work Verticals for Header Mega Menu
export const OUR_WORK_VERTICALS: WorkVertical[] = [
  {
    id: "commercial-printing",
    name: "Commercial Printing",
    slug: "commercial-printing",
    href: "/commercial-printing",
    subtitle: "High-precision offset, catalogues, diaries & publications",
    icon: "printer",
    badge: "20 Categories",
    items: COMMERCIAL_PRINTING_ITEMS,
  },
  {
    id: "garments-accessories",
    name: "Garments Accessories",
    slug: "garments-accessories",
    href: "/garments-accessories",
    subtitle: "Woven labels, hangtags, heat transfers, patches & trims",
    icon: "shirt",
    badge: "24 Categories",
    items: GARMENTS_ACCESSORIES_ITEMS,
  },
  {
    id: "packaging",
    name: "Packaging",
    slug: "packaging",
    href: "/packaging-solutions",
    subtitle: "Luxury rigid boxes, paper shopping bags & product cartons",
    icon: "package",
    badge: "14 Categories",
    items: PACKAGING_SOLUTIONS_ITEMS,
  },
  {
    id: "promotional-products",
    name: "Promotional Products",
    slug: "promotional-products",
    href: "/promotional-products",
    subtitle: "Custom branded corporate gifts, mugs, apparel & merchandise",
    icon: "gift",
    badge: "14 Categories",
    items: PROMOTIONAL_PRODUCTS_ITEMS,
  },
];

// All category items aggregated for universal slug <-> name resolution (72 total items)
export const ALL_CATEGORY_ITEMS: DropdownItem[] = [
  ...COMMERCIAL_PRINTING_ITEMS,
  ...GARMENTS_ACCESSORIES_ITEMS,
  ...PACKAGING_SOLUTIONS_ITEMS,
  ...PROMOTIONAL_PRODUCTS_ITEMS,
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
