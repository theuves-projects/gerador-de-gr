"use strict";

var gulp = require('gulp');
///////////////////////////

var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();

/**
 * construir
 * =========
 */
gulp.task("construir", function () {
  runSequence(
    "construir:html-css-e-js",
    "construir:templates"
    "mover"
  );
});

/**
 * construir:templates
 * -------------------
 */
gulp.task("construir:templates", function () {
  var templates = gulp.src("src/app/**/*.html")
    .pipe($.inlineSource({
      attribute: false,
      rootpath: "src"
    }))
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe($.angularTemplatecache({
      module: "app",
      root: "app/"
    }));

  var scriptJahConstruido = gulp.src("build/script.js");

  return $.merge(scriptJahConstruido, templates)
    .pipe($.concat("script.js"))
    .pipe($.uglify())
    .pipe(gulp.dest("build"));
});

/**
 * construir:html-css-e-js
 * -----------------------
 */
gulp.task("construir:html-css-e-js", function () {
  return gulp.src("src/index.html")
    .pipe($.useref())
    .pipe($.if("*.js", $.ngAnnotate()))
    .pipe($.if("*.css", $.csso()))
    .pipe(gulp.dest("build"));
});

/**
 * injetar
 * =======
 */
gulp.task("injetar", function () {
  runSequence(
    "injetar:css",
    "injetar:js"
  );
});

/**
 * injetar:css
 * -----------
 */
gulp.task("injetar:css", function () {
  var diretorios = [
    "src/**/*.css"
  ];

  var arquivos = gulp.src(diretorios);

  return gulp.src("src/index.html")
    .pipe($.inject(arquivos, {relative: true}))
    .pipe(gulp.dest("src"));
});

/**
 * injetar:js
 * ----------
 */
gulp.task("injetar:js", function () {
  var arquivos = gulp.src("src/app/**/*.js")
    .pipe($.angularFilesort());

  return gulp.src("src/index.html")
    .pipe($.inject(arquivos, {relative: true}))
    .pipe(gulp.dest("src"));
});

/**
 * mover
 * =====
 */
gulp.task("mover", function () {
  runSequence(
    "mover:favicon.ico"
  );
});

/**
 * mover:favicon.ico
 * -----------------
 */
gulp.task("mover:favicon.ico", function () {
  return gulp.src("favicon.ico")
    .pipe(gulp.dest("build"));
});
