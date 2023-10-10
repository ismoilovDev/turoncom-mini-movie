/** @type {import('next').NextConfig} */
require('dotenv').config()

const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.cinerama.uz',
        port: '',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/movie',
        destination: '/',
        permanent: true,
      },
    ]
  },

}

module.exports = nextConfig
