const nextConfig = {
  compress: true,
  poweredByHeader: false,
  generateEtags: false,

  images: {
    formats: ["image/webp", "image/avif"],
  },

  output: "standalone",

  // REMOVE THIS — it breaks SSR
  // experimental: {
  //   optimizePackageImports: ["lucide-react", "@radix-ui/react-*"],
  // },

  transpilePackages: ["lucide-react", "@radix-ui"],

  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    return config;
  },

  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
