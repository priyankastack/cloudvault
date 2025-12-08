import { NextResponse,NextRequest } from "next/server";
export function middleware(req: NextRequest) {
  const protectedRoutes = ["/upload"];
  const publicRoutes = ["/sign-in", "/sign-up"];

  const { pathname } = req.nextUrl;
  const token = req.cookies.get("authToken")?.value;

  console.log("Middleware hit:", pathname);
  console.log("Token found:", token);

  // ---- Public routes (login/signup) ----
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    // If token exists, redirect to upload
    if (token) {
      return NextResponse.redirect(new URL("/upload", req.url));
    }
    return NextResponse.next(); // no token → allow access
  }
  // ---- Protected routes ----
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    // token exists → allow access
    return NextResponse.next();
  }
  // ---- All other routes ----
  return NextResponse.next();
}
// Routes that the middleware should check
export const config = {
  matcher: ["/upload/:path*", "/sign-in", "/sign-up"],
};
