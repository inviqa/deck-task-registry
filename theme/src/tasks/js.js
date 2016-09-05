'use strict';

const gulp = require('gulp');
const path = require('path');
const typescript = require('gulp-typescript');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const merge = require('merge-stream');
const eslint = require('gulp-eslint');
const tslint = require("gulp-tslint");

module.exports = conf => () => {

  const tsConf = {
    allowJs: true
  };

  const uglifyConf = {
    mangle: false
  };

  // Build the theme scripts.
  const jsBuild = gulp.src(path.join(conf.jsSourceDir, '**', '*.[jt]s'))
    .pipe(typescript(tsConf))
    .pipe(gulpIf(conf.isProduction, uglify(uglifyConf)))
    .pipe(gulp.dest(conf.jsDestDir));

  // Lint theme scripts with ESLint. This won't touch any TypeScript files.
  const jsLint = gulp.src(path.join(conf.jsSourceDir, '**', '*.js'))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulpIf(conf.isProduction, eslint.failAfterError()));

  // Lint all TypeScript files.
  const reporterOptions = {};

  if (conf.isProduction) {
    reporterOptions.emitError = false
  }

  const tsLint = gulp.src(path.join(conf.jsSourceDir, '**', '*.js'))
    .pipe(tslint())
    .pipe(tslint.report(reporterOptions))


  // Merge the streams to we only return once all tasks have completed.
  return merge(jsBuild, jsLint, tsLint);

}
