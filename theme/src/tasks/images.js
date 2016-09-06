'use strict';

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

module.exports = conf => () => {

  const imageMinconfig = {
    progressive: true,
    svgoPlugins: [
      { removeViewBox: false },
      { cleanupIDs: true },
      { cleanupAttrs: true }
    ]
  };

  return gulp.src(path.join(conf.getImageSrc, '**', '*'))
    .pipe(imagemin(imageMinConfig))
    .pipe(conf.getImageDest);

}