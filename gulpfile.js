const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");

function generateStyles() {
    return gulp.src("./src/styles/*.scss")
        .pipe(sass({
            outputStyle: "compressed",
        }))
        .pipe(gulp.dest("./dist/css"));
}

function compressImages() {
    return gulp.src("./src/images/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("./dist/images"));
}

function compressScripts() {
    return gulp.src("./src/scripts/**/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js"));
}

exports.default = gulp.parallel(generateStyles, compressImages, compressScripts);
exports.watch = function() {
    gulp.watch("./src/styles/*.scss", gulp.parallel(generateStyles));
    gulp.watch("./src/scripts/*.scss", gulp.parallel(compressScripts));
}