import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-24">
      <main className="text-center">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl text-gray-600 mb-8">{t('description')}</p>
        <Button>Get Started</Button>
      </main>
    </div>
  );
}
