import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Partner from "@/models/Partner";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const query: any = {};
    if (category) {
      query.category = category;
    }

    const docs = await Partner.find(query).sort({ createdAt: 1 }).lean();

    const partners = docs.map((doc: any) => ({
      id: doc._id.toString(),
      name: doc.name || "",
      logoUrl: doc.logoUrl,
      image: doc.logoUrl,
      category: doc.category || "client",
    }));

    return NextResponse.json({ success: true, partners });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
