export type JobDivision =
  | "commercial-printing"
  | "garments-accessories"
  | "packaging-solutions"
  | "packaging"
  | "promotional-products"
  | "corporate-projects"
  | "apparel-projects"
  | "private-jobs"
  | "commercial-jobs";

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  division: JobDivision;
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

export interface QuotationItem {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  productName: string;
  moqQuantity: string;
  noteContent: string;
  status: "NEW" | "IN_PROGRESS" | "QUOTED" | "CLOSED";
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessageItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  comment: string;
  status: "NEW" | "IN_PROGRESS" | "RESOLVED";
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HeroBannerItem {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  order: number;
  displayOrder?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type HeroSlideItem = HeroBannerItem;

export interface GalleryMediaItem {
  id: string;
  title: string;
  caption?: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  category?: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryItemType {
  _id?: string;
  id: string;
  title: string;
  image: string;
  imageUrl?: string;
  mediaUrl?: string;
  description: string;
  category?: string;
  aspect?: string;
  createdAt?: string;
}

export interface DashboardStats {
  totalProducts: number;
  privateJobsCount: number;
  commercialJobsCount: number;
  featuredCount?: number;
  clientPartnersCount: number;
  certificationsCount: number;
  heroSlidesCount: number;
  galleryMediaCount: number;
  quotationsCount: number;
  newQuotationsCount: number;
  inquiriesCount: number;
  newInquiriesCount: number;
  recentProducts?: ProductItem[];
  recentQuotations?: any[];
  recentInquiries?: any[];
  activeHeroSlides?: any[];
}

export type AdminStats = DashboardStats;
