// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const path = require('path')
const isDocker = require('is-docker')()

module.exports = function (config) {
  config.set({
    basePath: '',
    preprocessors: {
      'test/services/index.spec.js': ['webpack'],
      'test/widgets/index.spec.js': ['webpack'],
    },
    files: [
      { pattern: 'test/services/index.spec.js', type: 'module', included: true },
      { pattern: 'test/widgets/index.spec.js', type: 'module', included: true }
    ],
    frameworks: ['mocha', 'chai'],
    plugins: [
      require('karma-mocha'),
      require('karma-chai'),
      require('karma-chrome-launcher'),
      require('karma-webpack'),
      require('karma-coverage-istanbul-reporter'),
    ],
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            enforce: 'post',
            exclude: /(node_modules|index\.js|\.spec\.js)$/,
            include: path.resolve('src/'),
            test: /\.js$/,
            use: {
              loader: 'istanbul-instrumenter-loader',
              options: { esModules: true }
            },
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.svg$/,
            use: ['svg-url-loader']
          },

        ]
      },
    },
    webpackMiddleware: {
      noInfo: true
    },
    coverageIstanbulReporter: {
      reports: ['text-summary', 'lcovonly', 'html'],
      fixWebpackSourcePaths: true,
      combineBrowserReports: true
    },
    concurrency: Infinity,
    reporters: ['progress', 'coverage-istanbul'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      ChromeCustom: {
        base: 'ChromeHeadless',
        flags: isDocker ? ['--no-sandbox'] : []
      }
    },
    singleRun: true
  })
}
