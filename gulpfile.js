var gulp = require("gulp");
var jshint = require("gulp-jshint");
var minimyHtml = require("gulp-minify-html")
var concat = require("gulp-concat")
var stripDebug = require("gulp-strip-debug")
var uglify = require("gulp-uglify")
var clean = require("gulp-clean")
var autoPrefix = require("gulp-autoprefixer")
var minifyCss = require("gulp-minify-css")
var runSequence = require("run-sequence")

gulp.task("clean", function(){
  gulp.src("./build")
  .pipe(clean())
})

gulp.task("copyLib", function(){
  gulp.src("./src/lib/*.js")
  .pipe(gulp.dest("./build/js/lib/"))
})

gulp.task("jshint", function(){
  gulp.src(["./src/js/*/*.js", "!./src/js/scripts/angular.min.js"])
  .pipe(jshint())
  .pipe(jshint.reporter("default"));
});

gulp.task("htmlpage", function(){
  var destination = "./build"
  gulp.src(["./src/index.html", "./src/templates/**/*.html"])
  .pipe(minimyHtml())
  .pipe(gulp.dest(destination));
})

gulp.task("scripts", function(){
  gulp.src(["./src/js/*/*.module.js", "./src/js/*/*.js"])
  .pipe(concat("script.js"))
  // .pipe(stripDebug())
  // .pipe(uglify())
  .pipe(gulp.dest("./build/js"))
})

gulp.task("copyFonts", function(){
  gulp.src("./src/fonts/*")
  .pipe(gulp.dest("./build/fonts"))
})

gulp.task("styles", function(){
  gulp.src(["./src/css/bootstrap.min.css", "./src/css/*.css"])
  .pipe(concat("style.css"))
  .pipe(autoPrefix("last 2 versions"))
  .pipe(minifyCss())
  .pipe(gulp.dest("./build/css"))
})

gulp.task("build", function(){
  runSequence("clean", ["copyLib", "htmlpage", "scripts", "styles", "copyFonts"])
})

gulp.task("default", ["build"], function(){
  gulp.watch(["./src/index.html", "./src/templates/**/*.html"], function(){
    gulp.run("htmlpage");
  });

  gulp.watch(["./src/js/*/*.js"], function(){
    gulp.run("scripts");
  });

  gulp.watch(["./src/css/bootstrap.min.css", "./src/css/*.css"], function(){
    gulp.run("styles")
  })
})