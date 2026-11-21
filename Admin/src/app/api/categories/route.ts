import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";
import { ADMIN_DIVISIONS } from "@/data/divisions";
import { slugify } from "@/lib/slugify";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const division = searchParams.get("division");

    // Check count and auto-seed if empty
    const totalCount = await Category.countDocuments();
    if (totalCount === 0) {
      const seedData = [];
      for (const div of ADMIN_DIVISIONS) {
        let order = 0;
        for (const item of div.items) {
          seedData.push({
            name: item.name,
            slug: item.slug || slugify(item.name),
            division: div.id,
            order: order++,
            description: "",
            isActive: true,
          });
        }
      }
      if (seedData.length > 0) {
        await Category.insertMany(seedData, { ordered: false }).catch(() => {});
      }
    }

    const query: any = { isActive: true };
    if (division && division !== "all") {
      query.division = division;
    }

    const categories = await Category.find(query).sort({ division: 1, order: 1, name: 1 });

    // Fetch all products to accurately cross-match counts (supporting legacy division mapping & title matches)
    const allProducts = await Product.find({}, { name: 1, category: 1, division: 1, slug: 1 }).lean();

    const enrichedCategories = categories.map((cat) => {
      const cName = (cat.name || "").toLowerCase().trim();
      const cSlug = (cat.slug || "").toLowerCase().trim();
      const catDiv = (cat.division || "").toLowerCase().trim();

      const matchingProducts = allProducts.filter((p: any) => {
        const pCat = (p.category || "").toLowerCase().trim();
        const pName = (p.name || "").toLowerCase().trim();
        const pSlug = (p.slug || "").toLowerCase().trim();
        const pDiv = (p.division || "").toLowerCase().trim();

        // Division check: exact match or compatible legacy division
        const isDivMatch =
          pDiv === catDiv ||
          (catDiv === "commercial-printing" && (pDiv === "commercial-jobs" || pDiv === "commercial-printing")) ||
          (["garments-accessories", "packaging-solutions", "promotional-products", "apparel-projects"].includes(catDiv) &&
            (pDiv === "private-jobs" || pDiv === catDiv));

        // Category/Name/Slug check
        const isNameOrCatMatch =
          pCat === cName ||
          pName === cName ||
          pSlug === cSlug ||
          (cName.length > 3 && pName.includes(cName)) ||
          (pName.length > 3 && cName.includes(pName)) ||
          (pCat && cName.length > 3 && (pCat.includes(cName) || cName.includes(pCat)));

        return isNameOrCatMatch && isDivMatch;
      });

      return {
        id: cat._id.toString(),
        _id: cat._id.toString(),
        name: cat.name,
        slug: cat.slug,
        division: cat.division,
        order: cat.order,
        description: cat.description || "",
        isActive: cat.isActive,
        productCount: matchingProducts.length,
        createdAt: cat.createdAt,
        updatedAt: cat.updatedAt,
      };
    });

    return NextResponse.json({
      success: true,
      categories: enrichedCategories,
    });
  } catch (error: any) {
    console.error("GET categories error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load categories." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { name, division, description } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Category name is required." },
        { status: 400 }
      );
    }

    if (!division || !division.trim()) {
      return NextResponse.json(
        { success: false, error: "Division is required." },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const generatedSlug = slugify(trimmedName);

    // Check if category already exists in this division
    const existing = await Category.findOne({
      division,
      $or: [
        { name: { $regex: new RegExp(`^${trimmedName}$`, "i") } },
        { slug: generatedSlug },
      ],
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: "A category with this name or slug already exists in this division." },
        { status: 400 }
      );
    }

    const highestOrderCat = await Category.findOne({ division }).sort({ order: -1 });
    const nextOrder = highestOrderCat ? (highestOrderCat.order || 0) + 1 : 0;

    const newCategory = await Category.create({
      name: trimmedName,
      slug: generatedSlug,
      division,
      order: nextOrder,
      description: description ? description.trim() : "",
      isActive: true,
    });

    return NextResponse.json({
      success: true,
      category: {
        id: newCategory._id.toString(),
        _id: newCategory._id.toString(),
        name: newCategory.name,
        slug: newCategory.slug,
        division: newCategory.division,
        order: newCategory.order,
        description: newCategory.description,
        isActive: newCategory.isActive,
        productCount: 0,
      },
    });
  } catch (error: any) {
    console.error("POST category error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create category." },
      { status: 500 }
    );
  }
}
