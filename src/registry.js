  'use strict';

  const defaultRegistry = require('undertaker-registry');
  const configParser = require('./config/configParser');

  class InviqaDrupalRegistry extends defaultRegistry {

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

      this.conf = conf;

    }

    init () {

      // SASS/CSS.
      this.set('build:styles', require('./styles/buildStyles')(this.conf));

      // SCRIPTS.
      this.set('build:scripts', require('./scripts/buildScripts')(this.conf));
      this.set('lint:scripts', require('./scripts/lintScripts')(this.conf));

      // OTHER ASSETS.
      this.set('build:images', require('./assets/buildImages')(this.conf));
      this.set('build:fonts', require('./assets/buildFonts')(this.conf));
      this.set('build:clean', require('./build/clean')(this.conf));

      // BUILD.
      this.set('build', require('./build/build')(this.conf));

      // ANCILLIARY.
      this.set('generate-subtheme', require('./other/generateTheme')());
      this.set('watch', require('./other/watch')(this.conf));
      this.set('default', require('./other/default')(this.conf));

    }

  }

  module.exports = InviqaDrupalRegistry;