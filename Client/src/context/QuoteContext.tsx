"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/types";

export interface QuoteProductInfo {
  name: string;
  category: string;
  id?: string;
  isGeneral?: boolean;
}

interface QuoteContextType {
  // Quote Modal State
  isQuoteOpen: boolean;
  quoteProduct: QuoteProductInfo | null;
  openQuote: (name?: string, category?: string, id?: string, isGeneral?: boolean) => void;
  openGeneralQuote: () => void;
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
  const [quoteProduct, setQuoteProduct] = useState<QuoteProductInfo | null>(null);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxItem, setLightboxItem] = useState<{ src: string; title: string; meta: string } | null>(null);

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const openQuote = (name?: string, category?: string, id?: string, isGeneral?: boolean) => {
    if (name) {
      setQuoteProduct({
        name,
        category: category || "Apparel Accessories & Packaging",
        id,
        isGeneral: !!isGeneral,
      });
    } else {
      setQuoteProduct({
        name: "",
        category: category || "",
        id,
        isGeneral: true,
      });
    }
    setIsQuoteOpen(true);
  };

  const openGeneralQuote = () => {
    setQuoteProduct({
      name: "",
      category: "",
      isGeneral: true,
    });
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
        openGeneralQuote,
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
