const { merge } = require('webpack-merge');
const commmonConfig = require('./webpack.common');

module.exports = merge(commmonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    port: 3000,
  },
});
