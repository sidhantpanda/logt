/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const package = require('./package.json');

module.exports = {
  entry: './src/web.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.webpack.json'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(
      `logt v${package.version}\nSidhant Panda\nhttps://bit.ly/2njty0V\n`
    ),
    new HtmlWebpackPlugin({
      template: './assets/test-page.html'
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'logt.min.js',
    path: path.resolve(__dirname, 'dist')
  }
};
