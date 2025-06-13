'use client';
import { useAuth } from '../../contexts/AuthContext';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSelector from '../ui/LanguageSelector';

export default function Header() {
  const { user, logout, token, isLoading } = useAuth();

  const locale = useLocale();
  const t = useTranslations('Navigation');
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push(`/${locale}/login`);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex items-center space-x-2">
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
            {isLoading ? (
              /* Loader */
              <div className="animate-pulse">
                <div className="h-8 w-20 bg-gray-200 rounded"></div>
              </div>
            ) : user && token ? (
              /* Authenticated */
              <>
                <span className="hidden sm:inline-flex items-center text-sm text-gray-700">
                  Hello,{' '}
                  <span className="font-medium ml-1">
                    {user.username || user.email}
                  </span>
                </span>
                <Link
                  href={`/${locale}/profile`}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {t('profile')}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {t('logout')}
                </button>
              </>
            ) : (
              /* Unauthenticated */
              <Link
                href={`/${locale}/login`}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {t('login')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
