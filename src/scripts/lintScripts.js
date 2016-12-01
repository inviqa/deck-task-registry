'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const gulpIf = require('gulp-if');
const path = require('path');

function lintScripts(conf) {

  function task() {

    const jsSrc = path.join(conf.themeConfig.root, conf.themeConfig.js.src, '**', '*.js');

    // Lint theme scripts with ESLint. This won't touch any TypeScript files.
    return gulp.src(jsSrc)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(gulpIf(conf.productionMode, eslint.failAfterError()));

  }

  task.displayName = 'lint:scripts';

  return task;

}

module.exports = lintScripts;