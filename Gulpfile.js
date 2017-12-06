"use strict";

var gulp = require("gulp");
//////////////////////////

var angularTemplatecache = require("gulp-angular-templatecache");
var htmlreplace = require("gulp-html-replace");
var concat = require("gulp-concat");
var angularFilesort = require("gulp-angular-filesort");

gulp.task("cache",  function () {
  return gulp.src("app/**/*.html")
    .pipe(angularTemplatecache("templates.js", {
      module: "app",
      root: "app/"
    }))

    .pipe(gulp.dest("app"));
});

gulp.task("js", ["cache"], function () {
  return gulp.src("app/**/*.js")
    .pipe(angularFilesort())
    .pipe(concat("build.js"))
    .pipe(gulp.dest("build"));
});

gulp.task("html", ['js'], function () {
  return gulp.src("index.html")
    .pipe(htmlreplace({
      js: "build.js"
    }))
    .pipe(gulp.dest("build"));
});

gulp.task("default", [
  "html"
]);
