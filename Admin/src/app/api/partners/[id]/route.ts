import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Partner from "@/models/Partner";
import mongoose from "mongoose";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();
    const query = mongoose.Types.ObjectId.isValid(params.id)
      ? { _id: params.id }
      : { _id: params.id };

    const result = await Partner.findByIdAndDelete(params.id);
    if (!result) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Partner deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
