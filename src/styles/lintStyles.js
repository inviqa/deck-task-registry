'use strict';

const gulp = require('gulp');
const stylelint = require('gulp-stylelint');
const path = require('path');

function lintStyles(conf) {

  const sassSrc = path.join(conf.themeConfig.root, conf.themeConfig.sass.src, '**', '*.scss');

  const stylelintConf = {
    config: require('./stylelint.config'),
    reporters: [{
      formatter: 'string',
      console: true
    }],
    failAfterError: conf.productionMode
  };

  // Lint theme scripts with ESLint. This won't touch any TypeScript files.
  return gulp.src(sassSrc)
    .pipe(stylelint(stylelintConf));

}

lintStyles.displayName = 'lint:styles';

module.exports = lintStyles;