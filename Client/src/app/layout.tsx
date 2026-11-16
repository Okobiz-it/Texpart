import type { Metadata } from "next";
import "./globals.css";
import { QuoteProvider } from "@/context/QuoteContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileDrawer from "@/components/MobileDrawer";
import QuoteModal from "@/components/QuoteModal";
import ProductDetailsModal from "@/components/ProductDetailsModal";
import LightboxModal from "@/components/LightboxModal";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://texpart.com"),
  title: "Texpart | Design & Packaging Solutions — Apparel Manufacturing & Commercial Printing",
  description: "Bangladesh-based premier apparel development, garments accessories, luxury packaging, and commercial printing partner. One partner, multiple solutions.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  keywords: [
    "Apparel Manufacturing Bangladesh",
    "Garment Accessories Dhaka",
    "Private Jobs Apparel",
    "Commercial Printing Dhaka",
    "Woven Labels",
    "Hangtags",
    "Luxury Packaging",
    "Texpart"
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-offwhite text-charcoal min-h-screen flex flex-col font-body selection:bg-orange selection:text-white">
        <QuoteProvider>
          <Header />
          <MobileDrawer />
          <main className="flex-grow">{children}</main>
          <Footer />
          <QuoteModal />
          <ProductDetailsModal />
          <LightboxModal />
        </QuoteProvider>
      </body>
    </html>
  );
}
