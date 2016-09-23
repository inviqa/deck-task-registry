'use strict';

const gulp = require('gulp');
const path = require('path');

module.exports = conf => () => {

  const root = conf.themeConfig.root;

  /**
   * STYLE WATCHING.
   */
  gulp.watch(
    path.join(root, conf.themeConfig.sass.src, '**', '*.scss'),
    gulp.parallel(
      'build:styles'
    )
  );

  /**
   * SCRIPT WATCHING.
   */
  gulp.watch(
    path.join(root, conf.themeConfig.js.src, '**', '*.[jt]s'),
    gulp.series(
      'lint:scripts',
      'build:scripts'
    )
  );

  /**
   * IMAGE WATCHING.
   */
  gulp.watch(
    path.join(root, conf.themeConfig.images.src, '**', '*'),
    gulp.series(
      'build:images'
    )
  );

  /**
   * FONT WATCHING.
   */
  gulp.watch(
    path.join(root, conf.themeConfig.fonts.src, '**', '*'),
    gulp.series(
      'build:fonts'
    )
  );

};