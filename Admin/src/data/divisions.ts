import { JobDivision } from "@/types";

export interface SubCategoryItem {
  name: string;
  slug: string;
}

export interface AdminDivisionConfig {
  id: JobDivision;
  name: string;
  label: string;
  title: string;
  subtitle: string;
  icon: "printer" | "shirt" | "package" | "gift" | "briefcase" | "scissors";
  items: SubCategoryItem[];
}

export const ADMIN_DIVISIONS: AdminDivisionConfig[] = [
  {
    id: "commercial-printing",
    name: "COMMERCIAL PRINTING",
    label: "Commercial Printing",
    title: "Commercial Printing Solutions",
    subtitle: "High-precision commercial offset, publications, brochures, and stationery.",
    icon: "printer",
    items: [
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
    ],
  },
  {
    id: "garments-accessories",
    name: "GARMENTS ACCESSORIES",
    label: "Garments Accessories",
    title: "Garments Accessories & Trims",
    subtitle: "Woven labels, hangtags, heat transfers, patches, and garment trims.",
    icon: "shirt",
    items: [
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
    ],
  },
  {
    id: "packaging-solutions",
    name: "PACKAGING SOLUTIONS",
    label: "Packaging Solutions",
    title: "Packaging Solutions & Cartons",
    subtitle: "Paper bags, printed boxes, luxury rigid gift boxes, and poly packaging.",
    icon: "package",
    items: [
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
    ],
  },
  {
    id: "promotional-products",
    name: "PROMOTIONAL PRODUCTS",
    label: "Promotional Products",
    title: "Promotional Products & Merchandise",
    subtitle: "Promotional pens, notebooks, mugs, lanyards, apparel, and corporate gifts.",
    icon: "gift",
    items: [
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
    ],
  },
  {
    id: "corporate-projects",
    name: "CORPORATE PROJECTS",
    label: "Corporate Projects",
    title: "Corporate Projects & Branding",
    subtitle: "Annual reports, corporate identity suites, presentation folders, and event collateral.",
    icon: "briefcase",
    items: [
      { name: "Annual Reports & Publications", slug: "annual-reports-publications" },
      { name: "Corporate Identity & Stationery", slug: "corporate-identity-stationery" },
      { name: "Presentation Folders & Press Kits", slug: "presentation-folders-press-kits" },
      { name: "Event Backdrops & Banners", slug: "event-backdrops-banners" },
      { name: "Boardroom Portfolios & Folders", slug: "boardroom-portfolios-folders" },
      { name: "Commemorative Gift Sets", slug: "commemorative-gift-sets" },
    ],
  },
  {
    id: "apparel-projects",
    name: "APPAREL PROJECTS",
    label: "Apparel Projects",
    title: "Apparel Projects & Trims",
    subtitle: "Complete denim trim suites, outerwear badges, heat transfers, and export trims.",
    icon: "scissors",
    items: [
      { name: "Complete Denim Trim Packages", slug: "complete-denim-trim-packages" },
      { name: "Outerwear 3D Badges & Pullers", slug: "outerwear-badges-pullers" },
      { name: "Sportswear Stretch Heat Transfers", slug: "sportswear-stretch-heat-transfers" },
      { name: "Sustainable Recycled Yarn Labels", slug: "sustainable-recycled-yarn-labels" },
      { name: "Export Barcode & Variable Runs", slug: "export-barcode-variable-runs" },
      { name: "Garment Poly Packaging", slug: "garment-poly-packaging" },
    ],
  },
];
