import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Partner from "@/models/Partner";

export async function GET() {
  try {
    await connectToDatabase();
    const docs = await Partner.find().sort({ createdAt: -1 }).lean();
    const partners = docs.map((doc: any) => ({
      id: doc._id.toString(),
      name: doc.name || "",
      logoUrl: doc.logoUrl,
      category: doc.category || "client",
      createdAt: doc.createdAt?.toISOString?.() || new Date(doc.createdAt).toISOString(),
      updatedAt: doc.updatedAt?.toISOString?.() || new Date(doc.updatedAt).toISOString(),
    }));
    return NextResponse.json({ success: true, partners });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { name, logoUrl, category = "client" } = body;

    if (!logoUrl) {
      return NextResponse.json(
        { error: "Logo image URL is required" },
        { status: 400 }
      );
    }

    const doc = await Partner.create({
      name: name || "",
      logoUrl,
      category,
    });

    return NextResponse.json(
      {
        success: true,
        partner: {
          id: doc._id.toString(),
          name: doc.name,
          logoUrl: doc.logoUrl,
          category: doc.category,
          createdAt: doc.createdAt.toISOString(),
          updatedAt: doc.updatedAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
