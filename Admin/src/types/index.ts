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
  subtitle: string;
  imageUrl: string;
  altText: string;
  linkUrl: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryItemType {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  aspect: "square" | "wide" | "tall";
  image: string;
  description: string;
  location: string;
  meta: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalProducts: number;
  privateJobsCount: number;
  commercialJobsCount: number;
  clientPartnersCount: number;
  certificationsCount: number;
  heroSlidesCount: number;
  galleryMediaCount: number;
  quotationsCount: number;
  newQuotationsCount: number;
  inquiriesCount: number;
  newInquiriesCount: number;
  recentQuotations: QuotationItem[];
  recentInquiries: ContactMessageItem[];
  activeHeroSlides: HeroBannerItem[];
  recentProducts: ProductItem[];
}
