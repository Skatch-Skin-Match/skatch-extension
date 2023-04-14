/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: "./",
  pageExtensions: ["page.tsx", "page.ts"],
  images: {
    domains: ["dbhi1tjv7opms.cloudfront.net"],
    minimumCacheTTL: 3600,
    unoptimized: true,
  },
};
