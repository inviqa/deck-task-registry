'use strict';

const eslint = require('gulp-eslint');
const gulpIf = require('gulp-if');
const path = require('path');

/**
 * Lint project scripts.
 *
 * @param {ConfigParser} conf A configuration parser object.
 * @param {Undertaker} undertaker An Undertaker instance.
 *
 * @returns {Stream} A stream of files.
 */
function lintScripts(conf, undertaker) {

  const jsSrc = path.join(conf.themeConfig.root, conf.themeConfig.js.src, '**', '*.js');

  // Lint theme scripts with ESLint. This won't touch any TypeScript files.
  return undertaker.src(jsSrc)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulpIf(conf.productionMode, eslint.failAfterError()));

}

lintScripts.displayName = 'lint:scripts';

module.exports = lintScripts;