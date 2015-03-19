var gulp = require("gulp");

var gcoffee = require("gulp-coffee");
var grename = require("gulp-rename");
var guglify = require("gulp-uglify");

gulp.task("turbolinks", function() {
  gulp.src(require.resolve("turbolinks"))
    .pipe(grename(function(path) {
      // Remove Rails-Pipeline-style '.js.coffee' extension. The CoffeeScript
      // plugin appends '.js' to the compiled file, and so it would result in
      // '.js.js' without removing the extra case.
      path.basename = path.basename.replace(".js", "");
    }))
    .pipe(gcoffee({bare: true}))
    .pipe(guglify())
    .pipe(gulp.dest("public/lib"))
});

gulp.task("default", ["turbolinks"]);
