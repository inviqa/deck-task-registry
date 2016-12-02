'use strict';

const path = require('path');
const copyFile = require('../helpers/copyFile');

/**
 * Copy the base files into the user's current working directory.
 */
module.exports = function () {
  // Copy Gulpfile.
  const gulpFile = path.join(__dirname, 'files', 'gulpfile.js');
  const gulpFileDest = path.join(process.cwd(), 'gulpfile.js');

  copyFile(gulpFile, gulpFileDest);

  // Copy default config.
  const configFile = path.join(__dirname, 'files', 'config.example.js');
  const configFileDest = path.join(process.cwd(), 'config.js');

  copyFile(configFile, configFileDest);

};