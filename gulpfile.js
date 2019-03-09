//
// ─── START THE SERVER AND USE THE FUNCTIONS UP TOP ────────────────────$
//
function watch() {
    browserSync.init({
        proxy: "http://localhost:3000",
        port: 7000
    });

    gulp.watch("./public/sass/**/*.scss", style);
    gulp.watch("./public/js/**/*.js", javascript);
    // gulp.watch("./views/**/*.ejs").on('change', browserSync.reload);
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
//
// ─── START THE SERVER AND USE THE FUNCTIONS UP TOP ────────────────────$
//
function watch() {
    browserSync.init({
        proxy: "http://localhost:3000",
        port: 7000
    });

    gulp.watch("./public/sass/**/*.scss", style);
    gulp.watch("./public/js/**/*.js", javascript);
    // gulp.watch("./views/**/*.ejs").on('change', browserSync.reload);
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