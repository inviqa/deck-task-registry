'use strict';

const DefaultRegistry = require('undertaker-registry');
const configParser = require('./config/configParser');
const gutil = require('gulp-util');

/**
 * Custom Gulp registry containing Drupal tasks.
 *
 * @class InviqaDrupalRegistry
 * @extends {DefaultRegistry}
 */
class InviqaDrupalRegistry extends DefaultRegistry {

  /**
   * Creates an instance of InviqaDrupalRegistry.
   *
   * @param {object|ConfigParser} conf Configuration object.
   *
   * @memberOf InviqaDrupalRegistry
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
   * @memberOf InviqaDrupalRegistry
   */
  init(undertaker) {

    // SASS/CSS.
    undertaker.task(require('./styles/buildStyles'));

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
    undertaker.task('build', function buildTask(conf, done) {
      return undertaker.series(
        'build:clean',
        'lint:scripts',
        undertaker.parallel(
          'build:scripts',
          'build:styles',
          'build:images',
          'build:fonts'
        )
      )(done);
    });

    undertaker.task('default', function defaultTask(conf, done) {
      return undertaker.series(
        'build',
        'watch'
      )(done);
    });

  }

  /**
   * @inheritdoc
   *
   * @memberOf InviqaDrupalRegistry
   */
  set(name, fn) {
    const task = this._tasks[name] = fn.bind(null, this.conf);
    return task;
  }

}

module.exports = InviqaDrupalRegistry;