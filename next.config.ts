import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  assetPrefix: '',
  basePath: '',
  output: 'standalone',
};

export default withNextIntl(nextConfig);
