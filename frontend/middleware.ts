import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes
const protectedRoutes = ['/admin', '/admin/:path*'];

export function middleware(req: NextRequest) {
  // Check if the user has a valid authToken in cookies
  const token = req.cookies.get('authToken'); // Assume auth token is stored in cookies

  // Check if the route is a protected route
  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    // If no token, redirect to login
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    // if (!isValidToken(token)) {
    //   const url = req.nextUrl.clone();
    //   url.pathname = '/login';
    //   return NextResponse.redirect(url);
    // }
  }

  // Continue if authenticated (valid token present)
  return NextResponse.next();
}

// Configure which routes the middleware should apply to
export const config = {
  matcher: ['/admin/:path*'], // Apply to /admin and all its subroutes
};
