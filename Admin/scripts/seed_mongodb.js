const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const fs = require("fs");
const path = require("path");
const envPath = path.join(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const parts = line.split("=");
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join("=").trim().replace(/^["']|["']$/g, "");
      if (key && !process.env[key]) {
        process.env[key] = val;
      }
    }
  });
}

const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("Please define MONGODB_URI in your .env.local file");
  process.exit(1);
}

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    division: {
      type: String,
      required: true,
      enum: ["private-jobs", "commercial-jobs"],
    },
    category: { type: String, default: "General", trim: true },
    description: { type: String, default: "" },
    frontImage: { type: String, required: true },
    images: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const PartnerSchema = new mongoose.Schema(
  {
    name: { type: String, default: "", trim: true },
    logoUrl: { type: String, required: true },
    category: {
      type: String,
      enum: ["client", "certification", "partner"],
      default: "client",
    },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
const Partner = mongoose.models.Partner || mongoose.model("Partner", PartnerSchema);

const PRODUCTS_DATA = [
  // Private Jobs (5 selected as featured initially)
  {
    name: "Labels",
    slug: "labels",
    division: "private-jobs",
    category: "Garment Identification",
    description: "<p>Our garment labels are produced with high-definition Swiss looms and precision digital printing presses. Engineered to withstand rigorous industrial laundering and dry cleaning while retaining ultra-soft skin feel, crisp text definition, and vibrant color fidelity.</p>",
    frontImage: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1000&q=80",
    images: ["https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1000&q=80"],
    isFeatured: true,
  },
  {
    name: "Hangtags",
    slug: "hangtags",
    division: "private-jobs",
    category: "Branding & Retail",
    description: "<p>High-impact retail hangtags that define luxury and brand pedigree at point-of-sale. Available in textured artisanal stocks, heavyweight duplex cards, and FSC-certified virgin kraft boards with bespoke stringing and custom metal eyelet finishes.</p>",
    frontImage: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80",
    images: ["https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80"],
    isFeatured: true,
  },
  {
    name: "Trims & Tapes",
    slug: "trims-tapes",
    division: "private-jobs",
    category: "Trims & Elastics",
    description: "<p>Engineered jacquard elastic bands, twill tapes, and binding ribbons manufactured with high-modulus elastomer yarns. Specially developed for athletic stretch recovery, soft edge-comfort against skin, and zero color bleeding.</p>",
    frontImage: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1000&q=80",
    images: ["https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1000&q=80"],
    isFeatured: true,
  },
  {
    name: "Cords & Drawstrings",
    slug: "cords-drawstrings",
    division: "private-jobs",
    category: "Trims & Elastics",
    description: "<p>Custom braided, knitted, and tipped drawstrings designed for hoodies, swim shorts, and performance joggers. Offered with engraved silicone dipped aglets, brushed metal bullet tips, and reflective 3M safety threads.</p>",
    frontImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80"],
    isFeatured: true,
  },
  {
    name: "Zippers",
    slug: "zippers",
    division: "private-jobs",
    category: "Fasteners & Closures",
    description: "<p>Heavy-duty and concealable zippers built for export apparel and extreme outerwear. Tested for crosswise chain strength, cyclic reciprocating endurance, and corrosion-free salt spray resistance.</p>",
    frontImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80",
    images: ["https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80"],
    isFeatured: true,
  },
  {
    name: "Buttons & Buckles",
    slug: "buttons-buckles",
    division: "private-jobs",
    category: "Fasteners & Closures",
    description: "<p>Precision cast and machined apparel buttons crafted from sustainable horn, corozo nut, shell, polyester resin, and alloy zinc.</p>",
    frontImage: "/images/products/range-buttons.jpg",
    images: ["/images/products/range-buttons.jpg"],
    isFeatured: false,
  },
  {
    name: "Patches & Badges",
    slug: "patches-badges",
    division: "private-jobs",
    category: "Embellishments",
    description: "<p>Tactile brand identifiers engineered to add dimensional texture to jackets, caps, denim, and outdoor apparel.</p>",
    frontImage: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=1000&q=80",
    images: ["https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=1000&q=80"],
    isFeatured: false,
  },
  {
    name: "Boxes & Cartons",
    slug: "boxes-cartons",
    division: "private-jobs",
    category: "Garment Packaging",
    description: "<p>Engineered box packaging designed to protect garments from factory floor in Bangladesh to retail distribution centers worldwide.</p>",
    frontImage: "/images/products/comm-boxes.jpg",
    images: ["/images/products/comm-boxes.jpg"],
    isFeatured: false,
  },
  // Commercial Jobs
  {
    name: "Leaflets & Flyers",
    slug: "leaflets-flyers",
    division: "commercial-jobs",
    category: "Marketing Collaterals",
    description: "<p>Vibrant promotional flyers and distribution leaflets engineered for high-volume advertising campaigns and trade retail events.</p>",
    frontImage: "/images/products/comm-flyers.jpg",
    images: ["/images/products/comm-flyers.jpg"],
    isFeatured: false,
  },
  {
    name: "Brochures & Catalogues",
    slug: "brochures-catalogues",
    division: "commercial-jobs",
    category: "Marketing Collaterals",
    description: "<p>Comprehensive corporate showcase brochures and multi-page seasonal lookbooks that command authority and tell your story with editorial elegance.</p>",
    frontImage: "/images/products/comm-brochures.jpg",
    images: ["/images/products/comm-brochures.jpg"],
    isFeatured: false,
  },
  {
    name: "Business Cards & Stationery",
    slug: "business-cards-stationery",
    division: "commercial-jobs",
    category: "Corporate Identity",
    description: "<p>Authoritative corporate letterheads, branded executive envelopes, presentation folders, and tactile business cards crafted for seamless executive correspondence.</p>",
    frontImage: "/images/products/comm-stationery.jpg",
    images: ["/images/products/comm-stationery.jpg"],
    isFeatured: false,
  },
  {
    name: "Diaries & Notebooks",
    slug: "diaries-notebooks",
    division: "commercial-jobs",
    category: "Corporate Gifting",
    description: "<p>Hand-bound corporate executive planners, leatherette hardbound diaries, and ribbon-marked journals engineered for corporate gifting and boardroom prestige.</p>",
    frontImage: "/images/products/comm-notebooks.jpg",
    images: ["/images/products/comm-notebooks.jpg"],
    isFeatured: false,
  },
  {
    name: "Wall & Desk Calendars",
    slug: "wall-desk-calendars",
    division: "commercial-jobs",
    category: "Corporate Gifting",
    description: "<p>Architectural desk standees, wire-o bound flip calendars, and oversized wall charts designed to maintain year-round executive desk presence for your brand.</p>",
    frontImage: "/images/products/comm-calendars.jpg",
    images: ["/images/products/comm-calendars.jpg"],
    isFeatured: false,
  },
  {
    name: "Gift Boxes & Packaging",
    slug: "gift-boxes-packaging",
    division: "commercial-jobs",
    category: "Luxury Packaging",
    description: "<p>Bespoke magnetic closure rigid boxes, drawer slide-out presentation cases, and custom luxury unboxing sets crafted with precision die-cutting and artisanal lining.</p>",
    frontImage: "/images/products/comm-boxes.jpg",
    images: ["/images/products/comm-boxes.jpg"],
    isFeatured: false,
  },
];

const PARTNERS_DATA = [
  {
    name: "Kappa",
    logoUrl: "https://res.cloudinary.com/wpttnkjq/image/upload/v1794806630/Gemini_Generated_Image_bro3avbro3avbro3_wlmrho.jpg",
    category: "client",
  },
  {
    name: "FILA",
    logoUrl: "https://res.cloudinary.com/wpttnkjq/image/upload/v1794806630/Ba_ir3ryv.jpg",
    category: "client",
  },
  {
    name: "ellesse",
    logoUrl: "https://res.cloudinary.com/wpttnkjq/image/upload/v1794806630/Gemini_Generated_Image_dxyq57dxyq57dxyq_iw5qst.jpg",
    category: "client",
  },
  {
    name: "OEKO-TEX",
    logoUrl: "https://res.cloudinary.com/wpttnkjq/image/upload/v1794806630/Gemini_Generated_Image_dxyq57dxyq57dxyq_iw5qst.jpg",
    category: "certification",
  },
  {
    name: "FSC Certification",
    logoUrl: "https://res.cloudinary.com/wpttnkjq/image/upload/v1794806630/Ba_ir3ryv.jpg",
    category: "certification",
  },
];

async function seed() {
  console.log("Connecting to MongoDB Atlas with Google DNS (8.8.8.8)...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected successfully to MongoDB Atlas cluster!");

  console.log("Uploading products...");
  for (const p of PRODUCTS_DATA) {
    await Product.findOneAndUpdate({ slug: p.slug }, p, {
      upsert: true,
      new: true,
    });
  }
  console.log(`Successfully seeded ${PRODUCTS_DATA.length} products to MongoDB!`);

  console.log("Uploading partners...");
  for (const prt of PARTNERS_DATA) {
    await Partner.findOneAndUpdate({ name: prt.name }, prt, {
      upsert: true,
      new: true,
    });
  }
  console.log(`Successfully seeded ${PARTNERS_DATA.length} partners to MongoDB!`);

  const prodCount = await Product.countDocuments();
  const partCount = await Partner.countDocuments();
  console.log(`Current verified in MongoDB: ${prodCount} products, ${partCount} partners.`);

  await mongoose.disconnect();
  console.log("MongoDB upload complete!");
}

seed().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
