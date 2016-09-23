'use strict';

const gulp = require('gulp');
const path = require('path');

module.exports = conf => () => {

  const fontSrc = path.join(conf.themeConfig.root, conf.themeConfig.fonts.src, '**', '*.{eot,ttf,woff,woff2,otf,svg}');
  const fontDest = path.join(conf.themeConfig.root, conf.themeConfig.fonts.dest);

  return gulp.src(fontSrc)
    .pipe(gulp.dest(fontDest));

};