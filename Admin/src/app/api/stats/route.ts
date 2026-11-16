import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import Partner from "@/models/Partner";

export async function GET() {
  try {
    await connectToDatabase();
    const [totalProducts, privateJobsCount, commercialJobsCount, featuredCount, partnersCount, recentDocs] =
      await Promise.all([
        Product.countDocuments(),
        Product.countDocuments({ division: "private-jobs" }),
        Product.countDocuments({ division: "commercial-jobs" }),
        Product.countDocuments({ isFeatured: true }),
        Partner.countDocuments(),
        Product.find().sort({ createdAt: -1 }).limit(5).lean(),
      ]);

    const recentProducts = recentDocs.map((doc: any) => ({
      id: doc._id.toString(),
      slug: doc.slug,
      name: doc.name,
      division: doc.division,
      category: doc.category,
      description: doc.description,
      frontImage: doc.frontImage,
      images: doc.images || [],
      isFeatured: !!doc.isFeatured,
      createdAt: doc.createdAt?.toISOString?.() || new Date(doc.createdAt).toISOString(),
      updatedAt: doc.updatedAt?.toISOString?.() || new Date(doc.updatedAt).toISOString(),
    }));

    return NextResponse.json({
      success: true,
      stats: {
        totalProducts,
        privateJobsCount,
        commercialJobsCount,
        featuredCount,
        partnersCount,
        recentProducts,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
