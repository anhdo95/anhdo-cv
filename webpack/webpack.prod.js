const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const merge = require("webpack-merge")
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

const webpackCore = require('./webpack.core')

const { resolve } = require('./utils')

module.exports = merge(webpackCore, {
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
            // options: {
            //   publicPath: (resourcePath, context) => {
            //     console.log('resourcePath', resourcePath)
            //     console.log('context', context)
            //     // publicPath is the relative path of the resource to the context
            //     // publicPath is the relative path of the resource to the context
            //     // e.g. for ./css/admin/main.css the publicPath will be ../../
            //     // while for ./css/main.css the publicPath will be ../
            //     return path.relative(path.dirname(resourcePath), context) + '/';
            //   },
            // },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')()]
            }
          }, 
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'images/[name][hash].[ext]'
          }
        }
      },
    ]
  },

  plugins: [
    new MiniCSSExtractPlugin({
      filename: 'styles/[contenthash].css',
    })
  ]
})