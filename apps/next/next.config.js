/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    relay: require('./relay.config'),
  },
  experimental: {
    externalDir: true,
    concurrentFeatures: true,
  },
};

module.exports = nextConfig;
