/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lecture-1.vercel.app",
      "search.pstatic.net",
      "yeyak.seoul.go.kr",
    ],
  },
};

module.exports = nextConfig;
