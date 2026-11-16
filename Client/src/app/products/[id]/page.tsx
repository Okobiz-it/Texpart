import { Metadata } from "next";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import { getProductById, PRODUCTS } from "@/data/products";
import ProductDetailView from "@/components/ProductDetailView";
import { connectToDatabase } from "@/lib/mongodb";
import ProductModel from "@/models/Product";
import { Product } from "@/types";

interface PageProps {
  params: {
    id: string;
  };
}

export const dynamicParams = true;

async function getProduct(id: string): Promise<Product | null> {
  // 1. Static lookup first
  const staticProduct = getProductById(id);
  if (staticProduct) return staticProduct;

  // 2. Database lookup fallback
  try {
    await connectToDatabase();
    const query: any = {
      $or: [
        { slug: id },
        ...(mongoose.Types.ObjectId.isValid(id) ? [{ _id: id }] : []),
      ],
    };
    const doc = await ProductModel.findOne(query).lean();
    if (doc) {
      const isPrivate = doc.division === "private-jobs";
      const cleanDesc = doc.description ? doc.description.replace(/<[^>]*>/g, " ").trim() : "";
      return {
        id: doc.slug || doc._id.toString(),
        name: doc.name,
        collection: isPrivate
          ? "Apparel Accessories & Packaging"
          : "Commercial Printing & Promotional Products",
        collectionId: isPrivate ? "accessories" : "commercial",
        category: doc.category || "General",
        brochureRef: isPrivate
          ? "Apparel Accessories Brochure"
          : "Commercial Printing Brochure",
        shortDesc: cleanDesc.slice(0, 160) || doc.name,
        fullDesc: doc.description || cleanDesc,
        image: doc.frontImage || (doc.images && doc.images[0]) || "/images/products/range-labels.jpg",
        galleryImages: doc.images && doc.images.length > 0
          ? doc.images
          : [doc.frontImage || "/images/products/range-labels.jpg"],
        featured: !!doc.isFeatured,
        subItems: [],
        materials: [],
        finishes: [],
        specifications: {},
      };
    }
  } catch (err) {
    console.error("Database lookup failed for product:", id, err);
  }

  return null;
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProduct(params.id);
  if (!product) {
    return {
      title: "Product Not Found | Texpart",
    };
  }

  return {
    title: `${product.name} | Texpart`,
    description: product.shortDesc,
    openGraph: {
      title: `${product.name} | Texpart Design & Packaging Solutions`,
      description: product.shortDesc,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  // Show a full row of 6 related products within the same collection
  const relatedProducts = PRODUCTS.filter(
    (p) => p.collectionId === product.collectionId && p.id !== product.id
  ).slice(0, 6);

  return (
    <ProductDetailView
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
