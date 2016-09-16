'use strict';

// Test helpers.
const chai = require('chai');
const expect = chai.expect;
const cloneDeep = require('lodash.clonedeep');

// Test subjects.
const config = require('../../fixtures/config.json');
const configParser = require('../../../src/helpers/configParser');

describe('configParser', () => {

  describe('settings via config file', () => {

    let parser;

    beforeEach(() => {

      parser = new configParser(config);

    });

    it('gets the active theme', () => {

      expect(parser.activeTheme).to.equal('deck');

    });


    it('gets the active theme configuration', () => {

      const themeConfigFixture = config.themes.deck;

      expect(parser.themeConfig).to.equal(themeConfigFixture);

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

      repo = new configParser(config);

    });

    afterEach(() => {

      // Reset process arguments back to their original state.
      process.argv = originalArgs;

    });

    it('should allow for an active theme to be passed on the command line', () => {

      expect(repo.activeTheme).to.equal('inviqa');

    });

    it('gets the active theme configuration', () => {

      const themeConfigFixture = config.themes.inviqa;

      expect(repo.themeConfig).to.equal(themeConfigFixture);

    });

  });

});
