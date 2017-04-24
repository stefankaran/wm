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
plumber = require("gulp-plumber"),
browserSync = require("browser-sync"),
reload = browserSync.reload;

// /////////////////////////////////////////////////
// Styles Task
// /////////////////////////////////////////////////
gulp.task("styles", function() {
  gulp.src("app/scss/main.scss")
  .pipe(sourcemaps.init())
  .pipe(plumber())
  .pipe(sass({
    style: "compressed"
  }))
  // .pipe(cleanCSS({compatibility: 'ie8'})) // Minify css
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(uglifycss({
    // "maxLineLen": 80,
    "uglyComments": true
  }))
  .pipe(uncss({
    html: ['app/*.html']
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest("app/assets/css/"))
  .pipe(reload({
    stream: true
  }));
});

// /////////////////////////////////////////////////
// Scripts Task
// /////////////////////////////////////////////////
gulp.task("scripts", function() {
  gulp.src("app/js/*.js")
  .pipe(sourcemaps.init())
  .pipe(jshint())
  // .pipe(order([
  //     "app/js/jquery.min.js",
  // ]))
  .pipe(concat('main.js'))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(uglify())
  .pipe(jshint.reporter("default"))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('app/assets/js/'))
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
// BUILD Task *************************************
// /////////////////////////////////////////////////
// Browser-Sync Task/Build
gulp.task('build:server', function() {
  browserSync({
    server: {
      baseDir: "./build/"
    }
  })
});

// clear out all files and folders from build folder
gulp.task('build:cleanfolder', function(cb) {
  return del([
    'build/**'
  ], cb);
});

//task to create build directory for all files
gulp.task('build:copy', ['build:cleanfolder'], function() {
  return gulp.src('app/**/*/')
  .pipe(gulp.dest('build/'));
});

//task to remove unwanted build files
//list all files and directories here that don't wont to include
gulp.task('build:remove', ['build:copy'], function(cb) {
  del([
     'build/scss/',
     'build/js/',
  ], cb);
});

// /////////////////////////////////////////////////
// HTML Minify
// /////////////////////////////////////////////////
gulp.task('htmlmin', ['build:copy'], function() {
  return gulp.src('app/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build/'))
});

// /////////////////////////////////////////////////
// Default Task
// /////////////////////////////////////////////////
gulp.task("default", ['styles', 'scripts', 'watch', 'browser-sync']);
gulp.task('build', ['build:copy', 'build:remove', 'build:server', 'htmlmin']);
