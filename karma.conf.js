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
      'src/components/**/*.spec.ts'
    ],

    exclude: [
    ],

    preprocessors: {
      'src/components/**/*.spec.ts': ['browserify']
    },

    browserify: {
      debug: true,
      plugin: [
        ['tsify']
      ],
      transform: [
        ['babelify']
      ]
    },

    reporters: ['progress', 'growl'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Firefox'],
    singleRun: false,
    concurrency: Infinity
  })
}
