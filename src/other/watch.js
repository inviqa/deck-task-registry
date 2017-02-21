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
      require('../styles/lintStyles').bind(null, conf),
      require('../styles/buildStyles').bind(null, conf),
      require('../styles/holograph').bind(null, conf)
    )
  );

  /**
   * SCRIPT WATCHING.
   */
  gulp.watch(
    path.join(root, conf.themeConfig.js.src, '**', '*.js'),
    gulp.series(
      require('../scripts/lintScripts').bind(null, conf),
      require('../scripts/buildScripts').bind(null, conf)
    )
  );

  /**
   * IMAGE WATCHING.
   */
  gulp.watch(
    path.join(root, conf.themeConfig.images.src, '**', '*'),
    gulp.series(
      require('../assets/buildImages').bind(null, conf)
    )
  );

  /**
   * FONT WATCHING.
   */
  gulp.watch(
    path.join(root, conf.themeConfig.fonts.src, '**', '*'),
    gulp.series(
      require('../assets/buildFonts').bind(null, conf)
    )
  );

}

watch.displayName = 'watch';

module.exports = watch;