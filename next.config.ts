import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io', // microCMSの画像ホスト名を許可
      },
    ],
  },

};

export default nextConfig;
