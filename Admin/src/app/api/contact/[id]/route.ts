import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;

    const item = await ContactMessage.findById(id).lean();
    if (!item) {
      return NextResponse.json(
        { success: false, error: "Contact message not found" },
        { status: 404 }
      );
    }

    // Auto-mark as IN_PROGRESS if NEW
    if ((item as any).status === "NEW") {
      await ContactMessage.findByIdAndUpdate(id, { status: "IN_PROGRESS" });
      (item as any).status = "IN_PROGRESS";
    }

    return NextResponse.json({
      success: true,
      data: {
        id: (item as any)._id.toString(),
        name: (item as any).name,
        companyName: (item as any).companyName || "",
        phone: (item as any).phone,
        email: (item as any).email,
        comment: (item as any).comment,
        status: (item as any).status,
        adminNotes: (item as any).adminNotes || "",
        createdAt: (item as any).createdAt?.toISOString?.(),
        updatedAt: (item as any).updatedAt?.toISOString?.(),
      },
    });
  } catch (error: any) {
    console.error("GET /api/contact/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch contact message" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;
    const body = await req.json();

    const updated = await ContactMessage.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Contact message not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: (updated as any)._id.toString(),
        name: (updated as any).name,
        phone: (updated as any).phone,
        email: (updated as any).email,
        comment: (updated as any).comment,
        status: (updated as any).status,
        adminNotes: (updated as any).adminNotes,
        updatedAt: (updated as any).updatedAt?.toISOString?.(),
      },
    });
  } catch (error: any) {
    console.error("PATCH /api/contact/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update contact message" },
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

    const deleted = await ContactMessage.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Contact message not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Contact message deleted" });
  } catch (error: any) {
    console.error("DELETE /api/contact/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete contact message" },
      { status: 500 }
    );
  }
}
