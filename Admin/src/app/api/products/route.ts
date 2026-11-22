import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { slugify } from "@/lib/slugify";
import { JobDivision } from "@/types";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const division = searchParams.get("division") as JobDivision | null;
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
        ];
      } else if (division === "promotional-products") {
        query.$or = [
          { division: "promotional-products" },
          { category: { $regex: /gift|promotional|calendar|diary/i } },
        ];
      } else {
        query.division = division;
      }
    }
    if (featured === "true") {
      query.isFeatured = true;
    }

    const docs = await Product.find(query).sort({ createdAt: -1 }).lean();
    const totalFeaturedCount = await Product.countDocuments({ isFeatured: true });

    const products = docs.map((doc: any) => ({
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

    return NextResponse.json({ success: true, products, totalFeaturedCount });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { name, division, category, description, frontImage, images, isFeatured } = body;

    if (!name || !division) {
      return NextResponse.json(
        { error: "Product name and division are required" },
        { status: 400 }
      );
    }

    if (isFeatured) {
      const currentFeaturedCount = await Product.countDocuments({
        isFeatured: true,
      });
      if (currentFeaturedCount >= 10) {
        return NextResponse.json(
          {
            error: "Maximum 10 featured products allowed in total across all products. Please unfeature an existing product first.",
          },
          { status: 400 }
        );
      }
    }

    let baseSlug = slugify(name);
    let uniqueSlug = baseSlug;
    let counter = 1;
    while (await Product.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    const newProduct = await Product.create({
      name: name.trim(),
      slug: uniqueSlug,
      division,
      category: category?.trim() || "General",
      description: description || "",
      frontImage: frontImage || images?.[0] || "",
      images: images || [],
      isFeatured: !!isFeatured,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        product: {
          id: newProduct._id.toString(),
          slug: newProduct.slug,
          name: newProduct.name,
          division: newProduct.division,
          category: newProduct.category,
          frontImage: newProduct.frontImage,
          images: newProduct.images,
          isFeatured: newProduct.isFeatured,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
