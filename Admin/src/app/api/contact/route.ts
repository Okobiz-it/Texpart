import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const query: any = {};
    if (status && status !== "ALL") {
      query.status = status;
    }

    const items = await ContactMessage.find(query).sort({ createdAt: -1 }).lean();

    const formatted = items.map((doc: any) => ({
      id: doc._id.toString(),
      name: doc.name || "",
      phone: doc.phone || "",
      email: doc.email || "",
      comment: doc.comment || "",
      status: doc.status || "NEW",
      adminNotes: doc.adminNotes || "",
      createdAt: doc.createdAt?.toISOString?.() || new Date().toISOString(),
      updatedAt: doc.updatedAt?.toISOString?.() || new Date().toISOString(),
    }));

    return NextResponse.json({ success: true, data: formatted });
  } catch (error: any) {
    console.error("GET /api/contact error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch contact inquiries" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const { name, phone, email, comment } = body;
    if (!name || !phone || !email || !comment) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    const newMsg = await ContactMessage.create({
      name,
      phone,
      email,
      comment,
      status: "NEW",
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: newMsg._id.toString(),
          name: newMsg.name,
          phone: newMsg.phone,
          email: newMsg.email,
          comment: newMsg.comment,
          status: newMsg.status,
          createdAt: newMsg.createdAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create contact message" },
      { status: 500 }
    );
  }
}
