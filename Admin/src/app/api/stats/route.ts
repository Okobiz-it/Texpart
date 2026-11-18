import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import Partner from "@/models/Partner";
import Quotation from "@/models/Quotation";
import ContactMessage from "@/models/ContactMessage";
import HeroBanner from "@/models/HeroBanner";
import GalleryItem from "@/models/GalleryItem";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    const [
      totalProducts,
      privateJobsCount,
      commercialJobsCount,
      featuredCount,
      clientPartnersCount,
      certificationsCount,
      heroSlidesCount,
      galleryMediaCount,
      quotationsCount,
      newQuotationsCount,
      inquiriesCount,
      newInquiriesCount,
      recentProductsDocs,
      recentQuotationsDocs,
      recentInquiriesDocs,
      activeHeroSlidesDocs,
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ division: "private-jobs" }),
      Product.countDocuments({ division: "commercial-jobs" }),
      Product.countDocuments({ isFeatured: true }),
      Partner.countDocuments({ category: "client" }),
      Partner.countDocuments({ category: "certification" }),
      HeroBanner.countDocuments(),
      GalleryItem.countDocuments(),
      Quotation.countDocuments(),
      Quotation.countDocuments({ doc_type: "INQUIRY", status: "NEW" }),
      ContactMessage.countDocuments(),
      ContactMessage.countDocuments({ status: "NEW" }),
      Product.find().sort({ createdAt: -1 }).limit(5).lean(),
      Quotation.find().sort({ createdAt: -1 }).limit(5).lean(),
      ContactMessage.find().sort({ createdAt: -1 }).limit(5).lean(),
      HeroBanner.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).limit(4).lean(),
    ]);

    const recentProducts = recentProductsDocs.map((doc: any) => ({
      id: doc._id.toString(),
      slug: doc.slug,
      name: doc.name,
      division: doc.division,
      category: doc.category,
      description: doc.description,
      frontImage: doc.frontImage,
      images: doc.images || [],
      isFeatured: !!doc.isFeatured,
      createdAt: doc.createdAt?.toISOString?.() || new Date(doc.createdAt).toISOString(),
      updatedAt: doc.updatedAt?.toISOString?.() || new Date(doc.updatedAt).toISOString(),
    }));

    const recentQuotations = recentQuotationsDocs.map((doc: any) => ({
      id: doc._id.toString(),
      doc_type: doc.doc_type || (doc.fullName ? "INQUIRY" : "QUOTATION"),
      fullName: doc.fullName || doc.client_name || "",
      companyName: doc.companyName || doc.organization_name || "",
      email: doc.email || "",
      phone: doc.phone || "",
      productName: doc.productName || doc.subject || "General Production",
      moqQuantity: doc.moqQuantity || (doc.grand_total ? `BDT ${doc.grand_total.toLocaleString()}` : "5,000 pcs"),
      noteContent: doc.noteContent || "",
      status: doc.status || "NEW",
      createdAt: doc.createdAt?.toISOString?.() || new Date(doc.createdAt).toISOString(),
    }));

    const recentInquiries = recentInquiriesDocs.map((doc: any) => ({
      id: doc._id.toString(),
      name: doc.name || "",
      phone: doc.phone || "",
      email: doc.email || "",
      comment: doc.comment || "",
      status: doc.status || "NEW",
      createdAt: doc.createdAt?.toISOString?.() || new Date(doc.createdAt).toISOString(),
    }));

    const activeHeroSlides = activeHeroSlidesDocs.map((doc: any) => ({
      id: doc._id.toString(),
      title: doc.title || "Hero Banner",
      subtitle: doc.subtitle || "",
      imageUrl: doc.imageUrl || "",
      altText: doc.altText || "",
      linkUrl: doc.linkUrl || "/services/private-jobs",
      order: doc.order ?? 0,
      isActive: doc.isActive ?? true,
      createdAt: doc.createdAt?.toISOString?.() || new Date().toISOString(),
    }));

    return NextResponse.json({
      success: true,
      stats: {
        totalProducts,
        privateJobsCount,
        commercialJobsCount,
        featuredCount,
        clientPartnersCount,
        certificationsCount,
        heroSlidesCount,
        galleryMediaCount,
        quotationsCount,
        newQuotationsCount,
        inquiriesCount,
        newInquiriesCount,
        recentProducts,
        recentQuotations,
        recentInquiries,
        activeHeroSlides,
      },
    });
  } catch (error: any) {
    console.error("GET /api/stats error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
