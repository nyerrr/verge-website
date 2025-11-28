// middleware.ts
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdmin = token?.userType === "admin"
    const isOnAdminPage = req.nextUrl.pathname.startsWith("/admin")

    // If on admin page but not admin, redirect to home
    if (isOnAdminPage && !isAdmin) {
      return NextResponse.redirect(new URL("/", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Must be logged in
    },
  }
)

export const config = {
  matcher: ["/admin/:path*"], // Protect all /admin routes
}