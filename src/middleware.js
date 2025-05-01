// middleware.js
import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export async function middleware(req) {
  const token = req.cookies.get('token')?.value || '';

  try {
    // Verify the token
    const decoded = verify(token, process.env.JWT_SECRET);

    // Attach user data to the request for downstream usage
    req.user = decoded;

    // Check the requested path
    const pathname = req.nextUrl.pathname;

    // Protect admin routes
    if (pathname.startsWith('/admin')) {
      if (!decoded.isAdmin) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }

    // Protect user routes
    if (pathname.startsWith('/user')) {
      if (!decoded.userId) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }

    // Allow access to the requested page
    return NextResponse.next();
  } catch (error) {
    // Redirect to login if invalid or missing token
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Specify which routes the middleware should apply to
export const config = {
  matcher: ['/admin/:path*', '/user/:path*'], // Protect /admin/* and /user/* routes
};