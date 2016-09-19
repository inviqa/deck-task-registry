'use strict';

const gulp = require('gulp');
const path = require('path');
const typescript = require('gulp-typescript');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');

module.exports = conf => () => {

  const tsConf = {
    allowJs: true
  };

  const uglifyConf = {
    mangle: false
  };

  // Build the theme scripts.
  return gulp.src(path.join(conf.jsSourceDir, '**', '*.[jt]s'))
    .pipe(typescript(tsConf))
    .pipe(gulpIf(conf.isProduction, uglify(uglifyConf)))
    .pipe(gulp.dest(conf.jsDestDir));

};
