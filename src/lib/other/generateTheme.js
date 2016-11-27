'use strict';

const gulp = require('gulp');
const path = require('path');
const findRoot = require('../helpers/findRoot');
const rename = require('gulp-rename');
const merge = require('merge-stream');
const fs = require('fs');
const minimist = require('minimist');
const trans = require('transliteration');

module.exports = () => () => {

  const allowedArgs = {
    "string": [
      "theme"
    ]
  };

  const settings = minimist(process.argv.slice(2), allowedArgs);

  if (typeof settings.theme !== 'string' || settings.theme === '') {
    throw new Error('You didn\'t give me a name.');
  }

  settings.machineName = trans.slugify(settings.theme);

  const drupalRoot = findRoot();
  const deckRoot = path.join(drupalRoot, 'themes', 'contrib', 'deck', 'subtheme');

  // Check to see if Deck actually exists.
  try {
    fs.statSync(deckRoot);
  } catch (err) {
    throw new Error('Deck was not found.');
  }

  // Build out the subtheme.
  const newThemeDest = path.join(drupalRoot, 'themes', 'custom', settings.theme);

  const srcOpts = {
    dot: true
  };

  // Copy out the core files required for the theme.
  const coreFileBuilder = gulp.src(path.join(deckRoot, '*.{yml,theme}'), srcOpts)
    .pipe(
      rename(function (path) {
        path.basename = path.basename.replace('SUBTHEME', settings.theme);
      })
    )
    .pipe(gulp.dest(newThemeDest));

  // Copy out the assets.
  const assetsBuilder = gulp.src(path.join(deckRoot, 'assets', '**', '*'), srcOpts)
    .pipe(gulp.dest(path.join(newThemeDest, 'assets')));

  return merge(assetsBuilder, coreFileBuilder);

};