const withPlugins = require("next-compose-plugins");
const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const withImages = require("next-images");

const nextConfig = {
  distDir: "build",
  reactDevOverlay: false, // close error prop up web
  webpack: (config, options) => {
    config.module.rules.push({
      vendor: ["xlsx", "file-saver"],
      node: { fs: "empty" },
      externals: [{ "./cptable": "var cptable" }, { "./jszip": "jszip" }],
    });

    return config;
  },
};

module.exports = withPlugins(
  [[withCSS(withSass({}))], [withImages({})]],
  nextConfig
);

// module.exports = {
//   webpack(config, options) {
//     config.resolve.alias = {
//       ...config.resolve.alias,
//       react: "preact/compat",
//       "react-dom": "preact/compat",
//     };
//     return config;
//   },
// };

// module.exports = {
//   webpack: (config, { isServer }) => {
//     // Fixes npm packages that depend on `fs` module
//     if (!isServer) {
//       config.node = {
//         fs: 'empty'
//       }
//     }

//     return config
//   }
// }
