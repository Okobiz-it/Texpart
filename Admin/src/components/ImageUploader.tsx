"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  UploadCloud,
  X,
  Star,
  Loader2,
  Image as ImageIcon,
  CheckCircle,
} from "lucide-react";

interface ImageUploaderProps {
  images: string[];
  frontImage: string;
  onImagesChange: (images: string[]) => void;
  onFrontImageChange: (url: string) => void;
  layout?: "sidebar" | "standard";
}

export default function ImageUploader({
  images,
  frontImage,
  onImagesChange,
  onFrontImageChange,
  layout = "sidebar",
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadError(null);

    const uploadedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "texpart/products");

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (data.success && data.url) {
          uploadedUrls.push(data.url);
        } else {
          setUploadError(data.error || "Failed to upload one or more images");
        }
      } catch (err: any) {
        setUploadError(err.message || "Network error uploading to Cloudinary");
      }
    }

    if (uploadedUrls.length > 0) {
      const updated = [...images, ...uploadedUrls];
      onImagesChange(updated);
      if (!frontImage && updated.length > 0) {
        onFrontImageChange(updated[0]);
      }
    }

    setIsUploading(false);
    e.target.value = "";
  };

  const handleRemoveImage = async (indexToRemove: number) => {
    const removedUrl = images[indexToRemove];
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    onImagesChange(updated);

    if (frontImage === removedUrl) {
      onFrontImageChange(updated.length > 0 ? updated[0] : "");
    }

    // Automatically delete from Cloudinary cloud storage
    if (removedUrl) {
      try {
        await fetch("/api/upload", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: removedUrl }),
        });
      } catch (err) {
        console.warn("Failed to delete removed image from Cloudinary:", err);
      }
    }
  };

  const handleSelectFront = (url: string) => {
    onFrontImageChange(url);
  };

  return (
    <div className="space-y-4">
      {/* Upload Box */}
      <div className="border-2 border-dashed border-slate-200 hover:border-[#0066CC] rounded-[4px] p-6 text-center bg-slate-50/50 hover:bg-blue-50/20 transition-all">
        <input
          type="file"
          id="multi-image-upload"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
          disabled={isUploading}
          className="hidden"
        />

        <label
          htmlFor="multi-image-upload"
          className="cursor-pointer flex flex-col items-center justify-center space-y-2"
        >
          {isUploading ? (
            <div className="w-12 h-12 rounded-[4px] bg-blue-100 text-[#0066CC] flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-[4px] bg-blue-50 text-[#0066CC] flex items-center justify-center border border-blue-100">
              <UploadCloud className="w-6 h-6" />
            </div>
          )}

          <div>
            <p className="text-xs sm:text-sm font-heading font-bold text-[#0A2540]">
              {isUploading ? "Uploading to Cloudinary..." : "Click to Upload Product Images"}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Select multiple photos (PNG, JPG, WebP). Cloudinary auto-optimizes images.
            </p>
          </div>
        </label>
      </div>

      {uploadError && (
        <div className="p-2.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-[4px]">
          {uploadError}
        </div>
      )}

      {/* Image Gallery with "Select as front" */}
      {images.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs text-slate-600 border-b border-slate-100 pb-2">
            <span className="font-heading font-bold text-[#0A2540] flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-[#0066CC]" />
              Uploaded Images ({images.length})
            </span>
            {frontImage && (
              <span className="text-[11px] font-mono text-[#0066CC] font-bold flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-[4px] border border-blue-100">
                <CheckCircle className="w-3 h-3 text-[#0066CC]" />
                Front Selected
              </span>
            )}
          </div>

          {images.length > 1 && (
            <p className="text-[11px] text-slate-500">
              Click &ldquo;Select as front&rdquo; to choose primary catalog thumbnail.
            </p>
          )}

          <div
            className={`grid gap-3.5 ${
              images.length === 1
                ? "grid-cols-1 w-full max-w-[320px] mx-auto sm:mx-0"
                : layout === "sidebar"
                  ? "grid-cols-2"
                  : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
            }`}
          >
            {images.map((imgUrl, idx) => {
              const isFront = frontImage === imgUrl;
              return (
                <div
                  key={idx}
                  className={`relative aspect-square w-full bg-slate-50 border rounded-[4px] overflow-hidden shadow-sm transition-all group ${
                    isFront
                      ? "border-[#0066CC] ring-2 ring-[#0066CC]/30"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <Image
                    src={imgUrl}
                    alt={`Product image ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 350px"
                  />

                  {/* Top Bar: Front Badge & Remove Button */}
                  <div className="absolute top-2 inset-x-2 flex items-center justify-between pointer-events-none z-10">
                    {isFront ? (
                      <div className="bg-[#0066CC] text-white px-2 py-0.5 rounded-[4px] text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        <span>Front</span>
                      </div>
                    ) : (
                      <span />
                    )}

                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="pointer-events-auto w-6 h-6 rounded-[4px] bg-red-600/90 hover:bg-red-700 text-white flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-105"
                      title="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Bottom Bar: Current Front Badge or Select as Front Button */}
                  <div className="absolute bottom-0 inset-x-0 z-10">
                    {isFront ? (
                      <div className="py-1.5 px-2 bg-[#0066CC]/95 backdrop-blur-xs text-white text-[10.5px] font-heading font-bold flex items-center justify-center gap-1 shadow-sm">
                        <CheckCircle className="w-3 h-3 text-white" />
                        <span>Current Front</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSelectFront(imgUrl)}
                        className="w-full py-1.5 px-2 bg-slate-900/80 hover:bg-[#0066CC] backdrop-blur-xs text-white text-[10.5px] font-heading font-bold flex items-center justify-center transition-colors cursor-pointer"
                      >
                        Select as front
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
