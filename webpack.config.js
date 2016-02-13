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
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      '__DEV__': true
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'utils': path.resolve(__dirname, 'lib', 'utils')
    }
  },
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        query: {
          presets: ['es2015', "stage-0"],
          plugins: ['transform-runtime']
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