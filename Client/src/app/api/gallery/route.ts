import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import GalleryItem from "@/models/GalleryItem";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const query: any = {};
    if (category && category !== "all") {
      query.category = category;
    }

    const items = await GalleryItem.find(query).sort({ order: 1, createdAt: -1 }).lean();

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
