const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');

module.exports = function () {

  const gulp = this.gulp;
  const conf = this.opts.themeConf;

  const sassSrc = path.join(conf.root, conf.sass.src, '**', '*.scss');
  const sassDest = path.join(conf.root, conf.sass.dest);

  const sassOpts = {
    outputStyle: 'compressed',
  }
  
  gulp.src(sassSrc)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOpts).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(sassDest));

}
