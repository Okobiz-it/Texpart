import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();

    const [privateDocs, commercialDocs] = await Promise.all([
      Product.find({ division: "private-jobs", isFeatured: true }).limit(5).lean(),
      Product.find({ division: "commercial-jobs", isFeatured: true }).limit(5).lean(),
    ]);

    const formatProduct = (doc: any) => ({
      id: doc.slug || doc._id.toString(),
      mongoId: doc._id.toString(),
      slug: doc.slug,
      name: doc.name,
      division: doc.division,
      category: doc.category || "General",
      description: doc.description || "",
      image: doc.frontImage,
      frontImage: doc.frontImage,
      images: doc.images || (doc.frontImage ? [doc.frontImage] : []),
      isFeatured: !!doc.isFeatured,
      href: `/products/${doc.slug || doc._id.toString()}`,
    });

    return NextResponse.json({
      success: true,
      privateFeatured: privateDocs.map(formatProduct),
      commercialFeatured: commercialDocs.map(formatProduct),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
