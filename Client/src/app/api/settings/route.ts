import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import SiteSetting from "@/models/SiteSetting";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    await connectToDatabase();
    const settingsDocs = await SiteSetting.find({}).lean();

    const settings: Record<string, any> = {
      show_certifications_section: true,
      show_clients_section: true,
    };

    for (const doc of settingsDocs) {
      settings[doc.key] = doc.value;
    }

    return NextResponse.json({
      success: true,
      settings,
    });
  } catch (error: any) {
    console.error("Error fetching client site settings:", error);
    return NextResponse.json(
      {
        success: false,
        settings: {
          show_certifications_section: true,
          show_clients_section: true,
        },
      },
      { status: 200 }
    );
  }
}
