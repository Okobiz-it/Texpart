import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById, PRODUCTS } from "@/data/products";
import ProductDetailView from "@/components/ProductDetailView";

interface PageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const product = getProductById(params.id);
  if (!product) {
    return {
      title: "Product Not Found | Texpart",
    };
  }

  return {
    title: `${product.name} — ${product.collection} | Texpart`,
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

export default function Page({ params }: PageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.collectionId === product.collectionId && p.id !== product.id
  ).slice(0, 3);

  return (
    <ProductDetailView
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
