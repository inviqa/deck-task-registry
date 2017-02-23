'use strict';

const holograph = require('holograph');
const path = require('path');
const merge = require('merge');
const log = require('gulplog');
const isPlainObj = require('is-plain-obj');

function buildHolograph(conf, cb) {

  let sassDirs = conf.themeConfig.sass.src;
  if (!Array.isArray(sassDirs)) {
    sassDirs = [ sassDirs ];
  }

  const sassPath = sassDirs.map(dir => {
    return path.join(conf.themeConfig.root, dir, '**', '*.scss');
  });

  if (Boolean(conf.themeConfig.sass.holograph) === false) {
    log.info('Skipping Holograph...');
    cb();
    return;
  }

  let holographConfig = {
    source: sassPath,
    destination: path.join(conf.themeConfig.root, 'holograph'),
    documentation_assets: path.resolve(path.join(process.cwd(), '/node_modules/holograph/assets')),
    dependencies: [
      path.join(conf.themeConfig.root, conf.themeConfig.sass.dest)
    ],
    css_include: [
      'css/main.css'
    ],
    exit_on_warnings: conf.productionMode,
    global_title: process.cwd().split(path.sep).slice(-2, -1)
  };

  // Merge any defined config in with the default config.
  if (isPlainObj(conf.themeConfig.sass.holograph)) {
    holographConfig = merge(holographConfig, conf.themeConfig.sass.holograph);
  }

  holograph.holograph(holographConfig, cb);

}

buildHolograph.displayName = 'build:holograph';

module.exports = buildHolograph;