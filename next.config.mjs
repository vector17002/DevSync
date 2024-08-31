/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aceternity.com'
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com'
      },
      {
        protocol: 'https',
        hostname: 'getstream.io'
      }
    ],
  },
  env:{
    DATABASE_URL: process.env.DATABASE_URL,
    GET_STREAM_API_KEY: process.env.GET_STREAM_API_KEY,
    GET_STREAM_SECRET: process.env.GET_STREAM_SECRET
  },
};
export default nextConfig;
