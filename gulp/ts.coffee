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

c = watchify browserify('./src/app.ts',
  debug: true
  cache: {}
  packageCache: {}
)
c.on 'update', client
  .on 'log', gutil.log
  .plugin tsify

gulp.task 'ts', client

gulp.task 'tsProduction', ->
  browserify './src/app.ts'
    .plugin tsify
    .bundle()
    .on 'error', gutil.log
    .pipe source('app.js')
    .pipe buffer()
    .pipe gulp.dest("#{config.path}/scripts")

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
