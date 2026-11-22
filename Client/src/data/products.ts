import { Product } from "@/types";
import { accessoriesProducts } from "./products/accessoriesProducts";
import { commercialProducts } from "./products/commercialProducts";

export const PRODUCTS: Product[] = [
  ...accessoriesProducts,
  ...commercialProducts,
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
