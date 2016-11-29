'use strict';

const gulp = require('gulp');
const cleanBuild = require('./clean');
const lintScripts = require('../scripts/lintScripts');
const buildStyles = require('../styles/buildStyles');
const buildScripts = require('../scripts/buildScripts');
const buildImages = require('../assets/buildImages');
const buildFonts = require('../assets/buildFonts');

module.exports = (conf) => {

  return gulp.series(
    cleanBuild(conf),
    lintScripts(conf),
    gulp.parallel(
      buildStyles(conf),
      buildScripts(conf),
      buildImages(conf),
      buildFonts(conf)
    )
  );

};