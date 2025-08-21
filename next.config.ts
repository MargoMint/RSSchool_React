import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const config: NextConfig = {
  images: {
    domains: ['raw.githubusercontent.com'],
  },
};

export default withNextIntl(config);
