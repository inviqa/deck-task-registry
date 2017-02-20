'use strict';

const gulp = require('gulp');
const path = require('path');

function watch(conf) {

  const root = conf.themeConfig.root;

  /**
   * STYLE WATCHING.
   */
  gulp.watch(
    path.join(root, conf.themeConfig.sass.src, '**', '*.scss'),
    gulp.series(
      'build:styles',
      'build:holograph'
    )
  );

  /**
   * SCRIPT WATCHING.
   */
  gulp.watch(
    path.join(root, conf.themeConfig.js.src, '**', '*.js'),
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
    gulp.series('build:images')
  );

  /**
   * FONT WATCHING.
   */
  gulp.watch(
    path.join(root, conf.themeConfig.fonts.src, '**', '*'),
    gulp.series('build:fonts')
  );

}

watch.displayName = 'watch';

module.exports = watch;