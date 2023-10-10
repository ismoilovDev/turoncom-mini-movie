/** @type {import('next').NextConfig} */

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
