export interface Product {
  id: string;
  name: string;
  collection: string;
  collectionId: 'accessories' | 'commercial';
  category: string;
  brochureRef: string;
  heroBadge?: string;
  shortDesc: string;
  fullDesc: string;
  subItems: string[];
  materials: string[];
  finishes: string[];
  specifications: Record<string, string>;
  image: string;
  galleryImages: string[];
  featured?: boolean;
}

export type GalleryCategory = 
  | 'all' 
  | 'garment-production' 
  | 'apparel-accessories' 
  | 'printing' 
  | 'packaging' 
  | 'finished-products';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'garment-production' | 'apparel-accessories' | 'printing' | 'packaging' | 'finished-products';
  categoryLabel: string;
  aspect: 'tall' | 'wide' | 'square';
  image: string;
  description: string;
  location: string;
  meta: string;
}

