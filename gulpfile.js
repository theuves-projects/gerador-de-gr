"use strict";
const gulp = require('gulp');
const merge = require("merge-stream");
const concat = require("gulp-concat");
const csso = require("gulp-csso");
const htmlmin = require("gulp-htmlmin");
const inject = require("gulp-inject");
const inlineSource = require("gulp-inline-source");
const ngAnnotate = require("gulp-ng-annotate");
const ngFilesort = require("gulp-angular-filesort");
const ngTemplate = require("gulp-angular-templatecache");
const order = require("gulp-order");
const uglify = require("gulp-uglify");

gulp.task("build:js", () => {
  const app = gulp.src("src/app/**/*.js")
    .pipe(ngFilesort())
    .pipe(ngAnnotate())
    .pipe(concat("app.js"));

  const templates = gulp.src("src/app/**/*.html")
    .pipe(inlineSource({attribute: false, rootpath: "src"}))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(ngTemplate({module: "app", root: "app/"}));

  merge(app, templates)
    .pipe(order())
    .pipe(concat("script.js"))
    .pipe(uglify())
    .pipe(gulp.dest("build"));
});

gulp.task("build:css", () => {
  gulp.src("src/**/*.css")
    .pipe(concat("style.css"))
    .pipe(csso())
    .pipe(gulp.dest("build"));
});

gulp.task("build:inject", () => {
  const sources = gulp.src("build/**/*.{js,css}");
  const options = {ignorePath: "build", addRootSlash: false, removeTags: true};

  gulp.src("src/index.html")
    .pipe(inject(sources, options))
    .pipe(gulp.dest("build"));
});

gulp.task("build:copy", () => {
  gulp.src("src/favicon.ico").pipe(gulp.dest("build"));
});

gulp.task("build", ["build:js", "build:css", "build:inject", "build:copy"]);

gulp.task("watch", () => {
  gulp.watch("src/**/*.css", ["build:css"]);
  gulp.watch("src/app/**/*.{js,html}", ["build:js"]);
  gulp.watch("src/favicon.ico", ["build:copy"]);
  gulp.watch("src/index.html", ["build:inject"]);
});
