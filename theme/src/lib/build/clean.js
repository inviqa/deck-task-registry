'use strict';

const del = require('del');

module.exports = conf => () => {

  const deletePaths = [
    conf.themeConfig.sass.dest,
    conf.themeConfig.js.dest,
    conf.themeConfig.images.dest,
    conf.themeConfig.fonts.dest
  ];

  // Delete all build dirs.
  return del(deletePaths, {force: true});

};