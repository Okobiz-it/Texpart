import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully.",
    });

    // Clear the session cookie
    response.cookies.set({
      name: "admin_session",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error: any) {
    console.error("Logout API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to log out." },
      { status: 500 }
    );
  }
}
