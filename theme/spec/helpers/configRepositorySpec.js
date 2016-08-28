'use strict';

describe("configRepository", function () {

  const configRepo = require('../../helpers/configRepository');
  const conf = require('../specHelpers/fixtures/config.json');
  conf.activeTheme = 'inviqa';
  let repo;

  beforeEach(function () {
    repo = new configRepo(conf);
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
