// /////////////////////////////////////////////////
// Required
// /////////////////////////////////////////////////
var gulp = require("gulp"),
uglify = require("gulp-uglify"),
uglifycss = require('gulp-uglifycss'),
uncss = require('gulp-uncss'),
rename = require("gulp-rename"),
concat = require('gulp-concat'),
order = require('gulp-order'),
sass = require("gulp-sass"),
sourcemaps = require('gulp-sourcemaps'),
del = require('del'),
htmlmin = require('gulp-htmlmin'),
jshint = require('gulp-jshint'),
cleanCSS = require('gulp-clean-css'),
concatCss = require('gulp-concat-css'),
plumber = require("gulp-plumber"),
browserSync = require("browser-sync"),
reload = browserSync.reload;

// /////////////////////////////////////////////////
// Styles Task
// /////////////////////////////////////////////////
gulp.task("styles", function() {
  gulp.src("app/scss/main.scss")
  .pipe(plumber())
  .pipe(sass({
    style: "compressed"
  }))
  .pipe(gulp.dest("app/assets/css"))
  .pipe(reload({
    stream: true
  }));
});

gulp.task("styles-min", ['styles'],function() {
  gulp.src("app/assets/css/*.css")
  .pipe(uglifycss({
    // "maxLineLen": 80,
    "uglyComments": true
  }))
  .pipe(concatCss("main.css"))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest("app/assets/build/css"))
});

// /////////////////////////////////////////////////
// Scripts Task
// /////////////////////////////////////////////////
gulp.task("scripts", function() {
  gulp.src("app/assets/js/*.js")
  .pipe(jshint())
  .pipe(order([
      "jquery.js",
      "jquery.dataTables.js",
      "dataTables.editor.js",
      "dataTables.buttons.js",
      "dataTables.select.js",
      "main.js"
  ]))
  .pipe(concat('main.js'))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(uglify())
  .pipe(jshint.reporter("default"))
  .pipe(gulp.dest('app/assets/build/js/'))
  .pipe(reload({
    stream: true
  }));
});

// /////////////////////////////////////////////////
// HTML Task
// /////////////////////////////////////////////////
gulp.task("html", function() {
  gulp.src("app/**/*.html")
  .pipe(reload({
    stream: true
  }));
});

// /////////////////////////////////////////////////
// Browser-Sync Task
// /////////////////////////////////////////////////
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./app/"
    }
  })
});

// /////////////////////////////////////////////////
// Watch Task
// /////////////////////////////////////////////////
gulp.task("watch", function() {
  gulp.watch("app/js/*.js", ['scripts']);
  gulp.watch("app/scss/**/*.scss", ['styles']);
  gulp.watch("app/**/*.html", ['html']);
});

// /////////////////////////////////////////////////
// Default Task
// /////////////////////////////////////////////////
gulp.task("default", ['styles', 'styles-min', 'scripts', 'watch', 'browser-sync']);
