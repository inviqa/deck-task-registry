'use strict';

const gulp = require('gulp');
const path = require('path');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');

function buildScripts(conf) {

  const uglifyConf = {
    mangle: false
  };

  const typeScriptConf = {
    target: 'es5',
    allowJs: true
  };

  const jsSrc = path.join(conf.themeConfig.root, conf.themeConfig.js.src, '**', '*.[tj]s');
  const jsDest = path.join(conf.themeConfig.root, conf.themeConfig.js.dest);

  const useTypescript = Boolean(conf.themeConfig.js.es2015);

  // Build the theme scripts.
  return gulp.src(jsSrc)
    .pipe(gulpIf(!conf.productionMode, sourcemaps.init()))
    .pipe(gulpIf(useTypescript, ts(typeScriptConf)))
    .pipe(gulpIf(conf.productionMode, uglify(uglifyConf)))
    .pipe(gulpIf(!conf.productionMode, sourcemaps.write('.')))
    .pipe(gulp.dest(jsDest));

}

buildScripts.displayName = 'build:scripts';

module.exports = buildScripts;