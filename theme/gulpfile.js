'use strict';

const gulp = require('gulp');
const conf = require('./config');
const gutil = require('gulp-util');

// Assign all CLI arguments to the config object.
conf.args = require('minimist')(process.argv.slice(2), require('./helpers/cliOptions'));
// Assign the default theme that we should be working with to the global config.
conf.activeTheme = require('./helpers/getActiveTheme')(conf.args, conf);

if (conf.args.production) {
    gutil.log(gutil.colors.magenta('---------------------------'));
    gutil.log(gutil.colors.magenta('Running in production mode.'));
    gutil.log(gutil.colors.magenta('---------------------------'));
}

exports.sass = function sass () {
  return gulp.src(conf.themes[conf.activeTheme].sass.src)
}
