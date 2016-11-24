'use strict';

const gulp = require('gulp');
const path = require('path');
const runSequence = require('run-sequence');

module.exports = conf => () => {

  const root = conf.themeConfig.root;

  /**
   * STYLE WATCHING.
   */
  gulp.watch(
    path.join(root, conf.themeConfig.sass.src, '**', '*.scss'),
    ['build:styles']
  );

  /**
   * SCRIPT WATCHING.
   */
  gulp.watch(
    path.join(root, conf.themeConfig.js.src, '**', '*.[jt]s'),
    runSequence(
      'lint:scripts',
      'build:scripts'
    )
  );

  /**
   * IMAGE WATCHING.
   */
  gulp.watch(
    path.join(root, conf.themeConfig.images.src, '**', '*'),
    runSequence(
      'build:images'
    )
  );

  /**
   * FONT WATCHING.
   */
  gulp.watch(
    path.join(root, conf.themeConfig.fonts.src, '**', '*'),
    runSequence(
      'build:fonts'
    )
  );

};