import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
  
  // Suppress hydration warnings for development
  reactStrictMode: true,
  
  // Configure experimental features to help with hydration
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
