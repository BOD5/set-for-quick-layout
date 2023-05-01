import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";
import fs from "fs";

export const otfToTtf = () =>
  app.gulp
    .src(`${app.path.srcFolder}/static/fonts/*.otf`, {})
    .pipe(app.plugins.plumber())
    .pipe(
      fonter({
        format: ["ttf"],
      })
    )
    .pipe(app.gulp.dest(`${app.path.srcFolder}/static/fonts`));

export const ttfToWoff = () =>
  app.gulp
    .src(`${app.path.srcFolder}/static/fonts/*.ttf`, {})
    .pipe(app.plugins.plumber())
    .pipe(
      fonter({
        format: ["woff"],
      })
    )
    .pipe(app.gulp.dest(`${app.path.srcFolder}/static/fonts`))
    .pipe(app.gulp.src(`${app.path.srcFolder}/static/fonts/*.ttf`))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(`${app.path.srcFolder}/static/fonts`));

export const isFontsExist = () => {
  const fontsFile = `${app.path.srcFolder}/styles/fonts.scss`;
  return fs.existsSync(fontsFile);
};

export const copyFonts = () =>
  app.gulp
    .src(`${app.path.srcFolder}/static/fonts/*.{ttf,woff2}`)
    .pipe(app.gulp.dest(app.path.build.fonts));

export const fontsStyle = () => {
  const fontsFile = `${app.path.srcFolder}/styles/fonts.scss`;
  if (!fs.existsSync(fontsFile)) {
    fs.writeFile(fontsFile, "", () => {});
    let newFileOnly;
    fs.readdir(`${app.path.srcFolder}/static/fonts/`, (err, fontFiles) => {
      for (let i = 0; i < fontFiles.length; i++) {
        let fontFileName = fontFiles[i].split(".")[0];
        if (newFileOnly !== fontFileName) {
          let fontName = fontFileName.split("-")[0] || fontFileName;
          let fontStyle = "normal";
          let style = fontFileName.toLocaleLowerCase();
          style = style.replace(fontName.toLocaleLowerCase(), "");
          if (style.includes("italic")) {
            fontStyle = "italic";
            style = style.replace("italic", "");
          }
          let fontWeight = style.replace(/[^a-z0-9]/gi, "");
          switch (fontWeight.toLocaleLowerCase()) {
            case "thin":
              fontWeight = 100;
              break;
            case "extralight":
              fontWeight = 200;
              break;
            case "light":
              fontWeight = 300;
              break;
            case "medium":
              fontWeight = 500;
              break;
            case "semibold":
              fontWeight = 600;
              break;
            case "bold":
            case "heavy":
              fontWeight = 700;
              break;
            case "extrabold":
              fontWeight = 800;
              break;
            case "black":
              fontWeight = 900;
              break;
            default:
              fontWeight = 400;
              break;
          }
          fs.appendFile(
            fontsFile,
            `@font-face {
              font-family: ${fontName};
              font-display: swap;
              src: url("../static/fonts/${fontFileName}.woff") format("woff"), url("../static/fonts/${fontFileName}.woff2") format("woff2");
              font-weight: ${fontWeight};
              font-style: ${fontStyle};
              }\r\n`,
            (err) => {
              if (err) {
                console.log(err);
              } else {
                // Get the file contents after the append operation
                console.log("\nFont file created successfully");
              }
            }
          );
          newFileOnly = fontFileName;
        }
      }
    });
  } else {
    console.log(
      "File fonts.scss is already exists. For update you need to remove it"
    );
  }
  return app.gulp.src(app.path.srcFolder);
};
