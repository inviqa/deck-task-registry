'use strict';

// Test helpers.
const chai = require('chai');
const expect = chai.expect;
const chaiDeepMatch = require('chai-deep-match');
const cloneDeep = require('lodash.clonedeep');

// Chai plugins.
chai.use(chaiDeepMatch);

// Test subjects.
const config = require('../../../fixtures/config/config.json');
const configParser = require('../../../../src/lib/config/configParser');

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
      expect(parser.themeConfig).to.deep.match(themeConfigFixture);
    });

  });

  describe('setting via command line arguments', () => {

    let originalArgs;
    let parser;

    beforeEach(() => {

      // We take a backup of the current CLI arguments so we can restore them later.
      originalArgs = cloneDeep(process.argv);

      // Stub our normal expectations.
      process.argv = [
        'gulp',
        'sass',
        '--theme=inviqa'
      ];

      parser = new configParser(config);

    });

    afterEach(() => {
      // Reset process arguments back to their original state.
      process.argv = originalArgs;
    });

    it('should allow for an active theme to be passed on the command line', () => {
      expect(parser.activeTheme).to.equal('inviqa');
    });

    it('gets the active theme configuration', () => {
      const themeConfigFixture = config.themes.inviqa;
      expect(parser.themeConfig).to.deep.match(themeConfigFixture);
    });

  });

  describe('production mode', () => {

    describe('enabled', () => {

      let originalArgs;
      let parser;

      beforeEach(() => {
        // We take a backup of the current CLI arguments so we can restore them later.
        originalArgs = cloneDeep(process.argv);

        process.argv = [
          'gulp',
          'sass',
          '--production'
        ];

        parser = new configParser(config);
      });

      afterEach(() => {
        // Reset process arguments back to their original state.
        process.argv = originalArgs;
      });

      it('shows production mode as true if production is set', () => {
        expect(parser.productionMode).to.be.true;
      });

    });

    describe('disabled', () => {

      let parser;

      beforeEach(() => {
        parser = new configParser(config);
      });

      it('shows production mode as true if production is set', () => {
        expect(parser.productionMode).to.be.false;
      });

    });

  });

});
