import fs from "fs";
import path from "path";
import { ProductItem, PartnerItem, DashboardStats } from "@/types";
import { INITIAL_PRODUCTS, INITIAL_PARTNERS } from "@/data/initialData";

const DATA_DIR = path.join(process.cwd(), "data");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");
const PARTNERS_FILE = path.join(DATA_DIR, "partners.json");

function ensureDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// ---------------- PRODUCTS ----------------

export function getProducts(): ProductItem[] {
  ensureDirectory();
  if (!fs.existsSync(PRODUCTS_FILE)) {
    saveProducts(INITIAL_PRODUCTS);
    return INITIAL_PRODUCTS;
  }
  try {
    const raw = fs.readFileSync(PRODUCTS_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return INITIAL_PRODUCTS;
  }
}

export function saveProducts(products: ProductItem[]) {
  ensureDirectory();
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf8");
}

export function getProductById(id: string): ProductItem | undefined {
  const products = getProducts();
  return products.find((p) => p.id === id || p.slug === id);
}

export function createProduct(product: Omit<ProductItem, "id" | "createdAt" | "updatedAt">): ProductItem {
  const products = getProducts();
  const id = `prod_${Date.now()}`;
  const now = new Date().toISOString();
  const newProduct: ProductItem = {
    ...product,
    id,
    createdAt: now,
    updatedAt: now,
  };
  products.unshift(newProduct);
  saveProducts(products);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<ProductItem>): ProductItem | null {
  const products = getProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return null;

  products[idx] = {
    ...products[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveProducts(products);
  return products[idx];
}

export function deleteProduct(id: string): boolean {
  const products = getProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  saveProducts(filtered);
  return true;
}

// ---------------- PARTNERS ----------------

export function getPartners(): PartnerItem[] {
  ensureDirectory();
  if (!fs.existsSync(PARTNERS_FILE)) {
    savePartners(INITIAL_PARTNERS);
    return INITIAL_PARTNERS;
  }
  try {
    const raw = fs.readFileSync(PARTNERS_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return INITIAL_PARTNERS;
  }
}

export function savePartners(partners: PartnerItem[]) {
  ensureDirectory();
  fs.writeFileSync(PARTNERS_FILE, JSON.stringify(partners, null, 2), "utf8");
}

export function createPartner(partner: Omit<PartnerItem, "id" | "createdAt" | "updatedAt">): PartnerItem {
  const partners = getPartners();
  const id = `partner_${Date.now()}`;
  const now = new Date().toISOString();
  const newPartner: PartnerItem = {
    ...partner,
    id,
    createdAt: now,
    updatedAt: now,
  };
  partners.unshift(newPartner);
  savePartners(partners);
  return newPartner;
}

export function deletePartner(id: string): boolean {
  const partners = getPartners();
  const filtered = partners.filter((p) => p.id !== id);
  if (filtered.length === partners.length) return false;
  savePartners(filtered);
  return true;
}

// ---------------- DASHBOARD STATS ----------------

export function getDashboardStats(): DashboardStats {
  const products = getProducts();
  const partners = getPartners();
  const privateJobsCount = products.filter((p) => p.division === "private-jobs").length;
  const commercialJobsCount = products.filter((p) => p.division === "commercial-jobs").length;
  const featuredCount = products.filter((p) => p.isFeatured).length;

  return {
    totalProducts: products.length,
    privateJobsCount,
    commercialJobsCount,
    partnersCount: partners.length,
    featuredCount,
    recentProducts: products.slice(0, 6),
  };
}
