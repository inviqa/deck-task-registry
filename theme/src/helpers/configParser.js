'use strict';
const minimist = require('minimist');

class configRepository {

  constructor(config) {
    this.config = config;
    this.args = minimist(process.argv.slice(2), require('./cliOptions'));
  }

  get activeTheme() {
    return this.args.theme || this.config.defaultTheme;
  }

  get themeConfig() {
    return this.config.themes[this.activeTheme];
  }

}

module.exports = configRepository;
