import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import HeroBanner from "@/models/HeroBanner";

export const dynamic = "force-dynamic";

const FALLBACK_BANNERS = [
  {
    id: "1",
    src: "/banners/banner-1.jpg",
    alt: "Texpart Garment Accessories Manufacturing",
    title: "Texpart Garment Accessories",
    subtitle: "Complete Trims, Buttons & Zippers Solutions",
    linkUrl: "/services/private-jobs",
  },
  {
    id: "2",
    src: "/banners/banner-2.jpg",
    alt: "Texpart Apparel Trims & Sourcing",
    title: "Apparel Trims & Sourcing",
    subtitle: "Precision Engineering & Global Export Quality",
    linkUrl: "/services/private-jobs",
  },
  {
    id: "3",
    src: "/banners/banner-3.jpg",
    alt: "Texpart Packaging & Commercial Printing",
    title: "Packaging & Commercial Printing",
    subtitle: "Luxury Rigid Boxes, Hangtags & Corporate Publications",
    linkUrl: "/services/commercial-jobs",
  },
];

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const banners = await HeroBanner.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();

    if (!banners || banners.length === 0) {
      return NextResponse.json({ success: true, data: FALLBACK_BANNERS });
    }

    const formatted = banners.map((doc: any) => ({
      id: doc._id.toString(),
      src: doc.imageUrl || "",
      alt: doc.altText || doc.title || "Hero Banner",
      title: doc.title || "",
      subtitle: doc.subtitle || "",
      linkUrl: doc.linkUrl || "/services/private-jobs",
      order: doc.order ?? 0,
    }));

    return NextResponse.json({ success: true, data: formatted });
  } catch (error: any) {
    console.error("GET /api/hero-banners error:", error);
    return NextResponse.json({ success: true, data: FALLBACK_BANNERS });
  }
}
