/* eslint-env node */

// https://github.com/vercel/next.js/blob/master/packages/next/next-server/server/config.ts
/* eslint-env node */

const nextConfig = {
  output: 'export',
  trailingSlash: true,

  webpack: config => {
    const oneOfRule = config.module.rules.find(rule => rule.oneOf);

    const tsRules = oneOfRule.oneOf.filter(rule =>
      rule.test && rule.test.toString().includes('tsx|ts')
    );

    tsRules.forEach(rule => {
      rule.include = undefined;
    });

    return config;
  },

  compress: true,
  generateEtags: true,
  pageExtensions: ['tsx', 'mdx', 'ts'],
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  swcMinify: true,

  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'source.unsplash.com' },
    ],
  },
};

module.exports = nextConfig;
