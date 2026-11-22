import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();

    const featuredDocs = await Product.find({ isFeatured: true })
      .sort({ updatedAt: -1 })
      .limit(10)
      .lean();

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

    const featuredProducts = featuredDocs.map(formatProduct);

    return NextResponse.json({
      success: true,
      featuredProducts,
      privateFeatured: featuredProducts.slice(0, 5),
      commercialFeatured: featuredProducts.slice(5, 10),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
