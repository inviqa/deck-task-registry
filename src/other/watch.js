'use strict';

const gulp = require('gulp');
const path = require('path');

function watch(conf) {

  const root = conf.themeConfig.root;

  /**
   * STYLE WATCHING.
   */
  let sassDirs = conf.themeConfig.sass.src;
  if (!Array.isArray(sassDirs)) {
    sassDirs = [ sassDirs ];
  }

  const sassSrc = sassDirs.map(dir => {
    return path.join(conf.themeConfig.root, dir, '**', '*.scss');
  });

  gulp.watch(
    sassSrc,
    gulp.series(
      require('../styles/lintStyles').bind(null, conf),
      require('../styles/buildStyles').bind(null, conf),
      require('../styles/holograph').bind(null, conf)
    )
  );

  /**
   * SCRIPT WATCHING.
   */
  let jsDirs = conf.themeConfig.js.src;
  if (!Array.isArray(jsDirs)) {
    jsDirs = [ jsDirs ];
  }

  const jsSrc = jsDirs.map(dir => {
    return path.join(conf.themeConfig.root, dir, '**', '*.[tj]s');
  });

  gulp.watch(
    jsSrc,
    gulp.series(
      require('../scripts/lintScripts').bind(null, conf),
      require('../scripts/buildScripts').bind(null, conf)
    )
  );

  /**
   * IMAGE WATCHING.
   */
  let imagesDirs = conf.themeConfig.images.src;
  if (!Array.isArray(imagesDirs)) {
    imagesDirs = [ imagesDirs ];
  }

  const imagesSrc = imagesDirs.map(dir => {
    return path.join(conf.themeConfig.root, dir, '**', '*');
  });

  gulp.watch(
    imagesSrc,
    gulp.series(
      require('../assets/buildImages').bind(null, conf)
    )
  );

  /**
   * FONT WATCHING.
   */
  let fontsDirs = conf.themeConfig.fonts.src;
  if (!Array.isArray(fontsDirs)) {
    fontsDirs = [ fontsDirs ];
  }

  const fontsSrc = fontsDirs.map(dir => {
    return path.join(conf.themeConfig.root, dir, '**', '*.{eot,ttf,woff,woff2,otf,svg}');
  });

  gulp.watch(
    fontsSrc,
    gulp.series(
      require('../assets/buildFonts').bind(null, conf)
    )
  );

}

watch.displayName = 'watch';

module.exports = watch;