'use strict';

const gulp = require('gulp');
const path = require('path');

module.exports = conf => () => {

  return gulp.src(path.join(conf.fontSourceDir, '**', '.{eot,ttf,woff,woff2,otf,svg}'))
    .pipe(gulp.dest(conf.fontDestDir));

};