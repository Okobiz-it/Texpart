import type { Metadata } from "next";
import "./globals.css";
import AdminSidebar from "@/components/AdminSidebar";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_ADMIN_URL || "https://admin.texpart.com"),
  title: "Texpart Admin Portal | Content Management System",
  description: "Administrative control portal for Texpart Garment Accessories & Commercial Print solutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-slate-50 text-[#0A2540]">
        <AdminSidebar />
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
