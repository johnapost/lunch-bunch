babelify = require 'babelify'
browserify = require 'browserify'
browserSync = require 'browser-sync'
buffer = require 'vinyl-buffer'
config = require './config.coffee'
gulp = require 'gulp'
gutil = require 'gulp-util'
source = require 'vinyl-source-stream'
tsify = require 'tsify'
watchify = require 'watchify'

bundle = ->
  b.bundle()
    .pipe source('app.js')
    .pipe buffer()
    .pipe gulp.dest("#{config.path}/scripts")
    .pipe browserSync.stream(once: true)

gulp.task 'ts', bundle

b = watchify browserify('./src/app.ts', debug: true)
b.on 'update', bundle
  .on 'log', gutil.log
  .plugin tsify
  .transform babelify

gulp.task 'tslint', ->
  gulp.src ['src/**/*.ts']
    .pipe lint(configuration: require('./tslint.json'))
    .pipe lint.report 'verbose'
