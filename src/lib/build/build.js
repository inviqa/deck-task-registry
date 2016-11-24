'use strict';

const runSequence = require('run-sequence');

module.exports = () => (cb) => {

  return runSequence(
    'build:clean',
    'lint:scripts',
    ['build:styles', 'build:scripts', 'build:images', 'build:fonts'],
    cb
  );

};