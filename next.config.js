/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_GA_ID: 'G-9TEKB5BMBM',
  },
  // Enable analytics in production
  experimental: {
    instrumentationHook: true,
  },
}

module.exports = nextConfig
