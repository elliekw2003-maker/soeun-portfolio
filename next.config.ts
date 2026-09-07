import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90, 95],
    // Permit content revisions on project screenshots to invalidate old optimizations.
    localPatterns: [{ pathname: "/projects/**" }],
  },
};

export default nextConfig;
