'use strict';

const gulp = require('gulp');
const path = require('path');
const lintScripts = require('../scripts/lintScripts');
const buildStyles = require('../styles/buildStyles');
const buildScripts = require('../scripts/buildScripts');
const buildImages = require('../assets/buildImages');
const buildFonts = require('../assets/buildFonts');

function watch(conf) {

  function task() {

    const root = conf.themeConfig.root;

    /**
     * STYLE WATCHING.
     */
    gulp.watch(
      path.join(root, conf.themeConfig.sass.src, '**', '*.scss'), buildStyles(conf)
    );

    /**
     * SCRIPT WATCHING.
     */
    gulp.watch(
      path.join(root, conf.themeConfig.js.src, '**', '*.js'),
      gulp.series(
        lintScripts(conf),
        buildScripts(conf)
      )
    );

    /**
     * IMAGE WATCHING.
     */
    gulp.watch(
      path.join(root, conf.themeConfig.images.src, '**', '*'), buildImages(conf)
    );

    /**
     * FONT WATCHING.
     */
    gulp.watch(
      path.join(root, conf.themeConfig.fonts.src, '**', '*'), buildFonts(conf)
    );

  }

  task.displayName = 'watch';

  return task;

}

module.exports = watch;