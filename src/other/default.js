'use strict';

const gulp = require('gulp');

function defaultTask(conf) {

  function task() {

    return gulp.series(
      require('../build/build')(conf)(),
      require('../other/watch')(conf)()
    )();

  }

  task.displayName = 'default';

  return task;

}

function foo(conf, taker, cb) {
  return taker.series('build', 'watch');
}

foo.displayName = 'default';

module.exports = foo;