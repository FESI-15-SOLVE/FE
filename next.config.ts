import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
        pathname: '/together-dallaem/**',
      },
      {
        protocol: 'http',
        hostname: '*.kakaocdn.net',
      },
      {
        protocol: 'https',
        hostname: '*.kakaocdn.net',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  experimental: {},
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: { icon: true, typescript: true, ext: 'tsx' },
          },
        ],
        as: '*.js',
        condition: {
          path: /assets\/icons\//,
        },
      },
    },
  },

  webpack: (config) => {
    // @ts-expect-error 타입 에러 무시
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
              typescript: true,
              ext: 'tsx',
            },
          },
        ],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have handled it above.

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
