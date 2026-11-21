import { NextRequest, NextResponse } from "next/server";
import {
  validateAdminCredentials,
  createSessionToken,
  DEFAULT_ADMIN_EMAIL,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, rememberMe } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    const isValid = validateAdminCredentials(email, password);

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email or password. Please verify your credentials.",
        },
        { status: 401 }
      );
    }

    const sessionDurationDays = rememberMe ? 30 : 7;
    const sessionToken = createSessionToken(
      {
        email: DEFAULT_ADMIN_EMAIL,
        role: "Super Admin",
        name: "Texpart Admin",
      },
      sessionDurationDays
    );

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful.",
      user: {
        email: DEFAULT_ADMIN_EMAIL,
        role: "Super Admin",
        name: "Texpart Admin",
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: "admin_session",
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: sessionDurationDays * 24 * 60 * 60,
    });

    return response;
  } catch (error: any) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
