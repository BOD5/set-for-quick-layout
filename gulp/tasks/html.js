import fileInclude from "gulp-file-include";
import webpHtmlNoSvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import pug from "gulp-pug";
import beautify from "gulp-html-beautify";
import htmlmin from "gulp-htmlmin";

const html = () => {
  return app.gulp
    .src(app.path.src.html)
    .pipe(app.plugins.plumber())
    .pipe(fileInclude())
    .pipe(
      pug({
        // doctype: "html",
        pretty: true,
        verbose: true,
        preserveWhitespace: true,
      })
    )
    .pipe(app.plugins.replace(/@static\//g, "static/"))
    .pipe(app.plugins.gulpIf(app.isBuild, webpHtmlNoSvg()))
    .pipe(
      app.plugins.gulpIf(
        app.isBuild,
        versionNumber({
          value: "%DT%",
          append: {
            key: "_v",
            cover: 0,
            to: ["css", "js"],
          },
          output: {
            file: "gulp/version.json",
          },
        })
      )
    )
    .pipe(
      app.plugins.gulpIf(
        !app.isBuild,
        beautify({
          indent_size: 2,
          end_with_newline: true,
          preserve_newlines: true,
          max_preserve_newlines: 1,
          indent_inner_html: true,
        }),
        htmlmin({
          collapseWhitespace: true, // удаляем все переносы
          removeComments: true, // удаляем все комментарии
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browsersync.stream());
};
export default html;
