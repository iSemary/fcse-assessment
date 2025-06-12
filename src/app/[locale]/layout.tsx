// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { generateLocaleParams } from '../../config/locales';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import '../globals.css';

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
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="flex flex-col min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-grow bg-gradient-to-br from-blue-50 to-indigo-100">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
