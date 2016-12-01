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
    undertaker.task('build:styles', require('./styles/buildStyles')(this.conf));

    // SCRIPTS.
    undertaker.task('build:scripts', require('./scripts/buildScripts')(this.conf));
    undertaker.task('lint:scripts', require('./scripts/lintScripts')(this.conf));

    // OTHER ASSETS.
    undertaker.task('build:images', require('./assets/buildImages')(this.conf));
    undertaker.task('build:fonts', require('./assets/buildFonts')(this.conf));
    undertaker.task('build:clean', require('./build/clean')(this.conf));

    // BUILD.
    undertaker.task('build', require('./build/build')(this.conf));

    // ANCILLIARY.
    undertaker.task('generate-subtheme', require('./other/generateTheme')());
    undertaker.task('watch', require('./other/watch')(this.conf));
    undertaker.task('default', require('./other/default')(this.conf));

  }

}

module.exports = InviqaDrupalRegistry;