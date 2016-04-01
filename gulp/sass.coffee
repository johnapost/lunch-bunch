browserSync = require 'browser-sync'
cached = require 'gulp-cached'
chmod = require 'gulp-chmod'
config = require './config.coffee'
csso = require 'gulp-csso'
filter = require 'gulp-filter'
gulp = require 'gulp'
notify = require 'gulp-notify'
plumber = require 'gulp-plumber'
prefix = require 'gulp-autoprefixer'
rename = require 'gulp-rename'
sass = require 'gulp-sass'
scssLint = require 'gulp-scss-lint'
sourcemaps = require 'gulp-sourcemaps'

errorAlert = (error) ->
  notify.onError(
    title: 'SASS Error'
    message: 'Check your terminal!'
  )(error)
  console.log error.toString()
  @.emit 'end'

masterPath = 'src/app.scss'

gulp.task 'sass', ->
  master = gulp.src masterPath
    .pipe plumber errorHandler: errorAlert
    .pipe sourcemaps.init()

    .pipe sass(style: 'expanded')
    .pipe prefix(browsers: ['> 1%', 'last 2 versions', 'ff ESR', 'ie >= 11'])
    .pipe csso()
    .pipe rename('styles.css')
    .pipe chmod(755)

    .pipe sourcemaps.write()
    .pipe gulp.dest("#{config.path}/styles")
    .pipe filter('**/*.css')
    .pipe browserSync.reload(stream: true)

gulp.task 'sassComponents', ->
  gulp.src 'src/components/**/*.scss'
    .pipe plumber errorHandler: errorAlert

    .pipe sass(style: 'expanded')
    .pipe prefix(browsers: ['> 1%', 'last 2 versions', 'ff ESR', 'ie >= 11'])
    .pipe csso()
    .pipe chmod(755)

    .pipe gulp.dest("#{config.path}/components")
    .pipe filter('**/*.css')
    .pipe browserSync.reload(stream: true)

gulp.task 'scssLint', ->
  gulp.src 'src/**/*.scss'
    .pipe cached 'scssLint'
    .pipe scssLint()
