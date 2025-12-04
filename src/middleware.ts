import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if maintenance mode is enabled
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

  // Allow access to maintenance page itself or API routes for health checks
  if (!isMaintenanceMode ||
      request.nextUrl.pathname === '/maintenance' ||
      request.nextUrl.pathname.startsWith('/api/health')) {
    return NextResponse.next();
  }

  // Redirect all other requests to maintenance page with 503 status
  return NextResponse.rewrite(new URL('/maintenance', request.url), {
    status: 503,
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/health (API routes for health checks)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/health|_next/static|_next/image|favicon.ico).*)',
  ],
};
