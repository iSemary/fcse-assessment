import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function Footer() {
  const t = await getTranslations();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                             src="/images/logo/logo.jpeg"
                             alt="Company Logo"
                             width={32}
                             height={32}
                             priority
                           />
              <span className="text-xl font-bold">
                {process.env.NEXT_PUBLIC_APP_NAME || 'FCSE'}
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              {t('HomePage.description')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
