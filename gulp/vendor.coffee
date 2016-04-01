concat = require 'gulp-concat'
config = require './config.coffee'
gulp = require 'gulp'
newer = require 'gulp-newer'
uglify = require 'gulp-uglify'

# Move vendor files
gulp.task 'vendor', ->
  gulp.src [
    'node_modules/angular2/bundles/angular2-polyfills.js'
    'node_modules/jquery/dist/jquery.min.js'
    'node_modules/velocity-animate/velocity.min.js'
    'node_modules/velocity-animate/velocity.ui.min.js'
    'node_modules/es6-shim/es6-shim.js'
    'node_modules/hammerjs/hammer.min.js'
  ]
  .pipe newer(config.path + '/scripts')
  .pipe uglify()
  .pipe concat('vendor.js')
  .pipe gulp.dest(config.path + '/scripts')
