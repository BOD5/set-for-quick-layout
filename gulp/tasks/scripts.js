import rename from "gulp-rename";
import webpackStream from "webpack-stream";

const scripts = () => {
  return app.gulp
    .src(app.path.src.scripts, { sourcemaps: !app.isBuild })
    .pipe(app.plugins.plumber())
    .pipe(
      webpackStream({
        mode: app.isBuild ? "production" : "development",
      })
    )
    .pipe(
      rename({
        extname: ".min.js",
      })
    )
    .pipe(app.gulp.dest(app.path.build.scripts))
    .pipe(app.plugins.browsersync.stream());
};

export default scripts;
