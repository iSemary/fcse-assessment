import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './config/locales';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!_next|api|_vercel|favicon.ico|images).*)', '/'],
};
