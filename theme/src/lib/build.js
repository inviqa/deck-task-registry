'use strict';

const gulp = require('gulp');

module.exports = gulp.series(
  'clean',
  gulp.parallel('sass', 'js', 'images', 'fonts')
);