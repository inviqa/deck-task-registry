'use strict';

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const path = require('path');

module.exports = conf => () => {

  const imageMinConfig = {
    progressive: true,
    svgoPlugins: [
      { removeViewBox: false },
      { cleanupIDs: true },
      { cleanupAttrs: true }
    ]
  };

  return gulp.src(path.join(conf.imageSourceDir, '**', '*'))
    .pipe(imagemin(imageMinConfig))
    .pipe(gulp.dest(conf.imageDestDir));

};
