'use strict';

describe("configRepository", function () {

  const configRepo = require('../../src/helpers/configRepository');
  const conf = require('../support/fixtures/config.json');
  conf.activeTheme = 'inviqa';
  conf.args = {
    'production': true
  };
  let repo;

  beforeEach(function () {
    repo = new configRepo(conf);
  });

  it('can be instantiated', function () {
    expect(repo).toBeDefined();
    expect(repo instanceof configRepo).toBeTruthy();
  });

  it('can access config properties', function () {
    expect(repo.args.production).toBeTruthy();
    expect(repo.activeTheme).toBe('inviqa');
  });

  it("can inform us if we're running with in prod module", function () {
    expect(repo.isProduction).toBeTruthy();
  });

  describe("SASS config", function () {

    it('gets the SASS source directory', function () {
      const sassSource = repo.sassSourceDir;
      expect(sassSource).toBe('themes/custom/inviqa/assets/src/sass');
    });

    it('gets the SASS destination directory', function () {
      const sassDest = repo.sassDestDir;
      expect(sassDest).toBe('themes/custom/inviqa/assets/dist/css');
    });

  });

  describe("JS config", function () {

    it('gets the JS source directory', function () {
      const jsSource = repo.jsSourceDir;
      expect(jsSource).toBe('themes/custom/inviqa/assets/src/js');
    });

    it('gets the JS destination directory', function () {
      const jsDest = repo.jsDestDir;
      expect(jsDest).toBe('themes/custom/inviqa/assets/dist/js');
    });

  });

  describe("Font config", function () {

    it('gets the font source directory', function () {
      const fontSource = repo.fontSourceDir;
      expect(fontSource).toBe('themes/custom/inviqa/assets/src/fonts');
    });

    it('gets the font destination directory', function () {
      const fontDest = repo.fontDestDir;
      expect(fontDest).toBe('themes/custom/inviqa/assets/dist/fonts');
    });

  });

  describe("Image config", function () {

    it('gets the image source directory', function () {
      const imageSource = repo.imageSourceDir;
      expect(imageSource).toBe('themes/custom/inviqa/assets/src/images');
    });

    it('gets the image destination directory', function () {
      const imageDest = repo.imageDestDir;
      expect(imageDest).toBe('themes/custom/inviqa/assets/dist/images');
    });

  });

});
