import gulp from "gulp";
import path from "./gulp/config/path.js";
import copy from "./gulp/tasks/copy.js";
import reset from "./gulp/tasks/reset.js";
import html from "./gulp/tasks/html.js";
import server from "./gulp/tasks/server.js";
import styles from "./gulp/tasks/styles.js";
import scripts from "./gulp/tasks/scripts.js";
import plugins from "./gulp/config/plugins.js";
import images from "./gulp/tasks/images.js";
import {
  copyFonts,
  fontsStyle,
  isFontsExist,
  otfToTtf,
  ttfToWoff,
} from "./gulp/tasks/fonts.js";

global.app = {
  isBuild: process.argv.includes("--build"),
  path,
  gulp,
  plugins,
};

const watcher = () => {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.styles, styles);
  gulp.watch(path.watch.scripts, scripts);
  gulp.watch(path.watch.images, images);
};

const fonts = async () => {
  if (!isFontsExist()) {
    await gulp.series(otfToTtf, ttfToWoff)();
  }
  await gulp.series(copyFonts, fontsStyle)();
};

const mainTasks = gulp.series(
  fonts,
  gulp.parallel(copy, html, styles, scripts, images)
);

const watchServer = gulp.parallel(watcher, server);

const dev = gulp.series(reset, mainTasks, watchServer);
const build = gulp.series(reset, mainTasks);

export { dev, build };

gulp.task("default", dev);
