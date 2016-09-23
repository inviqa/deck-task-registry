'use strict';

const configParser = require('./config/configParser');
const gulp = require('gulp');
const conf = new configParser(require('../../config'));
const gutil = require('gulp-util');

if (conf.productionMode) {
  gutil.log(gutil.colors.magenta('---------------------------'));
  gutil.log(gutil.colors.magenta('Running in production mode.'));
  gutil.log(gutil.colors.magenta('---------------------------'));
}

/**
 * SASS TASKS
 */
gulp.task('build:styles', require('./styles/buildStyles')(conf));

/**
 * JAVASCRIPT TASKS
 */
gulp.task('build:scripts', require('./scripts/buildScripts')(conf));
gulp.task('lint:scripts', require('./scripts/lintScripts')(conf));

/**
 * ASSET TASKS
 */
gulp.task('build:images', require('./assets/buildImages')(conf));
gulp.task('build:fonts', require('./assets/buildFonts')(conf));

/**
 * BUILD TASKS
 */
gulp.task('build:clean', require('./build/clean')(conf));
gulp.task('build', require('./build/build')(conf));

/**
 * MISC TASKS.
 */
gulp.task('watch', require('./other/watch')(conf));
gulp.task('default', require('./other/default')());