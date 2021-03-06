module.exports = {
  devtool: "source-map",
  module: {
    rules: [
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      }
    ]
  }
};
