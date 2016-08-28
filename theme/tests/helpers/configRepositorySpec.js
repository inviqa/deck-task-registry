'use strict';

describe("configRepository", function () {

  const configRepo = require('../../helpers/configRepository');
  const conf = require('../../fixtures/config.json');
  console.log(conf);
  conf.activeTheme = 'inviqa';
  let repo;

  beforeEach(function () {
    repo = new configRepo(conf);
  });

  it('gets the SASS source directory', function (done) {
      // const sassSource = repo.getSourceDir('sass');
      // expect(sassSource).toBe('../../web/themes/custom/inviqa/assets/src/sass');
      // expect(false).toBeTruthy();
      expect(false).toBe(true);
      done();
  });

});
