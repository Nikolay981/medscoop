import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  if (path.startsWith('/admin') && path !== '/admin/login') {
    const adminCookie = request.cookies.get('medscoop_admin');
    
    // For simplicity, we just check if the cookie exists and equals 'true'
    if (!adminCookie || adminCookie.value !== 'true') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  if (path === '/admin/login') {
    const adminCookie = request.cookies.get('medscoop_admin');
    if (adminCookie && adminCookie.value === 'true') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
