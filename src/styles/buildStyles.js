'use strict';

const path = require('path');
const gulpIf = require('gulp-if');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

/**
 * Build project styles.
 *
 * @param {ConfigParser} conf A configuration parser object.
 * @param {Undertaker} undertaker An Undertaker instance.
 *
 * @returns {Stream} A stream of files.
 */
function buildStyles(conf, undertaker) {

    // Config that gets passed to node-sass.
    const sassConfig = conf.themeConfig.sass.nodeSassConf || {};

    // If we're in production mode, then compress the output CSS.
    if (conf.productionMode) {
      sassConfig.outputStyle = 'compressed';
    }

    // Any PostCSS conf and settings.
    const postCSSConf = [
      autoprefixer({
        browsers: conf.themeConfig.sass.browserSupport || 'last 2 versions'
      })
    ];

    const sassSrc = path.join(conf.themeConfig.root, conf.themeConfig.sass.src, '**', '*.scss');
    const sassDest = path.join(conf.themeConfig.root, conf.themeConfig.sass.dest);

    // The task itself.
    return undertaker.src(sassSrc)
      .pipe(gulpIf(!conf.productionMode, sourcemaps.init()))
      .pipe(sass(sassConfig).on('error', sass.logError))
      .pipe(postcss(postCSSConf))
      .pipe(gulpIf(!conf.productionMode, sourcemaps.write('.')))
      .pipe(undertaker.dest(sassDest));

}

buildStyles.displayName = 'build:styles';

module.exports = buildStyles;