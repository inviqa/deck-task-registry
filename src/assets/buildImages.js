'use strict';

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const path = require('path');

function buildImages(conf) {

  function task() {

    const imageMinConfig = {
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }, {
        cleanupIDs: true
      }, {
        cleanupAttrs: true
      }]
    };

    const imageSrc = path.join(conf.themeConfig.root, conf.themeConfig.images.src, '**', '*');
    const imageDest = path.join(conf.themeConfig.root, conf.themeConfig.images.dest);

    return gulp.src(imageSrc)
      .pipe(imagemin(imageMinConfig))
      .pipe(gulp.dest(imageDest));

  }

  task.displayName = 'build:images';

  return task;

}

module.exports = buildImages;