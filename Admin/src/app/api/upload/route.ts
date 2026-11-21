import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const folder = (formData.get("folder") as string) || "texpart";

      if (!file) {
        return NextResponse.json(
          { error: "No file provided" },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

      const result = await uploadToCloudinary(base64, folder);
      return NextResponse.json({
        success: true,
        url: result.secure_url,
        public_id: result.public_id,
      });
    } else {
      const body = await req.json();
      const { file, folder = "texpart" } = body;

      if (!file) {
        return NextResponse.json(
          { error: "No base64 file data provided" },
          { status: 400 }
        );
      }

      const result = await uploadToCloudinary(file, folder);
      return NextResponse.json({
        success: true,
        url: result.secure_url,
        public_id: result.public_id,
      });
    }
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload image to Cloudinary" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, public_id } = body;
    const target = url || public_id;

    if (!target) {
      return NextResponse.json(
        { error: "No image URL or public_id provided for deletion" },
        { status: 400 }
      );
    }

    const result = await deleteFromCloudinary(target);
    return NextResponse.json({
      success: result.success,
      result: result.result,
      error: result.error,
    });
  } catch (error: any) {
    console.error("Cloudinary delete error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete image from Cloudinary" },
      { status: 500 }
    );
  }
}
