import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from any https source for workplace avatars
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
