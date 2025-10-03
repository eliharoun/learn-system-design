/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Environment variables
  env: {
    NEXT_PUBLIC_GA_ID: 'G-9TEKB5BMBM',
  },
  
  // Disable output file tracing to prevent stack overflow with large asset count
  outputFileTracing: false,
  
  // Performance optimizations
  experimental: {
    webpackBuildWorker: true, // Enable webpack build worker
    outputFileTracingExcludes: {
      '*': [
        'public/diagrams/**/*',
        'node_modules/@swc/core-linux-x64-gnu',
        'node_modules/@swc/core-linux-x64-musl',
        'node_modules/@esbuild/linux-x64',
      ],
    },
  },
  
  // Image optimization
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  
  // Compression
  compress: true,
  
  // Headers for caching
  async headers() {
    return [
      {
        source: '/diagrams/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20,
          },
          // Common chunk
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
          // Category-based chunks
          fundamentals: {
            name: 'fundamentals',
            test: /categories\/fundamentals/,
            chunks: 'all',
            priority: 30,
          },
          databases: {
            name: 'databases',
            test: /categories\/databases/,
            chunks: 'all',
            priority: 30,
          },
          architecture: {
            name: 'architecture',
            test: /categories\/architecture/,
            chunks: 'all',
            priority: 30,
          },
        },
      };
    }
    
    return config;
  },
}

module.exports = nextConfig
