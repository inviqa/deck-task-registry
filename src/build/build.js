'use strict';

/**
 * Run all test and build tasks with maximum concurrency.
 *
 * @param {ConfigParser} conf A configuration parser object.
 * @param {Undertaker} undertaker An Undertaker instance.
 * @param {Function} done A callback to call on task completion/
 *
 * @returns {Stream} A stream of files.
 */
function build (conf, undertaker, done) {
  return undertaker.series(
    require('./clean').bind(null, conf, undertaker),
    undertaker.parallel(
      require('../scripts/lintScripts').bind(null, conf, undertaker),
      require('../styles/lintStyles').bind(null, conf, undertaker)
    ),
    undertaker.parallel(
      require('../scripts/buildScripts').bind(null, conf, undertaker),
      require('../styles/buildStyles').bind(null, conf, undertaker),
      require('../assets/buildImages').bind(null, conf, undertaker),
      require('../assets/buildFonts').bind(null, conf, undertaker)
    ),
    require('../styles/holograph').bind(null, conf, undertaker)
  )(done);
}

build.displayName = 'build';

module.exports = build;
