cached = require 'gulp-cached'
changed = require 'gulp-changed'
chmod = require 'gulp-chmod'
config = require './config.coffee'
debug = require 'gulp-debug'
filter = require 'gulp-filter'
gulp = require 'gulp'
gulpif = require 'gulp-if'
inheritance = require 'gulp-jade-inheritance'
jade = require 'gulp-jade'
notify = require 'gulp-notify'
plumber = require 'gulp-plumber'
rename = require 'gulp-rename'

errorAlert = (error) ->
  notify.onError(
    title: 'Jade Error'
    message: 'Check your terminal!'
  )(error)
  console.log error.toString()
  @.emit 'end'

gulp.task 'jade', ->
  gulp.src 'src/**/*.jade'
    .pipe plumber errorHandler: errorAlert
    .pipe changed(config.path, extension: '.html')

    .pipe cached('jade')
    .pipe gulpif(
      config.watching,
      inheritance(basedir: 'src')
    )
    .pipe debug(title: 'changed')

    .pipe jade()
    .pipe chmod(755)

    .pipe rename (file) ->
      file.dirname = file.dirname.replace('views', '')
    .pipe gulp.dest(config.path)

module.exports = gulp
