'use strict';

/**
 * The default task to be run.
 *
 * @param {ConfigParser} conf A configuration parser object.
 * @param {Undertaker} undertaker An Undertaker instance.
 *
 * @returns {Stream} A stream of files.
 */
function defaultTask(conf, undertaker, done) {
  return undertaker.series(
    require('../build/build').bind(null, conf, undertaker),
    require('../other/watch').bind(null, conf, undertaker)
  )(done);
}

defaultTask.displayName = 'default';

module.exports = defaultTask;