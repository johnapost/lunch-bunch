gulp = require 'gulp'
browserSync = require 'browser-sync'
config = require './config.coffee'

gulp.task 'serve', ['sass'], ->
  browserSync
    server: {baseDir: config.path}
    port: 4000
    open: false
    reloadOnRestart: false
    ghostMode: true
    notify: false

  gulp.watch 'src/**/*.scss', ['sass', 'scssLint']
  # gulp.watch 'src/**/*.coffee', ['coffee', browserSync.reload]
  gulp.watch 'src/**/*.jade', ['jade', browserSync.reload]

module.exports = gulp
