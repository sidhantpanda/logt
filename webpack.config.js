const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const package = require('./package.json');

module.exports = {
  mode: 'production',
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'LogT - A logging library'
    }),
    new webpack.BannerPlugin(
      `logt v${package.version}\nSidhant Panda\nhttps://bit.ly/2njty0V\n`
    )
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'logt.min.js',
    path: path.resolve(__dirname, 'dist')
  }
};
