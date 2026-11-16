import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const division = searchParams.get("division");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");

    const query: any = {};
    if (division) {
      query.division = division;
    }
    if (featured === "true") {
      query.isFeatured = true;
    }
    if (search && search.trim()) {
      const q = search.trim();
      query.$or = [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
      ];
    }

    const docs = await Product.find(query).sort({ createdAt: -1 }).lean();

    const products = docs.map((doc: any) => ({
      id: doc.slug || doc._id.toString(),
      mongoId: doc._id.toString(),
      name: doc.name,
      slug: doc.slug,
      division: doc.division,
      category: doc.category || "General",
      shortDesc: doc.description ? doc.description.replace(/<[^>]*>/g, " ").slice(0, 160) : "",
      fullDesc: doc.description ? doc.description.replace(/<[^>]*>/g, " ").trim() : "",
      image: doc.frontImage,
      frontImage: doc.frontImage,
      images: doc.images || (doc.frontImage ? [doc.frontImage] : []),
      galleryImages: doc.images || (doc.frontImage ? [doc.frontImage] : []),
      isFeatured: !!doc.isFeatured,
      collectionId: doc.division === "private-jobs" ? "accessories" : "commercial",
      collection: doc.division === "private-jobs" ? "Apparel Accessories & Packaging" : "Commercial Printing & Promotional Products",
    }));

    return NextResponse.json({ success: true, products });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
