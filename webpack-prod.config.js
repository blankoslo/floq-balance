const webpack = require('webpack');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: `${__dirname}/dist/js`,
    filename: 'app.bundle.js'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
        { test: /\.less$/, loader: 'style!css!less' },
        { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/, include: __dirname }
    ]
  }
};
