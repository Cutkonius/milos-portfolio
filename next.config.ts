import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1280, 1600, 1920, 2048, 2560, 2880, 3840],
    qualities: [75, 82],
  },
};

export default nextConfig;
