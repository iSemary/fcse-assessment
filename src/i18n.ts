import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, isValidLocale } from './config/locales';

export default getRequestConfig(async ({ locale }) => {
  const validLocale = locale && isValidLocale(locale) ? locale : defaultLocale;

  try {
    const messages = (await import(`../messages/${validLocale}.json`)).default;

    return {
      locale: validLocale,
      messages,
    };
  } catch (error) {
    console.error(`Could not load messages for locale: ${validLocale}`, error);

    // Fallback to default locale
    const defaultMessages = (await import(`../messages/${defaultLocale}.json`))
      .default;
    return {
      locale: defaultLocale,
      messages: defaultMessages,
    };
  }
});
