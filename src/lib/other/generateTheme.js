'use strict';

const gulp = require('gulp');
const path = require('path');
const findRoot = require('../helpers/findRoot');
const rename = require('gulp-rename');

module.exports = () => () => {

  const drupalRoot = findRoot();
  const deckRoot = path.join(drupalRoot, 'themes', 'contrib', 'deck', 'subtheme');
  const newThemeDest = path.join(drupalRoot, 'themes', 'custom', 'test');

  const coreFileBuilder = gulp.src(path.join(deckRoot, '*.{yml,theme}'))
    .pipe(
      rename(function (path) {
        path.basename = path.basename.replace('SUBTHEME', 'test');
      })
    )
    .pipe(gulp.dest(newThemeDest + '/'));

  return coreFileBuilder;

};