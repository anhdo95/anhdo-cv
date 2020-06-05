const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const merge = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const { resolve } = require('./utils')

module.exports = {
  entry: {
    app: resolve('src/app.js'),
  },

  output: {
    publicPath: "/",
    filename: "[name].js",
  },

  resolve: {
		extensions: ['.js', '.scss', '.sass', '.css', '.html'],
		alias: {
			'@': resolve('src'),
			'img': resolve('public/images'),
    }
  },
  
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ]
  },

  plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin({
    template: resolve('public/index.html'),
  })],
};