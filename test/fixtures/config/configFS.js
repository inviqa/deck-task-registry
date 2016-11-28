'use strict';

// This contains a mock filesystem that mirrors the configuration fixture in this directory.

const getFixture = require('../getFixture');

module.exports = {
  '../../web/themes/custom/deck': {
    'assets': {
      'src': {
        'scss': {
          'main.scss': getFixture('assets/src/scss/pristineSass.scss')
        },
        'js': {
          'pristine.js': getFixture('assets/src/js/pristineJs.js')
        },
        'fonts': {},
        'images': {}
      }
    }
  }
};