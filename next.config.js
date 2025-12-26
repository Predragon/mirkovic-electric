/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.mirkovicelectric.com',
      },
    ],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    // Expose Cloudflare Pages branch during build
    CF_PAGES_BRANCH: process.env.CF_PAGES_BRANCH || 'main',
  },
}

module.exports = nextConfig
