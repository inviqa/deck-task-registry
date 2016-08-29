'use strict';

describe("configRepository", function () {

  const configRepo = require('../../helpers/configRepository');
  const conf = require('../specHelpers/fixtures/config.json');
  conf.activeTheme = 'inviqa';
  conf.args = {
    'production': true
  }
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
      expect(sassSource).toBe('../../web/themes/custom/inviqa/assets/src/sass');
    });

    it('gets the SASS destination directory', function () {
      const sassDest = repo.sassDestDir;
      expect(sassDest).toBe('../../web/themes/custom/inviqa/assets/dist/css')
    });

  })

});
