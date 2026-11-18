import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Quotation from "@/models/Quotation";
import { numberToWords } from "@/lib/number-to-words";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;

    let doc = await Quotation.findById(id).lean();
    if (!doc) {
      // Try finding by ref_no if id was ref
      doc = await Quotation.findOne({ ref_no: id }).lean();
    }

    if (!doc) {
      return NextResponse.json(
        { success: false, error: "Quotation not found" },
        { status: 404 }
      );
    }

    const formatted = {
      _id: (doc as any)._id.toString(),
      id: (doc as any)._id.toString(),
      ref_no: (doc as any).ref_no || `quote-${(doc as any)._id.toString().slice(-4)}`,
      quote_date: (doc as any).quote_date || (doc as any).createdAt,
      client_name: (doc as any).client_name || (doc as any).fullName || "",
      organization_name: (doc as any).organization_name || (doc as any).companyName || "",
      address: (doc as any).address || "",
      phone: (doc as any).phone || "",
      email: (doc as any).email || "",
      subject: (doc as any).subject || "Official Quotation",
      software_columns: (doc as any).software_columns || [],
      software_rows: (doc as any).software_rows || [],
      software_amount: (doc as any).software_amount || (doc as any).grand_total || 0,
      grand_total: (doc as any).grand_total || (doc as any).software_amount || 0,
      in_words: (doc as any).in_words || "",
      terms_conditions: (doc as any).terms_conditions || "",
      project_breakdown: (doc as any).project_breakdown || "",
      client_requirements: (doc as any).client_requirements || "",
      deliverables: (doc as any).deliverables || "",
      additional_notes: (doc as any).additional_notes || "",
      company_signatory_name: (doc as any).company_signatory_name || "Md. Sorower Jahan",
      company_signatory_title: (doc as any).company_signatory_title || "Managing Director, Texpart Ltd.",
      company_phone: (doc as any).company_phone || "+880 1711-234567",
      company_email: (doc as any).company_email || "info@texpartbd.com",
      doc_type: (doc as any).doc_type || "QUOTATION",
      status: (doc as any).status || "DRAFT",
      email_sent_at: (doc as any).email_sent_at || null,
      fullName: (doc as any).fullName || (doc as any).client_name || "",
      companyName: (doc as any).companyName || (doc as any).organization_name || "",
      productName: (doc as any).productName || "",
      moqQuantity: (doc as any).moqQuantity || "",
      noteContent: (doc as any).noteContent || (doc as any).additional_notes || "",
      adminNotes: (doc as any).adminNotes || "",
      createdAt: (doc as any).createdAt?.toISOString?.() || new Date().toISOString(),
      updatedAt: (doc as any).updatedAt?.toISOString?.() || new Date().toISOString(),
    };

    return NextResponse.json({ success: true, data: formatted });
  } catch (error: any) {
    console.error("GET /api/quotations/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch quotation" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;
    const body = await req.json();

    const grand_total = Number(body.grand_total || body.software_amount || 0);
    const in_words = (body.in_words || "").trim() || numberToWords(grand_total);

    const updateData: any = {
      ref_no: body.ref_no,
      quote_date: body.quote_date ? new Date(body.quote_date) : undefined,
      client_name: body.client_name,
      organization_name: body.organization_name,
      address: body.address,
      phone: body.phone,
      email: body.email,
      subject: body.subject,
      software_columns: body.software_columns,
      software_rows: body.software_rows,
      software_amount: Number(body.software_amount || grand_total),
      grand_total,
      in_words,
      terms_conditions: body.terms_conditions,
      project_breakdown: body.project_breakdown,
      client_requirements: body.client_requirements,
      deliverables: body.deliverables,
      additional_notes: body.additional_notes,
      company_signatory_name: body.company_signatory_name,
      company_signatory_title: body.company_signatory_title,
      company_phone: body.company_phone,
      company_email: body.company_email,
      status: body.status,
    };

    const updated = await Quotation.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Quotation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    console.error("PUT /api/quotations/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update quotation" },
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

    const updated = await Quotation.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Quotation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    console.error("PATCH /api/quotations/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update quotation" },
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

    const deleted = await Quotation.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Quotation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Quotation deleted" });
  } catch (error: any) {
    console.error("DELETE /api/quotations/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete quotation" },
      { status: 500 }
    );
  }
}
