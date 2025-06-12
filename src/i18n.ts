import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, isValidLocale } from './config/locales';

export default getRequestConfig(async ({ locale }) => {
  const validLocale = locale || defaultLocale;
  // Validate the locale
  if (!isValidLocale(validLocale)) {
    console.warn(
      `Invalid locale received: ${locale}, falling back to '${defaultLocale}'`
    );
    return {
      locale: defaultLocale,
      messages: (await import(`../messages/${defaultLocale}.json`)).default,
    };
  }

  return {
    locale: validLocale,
    messages: (await import(`../messages/${validLocale}.json`)).default,
  };
});
