const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: './src/index.js',

  module: {
    rules: [
      {
        test: /\.(png|svg|jpeg|jpg|gif|webp)$/i,
        type: 'asset/resource',
      },
    ],
  },

  output: {
    assetModuleFilename: '[name][ext]',
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Get the latest weather in your location',
      template: './src/template.html',
    }),
    new Dotenv({
      systemvars: true,
    }),
  ],
}
