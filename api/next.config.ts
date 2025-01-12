import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  crossOrigin: "anonymous",
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/images/**/*',
        search: '',
      },
    ],
  },
};

export default nextConfig;
