import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { slugify } from "@/lib/slugify";
import mongoose from "mongoose";
import { deleteMultipleFromCloudinary } from "@/lib/cloudinary";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();
    const query = mongoose.Types.ObjectId.isValid(params.id)
      ? { _id: params.id }
      : { slug: params.id };

    const doc = await Product.findOne(query).lean();
    if (!doc) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      product: {
        id: (doc as any)._id.toString(),
        slug: (doc as any).slug,
        name: (doc as any).name,
        division: (doc as any).division,
        category: (doc as any).category,
        description: (doc as any).description,
        frontImage: (doc as any).frontImage,
        images: (doc as any).images || [],
        isFeatured: !!(doc as any).isFeatured,
        createdAt: (doc as any).createdAt?.toISOString?.() || new Date((doc as any).createdAt).toISOString(),
        updatedAt: (doc as any).updatedAt?.toISOString?.() || new Date((doc as any).updatedAt).toISOString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const query = mongoose.Types.ObjectId.isValid(params.id)
      ? { _id: params.id }
      : { slug: params.id };

    const existing = await Product.findOne(query);
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Check max 5 featured constraint per division if setting or toggling to featured = true
    const targetDivision = body.division || existing.division;
    if (body.isFeatured === true && !existing.isFeatured) {
      const currentFeaturedCount = await Product.countDocuments({
        division: targetDivision,
        isFeatured: true,
        _id: { $ne: existing._id },
      });
      if (currentFeaturedCount >= 5) {
        const divisionTitle =
          targetDivision === "private-jobs" ? "Private Jobs" : "Commercial Jobs";
        return NextResponse.json(
          {
            error: `Maximum 5 featured products allowed for ${divisionTitle}. Please unfeature an existing ${divisionTitle} product first.`,
          },
          { status: 400 }
        );
      }
    }

    // If images are being updated, identify any removed images and delete them from Cloudinary
    if (body.images !== undefined && Array.isArray(existing.images)) {
      const removedImages = existing.images.filter(
        (img: string) => !body.images.includes(img)
      );
      if (removedImages.length > 0) {
        // Fire and forget or await Cloudinary deletion of removed images
        deleteMultipleFromCloudinary(removedImages).catch((err) =>
          console.warn("Failed to delete removed product images from Cloudinary:", err)
        );
      }
    }

    if (body.name && body.name !== existing.name && !body.slug) {
      existing.slug = slugify(body.name);
    }
    if (body.name !== undefined) existing.name = body.name;
    if (body.slug !== undefined) existing.slug = body.slug;
    if (body.division !== undefined) existing.division = body.division;
    if (body.category !== undefined) existing.category = body.category;
    if (body.description !== undefined) existing.description = body.description;
    if (body.frontImage !== undefined) existing.frontImage = body.frontImage;
    if (body.images !== undefined) existing.images = body.images;
    if (body.isFeatured !== undefined) existing.isFeatured = !!body.isFeatured;

    await existing.save();

    return NextResponse.json({
      success: true,
      product: {
        id: existing._id.toString(),
        slug: existing.slug,
        name: existing.name,
        division: existing.division,
        category: existing.category,
        description: existing.description,
        frontImage: existing.frontImage,
        images: existing.images,
        isFeatured: existing.isFeatured,
        createdAt: existing.createdAt.toISOString(),
        updatedAt: existing.updatedAt.toISOString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();
    const query = mongoose.Types.ObjectId.isValid(params.id)
      ? { _id: params.id }
      : { slug: params.id };

    const result = await Product.findOneAndDelete(query);
    if (!result) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Automatically delete all product images from Cloudinary
    const imagesToDelete: string[] = [];
    if (result.frontImage) imagesToDelete.push(result.frontImage);
    if (Array.isArray(result.images)) imagesToDelete.push(...result.images);

    if (imagesToDelete.length > 0) {
      await deleteMultipleFromCloudinary(imagesToDelete);
    }

    return NextResponse.json({ success: true, message: "Product and associated cloud images deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
