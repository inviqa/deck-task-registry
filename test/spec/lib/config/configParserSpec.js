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
const configParser = require('../../../../src/config/configParser');

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

    // Take a backup of argv and env so we can restore them post-test.
    const originalArgs = cloneDeep(process.argv);
    const originalEnv = cloneDeep(process.env);

    afterEach(() => {
      process.env = originalEnv;
      process.argv = originalArgs;
    });

    it('is disabled by default', () => {
      const parser = new configParser(config);
      expect(parser.productionMode).to.be.false;
    });

    it('is enabled if NODE_ENV is set to production', () => {
      process.env.NODE_ENV = 'production';
      const parser = new configParser(config);
      expect(parser.productionMode).to.be.true;
    });

    it('is enabled if --production flag is passed', () => {
      process.argv = [
        'gulp',
        'sass',
        '--production'
      ];

      const parser = new configParser(config);
      expect(parser.productionMode).to.be.true;
    });

  });

});