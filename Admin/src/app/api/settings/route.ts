import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import SiteSetting from "@/models/SiteSetting";

export const dynamic = "force-dynamic";

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
    console.error("Error fetching site settings:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch settings",
        settings: {
          show_certifications_section: true,
          show_clients_section: true,
        },
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    // Supports both single key/value pair or an object of multiple settings
    if (body.key !== undefined && body.value !== undefined) {
      await SiteSetting.findOneAndUpdate(
        { key: body.key },
        { key: body.key, value: body.value },
        { upsert: true, new: true }
      );
    } else if (typeof body === "object") {
      const updates = Object.entries(body);
      for (const [key, value] of updates) {
        await SiteSetting.findOneAndUpdate(
          { key },
          { key, value },
          { upsert: true, new: true }
        );
      }
    }

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
    console.error("Error updating site settings:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update settings" },
      { status: 500 }
    );
  }
}
