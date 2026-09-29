const path = require('path');

const { merge } = require('webpack-merge');

const commonConfiguration = require('./webpack.common.config.js');

module.exports = merge(commonConfiguration, {
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    },
    static: {
      directory: path.resolve(__dirname, '../dist')
    },
    hot: true,
    port: 8080,
    host: 'localhost',
    proxy: [
      {
        context: ['/api'],
        target: 'http://185.76.104.110:8080',
        secure: false,
        changeOrigin: true
      }
    ],
    historyApiFallback: true,
    compress: true
  }
});
