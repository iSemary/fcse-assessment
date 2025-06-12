export const locales = ['de', 'en', 'ar'] as const;
export const defaultLocale = 'de' as const;

export type Locale = (typeof locales)[number];

// Helper function to validate locale
export function isValidLocale(locale: string): locale is Locale {
  return (locales as readonly string[]).includes(locale);
}

export function generateLocaleParams() {
  return locales.map((locale) => ({ locale }));
}
