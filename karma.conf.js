module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['browserify', 'jasmine'],

    files: [
      'src/**/*.ts'
    ],

    exclude: [
    ],

    preprocessors: {
      'src/**/*.ts': ['browserify']
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
