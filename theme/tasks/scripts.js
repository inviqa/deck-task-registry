const sourcemaps = require('gulp-sourcemaps');
const path = require('path');
const ts = require('gulp-typescript');

module.exports = function () {

  const gulp = this.gulp;
  const conf = this.opts.themeConf;

  // We match for standard JS or TypeScript here. Either way we're piping
  // through the TypeScript compiler to optimise the scripts, we might as well
  // support TypeScript.
  const scriptSrc = path.join(conf.root, conf.sass.src, '**', '*.[jt]s');
  const scriptDest = path.join(conf.root, conf.sass.dest);

  gulp.src(scriptSrc)
    .pipe(sourcemaps.init())
    .pipe(ts())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(scriptDest))

}
