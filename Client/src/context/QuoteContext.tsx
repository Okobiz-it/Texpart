"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product, GalleryItem } from "@/types";

interface QuoteContextType {
  // Quote Modal State
  isQuoteOpen: boolean;
  quoteProduct: { name: string; category: string; id?: string } | null;
  openQuote: (name?: string, category?: string, id?: string) => void;
  closeQuote: () => void;

  // Product Modal State
  isProductModalOpen: boolean;
  selectedProduct: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;

  // Lightbox State
  isLightboxOpen: boolean;
  lightboxItem: { src: string; title: string; meta: string } | null;
  openLightbox: (item: { src: string; title: string; meta: string }) => void;
  closeLightbox: () => void;

  // Mobile Drawer State
  isMobileDrawerOpen: boolean;
  openMobileDrawer: () => void;
  closeMobileDrawer: () => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState<{ name: string; category: string; id?: string } | null>(null);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxItem, setLightboxItem] = useState<{ src: string; title: string; meta: string } | null>(null);

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const openQuote = (name?: string, category?: string, id?: string) => {
    if (name) {
      setQuoteProduct({ name, category: category || "Bespoke Production", id });
    } else {
      setQuoteProduct(null);
    }
    setIsQuoteOpen(true);
  };

  const closeQuote = () => {
    setIsQuoteOpen(false);
  };

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const closeProductModal = () => {
    setIsProductModalOpen(false);
  };

  const openLightbox = (item: { src: string; title: string; meta: string }) => {
    setLightboxItem(item);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const openMobileDrawer = () => setIsMobileDrawerOpen(true);
  const closeMobileDrawer = () => setIsMobileDrawerOpen(false);

  return (
    <QuoteContext.Provider
      value={{
        isQuoteOpen,
        quoteProduct,
        openQuote,
        closeQuote,
        isProductModalOpen,
        selectedProduct,
        openProductModal,
        closeProductModal,
        isLightboxOpen,
        lightboxItem,
        openLightbox,
        closeLightbox,
        isMobileDrawerOpen,
        openMobileDrawer,
        closeMobileDrawer,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error("useQuote must be used within a QuoteProvider");
  }
  return context;
}

