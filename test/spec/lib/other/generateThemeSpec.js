'use strict';

const mock = require('mock-fs');
const chai = require('chai');
const chaiFiles = require('chai-files');
const expect = chai.expect;

chai.use(chaiFiles);
const file = chaiFiles.file;
const dir = chaiFiles.dir;
const proxyquire = require('proxyquire').noCallThru();
const generateTheme = proxyquire('../../../../src/lib/other/generateTheme', {
  '../helpers/findRoot': function () {
    return '../docroot';
  }
})();

describe('generateTheme', function () {

  // The generator os slow, even with a mocked Drupal root finder :(.
  this.timeout(0);

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
                  'src': {
                    'js': {
                      '.gitkeep': ''
                    },
                    'sass': {
                      'main.scss': '.foo {color: red};'
                    },
                    'fonts': {
                      '.gitkeep': ''
                    }
                  }
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

    expect(generateTheme).to.throw(Error, 'Deck was not found.');

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

      const assetsDir = dir('../docroot/themes/custom/test/assets/src');
      const sassDir = file('../docroot/themes/custom/test/assets/src/sass/main.scss');
      const jsDir = file('../docroot/themes/custom/test/assets/src/js/.gitkeep');
      const fontsDir = file('../docroot/themes/custom/test/assets/src/fonts/.gitkeep');

      expect(assetsDir).to.exist;
      expect(sassDir).to.exist;
      expect(jsDir).to.exist;
      expect(fontsDir).to.exist;

      done();

    });

  });

});