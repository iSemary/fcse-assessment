import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  assetPrefix: '',
  basePath: '',
  output: 'standalone'
};

export default withNextIntl(nextConfig);