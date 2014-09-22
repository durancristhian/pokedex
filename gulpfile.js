var gulp = require("gulp"),
	stylus = require("gulp-stylus"),
	autoprefixer = require("gulp-autoprefixer"),
	rename   = require("gulp-rename"),
	minifycss = require("gulp-minify-css"),
	minifyHTML = require('gulp-minify-html'),
	uglify = require("gulp-uglify"),
	concat = require("gulp-concat"),
	jsonminify = require('gulp-jsonminify');

gulp.task("html", function () {

	var opts = {
		comments: false,
		empty: true,
		quotes: true
	};

	// index.html
	gulp.src('./app/index.html')
		.pipe(minifyHTML(opts))
		.pipe(gulp.dest('./public/'));

	// angular views
	gulp.src('./app/views/*.html')
		.pipe(minifyHTML(opts))
		.pipe(gulp.dest('./public/views/'));

	// angular templates
	gulp.src('./app/partials/*.html')
		.pipe(minifyHTML(opts))
		.pipe(gulp.dest('./public/partials/'));
});

gulp.task("css", function() {

	gulp.src(["./app/css/main.styl"])
		.pipe(stylus())
		.pipe(autoprefixer("last 2 version", "safari 5", "ie 8", "ie 9", "opera 12.1", "ios 6", "android 4"))
		.pipe(gulp.dest("./public/css/"))
		.pipe(minifycss())
		.pipe(rename({ suffix: ".min" }))
		.pipe(gulp.dest("./public/css/"));
});

gulp.task("js", function () {

	gulp.src('./app/js/*.js')
		.pipe(concat("app.js"))
		.pipe(gulp.dest("./public/js/"))
		.pipe(uglify())
		.pipe(rename({ suffix: ".min" }))
		.pipe(gulp.dest("./public/js/"));
});

gulp.task("minifyJSON", function () {

	gulp.src('./app/pokemons.json')
		.pipe(jsonminify())
		.pipe(gulp.dest("./public/"));
});

gulp.task("watch", function () {

	// watch .html files
	gulp.watch(["./app/**/*.html"], ["html"]); 

	// watch styles
	gulp.watch("./app/css/**/*.styl", ["css"]);

	// watch .js files
	gulp.watch(["./app/js/**/*.js"], ["js"]);

	// watch pokemons.json
	gulp.watch(["./app/pokemons.json"], ["minifyJSON"]);
});

gulp.task("build", ["html", "css", "js", "minifyJSON"]);
gulp.task("default", ["watch"]);