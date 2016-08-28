'use strict';

class configRepository {

  constructor(conf) {
    this.path = require('path');
    this.conf = conf;
    this.activeTheme  = conf.activeTheme;
    this.activeThemeConf = conf.themes[conf.activeTheme];
  }

  get sassSourceDir() {
    return this.getSourceDir('sass')
  }

  get sassDestDir() {
    return this.getDestDir('sass');
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
