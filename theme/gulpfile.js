'use strict';

const baseConf = require('./config');
const gutil = require('gulp-util');
const configRepo = require('./helpers/configRepository');

// Assign all CLI arguments to the config object.
baseConf.args = require('minimist')(process.argv.slice(2), require('./helpers/cliOptions'));
// Assign the default theme that we should be working with to the global config.
baseConf.activeTheme = require('./helpers/getActiveTheme')(baseConf.args, baseConf);

if (baseConf.args.production) {
  gutil.log(gutil.colors.magenta('---------------------------'));
  gutil.log(gutil.colors.magenta('Running in production mode.'));
  gutil.log(gutil.colors.magenta('---------------------------'));
}

const conf = new configRepo(baseConf);

exports.sass = require('./tasks/sass')(conf);
