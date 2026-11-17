import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import GalleryItem from "@/models/GalleryItem";

export const dynamic = "force-dynamic";

const SEED_GALLERY = [
  {
    title: "Precision Pattern Cutting & Fabric Spreading",
    category: "garment-production",
    categoryLabel: "Garment Production",
    aspect: "tall",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80",
    description: "Automated multi-ply fabric cutter ensuring millimeter tolerance for outerwear jackets and technical trousers.",
    location: "Apparel Cutting Division, Dhaka Facility",
    meta: "Laser guided • Multi-ply vacuum table",
    order: 1,
  },
  {
    title: "High-Density Damask Woven Brand Labels",
    category: "apparel-accessories",
    categoryLabel: "Apparel Accessories",
    aspect: "wide",
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1200&q=80",
    description: "Ultra-fine yarn weaving producing razor-sharp micro typographic definition with skin-soft ultrasonic edge sealing.",
    location: "Accessories Loom Facility, Dhaka",
    meta: "Swiss Mueller Looms • GRS Recycled Polyester",
    order: 2,
  },
  {
    title: "Heidelberg Speedmaster 6-Color Offset Printing",
    category: "printing",
    categoryLabel: "Printing",
    aspect: "square",
    image: "https://images.unsplash.com/photo-1589363460779-cd717d7e8fa5?auto=format&fit=crop&w=1200&q=80",
    description: "High-speed precision color calibration for corporate catalogs, luxury brochures, and retail folding cartons.",
    location: "Commercial Print Plant, Dhaka",
    meta: "ISO 12647-2 Certified • Heidelberg Speedmaster",
    order: 3,
  },
  {
    title: "Bespoke Rigid Magnetic Presentation Gift Box",
    category: "packaging",
    categoryLabel: "Packaging",
    aspect: "wide",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80",
    description: "Luxury 1800gsm grey board wrapped in matte soft-touch art paper with metallic gold foil stamping and velvet insert.",
    location: "Luxury Packaging Workshop, Dhaka",
    meta: "Custom V-groove • Dual hidden neodymium magnets",
    order: 4,
  },
  {
    title: "Technical Waterproof Outerwear Assembly",
    category: "finished-products",
    categoryLabel: "Finished Products",
    aspect: "tall",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=80",
    description: "Private job execution: Full waterproof taped seam performance jacket produced from technical pack specifications.",
    location: "Outerwear Sewing Line 04, Dhaka",
    meta: "End-to-End Private Job • Taped seams",
    order: 5,
  },
  {
    title: "Industrial Sewing Machinery & Precision Topstitching",
    category: "garment-production",
    categoryLabel: "Garment Production",
    aspect: "square",
    image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1200&q=80",
    description: "Master stitchers crafting heavy denim and canvas workwear with heavy-duty twin-needle lockstitch machines.",
    location: "Assembly Line 02, Dhaka Facility",
    meta: "Juki Industrial • Heavy-duty seam integrity",
    order: 6,
  },
  {
    title: "Architectural Retail Hangtags & Brass Eyelet Finishes",
    category: "apparel-accessories",
    categoryLabel: "Apparel Accessories",
    aspect: "tall",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80",
    description: "Layered 700gsm duplex paperboard with deep sculptural blind debossing, foil block printing, and antique brass grommets.",
    location: "Finishing & Attachment Studio, Dhaka",
    meta: "Duplex 700gsm • Waxed cotton cord",
    order: 7,
  },
  {
    title: "Sculptural Blind Embossing & Gold Foil Stamping",
    category: "printing",
    categoryLabel: "Printing",
    aspect: "wide",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
    description: "Hydraulic platen foil stamping and 3D multi-level embossing on executive business stationery and report covers.",
    location: "Special Finishes Department, Dhaka",
    meta: "Heidelberg Platen • Kurz Gold Foil",
    order: 8,
  },
  {
    title: "Artisanal FSC Recycled Kraft Shopping Bags",
    category: "packaging",
    categoryLabel: "Packaging",
    aspect: "square",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1200&q=80",
    description: "Heavyweight 220gsm unbleached virgin kraft retail bags with twisted cotton rope handles and reinforced turn-tops.",
    location: "Packaging Production Unit, Dhaka",
    meta: "100% Biodegradable • Water-based flexo inks",
    order: 9,
  },
  {
    title: "Technical Puffer Jacket Down-Filling Line",
    category: "finished-products",
    categoryLabel: "Finished Products",
    aspect: "wide",
    image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=80",
    description: "Automated weight-controlled down filling ensuring uniform thermal insulation across all cold-weather baffles.",
    location: "Insulation Division, Dhaka",
    meta: "RDS Certified Down • Micro-chamber baffle fill",
    order: 10,
  },
  {
    title: "Laser Cutting & Ultrasonic Edge Slitting",
    category: "garment-production",
    categoryLabel: "Garment Production",
    aspect: "square",
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
    description: "Non-contact laser beam trimming producing clean melt-sealed edges on synthetic webbing, reflective piping, and badges.",
    location: "High-Tech Cutting Cell, Dhaka",
    meta: "CO2 Industrial Laser • Zero edge fraying",
    order: 11,
  },
  {
    title: "Bespoke Engraved Metallic Zipper Pulls & Sliders",
    category: "apparel-accessories",
    categoryLabel: "Apparel Accessories",
    aspect: "wide",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
    description: "Die-cast zinc alloy zip pullers with antique brass electroplating and micro-laser logo engraving for denim collections.",
    location: "Hardware Finishing Section, Dhaka",
    meta: "OEKO-TEX Nickel Free • Salt-spray corrosion tested",
    order: 12,
  },
];

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const query: any = {};
    if (category && category !== "all") {
      query.category = category;
    }

    let items = await GalleryItem.find(query).sort({ order: 1, createdAt: -1 }).lean();

    // Auto seed if completely empty
    if (!items || items.length === 0) {
      const totalCount = await GalleryItem.countDocuments();
      if (totalCount === 0) {
        await GalleryItem.insertMany(SEED_GALLERY);
        items = await GalleryItem.find(query).sort({ order: 1, createdAt: -1 }).lean();
      }
    }

    const formatted = items.map((doc: any) => ({
      id: doc._id.toString(),
      title: doc.title || "",
      category: doc.category || "garment-production",
      categoryLabel: doc.categoryLabel || "Garment Production",
      aspect: doc.aspect || "square",
      image: doc.image || "",
      description: doc.description || "",
      location: doc.location || "Dhaka Facility",
      meta: doc.meta || "",
      order: doc.order ?? 0,
      createdAt: doc.createdAt?.toISOString?.() || new Date().toISOString(),
      updatedAt: doc.updatedAt?.toISOString?.() || new Date().toISOString(),
    }));

    return NextResponse.json({ success: true, data: formatted });
  } catch (error: any) {
    console.error("GET /api/gallery error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch gallery items" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const {
      title,
      category,
      categoryLabel,
      aspect,
      image,
      description,
      location,
      meta,
      order,
    } = body;

    if (!image) {
      return NextResponse.json(
        { success: false, error: "Image is required" },
        { status: 400 }
      );
    }

    const created = await GalleryItem.create({
      title: title ? title.trim() : "Gallery Photo",
      category: category || "general",
      categoryLabel: categoryLabel || "Gallery",
      aspect: aspect || "square",
      image,
      description: description || "",
      location: location || "Dhaka Facility",
      meta: meta || "",
      order: typeof order === "number" ? order : 0,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: created._id.toString(),
          title: created.title,
          category: created.category,
          categoryLabel: created.categoryLabel,
          aspect: created.aspect,
          image: created.image,
          description: created.description,
          location: created.location,
          meta: created.meta,
          order: created.order,
          createdAt: created.createdAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/gallery error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create gallery item" },
      { status: 500 }
    );
  }
}
