'use strict';

const gulp = require('gulp');
const build = require('../build/build');
const watch = require('../other/watch');

module.exports = (conf) => {

  return gulp.series(
    build(conf),
    watch(conf)
  );

};