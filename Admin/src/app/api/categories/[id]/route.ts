import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";
import { slugify } from "@/lib/slugify";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;
    const body = await req.json();
    const { name, description, order, division } = body;

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found." },
        { status: 404 }
      );
    }

    const oldName = category.name;
    const oldDivision = category.division;

    if (name && name.trim()) {
      category.name = name.trim();
      category.slug = slugify(name.trim());
    }

    if (description !== undefined) {
      category.description = description.trim();
    }

    if (order !== undefined) {
      category.order = Number(order);
    }

    if (division && division.trim()) {
      category.division = division.trim();
    }

    await category.save();

    // If category name or division changed, update associated products
    if (name && name.trim() !== oldName) {
      await Product.updateMany(
        { division: oldDivision as any, category: oldName },
        { $set: { category: name.trim() } }
      ).catch(() => {});
    }

    return NextResponse.json({
      success: true,
      category: {
        id: category._id.toString(),
        name: category.name,
        slug: category.slug,
        division: category.division,
        order: category.order,
        description: category.description,
        isActive: category.isActive,
      },
    });
  } catch (error: any) {
    console.error("PUT category error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update category." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found." },
        { status: 404 }
      );
    }

    // Check if products are using this category
    const associatedProducts = await Product.countDocuments({
      division: category.division as any,
      category: category.name,
    });

    if (associatedProducts > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Cannot delete "${category.name}" because ${associatedProducts} product(s) are currently assigned to it. Reassign or delete those products first.`,
        },
        { status: 400 }
      );
    }

    await Category.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: `Category "${category.name}" deleted successfully.`,
    });
  } catch (error: any) {
    console.error("DELETE category error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete category." },
      { status: 500 }
    );
  }
}
