istanbul = require('browserify-istanbul')

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['browserify', 'jasmine'],

    files: [
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/velocity-animate/velocity.min.js',
      'node_modules/velocity-animate/velocity.ui.min.js',
      'node_modules/es6-shim/es6-shim.js',
      'node_modules/hammerjs/hammer.min.js',
      'temp/components/**/*.js'
    ],

    exclude: [
    ],

    preprocessors: {
      'temp/components/**/*.js': ['browserify']
    },

    browserify: {
      debug: true,
      transform: [
        istanbul
      ]
    },

    coverageReporter: {
      type: 'json',
      dir: 'temp',
      subdir: function(browser) {
        return browser.toLowerCase().split(/[ /-]/)[0]
      }
    },

    reporters: ['progress', 'coverage', 'growl'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Firefox'],
    singleRun: true,
    concurrency: Infinity
  })
}
