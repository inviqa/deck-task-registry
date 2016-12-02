'use strict';

const path = require('path');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function buildStyles(conf) {

    // Config that gets passed to node-sass.
    const sassConfig = {
      includePaths: [
        require('bourbon').includePaths,
        require('bourbon-neat').includePaths
      ]
    };

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
    return gulp.src(sassSrc)
      .pipe(gulpIf(!conf.productionMode, sourcemaps.init()))
      .pipe(sass(sassConfig).on('error', sass.logError))
      .pipe(postcss(postCSSConf))
      .pipe(gulpIf(!conf.productionMode, sourcemaps.write('.')))
      .pipe(gulp.dest(sassDest));

}

buildStyles.displayName = 'build:styles';

module.exports = buildStyles;