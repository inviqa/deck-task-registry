'use strict';

const gulp = require('gulp');
const path = require('path');
const findRoot = require('../helpers/findRoot');
const rename = require('gulp-rename');
const merge = require('merge-stream');
const fs = require('fs');

module.exports = () => () => {

  const drupalRoot = findRoot();
  const deckRoot = path.join(drupalRoot, 'themes', 'contrib', 'deck', 'subtheme');

  // Check to see if Deck actually exists.
  try {
    fs.statSync(deckRoot);
  } catch (err) {
    throw new Error('Deck was not found.');
  }

  // Build out the subtheme.
  const newThemeDest = path.join(drupalRoot, 'themes', 'custom', 'test');

  const srcOpts = {
    dot: true
  };

  // Copy out the core files required for the theme.
  const coreFileBuilder = gulp.src(path.join(deckRoot, '*.{yml,theme}'), srcOpts)
    .pipe(
      rename(function (path) {
        path.basename = path.basename.replace('SUBTHEME', 'test');
      })
    )
    .pipe(gulp.dest(newThemeDest));

  // Copy out the assets.
  const assetsBuilder = gulp.src(path.join(deckRoot, 'assets', '**', '*'), srcOpts)
    .pipe(gulp.dest(path.join(newThemeDest, 'assets')));

  return merge(assetsBuilder, coreFileBuilder);

};