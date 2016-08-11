const webpack = require('webpack');

const port = process.env.PORT || 8080;

module.exports = {
  entry: [
    `webpack-dev-server/client?http://localhost:${port}`,
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  output: {
    path: `${__dirname}/dist/js`,
    filename: 'app.bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'source-map',
  module: {
    preLoaders: [{ test: /\.js?$/, loaders: ['eslint'] }],
    loaders: [
        { test: /\.less$/, loader: 'style!css!less' },
        { test: /\.js$/,
          loaders: ['react-hot', 'babel'],
          exclude: /node_modules/,
          include: __dirname }
    ]
  }
};
