import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import QuotationSetting from "@/models/QuotationSetting";
import { DEFAULT_UNIFIED_TERMS_AND_CONDITIONS } from "@/components/quotation/quotation-defaults";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    const setting = await QuotationSetting.findOne({
      key: "DEFAULT_TERMS_AND_CONDITIONS",
    }).lean();

    const defaultTerms =
      setting && typeof setting.value === "string" && setting.value.trim().length > 0
        ? setting.value
        : DEFAULT_UNIFIED_TERMS_AND_CONDITIONS;

    return NextResponse.json({
      success: true,
      defaultTerms,
      isCustomized: Boolean(setting && setting.value),
    });
  } catch (error: any) {
    console.error("GET /api/quotations/settings error:", error);
    return NextResponse.json({
      success: true,
      defaultTerms: DEFAULT_UNIFIED_TERMS_AND_CONDITIONS,
      isCustomized: false,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const defaultTerms = typeof body.defaultTerms === "string" ? body.defaultTerms : "";

    const updated = await QuotationSetting.findOneAndUpdate(
      { key: "DEFAULT_TERMS_AND_CONDITIONS" },
      { value: defaultTerms },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({
      success: true,
      defaultTerms: updated.value,
      message: "Default terms & conditions saved permanently",
    });
  } catch (error: any) {
    console.error("POST /api/quotations/settings error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save default terms" },
      { status: 500 }
    );
  }
}
