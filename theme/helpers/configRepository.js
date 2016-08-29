'use strict';

class configRepository {

  constructor(conf) {
    this.path = require('path');
    this.conf = conf;
  }

  get sassSourceDir() {
    return this.getSourceDir('sass')
  }

  get sassDestDir() {
    return this.getDestDir('sass');
  }

  get args() {
    return this.conf.args;
  }

  get activeTheme() {
    return this.conf.activeTheme;
  }

  get activeThemeConf() {
    return this.conf.themes[this.activeTheme];
  }

  get isProduction() {
    return this.args.production || false;
  }

  getSourceDir(type) {
    return this.path.join(
      this.activeThemeConf.root,
      this.activeThemeConf[type].src
    );
  }

  getDestDir(type) {
    return this.path.join(
      this.activeThemeConf.root,
      this.activeThemeConf[type].dest
    );
  }

}

module.exports = configRepository
