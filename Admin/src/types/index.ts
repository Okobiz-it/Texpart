export type JobDivision = "private-jobs" | "commercial-jobs";

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  division: JobDivision; // "private-jobs" | "commercial-jobs"
  category: string;
  description: string; // rich text HTML
  frontImage: string;
  images: string[];
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PartnerItem {
  id: string;
  name?: string; // optional, internal admin reference
  logoUrl: string;
  category?: "client" | "certification" | "partner";
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalProducts: number;
  privateJobsCount: number;
  commercialJobsCount: number;
  partnersCount: number;
  featuredCount: number;
  recentProducts: ProductItem[];
}
