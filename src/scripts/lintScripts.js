'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const gulpIf = require('gulp-if');
const path = require('path');

function lintScripts(conf) {

  let jsDirs = conf.themeConfig.js.src;
  if (!Array.isArray(jsDirs)) {
    jsDirs = [ jsDirs ];
  }

  const jsSrc = jsDirs.map(dir => {
    return path.join(conf.themeConfig.root, dir, '**', '*.[tj]s');
  });

  // Lint theme scripts with ESLint. This won't touch any TypeScript files.
  return gulp.src(jsSrc)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulpIf(conf.productionMode, eslint.failAfterError()));

}

lintScripts.displayName = 'lint:scripts';

module.exports = lintScripts;