const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyPlugin = require('copy-webpack-plugin');

const { resolve } = require('./utils')

module.exports = {
  entry: {
    app: resolve("src/app.js"),
  },

  output: {
    publicPath: "/",
    filename: "[name].js",
  },

  resolve: {
    extensions: [".js", ".scss", ".sass", ".css", ".html"],
    alias: {
      "@": resolve("src"),
      img: resolve("public/images"),
      svg: resolve("public/svgs"),
      file: resolve("public/files"),
    },
  },

  module: {
    rules: [
      {
        test: /\.html$/i,
        exclude: /node_modules/,
        loader: "html-loader",
        options: {
          attributes: {
            list: [
              {
                attribute: "src",
                type: "src",
              },
              {
                attribute: "srcset",
                type: "srcset",
              },
              {
                attribute: "href",
                type: "src",
              },
              {
                tag: "use",
                attribute: "xlink:href",
                // Type of processing, can be `src` or `scrset`
                type: "src",
              },
            ],
          },
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: resolve('public/static'), to: resolve('dist/static') },
        { from: resolve('public/sw.js') },
        { from: resolve('public/manifest.json') },
      ],
    }),
    new HtmlWebpackPlugin({
      template: resolve("public/index.html"),
    }),
  ],
};