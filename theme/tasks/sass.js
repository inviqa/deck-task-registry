'use strict';
const path = require('path');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

module.exports = conf => () => {

  const sassConfig = {};

  if (conf.isProduction) {
    sassConfig.outputStyle = 'compressed'
  }

  return gulp.src(path.join(conf.sassSourceDir, '**', '*.scss'))
    .pipe(gulpif(!conf.isProduction, sourcemaps.init()))
    .pipe(sass(sassConfig).on('error', sass.logError))
    .pipe(gulpif(!conf.isProduction, sourcemaps.write('.')))
    .pipe(gulp.dest(conf.sassDestDir));

}
