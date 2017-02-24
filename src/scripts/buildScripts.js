'use strict';

const path = require('path');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');

/**
 * Build project scripts.
 *
 * @param {ConfigParser} conf A configuration parser object.
 * @param {Undertaker} undertaker An Undertaker instance.
 *
 * @returns {Stream} A stream of files.
 */
function buildScripts(conf, undertaker) {

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
  return undertaker.src(jsSrc)
    .pipe(gulpIf(!conf.productionMode, sourcemaps.init()))
    .pipe(gulpIf(useTypescript, ts(typeScriptConf)))
    .pipe(gulpIf(conf.productionMode, uglify(uglifyConf)))
    .pipe(gulpIf(!conf.productionMode, sourcemaps.write('.')))
    .pipe(undertaker.dest(jsDest));

}

buildScripts.displayName = 'build:scripts';

module.exports = buildScripts;