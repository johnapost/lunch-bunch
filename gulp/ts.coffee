babelify = require 'babelify'
browserify = require 'browserify'
browserSync = require 'browser-sync'
buffer = require 'vinyl-buffer'
config = require './config.coffee'
gulp = require 'gulp'
gutil = require 'gulp-util'
source = require 'vinyl-source-stream'
ts = require 'gulp-typescript'
tsify = require 'tsify'
tslint = require 'gulp-tslint'
watchify = require 'watchify'

client = ->
  c.bundle()
    .pipe source('app.js')
    .pipe buffer()
    .pipe gulp.dest("#{config.path}/scripts")
    .pipe browserSync.stream(once: true)

clientProd = ->
  p.bundle()
    .pipe source('app.js')
    .pipe buffer()
    .pipe gulp.dest("#{config.path}/scripts")

c = watchify browserify('./src/app.ts', debug: true)
c.on 'update', client
  .on 'log', gutil.log
  .plugin tsify
  .transform babelify

p = browserify './src/app.ts'
p.plugin tsify
  .transform babelify

gulp.task 'ts', client
gulp.task 'tsProduction', clientProd

gulp.task 'tsTranspileServer', ->
  gulp.src('./server/**/*.ts')
    .pipe ts(
      module: 'commonjs'
      moduleResolution: 'node'
      noImplicitAny: false,
      removeComments: true,
      target: 'es5'
    )
    .pipe gulp.dest("#{config.serverPath}")

gulp.task 'tsLint', ->
  gulp.src ['src/**/*.ts', 'server/**/*.ts']
    .pipe tslint(configuration: require('../tslint.json'))
    .pipe tslint.report 'verbose'
