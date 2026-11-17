import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";

export const dynamic = "force-dynamic";

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
          status: newMsg.status,
          createdAt: newMsg.createdAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit message" },
      { status: 500 }
    );
  }
}
