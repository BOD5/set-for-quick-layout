import replace from "gulp-replace";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import newer from "gulp-newer";
import browsersync from "browser-sync";
import gulpIf from "gulp-if";

const plugins = {
  replace,
  plumber,
  notify,
  browsersync,
  newer,
  gulpIf,
};

export default plugins;
