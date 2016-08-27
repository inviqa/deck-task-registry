'use strict';

const gulp = require('gulp');
const conf = require('./config');
const minimist = require('minimist');
const gutil = require('gulp-util');
const activeTheme = 'inviqa';

const cliOpts = {
  string: [
    'theme'
  ],
  bool: [
    'production'
  ],
  alias: {
    'production': [
      'prod'
    ]
  },
  default: {
    'production': false,
    'theme': conf.defaultTheme || ''
  }
}

// Assign all CLI arguments to the config object.
conf.args = minimist(process.argv.slice(2), cliOpts);

if (conf.args.production) {
    gutil.log(gutil.colors.magenta('---------------------------'));
    gutil.log(gutil.colors.magenta('Running in production mode.')),
    gutil.log(gutil.colors.magenta('---------------------------'));
}

require('gulp-task-loader')({
  conf: conf,
  gulp:gulp,
  themeConf: conf.themes[activeTheme],
  activeTheme: activeTheme
});
