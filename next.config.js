module.exports = {
  future: {
    webpack5: false,
  },
  async headers() {
    return [
      {
        // This works, and returns appropriate Response headers:
        source: '/:all*(svg|jpg|png)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            // value: 'public, max-age=180, s-maxage=180, stale-while-revalidate=180',
            value: 'public, max-age=9999999999, must-revalidate',
          },
        ],
      },
    ];
  },
  // webpack: function (config, options) {
  //   config.experiments = {};
  //   return config;
  // },
};
