import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['de', 'en', 'ar'],
  defaultLocale: 'de',
});

export const config = {
  matcher: ['/', '/(de|en|ar)/:path*'],
};
