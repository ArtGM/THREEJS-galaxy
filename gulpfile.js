const gulp = require('gulp')
const babelify = require('babelify')
const browserify = require('browserify')
const browserSync = require('browser-sync')
const source = require('vinyl-source-stream')

gulp.task('js', function () {
  return browserify({
    entries: [ './src/app.js' ]
  })
    .transform(
      babelify.configure({
        presets: [ '@babel/preset-env' ]
      })
    )
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('./'))
})

gulp.task('watch', function () {
  browserSync.init({
    server: './'
  })

  gulp.watch('./src/components/*.js', gulp.series('js'))
  gulp.watch('./*.js').on('change', browserSync.reload)
})
