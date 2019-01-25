const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common");

const port = process.env.PORT || 8080;

module.exports = merge(
  {
    mode: "development",
    entry: [
      `webpack-dev-server/client?http://localhost:${port}`,
      "webpack/hot/only-dev-server",
      "./src/index.js"
    ],
    plugins: [new webpack.HotModuleReplacementPlugin()]
  },
  common
);
