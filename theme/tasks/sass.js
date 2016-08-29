'use strict';
const path = require('path');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

module.exports = conf => () => {

  const sassConfig = {};

  if (conf.isProduction) {
    sassConfig.outputStyle = 'compressed'
  }

  const postCSSConf = [
    autoprefixer({
      browsers: conf.activeThemeConf.browserSupport || ['last 2 versions']
    })
  ];

  return gulp.src(path.join(conf.sassSourceDir, '**', '*.scss'))
    .pipe(gulpif(!conf.isProduction, sourcemaps.init()))
    .pipe(sass(sassConfig).on('error', sass.logError))
    .pipe(postcss(postCSSConf))
    .pipe(gulpif(!conf.isProduction, sourcemaps.write('.')))
    .pipe(gulp.dest(conf.sassDestDir));

}
