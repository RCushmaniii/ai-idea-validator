import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable Turbopack explicitly for Windows stability
  experimental: {
    // Turbopack is opt-in via --turbopack flag only
  },
};

export default nextConfig;
