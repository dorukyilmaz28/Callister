/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  async redirects() {
    return [
      {
        source: '/losev-callister',
        destination: '/bagis-callister',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig; 