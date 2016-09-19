'use strict';

const minimist = require('minimist');

/**
 * Take a config object and make the theme specific configuration available.
 *
 * @class configParser
 */
class configParser {

  /**
   * Creates an instance of configParser.
   *
   * @param {object} config A config object.
   *
   * @memberOf configParser
   */
  constructor(config) {
    this.config = config;
    this.args = minimist(process.argv.slice(2), require('./cliOptions'));
  }

  /**
   * The active theme from configuration or command line.
   *
   * @readonly
   *
   * @memberOf configParser
   */
  get activeTheme() {
    return this.args.theme || this.config.defaultTheme;
  }

  /**
   * Theme configuration for the active theme.
   *
   * @readonly
   *
   * @memberOf configParser
   */
  get themeConfig() {
    return this.config.themes[this.activeTheme];
  }

  /**
   * Whether or not production mode is enabled.
   *
   * @readonly
   *
   * @memberOf configParser
   */
  get productionMode() {
    return this.args.production;
  }

}

module.exports = configParser;
