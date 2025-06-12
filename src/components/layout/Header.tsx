import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSelector from '../ui/LanguageSelector';

export default async function Header() {
  const t = await getTranslations();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href={`/`} className="flex items-center space-x-2">
              <Image
                src="/images/logo/logo.jpeg"
                alt="Company Logo"
                width={32}
                height={32}
                priority
              />
              <span className="text-xl font-bold text-gray-900">
                {process.env.NEXT_PUBLIC_APP_NAME || 'FCSE'}
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <Link
              href={`/login`}
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              {t('Navigation.login')}
            </Link>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
