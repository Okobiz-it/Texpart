import { NextRequest, NextResponse } from "next/server";

// Public paths that do not require authentication
const PUBLIC_PATHS = [
  "/login",
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/me",
];

// File extension patterns for static assets
const STATIC_FILE_EXTENSIONS = /\.(png|jpg|jpeg|webp|svg|gif|ico|css|js|woff|woff2|ttf|map)$/i;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Allow Next.js internals and static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname === "/favicon.ico" ||
    pathname === "/icon.png" ||
    STATIC_FILE_EXTENSIONS.test(pathname)
  ) {
    return NextResponse.next();
  }

  // 2. Allow public auth endpoints and public catalog read APIs
  if (
    PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(path + "/")) ||
    (req.method === "GET" && (pathname.startsWith("/api/categories") || pathname.startsWith("/api/products") || pathname.startsWith("/api/hero-banners") || pathname.startsWith("/api/gallery")))
  ) {
    // If user is already logged in and visits /login, redirect to dashboard
    if (pathname === "/login") {
      const sessionToken = req.cookies.get("admin_session")?.value;
      if (sessionToken && sessionToken.includes(".")) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
    return NextResponse.next();
  }

  // 3. Check for admin session cookie
  const sessionToken = req.cookies.get("admin_session")?.value;

  if (!sessionToken) {
    // For API requests, return 401 Unauthorized
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Unauthorized. Authentication required." },
        { status: 401 }
      );
    }

    // For page requests, redirect to /login
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Session token exists, proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
