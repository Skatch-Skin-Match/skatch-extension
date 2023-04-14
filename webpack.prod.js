const { merge } = require("webpack-merge");
const common = require("./webpack/webpack.config.js");

module.exports = merge(common, {
  mode: "production",
});
