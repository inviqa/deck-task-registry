'use strict';

const path = require('path');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

module.exports = conf => () => {

  // Config that gets passed to node-sass.
  const sassConfig = {
    includePaths: [
      require('bourbon').includePaths,
      require('bourbon-neat').includePaths
    ]
  };

  // If we're in production mode, then compress the output CSS.
  if (conf.isProduction) {
    sassConfig.outputStyle = 'compressed';
  }

  // Any PostCSS conf and settings.
  const postCSSConf = [
    autoprefixer({
      browsers: conf.themeConfig.sass.browserSupport || 'last 2 versions'
    })
  ];

  // The task itself.
  return gulp.src(path.join(conf.themeConfig.root, conf.themeConfig.sass.src, '**', '*.scss'))
    .pipe(gulpIf(!conf.isProduction, sourcemaps.init()))
    .pipe(sass(sassConfig).on('error', sass.logError))
    // .pipe(postcss(postCSSConf))
    .pipe(gulpIf(!conf.isProduction, sourcemaps.write('.')))
    .pipe(gulp.dest(path.join(conf.themeConfig.root, conf.themeConfig.sass.dest)));

};
