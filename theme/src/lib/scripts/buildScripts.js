'use strict';

const gulp = require('gulp');
const path = require('path');
const typescript = require('gulp-typescript');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');

module.exports = conf => () => {

  const tsConf = {
    allowJs: true
  };

  const uglifyConf = {
    mangle: false
  };

  const jsSrc = path.join(conf.themeConfig.root, conf.themeConfig.js.src, '**', '*.[jt]s');
  const jsDest = path.join(conf.themeConfig.root, conf.themeConfig.js.dest);

  // Build the theme scripts.
  return gulp.src(jsSrc)
    .pipe(gulpIf(!conf.productionMode, sourcemaps.init()))
    .pipe(gulpIf(conf.themeConfig.js.optimise, typescript(tsConf)))
    .pipe(gulpIf(conf.productionMode, uglify(uglifyConf)))
    .pipe(gulpIf(!conf.productionMode, sourcemaps.write('.')))
    .pipe(gulp.dest(jsDest));

};
