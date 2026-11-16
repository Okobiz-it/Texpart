"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  UploadCloud,
  CheckCircle,
  X,
  Star,
  Loader2,
  Plus,
  Image as ImageIcon,
} from "lucide-react";

interface ImageUploaderProps {
  images: string[];
  frontImage: string;
  onImagesChange: (images: string[]) => void;
  onFrontImageChange: (url: string) => void;
}

export default function ImageUploader({
  images,
  frontImage,
  onImagesChange,
  onFrontImageChange,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [manualUrl, setManualUrl] = useState("");

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

  const handleAddManualUrl = () => {
    if (!manualUrl.trim()) return;
    const url = manualUrl.trim();
    const updated = [...images, url];
    onImagesChange(updated);
    if (!frontImage) {
      onFrontImageChange(url);
    }
    setManualUrl("");
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const removedUrl = images[indexToRemove];
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    onImagesChange(updated);

    if (frontImage === removedUrl) {
      onFrontImageChange(updated.length > 0 ? updated[0] : "");
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

      {/* Manual URL Input Option */}
      <div className="flex items-center gap-2">
        <input
          type="url"
          value={manualUrl}
          onChange={(e) => setManualUrl(e.target.value)}
          placeholder="Or paste external / Cloudinary image URL..."
          className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-[4px] text-[#0A2540] focus:bg-white focus:outline-none focus:border-[#0066CC]"
        />
        <button
          type="button"
          onClick={handleAddManualUrl}
          className="px-3 py-1.5 bg-white border border-slate-200 hover:border-[#0066CC] text-[#0A2540] text-xs font-bold rounded-[4px] inline-flex items-center gap-1 transition-colors"
        >
          <Plus className="w-3.5 h-3.5 text-[#0066CC]" />
          <span>Add URL</span>
        </button>
      </div>

      {/* Image Gallery with "Select as front" */}
      {images.length > 0 && (
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium">
              Uploaded Images ({images.length}) &mdash; Click &ldquo;Select as front&rdquo; to choose thumbnail:
            </span>
            {frontImage && (
              <span className="text-[11px] font-mono text-[#0066CC] font-bold">
                Front Image Selected
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((imgUrl, idx) => {
              const isFront = frontImage === imgUrl;
              return (
                <div
                  key={idx}
                  className={`relative group bg-white border rounded-[4px] overflow-hidden shadow-sm transition-all ${
                    isFront
                      ? "border-[#0066CC] ring-2 ring-[#0066CC]/30"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {/* Photo container */}
                  <div className="relative aspect-square w-full bg-slate-100">
                    <Image
                      src={imgUrl}
                      alt={`Product image ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />

                    {/* Front Badge */}
                    {isFront && (
                      <div className="absolute top-1.5 left-1.5 bg-[#0066CC] text-white px-2 py-0.5 rounded-[3px] text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 shadow-md z-10">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        <span>Front</span>
                      </div>
                    )}

                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-[3px] bg-red-600/90 hover:bg-red-700 text-white flex items-center justify-center transition-colors shadow-md z-10"
                      title="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-2 bg-white border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400 truncate max-w-[80px]">
                      #{idx + 1}
                    </span>
                    {!isFront ? (
                      <button
                        type="button"
                        onClick={() => handleSelectFront(imgUrl)}
                        className="text-[11px] font-heading font-bold text-[#0066CC] hover:text-[#0052CC] hover:underline transition-colors"
                      >
                        Select as front
                      </button>
                    ) : (
                      <span className="text-[11px] font-heading font-bold text-emerald-600 flex items-center gap-0.5">
                        <CheckCircle className="w-3 h-3" />
                        Current Front
                      </span>
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
