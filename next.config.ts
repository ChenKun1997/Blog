import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static exports for GitHub Pages deployment
  output: 'export',

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Configure trailing slash for better compatibility
  trailingSlash: true,

  // Configure base path if deploying to a subdirectory
  // basePath: '/your-repo-name', // Uncomment and update if needed

  // Experimental features
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
