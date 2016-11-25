'use strict';

const gulp = require('gulp');
const path = require('path');
const findRoot = require('../helpers/findRoot');
const rename = require('gulp-rename');
const merge = require('merge-stream');

module.exports = () => () => {

  const drupalRoot = findRoot();
  const deckRoot = path.join(drupalRoot, 'themes', 'contrib', 'deck', 'subtheme');
  const newThemeDest = path.join(drupalRoot, 'themes', 'custom', 'test');

  // Copy out the core files required for the theme.
  const coreFileBuilder = gulp.src(path.join(deckRoot, '*.{yml,theme}'), {base: deckRoot})
    .pipe(
      rename(function (path) {
        path.basename = path.basename.replace('SUBTHEME', 'test');
      })
    )
    .pipe(gulp.dest(newThemeDest));

  // Copy out the assets.
  const assetsBuilder = gulp.src(path.join('assets', '**', '*.*'), {base: deckRoot})
    .pipe(gulp.dest(path.join(newThemeDest, 'assets')));
    console.log('I built stuff here: ' + newThemeDest);

  return merge(assetsBuilder, coreFileBuilder);

};