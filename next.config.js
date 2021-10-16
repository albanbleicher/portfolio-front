const withTM = require("next-transpile-modules")(["react-markdown"]);

module.exports = withTM({
  images: {
    domains: ["res.cloudinary.com"],
    loader: "cloudinary",
    path: "https://res.cloudinary.com/albaaaaan/",
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module

    config.module.rules.push({
      test: /.node$/,
      loader: "node-loader",
    });

    return config;
  },
});
