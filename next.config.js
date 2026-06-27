/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  serverExternalPackages: ['pdf-parse'],
}
module.exports = nextConfig
