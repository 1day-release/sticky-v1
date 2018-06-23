    //.sass('resources/assets/sass/app.scss', 'public/css')
    //.browserify('resources/assets/js/app.js', 'public/js')
var gulp = require('gulp');
var connect = require('gulp-connect-php');
var notify = require("gulp-notify");
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var combineMq = require('gulp-combine-mq');
var browserify = require('gulp-browserify');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');


gulp.task('connect-sync', function() {
  connect.server({
    port:8001,
    base:'public'
  }, function (){
    browserSync({
      proxy: 'localhost:8001'
    });
  });
});

gulp.task('build', function(){
  gulp.src('./resources/assets/sass/app.scss')
  .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
  .pipe(sass())
  .pipe(combineMq())
  .pipe(autoprefixer({
    browsers: ['last 1 version', 'iOS >= 8.1', 'Android >= 4.4'],
    cascade: false
  }))
  .pipe(gulp.dest('public/css'));

  gulp.src('./resources/assets/sass/top.scss')
  .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
  .pipe(sass())
  .pipe(combineMq())
  .pipe(autoprefixer({
    browsers: ['last 1 version', 'iOS >= 8.1', 'Android >= 4.4'],
    cascade: false
  }))
  .pipe(gulp.dest('public/css'));

  gulp.src('./resources/assets/js/app.js')
  .pipe(browserify())
  .pipe(gulp.dest('public/js'));

  browserSync.reload();
});

gulp.task("default",['build', 'connect-sync'], function() {
  gulp.watch(['./app/**', './resources/**', './routes/**'], ['build']);
});
