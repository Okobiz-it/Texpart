"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Image as ImageIcon,
  Star,
  ExternalLink,
  Edit,
  Trash2,
} from "lucide-react";
import { ProductItem } from "@/types";

interface ProductGridCardProps {
  prod: ProductItem;
  onToggleFeatured: (prod: ProductItem) => void;
  onDelete: (id: string, name: string) => void;
}

export default function ProductGridCard({
  prod,
  onToggleFeatured,
  onDelete,
}: ProductGridCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/products/edit/${prod.id}`)}
      className="bg-white rounded-[4px] border border-slate-200 hover:border-[#0066CC] p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
      title="Click to edit this product"
    >
      <div>
        <div className="relative aspect-[4/3] rounded-[4px] overflow-hidden bg-slate-100 border border-slate-100 mb-3 group-hover:border-[#0066CC]/30 transition-colors">
          {prod.frontImage ? (
            <Image
              src={prod.frontImage}
              alt={prod.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300">
              <ImageIcon className="w-6 h-6" />
            </div>
          )}
          {prod.isFeatured && (
            <div className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-heading font-bold px-2 py-0.5 rounded-[4px] flex items-center gap-1 shadow-md">
              <Star className="w-3 h-3 fill-white text-white" />
              Featured
            </div>
          )}
        </div>

        <div className="space-y-1">
          <h3
            className="text-sm font-heading font-bold text-[#0A2540] group-hover:text-[#0066CC] transition-colors truncate"
            title={prod.name}
          >
            {prod.name}
          </h3>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFeatured(prod);
          }}
          title={
            prod.isFeatured
              ? "Click to remove from Home Featured"
              : "Click to feature on Home Page (Max 10 allowed)"
          }
          className={`text-[10px] font-heading font-bold px-2 py-1 rounded-[4px] transition-colors ${
            prod.isFeatured
              ? "bg-amber-50 text-amber-700 border border-amber-200"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          {prod.isFeatured ? "★ Featured" : "Feature"}
        </button>

        <div className="flex items-center gap-1">
          <a
            href={`http://localhost:3000/products/${prod.slug}`}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 text-slate-400 hover:text-[#0066CC] hover:bg-blue-50 rounded-[4px] transition-colors"
            title="View on Storefront"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/products/edit/${prod.id}`);
            }}
            className="p-1.5 text-slate-400 hover:text-[#0066CC] hover:bg-blue-50 rounded-[4px] transition-colors"
            title="Edit product"
          >
            <Edit className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(prod.id, prod.name);
            }}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-[4px] transition-colors"
            title="Delete product"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
