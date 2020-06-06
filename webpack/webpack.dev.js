const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const merge = require("webpack-merge")

const webpackCore = require('./webpack.core')

const { resolve } = require('./utils')

module.exports = merge(webpackCore, {
  devServer: {
    stats: "errors-only",
    host: process.env.HOST, // Defaults to `localhost`
    port: process.env.PORT, // Defaults to 8080
    open: false,
    overlay: true,

    watchOptions: {
      // Delay the rebuild after the first change
      aggregateTimeout: 300,
      // Poll using interval (in ms, accepts boolean too)
      poll: 1000,      
    }
  },

  devtool: 'eval-source-map',

  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        exclude: /node_modules/,
        use: [
          'style-loader', 
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 15000,
          }
        }
      },
      {
        test: /\.pdf$/,
        exclude: /node_modules/,
        use: 'file-loader'
      },
    ]
  },
})