const withTM = require("next-transpile-modules")(["react-markdown"]);
const { withPlaiceholder } = require("@plaiceholder/next");

module.exports = withPlaiceholder(
  withTM({
    images: {
      domains: ["res.cloudinary.com"],
    },
    webpack: (config, { isServer }) => {
      // Fixes npm packages that depend on `fs` module

      config.module.rules.push({
        test: /.node$/,
        loader: "node-loader",
      });

      return config;
    },
  })
);
