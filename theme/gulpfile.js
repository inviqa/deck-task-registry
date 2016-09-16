'use strict';

const baseConf = require('./config');
const gutil = require('gulp-util');
const configRepo = require('./src/helpers/configRepository');
const gulp = require('gulp');

// Assign all CLI arguments to the config object.
console.log(process.argv);
// Assign the default theme that we should be working with to the global config.

// if (baseConf.args.production) {
//   gutil.log(gutil.colors.magenta('---------------------------'));
//   gutil.log(gutil.colors.magenta('Running in production mode.'));
//   gutil.log(gutil.colors.magenta('---------------------------'));
// }

const conf = new configRepo(baseConf);

// Load in all tasks.
gulp.task('sass', require('./src/tasks/sass')(conf));
gulp.task('js', require('./src/tasks/js')(conf));
gulp.task('images', require('./src/tasks/images')(conf));
gulp.task('fonts', require('./src/tasks/fonts')(conf));
gulp.task('clean', require('./src/tasks/clean')(conf));
gulp.task('build', require('./src/tasks/build'));