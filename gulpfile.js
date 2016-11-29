'use strict';

const gulp = require('gulp');
const inviqaDrupalRegistry = require('./src/registry');
const config = require('./config');
const registry = new inviqaDrupalRegistry(config);

gulp.registry(registry);
