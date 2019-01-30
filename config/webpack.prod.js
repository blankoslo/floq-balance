const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");

module.exports = merge(
  {
    mode: "production",
    entry: ["./src/index.js"],
    output: {
      path: path.resolve(__dirname, "../dist/js"),
      filename: "app.bundle.js"
    },
    optimization: {
      minimize: true
    }
  },
  common
);
