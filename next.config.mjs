/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aceternity.com'
      },
    ],
  },
  env:{
    DATABASE_URL: process.env.DATABASE_URL
  }
};

export default nextConfig;
