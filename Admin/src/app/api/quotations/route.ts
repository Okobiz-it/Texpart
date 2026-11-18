import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Quotation from "@/models/Quotation";
import { numberToWords } from "@/lib/number-to-words";

export const dynamic = "force-dynamic";

function generateNextRefNo(existingCount: number): string {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const year = String(now.getFullYear()).slice(-2);
  const sequence = String(existingCount + 1).padStart(3, "0");
  return `texpart/quote/${sequence}/${day}/${year}`;
}

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const search = (searchParams.get("search") || "").trim().toLowerCase();
    const status = searchParams.get("status") || "";
    const docType = searchParams.get("doc_type") || "";

    const query: any = {};

    if (status && status !== "ALL") {
      query.status = status;
    }

    if (docType === "QUOTATION") {
      query.doc_type = { $ne: "INQUIRY" };
    } else if (docType === "INQUIRY") {
      query.doc_type = "INQUIRY";
    }

    if (search) {
      query.$or = [
        { ref_no: { $regex: search, $options: "i" } },
        { client_name: { $regex: search, $options: "i" } },
        { organization_name: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { fullName: { $regex: search, $options: "i" } },
        { companyName: { $regex: search, $options: "i" } },
      ];
    }

    const items = await Quotation.find(query).sort({ createdAt: -1 }).lean();
    const totalCount = await Quotation.countDocuments({ doc_type: { $ne: "INQUIRY" } });
    const nextRefNo = generateNextRefNo(totalCount);

    const formatted = items.map((doc: any) => ({
      _id: doc._id.toString(),
      id: doc._id.toString(),
      ref_no: doc.ref_no || (doc.fullName ? `lead-${doc._id.toString().slice(-6)}` : `texpart/quote/${doc._id.toString().slice(-4)}`),
      quote_date: doc.quote_date || doc.createdAt,
      client_name: doc.client_name || doc.fullName || "",
      organization_name: doc.organization_name || doc.companyName || "",
      address: doc.address || "",
      phone: doc.phone || "",
      email: doc.email || "",
      subject: doc.subject || (doc.productName ? `Inquiry for ${doc.productName}` : "Official Quotation"),
      software_columns: doc.software_columns || [],
      software_rows: doc.software_rows || [],
      software_amount: doc.software_amount || doc.grand_total || 0,
      grand_total: doc.grand_total || doc.software_amount || 0,
      in_words: doc.in_words || "",
      terms_conditions: doc.terms_conditions || "",
      project_breakdown: doc.project_breakdown || "",
      client_requirements: doc.client_requirements || "",
      deliverables: doc.deliverables || "",
      additional_notes: doc.additional_notes || "",
      company_signatory_name: doc.company_signatory_name || "Md. Sorower Jahan",
      company_signatory_title: doc.company_signatory_title || "Managing Director, Texpart Ltd.",
      company_phone: doc.company_phone || "+880 1711-234567",
      company_email: doc.company_email || "info@texpartbd.com",
      doc_type: doc.doc_type || (doc.fullName && !doc.client_name ? "INQUIRY" : "QUOTATION"),
      status: doc.status || "DRAFT",
      email_sent_at: doc.email_sent_at || null,
      // Lead compatibility
      fullName: doc.fullName || doc.client_name,
      companyName: doc.companyName || doc.organization_name,
      productName: doc.productName,
      moqQuantity: doc.moqQuantity,
      noteContent: doc.noteContent,
      adminNotes: doc.adminNotes,
      createdAt: doc.createdAt?.toISOString?.() || new Date().toISOString(),
      updatedAt: doc.updatedAt?.toISOString?.() || new Date().toISOString(),
    }));

    return NextResponse.json({
      success: true,
      data: formatted,
      totalCount,
      nextRefNo,
    });
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

    // Check if this is an official quotation builder submission or storefront lead
    const isStorefrontLead = Boolean(body.fullName && !body.client_name && !body.software_rows);

    if (isStorefrontLead) {
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

      const newInquiry = await Quotation.create({
        fullName,
        companyName,
        email,
        phone,
        productName: productName || "General Production",
        moqQuantity: moqQuantity || "5,000 pcs",
        noteContent: noteContent || "",
        doc_type: "INQUIRY",
        status: "NEW",
      });

      return NextResponse.json(
        {
          success: true,
          data: {
            id: newInquiry._id.toString(),
            _id: newInquiry._id.toString(),
            fullName: newInquiry.fullName,
            companyName: newInquiry.companyName,
            status: newInquiry.status,
            createdAt: newInquiry.createdAt.toISOString(),
          },
        },
        { status: 201 }
      );
    }

    // Official Quotation
    const totalExisting = await Quotation.countDocuments({ doc_type: { $ne: "INQUIRY" } });
    const ref_no = (body.ref_no || "").trim() || generateNextRefNo(totalExisting);

    const grand_total = Number(body.grand_total || body.software_amount || 0);
    const in_words = (body.in_words || "").trim() || numberToWords(grand_total);

    const newQuotation = await Quotation.create({
      ref_no,
      quote_date: body.quote_date ? new Date(body.quote_date) : new Date(),
      client_name: (body.client_name || "").trim(),
      organization_name: body.organization_name || "",
      address: body.address || "",
      phone: body.phone || "",
      email: body.email || "",
      subject: body.subject || "Quotation for Garment Packaging & Apparel Development Solutions",
      software_columns: body.software_columns || [],
      software_rows: body.software_rows || [],
      software_amount: Number(body.software_amount || grand_total),
      grand_total,
      in_words,
      terms_conditions: body.terms_conditions || "",
      project_breakdown: body.project_breakdown || "",
      client_requirements: body.client_requirements || "",
      deliverables: body.deliverables || "",
      additional_notes: body.additional_notes || "",
      company_signatory_name: body.company_signatory_name || "Md. Sorower Jahan",
      company_signatory_title: body.company_signatory_title || "Managing Director, Texpart Ltd.",
      company_phone: body.company_phone || "+880 1711-234567",
      company_email: body.company_email || "info@texpartbd.com",
      doc_type: "QUOTATION",
      status: body.status || "DRAFT",
      email_sent_at: body.email_sent_at || null,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: newQuotation._id.toString(),
          _id: newQuotation._id.toString(),
          ref_no: newQuotation.ref_no,
          client_name: newQuotation.client_name,
          organization_name: newQuotation.organization_name,
          grand_total: newQuotation.grand_total,
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
