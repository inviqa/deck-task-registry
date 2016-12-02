'use strict';

const gulp = require('gulp');
const inviqaDrupalRegistry = require('inviqa-drupal-gulp-registry');
const config = require('./config');
const registry = new inviqaDrupalRegistry(config);

gulp.registry(registry);
