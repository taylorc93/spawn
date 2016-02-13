var path        = require('path');
var webpack     = require('webpack');
var fs          = require('fs');

module.exports = {
  devtool: 'source-map',
  entry: {
    main: './lib/cli',
  },
  output: {
    path: 'build',
    filename: 'spawn.js',
    libraryTarget: "umd",
    library: 'spawn'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        query: {
          presets: ['es2015', "stage-0", "stage-1"],
          plugins: ['transform-runtime'],
        },
        exclude: /node_modules/
      }
    ]
  },
  node: {
    console: true,
    fs: true,
  }
};