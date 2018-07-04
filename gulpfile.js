const es = require('event-stream');
const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const minify = require('gulp-minify');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const nodemon = require('gulp-nodemon');
const notifier = require('node-notifier');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('gulp-browserify');
const browserSync = require('browser-sync').create();

gulp.task('scripts', () => {
    gulp.src('public/src/js/**/*.js')
   .pipe(browserify().on('error', (err) => {
      notifier.notify({

        'title': 'Compile Error',
        'message': err.message

      })
    }))
   .pipe(gulp.dest('public/dist/js'))
});

gulp.task('browser-sync', ['nodemon'], () => {
  browserSync.init(null, {

    proxy: "http://localhost:5000",
    port: 7000,
    open: false

  });
});

gulp.task('sass', () => {

   var styles = gulp.src('public/static/scss/app.scss')
                   .pipe(sass().on('error', sass.logError))
                   .pipe(concat('style.min.css'))
                   .pipe(minify())
                   .pipe(gulp.dest('public/static/dist/css'));

   return es.concat(styles);
});

gulp.task('nodemon', (cb) => {

  var started = false;

  return nodemon({

    script: 'index.js',
    ext: 'html'

  }).on('start',  () => {
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task('default', ['browser-sync', 'sass', 'scripts'], function () {

  gulp.watch("public/src/scss/*.*", ['sass']);
  gulp.watch("public/src/js/**/*.*", ['scripts']);

});
