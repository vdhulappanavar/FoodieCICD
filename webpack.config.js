const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

// config.resolve.alias = {
//   '$': path.resolve(__dirname, 'node_modules/jquery/dist/jquery.js'),
//   'jquery': path.resolve(__dirname, 'node_modules/jquery/dist/jquery.js')
// };

module.exports = {
    entry: './client/src/index.js',
    // mode: 'development',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
      devServer: {
        filename: 'bundle.js',
        contentBase: path.join(__dirname, 'dist'),
        watchContentBase: true
      },
      plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
      template: './index.html'
      })
      ]
    };
