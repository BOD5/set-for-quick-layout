import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";

import cleanCss from "gulp-clean-css";
import webpCss from "gulp-webpcss";
import autoprefixer from "gulp-autoprefixer";
import groupMediaQueries from "gulp-group-css-media-queries";

const sass = gulpSass(dartSass);

const styles = () => {
  return app.gulp
    .src(app.path.src.styles, { sourcemaps: !app.isBuild })
    .pipe(app.plugins.plumber())
    .pipe(app.plugins.replace(/@static\//g, "../static/"))
    .pipe(
      sass({
        outputStyle: "expanded",
      })
    )
    .pipe(app.plugins.gulpIf(app.isBuild, groupMediaQueries()))
    .pipe(
      app.plugins.gulpIf(
        app.isBuild,
        webpCss({
          webpClass: ".webp",
          noWebpClass: ".no-webp",
        })
      )
    )
    .pipe(
      app.plugins.gulpIf(
        app.isBuild,
        autoprefixer({
          grid: true,
          overrideBrowserslist: ["last 3 versions"],
          cascade: true,
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.styles)) // for save full version css
    .pipe(app.plugins.gulpIf(app.isBuild, cleanCss()))
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(app.gulp.dest(app.path.build.styles))
    .pipe(app.plugins.browsersync.stream());
};
export default styles;
