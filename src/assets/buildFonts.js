'use strict';

const gulp = require('gulp');
const path = require('path');

function buildFonts(conf) {

  let fontsDirs = conf.themeConfig.fonts.src;
  if (!Array.isArray(fontsDirs)) {
    fontsDirs = [ fontsDirs ];
  }

  const fontsSrc = fontsDirs.map(dir => {
    return path.join(conf.themeConfig.root, dir, '**', '*.{eot,ttf,woff,woff2,otf,svg}');
  });

  const fontsDest = path.join(conf.themeConfig.root, conf.themeConfig.fonts.dest);

  return gulp.src(fontsSrc)
    .pipe(gulp.dest(fontsDest));

}

buildFonts.displayName = 'build:fonts';

module.exports = buildFonts;