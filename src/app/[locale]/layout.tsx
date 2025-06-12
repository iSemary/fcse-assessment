import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { generateLocaleParams, isValidLocale } from '../../config/locales';
import { notFound } from 'next/navigation';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ClientProviders from '../../components/ClientProviders';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return generateLocaleParams();
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <NextIntlClientProvider messages={messages}>
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
