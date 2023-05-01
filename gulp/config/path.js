import path from "path";

const root = path.resolve();

const buildFolder = `${root}/dist`;
const srcFolder = `${root}/src`;

export default {
  build: {
    files: `${buildFolder}/files/`,
    html: `${buildFolder}/`,
    styles: `${buildFolder}/styles`,
    scripts: `${buildFolder}/scripts`,
    images: `${buildFolder}/static/images`,
    fonts: `${buildFolder}/static/fonts`,
  },
  src: {
    files: `${srcFolder}/files/**/*.*`,
    images: `${srcFolder}/static/images/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/static/images/**/*.svg`,
    styles: [
      `${srcFolder}/styles/pages/*.scss`,
      `${srcFolder}/styles/index.scss`,
    ],
    scripts: [
      `${srcFolder}/scripts/pages/*.js`,
      `${srcFolder}/scripts/index.js`,
    ],
    html: [
      `${srcFolder}/templates/pages/*.html`,
      `${srcFolder}/templates/pages/*.pug`,
    ],
  },
  watch: {
    images: `${srcFolder}/static/images/**/*.{jpg,jpeg,png,gif,webp,svg}`,
    styles: `${srcFolder}/styles/**/*.scss`,
    scripts: `${srcFolder}/scripts/**/*.js`,
    files: `${srcFolder}/files/**/*.*`,
    html: [
      `${srcFolder}/templates/**/*.html`,
      `${srcFolder}/templates/**/*.pug`,
    ],
  },
  clean: buildFolder,
  srcFolder,
  root,
  ftp: "",
};
