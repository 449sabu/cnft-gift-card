/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  plugins: {
    '@pandacss/dev/postcss': {},
  },
  webpack: function (config, options) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  },
}

module.exports = nextConfig
