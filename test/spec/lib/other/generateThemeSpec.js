'use strict';

const mock = require('mock-fs');
const generateTheme = require('../../../../src/lib/other/generateTheme')();
const chai = require('chai');
const chaiFiles = require('chai-files');
const expect = chai.expect;

chai.use(chaiFiles);
const file = chaiFiles.file;
const dir = chaiFiles.dir;

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
                'SUBTHEME.theme': '<?php',
                'assets': {
                  'js': '.gitkeep',
                  'scss': '.gitkeep',
                  'images': '.gitkeep',
                  'fonts': '.gitkeep'
                }
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

  it('throws an error if Deck doesn\'t exist', function () {
    mock.restore();
    mock({
      '../docroot': {
        'themes': {
          'contrib': {
            'emptyDir': {}
          }
        }
      }
    });

    const generator = generateTheme;

    expect(generator()).to.throw(Error, 'Deck was not found.');

  });

  it('creates core files', function (done) {

    const generator = generateTheme();

    generator.on('finish', function () {

      const infoFile = file('../docroot/themes/custom/test/test.info.yml');
      const librariesFile = file('../docroot/themes/custom/test/test.libraries.yml');
      const themeFile = file('../docroot/themes/custom/test/test.theme');

      expect(infoFile).to.exist;
      expect(librariesFile).to.exist;
      expect(themeFile).to.exist;

      done();

    });

  });

  it('creates the assets directories', function (done) {

    const generator = generateTheme();

    generator.on('finish', function () {

      const assetsDir = dir('../docroot/themes/custom/test/assets');
      const sassDir = dir('../docroot/themes/custom/test/assets/scss');
      const jsDir = dir('../docroot/themes/custom/test/assets/js');
      const fontsDir = dir('../docroot/themes/custom/test/assets/fonts');
      const imagesDir = dir('../docroot/themes/custom/test/assets/images');

      require('fs').readdir('../docroot/themes/custom/test/assets', function (err, files) {
        console.log(files);
      });

      expect(assetsDir).to.exist;
      expect(sassDir).to.exist;
      expect(jsDir).to.exist;
      expect(fontsDir).to.exist;
      expect(imagesDir).to.exist;


      done();

    });

  });

});