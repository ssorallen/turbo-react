var gulp = require("gulp");

gulp.task("turbolinks", function() {
  gulp.src(require.resolve("turbolinks"))
    .pipe(gulp.dest("public/lib"))
});

gulp.task("default", ["turbolinks"]);
