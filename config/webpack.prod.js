const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(
  {
    mode: "production",
    entry: ["./src/index.js"],
    optimization: {
      minimize: true
    }
  },
  common
);
