module.exports = {
  images: {
    domains: ['github.com', 'sm.ms']
  },
  future: {
    webpack5: true
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false
    };

    return config;
  }
};
