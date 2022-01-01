module.exports = {
  images: {
    domains: ['cdn.pixabay.com']
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
