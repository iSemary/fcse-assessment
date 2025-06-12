export const localeData = {
  de: {
    code: 'de',
    name: 'Deutsch',
    dir: 'ltr' as const,
  },
  en: {
    code: 'en',
    name: 'English',
    dir: 'ltr' as const,
  },
  ar: {
    code: 'ar',
    name: 'العربية',
    dir: 'rtl' as const,
  },
} as const;

export const locales = Object.keys(localeData) as (keyof typeof localeData)[];
export const defaultLocale = 'en' as const;

export type Locale = keyof typeof localeData;
export type LocaleData = typeof localeData[Locale];

// Helper function to validate locale
export function isValidLocale(locale: string): locale is Locale {
  return locale in localeData;
}

// Helper function to get locale data
export function getLocaleData(locale: Locale): LocaleData {
  return localeData[locale];
}

// Helper function to get all locale data
export function getAllLocaleData() {
  return Object.values(localeData);
}

export function generateLocaleParams() {
  return locales.map((locale) => ({ locale }));
}