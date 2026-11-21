import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import GalleryItem from "@/models/GalleryItem";
import { deleteFromCloudinary } from "@/lib/cloudinary";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;
    const body = await req.json();

    const updated = await GalleryItem.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Gallery item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: (updated as any)._id.toString(),
        title: (updated as any).title,
        category: (updated as any).category,
        categoryLabel: (updated as any).categoryLabel,
        aspect: (updated as any).aspect,
        image: (updated as any).image,
        description: (updated as any).description,
        location: (updated as any).location,
        meta: (updated as any).meta,
        order: (updated as any).order,
        updatedAt: (updated as any).updatedAt?.toISOString?.(),
      },
    });
  } catch (error: any) {
    console.error("PATCH /api/gallery/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update gallery item" },
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

    const deleted = await GalleryItem.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Gallery item not found" },
        { status: 404 }
      );
    }

    // Automatically delete photo from Cloudinary
    if (deleted.image) {
      await deleteFromCloudinary(deleted.image);
    }

    return NextResponse.json({ success: true, message: "Gallery item and cloud image deleted" });
  } catch (error: any) {
    console.error("DELETE /api/gallery/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete gallery item" },
      { status: 500 }
    );
  }
}
