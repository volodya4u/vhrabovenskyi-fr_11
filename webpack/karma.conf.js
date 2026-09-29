const commonConfiguration = require('./webpack.common.config');

module.exports = function configureKarma(config) {
  config.set({
    basePath: '../',
    frameworks: ['jasmine'],
    files: ['src/**/*.spec.js'],
    preprocessors: {
      'src/**/*.spec.js': ['webpack']
    },
    browsers: ['ChromeHeadless'],
    reporters: ['progress'],
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: commonConfiguration.module,
      resolve: commonConfiguration.resolve
    },
    client: {
      clearContext: false
    }
  });
};
