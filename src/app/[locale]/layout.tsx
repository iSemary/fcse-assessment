import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import {
  generateLocaleParams,
  isValidLocale,
  getLocaleData
} from '../../config/locales';
import { notFound } from 'next/navigation';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ClientProviders from '../../components/ClientProviders';

export function generateStaticParams() {
  return generateLocaleParams();
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!isValidLocale(locale)) {
    notFound();
  }

  const localeData = getLocaleData(locale);

  // Pass the locale to getMessages
  const messages = await getMessages({ locale });

  console.log('Messages loaded for locale:', locale);
  console.log('Available message keys:', Object.keys(messages || {}));

  return (
    <html lang={locale} dir={localeData.dir}>
      <body className={`flex flex-col min-h-screen`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientProviders>
            <Header />
            <main className="flex-grow bg-gradient-to-br from-blue-50 to-indigo-100">
              {children}
            </main>
            <Footer />
          </ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
