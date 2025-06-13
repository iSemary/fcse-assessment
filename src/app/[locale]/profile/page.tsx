'use client';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { USER_QUERY } from '../../../lib/graphql';

interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export default function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { user: authUser, isLoading: authLoading, token, logout } = useAuth();
  const router = useRouter();
  const t = useTranslations('ProfilePage');
  const [locale, setLocale] = useState<string>('en');

  useEffect(() => {
    params.then(({ locale }) => {
      setLocale(locale);
    });
  }, [params]);

  const {
    data: userData,
    loading: userLoading,
    error: userError,
    refetch,
  } = useQuery<{ user: UserData }>(USER_QUERY, {
    variables: { id: authUser?.id || '' },
    skip: !authUser?.id || !token,
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (!authLoading && !authUser) {
      router.push(`/${locale}/login`);
    }
  }, [authUser, authLoading, router, locale]);

  const handleRefresh = () => {
    refetch();
  };

  const handleLogout = () => {
    logout();
    router.push(`/${locale}/login`);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!authUser) {
    return null;
  }

  const isLoading = userLoading;
  const user = userData?.user;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
        </div>

        <div className="bg-white shadow-xl rounded-xl border border-gray-100 p-6 space-y-6">
          {/* Show error message if query failed */}
          {userError && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    {t('errorLoadingUserData')}
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    {userError.message}
                  </div>
                  <div className="mt-3">
                    <button
                      onClick={handleRefresh}
                      className="text-sm bg-red-100 hover:bg-red-200 px-3 py-1 rounded"
                    >
                    {t('tryAgain')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('firstNameLabel')}
            </label>
            <input
              type="text"
              value={
                isLoading
                  ? t('loading') + '...'
                  : user?.firstName || t('notAvailable')
              }
              readOnly
              className="block w-full px-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 sm:text-sm cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('lastNameLabel')}
            </label>
            <input
              type="text"
              value={
                isLoading
                  ? t('loading') + '...'
                  : user?.lastName || t('notAvailable')
              }
              readOnly
              className="block w-full px-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 sm:text-sm cursor-not-allowed"
            />
          </div>

          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              {t('logoutButton')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
