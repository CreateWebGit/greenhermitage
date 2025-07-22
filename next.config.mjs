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
  webpack(config, { dev, isServer }) { //remove console logs from prod, could help prevent performance issues a bit.
        if (!dev && !isServer) {
            config.optimization.minimizer.push(
                new (require('terser-webpack-plugin'))({
                    terserOptions: {
                        compress: {
                            drop_console: true,
                        },
                    },
                })
            );
        }

        return config;
    },
};

export default nextConfig;
