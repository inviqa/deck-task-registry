'use strict';

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const path = require('path');

function buildImages(conf) {

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

    let imagesDirs = conf.themeConfig.images.src;
    if (!Array.isArray(imagesDirs)) {
      imagesDirs = [ imagesDirs ];
    }

    const imagesSrc = imagesDirs.map(dir => {
      return path.join(conf.themeConfig.root, dir, '**', '*');
    });

    const imagesDest = path.join(conf.themeConfig.root, conf.themeConfig.images.dest);

    return gulp.src(imagesSrc)
      .pipe(imagemin(imageMinConfig))
      .pipe(gulp.dest(imagesDest));

}

buildImages.displayName = 'build:images';


module.exports = buildImages;