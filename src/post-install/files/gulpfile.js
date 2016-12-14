'use strict';

const gulp = require('gulp');
const drupalTaskRegistry = require('drupal-task-registry');
const config = require('./config');
const registry = new drupalTaskRegistry(config);

gulp.registry(registry);
