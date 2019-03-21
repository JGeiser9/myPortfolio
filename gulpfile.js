const gulp = require("gulp"),
	sass = require("gulp-sass"),
	del = require("del"),
	uglify = require("gulp-uglify-es").default,
	htmlmin = require("gulp-htmlmin"),
	stripComments = require("gulp-strip-css-comments"),
	stripHTMLComments = require("gulp-htmlclean"),
	imagemin = require("gulp-imagemin"),
	pipeline = require("readable-stream").pipeline,
	browserSync = require("browser-sync").create();

//Create a static server
gulp.task("serve", function() {
	browserSync.init({
		browser: "google chrome",
		server: {
			baseDir: "./build/",
		}
	});
});

// Compile sass into CSS & auto-inject into browsers
gulp.task("sass", function() {
	return pipeline(
		gulp.src("./src/sass/*.scss"),
		// Compile sass to css and minify
		sass({outputStyle: "compressed"}),
		// Strip all comments
		stripComments(),
		gulp.dest("./build/css"),
		browserSync.stream()
	);
});

// Compile JS files into build folder
gulp.task("js", function() {
	return pipeline(
		gulp.src("./src/js/*.js"),
		// Strip all comments
		stripComments(),
		// Compress JS files
		uglify(),
		gulp.dest("./build/js")
	);
});

// Compile HTML files into build folder
gulp.task("html", function() {
	return pipeline(
		gulp.src("./src/**/*.html"),
		// Strip all comments
		stripHTMLComments(),
		// Minify HTML files
		htmlmin({collapseWhiteSpace: true}),
		gulp.dest("./build/")
	);
});

// Compile IMG files into build folder
gulp.task("img", function() {
	return pipeline(
		gulp.src("./src/images/*"),
		// Minify images
		imagemin(),
		gulp.dest("./build/images")
	);
});

// Compile HTML files into build folder
gulp.task("misc", function() {
	return pipeline(
		gulp.src("./src/misc/*"),
		gulp.dest("./build/")
	);
});

// Watch for changes in files / live reload
gulp.task("watch", function() {
	// Watch files for changes and reload the browser
	gulp.watch("./src/sass/*.scss", gulp.series("sass")).on("change", browserSync.reload);
	gulp.watch("./src/js/*.js", gulp.series("js")).on("change", browserSync.reload);
	gulp.watch("./src/**/*.html", gulp.series("html")).on("change", browserSync.reload);
	gulp.watch("./src/images/*", gulp.series("img")).on("change", browserSync.reload);
});

gulp.task("clean", function() {
	// Delete old files in build folder every fresh build.
	return del(["./build"]);
});

// Default task to run on 'npm start'
gulp.task("build", gulp.parallel("sass", "js", "html", "img", "misc"));
gulp.task("prod", gulp.series("clean", "build"));
gulp.task("default", gulp.series("clean", "build", gulp.parallel("watch", "serve")));
