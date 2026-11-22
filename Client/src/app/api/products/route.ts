import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const division = searchParams.get("division");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");

    const query: any = {};

    if (division) {
      if (division === "commercial-printing") {
        query.$or = [
          { division: "commercial-printing" },
          { division: "commercial-jobs" },
        ];
      } else if (division === "garments-accessories") {
        query.$or = [
          { division: "garments-accessories" },
          { division: "private-jobs" },
        ];
      } else if (division === "packaging-solutions" || division === "packaging") {
        query.$or = [
          { division: "packaging-solutions" },
          { division: "packaging" },
          { category: { $regex: /packaging|box|bag|carton/i } },
          { name: { $regex: /packaging|box|bag|carton/i } },
        ];
      } else if (division === "promotional-products") {
        query.$or = [
          { division: "promotional-products" },
          { category: { $regex: /gift|promotional|calendar|diary|mug|t-shirt/i } },
          { name: { $regex: /gift|promotional|calendar|diary|mug|pen|t-shirt/i } },
        ];
      } else {
        query.division = division;
      }
    }

    if (category && category !== "All") {
      query.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    if (featured === "true") {
      query.isFeatured = true;
    }

    if (search && search.trim()) {
      const q = search.trim();
      const searchConditions = [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
      ];
      if (query.$or) {
        query.$and = [{ $or: query.$or }, { $or: searchConditions }];
        delete query.$or;
      } else {
        query.$or = searchConditions;
      }
    }

    const docs = await Product.find(query).sort({ createdAt: -1 }).lean();

    const products = docs.map((doc: any) => ({
      id: doc.slug || doc._id.toString(),
      mongoId: doc._id.toString(),
      name: doc.name,
      slug: doc.slug,
      division: doc.division,
      category: doc.category || "General",
      shortDesc: doc.description ? doc.description.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160) : "",
      fullDesc: doc.description || "",
      description: doc.description || "",
      image: doc.frontImage,
      frontImage: doc.frontImage,
      images: doc.images || (doc.frontImage ? [doc.frontImage] : []),
      galleryImages: doc.images || (doc.frontImage ? [doc.frontImage] : []),
      isFeatured: !!doc.isFeatured,
      collectionId: doc.division?.includes("private") || doc.division?.includes("garments") ? "accessories" : "commercial",
      collection: doc.division?.includes("private") || doc.division?.includes("garments") ? "Apparel Accessories & Packaging" : "Commercial Printing & Promotional Products",
    }));

    return NextResponse.json({ success: true, products });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
