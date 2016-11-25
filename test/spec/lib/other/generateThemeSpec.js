'use strict';

const mock = require('mock-fs');
const generateTheme = require('../../../../src/lib/other/generateTheme')();
const chai = require('chai');
const chaiFiles = require('chai-files');
const expect = chai.expect;

chai.use(chaiFiles);
const file = chaiFiles.file;

describe('generateTheme', function () {

  beforeEach(function () {
    mock({
      '../docroot': {
        'themes': {
          'contrib': {
            'deck': {
              'subtheme': {
                'SUBTHEME.info.yml': 'name: {{ SUBTHEME }}',
                'SUBTHEME.libraries.yml': '',
                'SUBTHEME.theme': '<?php'
              },
            }
          }
        }
      }
    });
  });

  afterEach(function () {
    mock.restore();
  });

  it('creates core files', function (done) {

    const generator = generateTheme();

    generator.on('end', function () {

      const infoFile = file('../docroot/themes/custom/test/test.info.yml');
      const librariesFile = file('../docroot/themes/custom/test/test.libraries.yml');
      const themeFile = file('../docroot/themes/custom/test/test.theme');

      expect(infoFile).to.exist;
      expect(librariesFile).to.exist;
      expect(themeFile).to.exist;

      done();

    });

  });

});