'use strict';

const configParser = require('./config/configParser');
const gulp = require('gulp');
const conf = new configParser(require('../../config'));

/**
 * SASS TASKS
 */

gulp.task('styles:build', require('./styles/buildStyles')(conf));

/**
 * JAVASCRIPT TASKS
 */

gulp.task('scripts:build', require('./scripts/buildScripts')(conf));
gulp.task('scripts:lint', require('./scripts/lintScripts')(conf));

/**
 * ASSET TASKS
 */