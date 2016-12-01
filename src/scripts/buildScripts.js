'use strict';

const gulp = require('gulp');
const path = require('path');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');

function buildScripts(conf) {

  function task() {

    const uglifyConf = {
      mangle: false
    };

    const jsSrc = path.join(conf.themeConfig.root, conf.themeConfig.js.src, '**', '*.js');
    const jsDest = path.join(conf.themeConfig.root, conf.themeConfig.js.dest);

    // Build the theme scripts.
    return gulp.src(jsSrc)
      .pipe(gulpIf(!conf.productionMode, sourcemaps.init()))
      .pipe(gulpIf(conf.productionMode, uglify(uglifyConf)))
      .pipe(gulpIf(!conf.productionMode, sourcemaps.write('.')))
      .pipe(gulp.dest(jsDest));

  }

  task.displayName = 'build:scripts';

  return task;

}

module.exports = buildScripts;