babelify = require 'babelify'
browserify = require 'browserify'
browserSync = require 'browser-sync'
buffer = require 'vinyl-buffer'
config = require './config.coffee'
gulp = require 'gulp'
gutil = require 'gulp-util'
source = require 'vinyl-source-stream'
tsify = require 'tsify'
tslint = require 'gulp-tslint'
watchify = require 'watchify'

dev = ->
  d =
    watchify browserify('./src/app.ts', debug: true)
    .on 'update', dev
    .on 'log', gutil.log
    .plugin tsify
    .transform babelify

  d.bundle()
    .pipe source('app.js')
    .pipe buffer()
    .pipe gulp.dest("#{config.path}/scripts")
    .pipe browserSync.stream(once: true)

prod = ->
  p = browserify('./src/app.ts', debug: true)
    .plugin tsify
    .transform babelify

  p.bundle()
    .pipe source('app.js')
    .pipe buffer()
    .pipe gulp.dest("#{config.path}/scripts")

gulp.task 'ts', dev
gulp.task 'tsProduction', prod

gulp.task 'tslint', ->
  gulp.src ['src/**/*.ts']
    .pipe tslint(configuration: require('../tslint.json'))
    .pipe tslint.report 'verbose'
