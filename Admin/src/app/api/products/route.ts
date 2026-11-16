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
      query.division = division;
    }
    if (featured === "true") {
      query.isFeatured = true;
    }

    const docs = await Product.find(query).sort({ createdAt: -1 }).lean();

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

    return NextResponse.json({ success: true, products });
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

    // Check max 5 featured products constraint per division if setting as featured
    if (isFeatured) {
      const currentFeaturedCount = await Product.countDocuments({
        division,
        isFeatured: true,
      });
      if (currentFeaturedCount >= 5) {
        const divisionTitle =
          division === "private-jobs" ? "Private Jobs" : "Commercial Jobs";
        return NextResponse.json(
          {
            error: `Maximum 5 featured products allowed for ${divisionTitle}. Please unfeature an existing ${divisionTitle} product first.`,
          },
          { status: 400 }
        );
      }
    }

    let baseSlug = slugify(name);
    let finalSlug = baseSlug;
    let counter = 1;
    while (await Product.findOne({ slug: finalSlug })) {
      finalSlug = `${baseSlug}-${counter++}`;
    }

    const imageList =
      Array.isArray(images) && images.length > 0
        ? images
        : frontImage
        ? [frontImage]
        : [];
    const mainFrontImage = frontImage || imageList[0] || "";

    const newDoc = await Product.create({
      name,
      slug: finalSlug,
      division,
      category: category || "General",
      description: description || "",
      frontImage: mainFrontImage,
      images: imageList,
      isFeatured: !!isFeatured,
    });

    return NextResponse.json(
      {
        success: true,
        product: {
          id: newDoc._id.toString(),
          slug: newDoc.slug,
          name: newDoc.name,
          division: newDoc.division,
          category: newDoc.category,
          description: newDoc.description,
          frontImage: newDoc.frontImage,
          images: newDoc.images,
          isFeatured: newDoc.isFeatured,
          createdAt: newDoc.createdAt.toISOString(),
          updatedAt: newDoc.updatedAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
