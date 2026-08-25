/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          "**/.git/**",
          "**/.next/**",
          "**/node_modules/**",
          "C:/*.sys",
          "C:/*.tmp",
          "C:/pagefile.sys",
          "C:/hiberfil.sys",
          "C:/swapfile.sys",
          "C:/DumpStack.log.tmp",
          "**/C:/**",
        ],
      };
    }
    return config;
  },
};

export default nextConfig;
