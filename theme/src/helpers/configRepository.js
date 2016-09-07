'use strict';

const path = require('path');

class configRepository {

  constructor(conf) {
    this.conf = conf;
  }

  get sassSourceDir() {
    return this.getSourceDir('sass');
  }

  get sassDestDir() {
    return this.getDestDir('sass');
  }

  get jsSourceDir() {
    return this.getSourceDir('js');
  }

  get jsDestDir() {
    return this.getDestDir('js');
  }

  get fontSourceDir() {
    return this.getSourceDir('fonts');
  }

  get fontDestDir() {
    return this.getDestDir('fonts');
  }

  get imageSourceDir() {
    return this.getSourceDir('images');
  }

  get imageDestDir() {
    return this.getDestDir('images');
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
    return path.join(
      this.activeThemeConf.root,
      this.activeThemeConf[type].src
    );
  }

  getDestDir(type) {
    return path.join(
      this.activeThemeConf.root,
      this.activeThemeConf[type].dest
    );
  }

}

module.exports = configRepository
