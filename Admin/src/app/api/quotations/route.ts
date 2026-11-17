import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Quotation from "@/models/Quotation";

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

    const items = await Quotation.find(query).sort({ createdAt: -1 }).lean();

    const formatted = items.map((doc: any) => ({
      id: doc._id.toString(),
      fullName: doc.fullName || "",
      companyName: doc.companyName || "",
      email: doc.email || "",
      phone: doc.phone || "",
      productName: doc.productName || "General Production",
      moqQuantity: doc.moqQuantity || "5,000 pcs",
      noteContent: doc.noteContent || "",
      status: doc.status || "NEW",
      adminNotes: doc.adminNotes || "",
      createdAt: doc.createdAt?.toISOString?.() || new Date().toISOString(),
      updatedAt: doc.updatedAt?.toISOString?.() || new Date().toISOString(),
    }));

    return NextResponse.json({ success: true, data: formatted });
  } catch (error: any) {
    console.error("GET /api/quotations error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch quotations" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const {
      fullName,
      companyName,
      email,
      phone,
      productName,
      moqQuantity,
      noteContent,
    } = body;

    if (!fullName || !companyName || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Missing required contact fields" },
        { status: 400 }
      );
    }

    const newQuotation = await Quotation.create({
      fullName,
      companyName,
      email,
      phone,
      productName: productName || "General Production",
      moqQuantity: moqQuantity || "5,000 pcs",
      noteContent: noteContent || "",
      status: "NEW",
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: newQuotation._id.toString(),
          fullName: newQuotation.fullName,
          companyName: newQuotation.companyName,
          email: newQuotation.email,
          phone: newQuotation.phone,
          productName: newQuotation.productName,
          moqQuantity: newQuotation.moqQuantity,
          noteContent: newQuotation.noteContent,
          status: newQuotation.status,
          createdAt: newQuotation.createdAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/quotations error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create quotation" },
      { status: 500 }
    );
  }
}
