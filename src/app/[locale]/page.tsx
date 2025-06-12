import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { generateLocaleParams } from '../../config/locales';

export function generateStaticParams() {
  return generateLocaleParams();
}

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'HomePage',
  });
  const nav = await getTranslations({
    locale: params.locale,
    namespace: 'Navigation',
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-24">
      <nav className="absolute top-4 right-4">
        <Link
          href={`/${params.locale}/login`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {nav('login')}
        </Link>
      </nav>

      <main className="text-center">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl text-gray-600 mb-8">{t('description')}</p>
        <Link
          href={`/${params.locale}/login`}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          {nav('login')}
        </Link>
      </main>
    </div>
  );
}
