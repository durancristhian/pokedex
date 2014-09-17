var gulp = require("gulp"),
	connect = require("gulp-connect"),
	stylus = require("gulp-stylus"),
	autoprefixer = require("gulp-autoprefixer"),
	rename   = require("gulp-rename"),
	minifycss = require("gulp-minify-css");

gulp.task("connect", function() {

	connect.server({
		root: "app",
		livereload: true
	});
});

gulp.task("css", function() {

	gulp.src(["./app/css/main.styl"])
		.pipe(stylus())
		.pipe(autoprefixer("last 2 version", "safari 5", "ie 8", "ie 9", "opera 12.1", "ios 6", "android 4"))
		.pipe(gulp.dest("./app/css/"))
		.pipe(minifycss())
		.pipe(rename({ suffix: ".min" }))
		.pipe(gulp.dest("./app/css/"))
		.pipe(connect.reload());
});

gulp.task("html", function () {

	gulp.src("./app/*.html")
		.pipe(connect.reload());
});

gulp.task("js", function () {

	gulp.src("./app/js/**/*.js")
		.pipe(connect.reload());
});

gulp.task("watch", function () {

	gulp.watch("./app/css/**/*.styl", ["css"]);

	gulp.watch(["./app/*.html"], ["html"]);

	gulp.watch(["./app/js/**/*.js"], ["js"]);
});

gulp.task("build", ["css"]);
gulp.task("default", ["connect", "watch"]);