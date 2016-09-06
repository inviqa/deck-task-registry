'use strict';

const gulp = require('gulp');
const Promise = require('bluebird');

module.exports = gulp.series(
  'clean',
  gulp.parallel('sass', 'js', 'images', 'fonts')
);