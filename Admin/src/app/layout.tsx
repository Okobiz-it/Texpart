import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import AdminSidebar from "@/components/AdminSidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_ADMIN_URL || "https://admin.texpart.com"),
  title: "Texpart Admin Portal | Enterprise Content Management",
  description: "Administrative control portal for Texpart Garment Accessories & Commercial Print solutions.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="flex flex-col lg:flex-row min-h-screen bg-slate-50 text-[#0A2540] font-sans antialiased">
        <Suspense fallback={<div className="w-64 bg-white border-r border-slate-200 hidden lg:block" />}>
          <AdminSidebar />
        </Suspense>
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
