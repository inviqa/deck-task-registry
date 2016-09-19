// 'use strict';

// // Test helpers.
// const chai = require('chai');
// const expect = chai.expect;
// const chaiFiles = require('chai-files');
// chai.use(chaiFiles);
// const file = chaiFiles.file;
// const path = require('path');
// const del = require('del');

// // SUT.
// const buildStyles = require('../../../../src/lib/styles/buildStyles');

// const stubConfig = {
//   "defaultTheme": "deck",
//   "themes": {
//     "deck": {
//       'root': 'test/fixtures',
//       'sass': {
//         'src': 'assets/src/scss',
//         'dest': 'assets/dist/css'
//       }
//     }
//   }
// };
// const configParser = require('../../../../src/lib/config/configParser');

// describe('buildStyles', () => {

//   describe('dev mode', () => {

//     let parser;

//     beforeEach(() => {
//       parser = new configParser(stubConfig);
//       buildStyles(parser)();
//     });

//     afterEach((done) => {
//       del('./test/fixtures/assets/dist', {force: true}).then(() => {
//         done();
//       });
//     });

//     it('builds readable CSS', () => {
//       const cssFile = './test/fixtures/assets/dist/css/pristineSass.css';
//       expect(file(cssFile)).to.exist;
//     });

//     it('builds a sourcemap');

//   });

//   describe('production mode', () => {

//     it('builds compressed CSS');

//     it('does not build a sourcemap');

//   });
// });

