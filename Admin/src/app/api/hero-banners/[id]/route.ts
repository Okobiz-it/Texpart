import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import HeroBanner from "@/models/HeroBanner";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;
    const body = await req.json();

    const updated = await HeroBanner.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Hero banner not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: (updated as any)._id.toString(),
        title: (updated as any).title,
        subtitle: (updated as any).subtitle,
        imageUrl: (updated as any).imageUrl,
        altText: (updated as any).altText,
        linkUrl: (updated as any).linkUrl,
        order: (updated as any).order,
        isActive: (updated as any).isActive,
        updatedAt: (updated as any).updatedAt?.toISOString?.(),
      },
    });
  } catch (error: any) {
    console.error("PATCH /api/hero-banners/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update hero banner" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;

    const deleted = await HeroBanner.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Hero banner not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Hero banner deleted" });
  } catch (error: any) {
    console.error("DELETE /api/hero-banners/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete hero banner" },
      { status: 500 }
    );
  }
}
