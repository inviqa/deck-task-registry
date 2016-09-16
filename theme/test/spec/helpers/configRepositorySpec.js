'use strict';

// Test helpers.
const chai = require('chai');
const expect = chai.expect;
const cloneDeep = require('lodash.clonedeep');

// Test subjects.
const config = require('../../fixtures/config.json');
const configRepo = require('../../../src/helpers/configRepository');

describe('configRepository', () => {

  describe('settings via config file', () => {

    let repo;

    beforeEach(() => {

      repo = new configRepo(config);

    });

    it('should get the active theme', () => {

      expect(repo.activeTheme).to.equal('deck');

    });

  });

  describe('setting via command line arguments', () => {

    let originalArgs;
    let repo;

    beforeEach(() => {

      // We take a backup of the current CLI arguments so we can restore them later.
      originalArgs = cloneDeep(process.argv);

      // Stub our normal expectations.
      process.argv = [
        'gulp',
        'sass',
        '--theme=inviqa'
      ];

      repo = new configRepo(config);

    });

    afterEach(() => {

      // Reset process arguments back to their original state.
      process.argv = originalArgs;

    });

    it('should allow for an active theme to be passed on the command line', () => {

      expect(repo.activeTheme).to.equal('inviqa');

    });

  });

});
