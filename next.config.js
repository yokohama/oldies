/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  webpack: (config) => {
    // Disable webpack caching to prevent ENOENT errors
    config.cache = false;
    return config;
  },
}

module.exports = nextConfig