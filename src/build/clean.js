'use strict';

const del = require('del');
const path = require('path');

function buildClean(conf) {

  function task() {

    const deletePaths = [
      path.join(conf.themeConfig.root, conf.themeConfig.sass.dest),
      path.join(conf.themeConfig.root, conf.themeConfig.js.dest),
      path.join(conf.themeConfig.root, conf.themeConfig.images.dest),
      path.join(conf.themeConfig.root, conf.themeConfig.fonts.dest)
    ];

    // Delete all build dirs.
    return del(deletePaths, {
      force: true
    });

  }

  task.displayName = 'build:clean';

  return task;

}

module.exports = buildClean;