import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import HeroBanner from "@/models/HeroBanner";

export const dynamic = "force-dynamic";

const SEED_BANNERS = [
  {
    title: "Texpart Garment Accessories",
    subtitle: "Complete Trims, Buttons & Zippers Solutions",
    imageUrl: "/banners/banner-1.jpg",
    altText: "Texpart Garment Accessories Manufacturing",
    linkUrl: "",
    order: 1,
    isActive: true,
  },
  {
    title: "Apparel Trims & Sourcing",
    subtitle: "Precision Engineering & Global Export Quality",
    imageUrl: "/banners/banner-2.jpg",
    altText: "Texpart Apparel Trims & Sourcing",
    linkUrl: "",
    order: 2,
    isActive: true,
  },
  {
    title: "Packaging & Commercial Printing",
    subtitle: "Luxury Rigid Boxes, Hangtags & Corporate Publications",
    imageUrl: "/banners/banner-3.jpg",
    altText: "Texpart Packaging & Commercial Printing",
    linkUrl: "",
    order: 3,
    isActive: true,
  },
];

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    let banners = await HeroBanner.find().sort({ order: 1, createdAt: -1 }).lean();

    // Auto-seed if empty
    if (!banners || banners.length === 0) {
      await HeroBanner.insertMany(SEED_BANNERS);
      banners = await HeroBanner.find().sort({ order: 1, createdAt: -1 }).lean();
    }

    const formatted = banners.map((doc: any) => ({
      id: doc._id.toString(),
      title: doc.title || "",
      subtitle: doc.subtitle || "",
      imageUrl: doc.imageUrl || "",
      altText: doc.altText || "Hero Banner",
      linkUrl: (doc.linkUrl && !doc.linkUrl.includes("services")) ? doc.linkUrl : "",
      order: doc.order ?? 0,
      isActive: doc.isActive ?? true,
      createdAt: doc.createdAt?.toISOString?.() || new Date().toISOString(),
      updatedAt: doc.updatedAt?.toISOString?.() || new Date().toISOString(),
    }));

    return NextResponse.json({ success: true, data: formatted });
  } catch (error: any) {
    console.error("GET /api/hero-banners error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch hero banners" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const { title, subtitle, imageUrl, altText, linkUrl, order, isActive } = body;
    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: "Banner image URL is required" },
        { status: 400 }
      );
    }

    let finalOrder = typeof order === "number" && !isNaN(order) ? order : null;
    if (finalOrder === null) {
      const highestBanner = await HeroBanner.findOne().sort({ order: -1 }).select("order").lean();
      finalOrder = (highestBanner?.order ?? 0) + 1;
    }

    const created = await HeroBanner.create({
      title: title || "",
      subtitle: subtitle || "",
      imageUrl,
      altText: altText || title || "Hero Banner",
      linkUrl: linkUrl || "",
      order: finalOrder,
      isActive: isActive !== undefined ? !!isActive : true,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: created._id.toString(),
          title: created.title,
          subtitle: created.subtitle,
          imageUrl: created.imageUrl,
          altText: created.altText,
          linkUrl: created.linkUrl,
          order: created.order,
          isActive: created.isActive,
          createdAt: created.createdAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/hero-banners error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create hero banner" },
      { status: 500 }
    );
  }
}
