'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const tslint = require("gulp-tslint");
const gulpIf = require('gulp-if');

const merge = require('merge-stream');
const path = require('path');

module.exports = conf => () => {

  const jsSrc = path.join(conf.themeConfig.root, conf.themeConfig.js.src, '**', '*.js');
  const tsSrc = path.join(conf.themeConfig.root, conf.themeConfig.js.src, '**', '*.ts');

  // Lint theme scripts with ESLint. This won't touch any TypeScript files.
  const jsLint = gulp.src(jsSrc)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulpIf(conf.isProduction, eslint.failAfterError()));

  // Lint all TypeScript files.
  const reporterOptions = {};

  if (conf.isProduction) {
    reporterOptions.emitError = false;
  }

  const tsLint = gulp.src(tsSrc)
    .pipe(tslint())
    .pipe(tslint.report(reporterOptions));

  // Merge the streams to we only return once all tasks have completed.
  return merge(jsLint, tsLint);

};
