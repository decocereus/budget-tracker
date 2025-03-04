import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isAuthenticated = !!token;

  // Define protected routes that require authentication
  const protectedPaths = ["/dashboard", "/budget", "/transactions", "/reports"];
  const isProtectedRoute = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // Define auth routes (login, register)
  const authRoutes = ["/login", "/register"];
  const isAuthRoute = authRoutes.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users to login from protected routes
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(
      new URL(
        `/login?callbackUrl=${encodeURIComponent(request.nextUrl.pathname)}`,
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/budget/:path*",
    "/transactions/:path*",
    "/reports/:path*",
    "/login",
    "/register",
  ],
};
