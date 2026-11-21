import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";

// Initialize Cloudinary SDK
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadToCloudinary(
  fileDataUri: string,
  folder: string = "texpart"
): Promise<{ secure_url: string; public_id: string }> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Cloudinary credentials missing. Please define CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your .env.local file."
    );
  }

  const timestamp = Math.floor(Date.now() / 1000);

  // Parameters to sign in alphabetical order
  const stringToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash("sha1").update(stringToSign).digest("hex");

  const formData = new FormData();
  formData.append("file", fileDataUri);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp.toString());
  formData.append("folder", folder);
  formData.append("signature", signature);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    let message = errText;
    try {
      const parsed = JSON.parse(errText);
      message = parsed.error?.message || errText;
    } catch {}
    throw new Error(message || "Cloudinary upload failed");
  }

  const data = await res.json();
  return {
    secure_url: data.secure_url as string,
    public_id: data.public_id as string,
  };
}

/**
 * Extracts the Cloudinary public_id from a full CDN URL.
 * Handles transformations, version tags, subfolders, and extensions.
 */
export function extractPublicIdFromUrl(url: string): string | null {
  if (!url || typeof url !== "string") return null;
  // If it's already a public_id (not a full URL)
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return url;
  }
  if (!url.includes("cloudinary.com")) return null;

  try {
    const uploadIdx = url.indexOf("/upload/");
    if (uploadIdx === -1) return null;

    const pathAfterUpload = url.substring(uploadIdx + "/upload/".length);
    const parts = pathAfterUpload.split("/");
    const cleanSegments: string[] = [];
    let passedVersion = false;

    for (const seg of parts) {
      if (/^v\d+$/.test(seg)) {
        passedVersion = true;
        continue;
      }
      if (
        !passedVersion &&
        (seg.includes(",") ||
          seg.startsWith("c_") ||
          seg.startsWith("w_") ||
          seg.startsWith("h_") ||
          seg.startsWith("q_") ||
          seg.startsWith("f_"))
      ) {
        continue;
      }
      cleanSegments.push(seg);
    }

    const fullPath = cleanSegments.join("/");
    const lastDot = fullPath.lastIndexOf(".");
    return lastDot !== -1 ? fullPath.substring(0, lastDot) : fullPath;
  } catch {
    return null;
  }
}

/**
 * Deletes a single image from Cloudinary by URL or public_id.
 * Safe: will not throw if image is already deleted or not found.
 */
export async function deleteFromCloudinary(
  publicIdOrUrl: string
): Promise<{ success: boolean; result?: string; error?: string }> {
  if (!publicIdOrUrl) return { success: false, error: "Empty image identifier" };

  const publicId = extractPublicIdFromUrl(publicIdOrUrl);
  if (!publicId) {
    return { success: false, error: "Could not extract public_id or not a Cloudinary asset" };
  }

  try {
    const res = await cloudinary.uploader.destroy(publicId, { invalidate: true });
    return { success: true, result: res.result };
  } catch (err: any) {
    console.error(`[Cloudinary] Failed to delete asset ${publicId}:`, err);
    return { success: false, error: err.message };
  }
}

/**
 * Deletes multiple images from Cloudinary concurrently.
 */
export async function deleteMultipleFromCloudinary(
  urlsOrPublicIds: (string | undefined | null)[]
): Promise<void> {
  if (!Array.isArray(urlsOrPublicIds) || urlsOrPublicIds.length === 0) return;

  const validItems = urlsOrPublicIds.filter((item): item is string => !!item && typeof item === "string");
  if (validItems.length === 0) return;

  await Promise.allSettled(validItems.map((item) => deleteFromCloudinary(item)));
}
