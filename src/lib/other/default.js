'use strict';

const runSequence = require('run-sequence');

module.exports = () => {

  return runSequence('build', 'watch');

};