import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Quotation from "@/models/Quotation";

export const dynamic = "force-dynamic";

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
          status: newQuotation.status,
          createdAt: newQuotation.createdAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/quotations error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit quotation" },
      { status: 500 }
    );
  }
}
