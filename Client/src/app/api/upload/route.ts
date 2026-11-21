import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const folder = (formData.get("folder") as string) || "texpart/artworks";

      if (!file) {
        return NextResponse.json(
          { error: "No file provided" },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = `data:${file.type || "application/octet-stream"};base64,${buffer.toString("base64")}`;

      const result = await uploadToCloudinary(base64, folder);
      return NextResponse.json({
        success: true,
        url: result.secure_url,
        public_id: result.public_id,
        name: file.name,
      });
    } else {
      const body = await req.json();
      const { file, folder = "texpart/artworks" } = body;

      if (!file) {
        return NextResponse.json(
          { error: "No file data provided" },
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
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}
