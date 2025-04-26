import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req });
  if (!token && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin-login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
