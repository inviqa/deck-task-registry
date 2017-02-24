'use strict';

const stylelint = require('gulp-stylelint');
const path = require('path');
const merge = require('merge');

/**
 * Lint project styles.
 *
 * @param {ConfigParser} conf A configuration parser object.
 * @param {Undertaker} undertaker An Undertaker instance.
 *
 * @returns {Stream} A stream of files.
 */
function lintStyles(conf, undertaker) {

  const sassSrc = path.join(conf.themeConfig.root, conf.themeConfig.sass.src, '**', '*.scss');

  let stylelintConf = {
    config: require('./stylelint.config'),
    reporters: [{
      formatter: 'string',
      console: true
    }],
    failAfterError: conf.productionMode
  };

  // If there are any stylelint overrides, then apply them now.
  if (conf.themeConfig.sass.hasOwnProperty('stylelint')) {
    stylelintConf = merge(stylelintConf, conf.themeConfig.sass.stylelint);
  }

  return undertaker.src(sassSrc)
    .pipe(stylelint(stylelintConf));

}

lintStyles.displayName = 'lint:styles';

module.exports = lintStyles;