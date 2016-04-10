module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['browserify', 'jasmine'],

    files: [
      'src/**/*.spec.js'
    ],

    exclude: [
    ],

    preprocessors: {
      'test/init.js': ['browserify'],
      'src/**/*.spec.js': ['browserify']
    },

    browserify: {
      configure: function(bundle) {
        bundle.once('prebundle', function() {
          bundle.plugin('tsify').transform('babelify')
        })
      },
      debug: true
    },

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity
  })
}
