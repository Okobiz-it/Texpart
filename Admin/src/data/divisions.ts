import { JobDivision } from "@/types";
import { slugify } from "@/lib/slugify";

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
  icon: "printer" | "shirt" | "package" | "gift";
  items: SubCategoryItem[];
}

const makeItem = (name: string): SubCategoryItem => ({
  name,
  slug: slugify(name),
});

export const ADMIN_DIVISIONS: AdminDivisionConfig[] = [
  {
    id: "commercial-printing",
    name: "COMMERCIAL PRINTING",
    label: "Commercial Printing",
    title: "Commercial Printing Solutions",
    subtitle: "High-precision commercial offset, publications, brochures, and stationery.",
    icon: "printer",
    items: [
      makeItem("Corporate Brochures"),
      makeItem("Company Profiles"),
      makeItem("Leaflets & Flyers"),
      makeItem("Product Catalogues"),
      makeItem("Annual Reports"),
      makeItem("Business Cards"),
      makeItem("Letterheads"),
      makeItem("Envelopes"),
      makeItem("Corporate Folders"),
      makeItem("Diaries & Notebooks"),
      makeItem("Wall Calendars"),
      makeItem("Desk Calendars"),
      makeItem("Posters & Banners"),
      makeItem("Stickers & Labels"),
      makeItem("Invitation Cards"),
      makeItem("Certificates"),
      makeItem("Training Materials"),
      makeItem("Event Materials"),
      makeItem("Promotional Print Materials"),
      makeItem("Customized Corporate Stationery"),
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
      makeItem("Woven Labels"),
      makeItem("Printed Labels"),
      makeItem("Care Labels"),
      makeItem("Size Labels"),
      makeItem("Heat Transfer Labels"),
      makeItem("Screen Printed Labels"),
      makeItem("Hangtags"),
      makeItem("Price Tags"),
      makeItem("Barcode Tags & Stickers"),
      makeItem("Brand Labels"),
      makeItem("Leather & PU Patches"),
      makeItem("Silicone & Rubber Badges"),
      makeItem("Woven Patches"),
      makeItem("Cotton, Polyester & Twill Tapes"),
      makeItem("Elastic & Loops"),
      makeItem("Cords & Drawstrings"),
      makeItem("Buttons"),
      makeItem("Rivets"),
      makeItem("Buckles"),
      makeItem("D-Rings"),
      makeItem("O-Rings"),
      makeItem("Suspender Accessories"),
      makeItem("Garment Branding Components"),
      makeItem("Other Customized Garments Accessories"),
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
      makeItem("Printed Paper Bags"),
      makeItem("Shopping Bags"),
      makeItem("Printed Boxes"),
      makeItem("Folding Cartons"),
      makeItem("Gift Boxes"),
      makeItem("Premium Packaging"),
      makeItem("Product Boxes"),
      makeItem("Stickers & Seals"),
      makeItem("Printed Poly Bags"),
      makeItem("Sealed Poly Bags"),
      makeItem("Barcode Stickers"),
      makeItem("Product Labels"),
      makeItem("Packaging Accessories"),
      makeItem("Customized Branding Materials"),
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
      makeItem("Promotional T-Shirts"),
      makeItem("Caps"),
      makeItem("Pens"),
      makeItem("Mugs"),
      makeItem("Bags"),
      makeItem("Lanyards"),
      makeItem("Key Rings"),
      makeItem("Umbrellas"),
      makeItem("Notebooks"),
      makeItem("Diaries"),
      makeItem("Calendars"),
      makeItem("Corporate Gifts"),
      makeItem("Event Giveaways"),
      makeItem("Customized Promotional Items"),
    ],
  },
];
