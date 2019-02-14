const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

//Create a static server
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: {
            baseDir: "./src/"
        }
    });

    gulp.watch("./src/public/sass/*.scss", ['sass']).on('change', browserSync.reload);
    gulp.watch("./src/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./src/public/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./src/public/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
