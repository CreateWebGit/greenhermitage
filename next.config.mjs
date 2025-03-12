/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["lucide-react"], // add this
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "y95mgrpjv9.ufs.sh",
        pathname: "**",
      },
    ],
  },
  webpack: (config) => {
    config.optimization.minimize = false;
    return config;
  },
};

export default nextConfig;
