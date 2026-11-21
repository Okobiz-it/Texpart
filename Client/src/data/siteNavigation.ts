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

// 1. COMMERCIAL PRINTING (10 items)
export const COMMERCIAL_PRINTING_ITEMS: DropdownItem[] = [
  { name: "Business Cards & Stationery", slug: "business-cards-stationery" },
  { name: "Leaflets & Flyers", slug: "leaflets-flyers" },
  { name: "Brochures & Catalogues", slug: "brochures-catalogues" },
  { name: "Diaries & Notebooks", slug: "diaries-notebooks" },
  { name: "Wall & Desk Calendars", slug: "wall-desk-calendars" },
  { name: "Posters & Banners", slug: "posters-banners" },
  { name: "Stickers & Labels", slug: "stickers-labels" },
  { name: "Forms, Pads & Office Materials", slug: "forms-pads-office-materials" },
  { name: "Corporate Printing", slug: "corporate-printing" },
  { name: "Printing & Publication", slug: "printing-publication" },
];

// 2. GARMENTS ACCESSORIES (11 items)
export const GARMENTS_ACCESSORIES_ITEMS: DropdownItem[] = [
  { name: "Woven Labels / Printed Labels / Care Labels / Size Labels", slug: "woven-printed-care-size-labels" },
  { name: "Hangtags / Price Tags / Barcode Tags & Stickers", slug: "hangtags-price-barcode-tags" },
  { name: "Heat Transfer Labels / Screen Print Labels", slug: "heat-transfer-screen-print-labels" },
  { name: "Patches & Badges / Leather & PU Patches / Silicone / Rubber Badges", slug: "patches-leather-pu-silicone-badges" },
  { name: "Cords & Drawstrings / Twill & Cotton Tapes / Polyester Tapes / Elastic / Hanger Loops", slug: "cords-drawstrings-tapes-elastics" },
  { name: "Buttons & Rivets", slug: "buttons-rivets" },
  { name: "Buckles, Loops & D-Rings", slug: "buckles-loops-d-rings" },
  { name: "Neck & Back Boards", slug: "neck-back-boards" },
  { name: "Photo Cards", slug: "photo-cards" },
  { name: "Poly Bags", slug: "poly-bags-garments" },
  { name: "Other Garment Trims", slug: "other-garment-trims" },
];

// 3. PACKAGING SOLUTIONS (12 items)
export const PACKAGING_SOLUTIONS_ITEMS: DropdownItem[] = [
  { name: "Paper Bags", slug: "paper-bags" },
  { name: "Printed Boxes", slug: "printed-boxes" },
  { name: "Product Boxes", slug: "product-boxes" },
  { name: "Premium Gift Boxes", slug: "premium-gift-boxes" },
  { name: "Printed Poly Bags", slug: "printed-poly-bags" },
  { name: "Self-Adhesive Bags", slug: "self-adhesive-bags" },
  { name: "Stickers & Seals", slug: "stickers-seals" },
  { name: "Tissue Paper", slug: "tissue-paper" },
  { name: "Packaging Labels", slug: "packaging-labels" },
  { name: "Retail Packaging", slug: "retail-packaging" },
  { name: "Garment Packaging", slug: "garment-packaging" },
  { name: "Customized Packaging", slug: "customized-packaging" },
];

// 4. PROMOTIONAL PRODUCTS (15 items)
export const PROMOTIONAL_PRODUCTS_ITEMS: DropdownItem[] = [
  { name: "Promotional Pens", slug: "promotional-pens" },
  { name: "Notebooks", slug: "promotional-notebooks" },
  { name: "Diaries", slug: "promotional-diaries" },
  { name: "Calendars", slug: "promotional-calendars" },
  { name: "Mugs", slug: "promotional-mugs" },
  { name: "Key Rings", slug: "key-rings" },
  { name: "Lanyards", slug: "lanyards" },
  { name: "ID Cards & Holders", slug: "id-cards-holders" },
  { name: "T-Shirts", slug: "promotional-t-shirts" },
  { name: "Caps", slug: "caps" },
  { name: "Bags", slug: "promotional-bags" },
  { name: "Event Materials", slug: "event-materials" },
  { name: "Corporate Gifts", slug: "corporate-gifts" },
  { name: "Premium Gift Items", slug: "premium-gift-items" },
  { name: "Customized Promotional Products", slug: "customized-promotional-products" },
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
  { name: "Annual Reports & Publications", slug: "annual-reports-publications" },
  { name: "Corporate Identity & Stationery", slug: "corporate-identity-stationery" },
  { name: "Presentation Folders & Press Kits", slug: "presentation-folders-press-kits" },
  { name: "Event Backdrops & Banners", slug: "event-backdrops-banners" },
  { name: "Boardroom Portfolios & Folders", slug: "boardroom-portfolios-folders" },
  { name: "Commemorative Gift Sets", slug: "commemorative-gift-sets" },
];

export const APPAREL_PROJECTS_ITEMS: DropdownItem[] = [
  { name: "Complete Denim Trim Packages", slug: "complete-denim-trim-packages" },
  { name: "Outerwear 3D Badges & Pullers", slug: "outerwear-badges-pullers" },
  { name: "Sportswear Stretch Heat Transfers", slug: "sportswear-stretch-heat-transfers" },
  { name: "Sustainable Recycled Yarn Labels", slug: "sustainable-recycled-yarn-labels" },
  { name: "Export Barcode & Variable Runs", slug: "export-barcode-variable-runs" },
  { name: "Garment Poly Packaging", slug: "garment-poly-packaging" },
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
