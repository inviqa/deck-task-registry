'use strict';

const gulp = require('gulp');

module.exports = () => (cb) => {

  return gulp.series(
    'build:clean',
    'lint:scripts',
    gulp.parallel('build:styles', 'build:scripts', 'build:images', 'build:fonts'),
    cb
  );

};