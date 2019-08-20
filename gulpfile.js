const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const minCss = require("gulp-clean-css");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const uglify = require('gulp-uglify');

// const nodemon = require('gulp-nodemon');

//
// ─── SCSS TO CSS AND MINIFY ────────────────────────────────────────────────────────────────
// 
function style() {
  return gulp
    .src("./public/scss/*.scss")
    .pipe(sass())
    .pipe(minCss())
    .pipe(gulp.dest("./public/css"))
    .pipe(browserSync.stream());
}

//
// ─── ES6 TO ES5 AND UGLIFY ──────────────────────────────────────────────────────
//
function javascript() {
  return gulp
    .src("./public/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./public/javascript"));
     
}


//
// ─── START THE SERVER AND USE THE FUNCTIONS UP TOP ──────────────────────────────
//    
function watch() {
  browserSync.init({
    proxy: "http://localhost:3000",
    port: 7000
  });

  gulp.watch("./public/scss/**/*.scss", style);
  gulp.watch("./public/js/**/*.js", javascript);
  gulp.watch("views/**/*.ejs").on('change', browserSync.reload);
}



//exports
exports.style = style;
exports.javascript = javascript;
exports.watch = watch;

/*
function styleWithOutMin() {
    return gulp.src("./public/sass/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./public/css"));
}
*/
