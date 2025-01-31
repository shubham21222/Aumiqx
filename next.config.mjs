/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows all external image domains
      },
    ],
  }, 
  webpack(config) {
    config.optimization.minimize = false;
    return config;
  },
};

export default nextConfig;
