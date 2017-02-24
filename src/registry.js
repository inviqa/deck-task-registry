'use strict';

const DefaultRegistry = require('undertaker-registry');
const configParser = require('./config/configParser');
const gutil = require('gulp-util');

/**
 * Custom Gulp registry containing Drupal tasks.
 *
 * @class DrupalTaskRegistry
 * @extends {DefaultRegistry}
 */
class DrupalTaskRegistry extends DefaultRegistry {

  /**
   * Creates an instance of DrupalTaskRegistry.
   *
   * @param {object|ConfigParser} conf Configuration object.
   *
   * @memberOf DrupalTaskRegistry
   */
  constructor(conf) {
    super();

    // If we've got no config, then bomb out.
    if (typeof conf === 'undefined') {
      throw new Error('No config provided.');
    }

    // If we've got config, but it's just an object, then make it a configParser instance.
    if (conf.constructor.name !== 'configParser') {
      conf = new configParser(conf);
    }

    if (conf.productionMode) {
      gutil.log(gutil.colors.magenta('---------------------------'));
      gutil.log(gutil.colors.magenta('Running in production mode.'));
      gutil.log(gutil.colors.magenta('---------------------------'));
    }

    this.conf = conf;

  }

  /**
   * @inheritdoc
   *
   * @param {object|Undertaker} undertaker An Undertaker instance (i.e. Gulp).
   *
   * @memberOf DrupalTaskRegistry
   */
  init(undertaker) {

    // Store the instance of the Undertaker.
    this.undertaker = undertaker;

    // SASS/CSS.
    undertaker.task(require('./styles/buildStyles'));
    undertaker.task(require('./styles/lintStyles'));
    undertaker.task(require('./styles/holograph'));

    // SCRIPTS.
    undertaker.task(require('./scripts/buildScripts'));
    undertaker.task(require('./scripts/lintScripts'));

    // OTHER ASSETS.
    undertaker.task(require('./assets/buildImages'));
    undertaker.task(require('./assets/buildFonts'));
    undertaker.task(require('./build/clean'));

    // ANCILLIARY.
    undertaker.task(require('./other/generateTheme'));
    undertaker.task(require('./other/watch'));

    // NAMED TASKS.
    // These are required as just passing undertaker.series means that you can't flag async completion.
    undertaker.task('build', require('./build/build'));

    undertaker.task('default', function defaultTask(conf, undertaker, done) {
      return undertaker.series(
        'build',
        'watch'
      )(done);
    });

  }

  /**
   * @inheritdoc
   *
   * @memberOf DrupalTaskRegistry
   */
  set(name, fn) {
    const task = this._tasks[name] = fn.bind(null, this.conf, this.undertaker);
    return task;
  }

}

module.exports = DrupalTaskRegistry;