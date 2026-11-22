"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Image as ImageIcon,
  CheckCircle,
  Star,
  Loader2,
  ExternalLink,
  Edit,
  Trash2,
} from "lucide-react";
import { ProductItem } from "@/types";

interface ProductTableRowProps {
  prod: ProductItem;
  isToggling: boolean;
  onToggleFeatured: (prod: ProductItem) => void;
  onDelete: (id: string, name: string) => void;
}

export default function ProductTableRow({
  prod,
  isToggling,
  onToggleFeatured,
  onDelete,
}: ProductTableRowProps) {
  const router = useRouter();

  return (
    <tr
      onClick={() => router.push(`/products/edit/${prod.id}`)}
      className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
      title="Click to edit this product"
    >
      {/* Thumbnail & Name */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-[4px] overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 group-hover:border-[#0066CC] transition-colors">
            {prod.frontImage ? (
              <Image
                src={prod.frontImage}
                alt={prod.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300">
                <ImageIcon className="w-4 h-4" />
              </div>
            )}
          </div>
          <div>
            <strong className="text-xs font-heading font-bold text-[#0A2540] block group-hover:text-[#0066CC] transition-colors">
              {prod.name}
            </strong>
            <span className="text-[10px] text-emerald-600 font-mono font-medium flex items-center gap-1">
              <CheckCircle className="w-2.5 h-2.5" /> Front Image Active
            </span>
          </div>
        </div>
      </td>

      {/* Home Featured Toggle */}
      <td className="px-4 py-3 text-center">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFeatured(prod);
          }}
          disabled={isToggling}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] text-xs font-heading font-bold transition-all ${
            prod.isFeatured
              ? "bg-amber-500 hover:bg-amber-600 text-white shadow-sm"
              : "bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-300/80"
          } disabled:opacity-50`}
          title={
            prod.isFeatured
              ? "Click to remove from Home Featured"
              : "Click to feature on Home Page (Max 10 allowed)"
          }
        >
          {isToggling ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Star
              className={`w-3.5 h-3.5 ${
                prod.isFeatured ? "fill-white text-white" : "text-slate-400"
              }`}
            />
          )}
          <span>{prod.isFeatured ? "★ Featured" : "Feature"}</span>
        </button>
      </td>

      {/* Images count */}
      <td className="px-4 py-3 font-mono text-[11px] text-slate-500">
        {prod.images?.length || 1} asset(s)
      </td>

      {/* Slug */}
      <td className="px-4 py-3 font-mono text-[11px] text-slate-500">
        /products/{prod.slug}
      </td>

      {/* Actions */}
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-1.5">
          <a
            href={`http://localhost:3000/products/${prod.slug}`}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 text-slate-400 hover:text-[#0066CC] hover:bg-blue-50 rounded-[4px] transition-colors"
            title="View on Live Storefront"
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
            title="Edit product on dedicated page"
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
      </td>
    </tr>
  );
}
