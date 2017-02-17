'use strict';

const gulp = require('gulp');
const stylelint = require('gulp-stylelint');
const path = require('path');
const merge = require('merge');

function lintStyles(conf) {

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

  // Lint theme scripts with ESLint. This won't touch any TypeScript files.
  return gulp.src(sassSrc)
    .pipe(stylelint(stylelintConf));

}

lintStyles.displayName = 'lint:styles';

module.exports = lintStyles;