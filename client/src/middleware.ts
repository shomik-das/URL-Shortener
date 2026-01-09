import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  const { pathname } = req.nextUrl

  if (!token && pathname.startsWith("/dashboard/add-link")) {
    return NextResponse.redirect(new URL("/auth", req.url))
  }

  if (token && pathname === "/auth") {
    return NextResponse.redirect(new URL("/dashboard/add-link", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth"],
}
