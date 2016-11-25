'use strict';

const gulp = require('gulp');

module.exports = () => {

  return gulp.series('build', 'watch');

};