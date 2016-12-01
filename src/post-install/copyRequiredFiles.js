'use strict';

const fs = require('fs');
const path = require('path');
const logger = require('../helpers/logger');

/**
 * Copy a file.
 *
 * @param {String} source The path of the file to copy.
 * @param {String} dest The destination of the file.
 *
 * @returns {WriteStream} The stream that has been written.
 */
function copyFile(source, dest) {

  fs.stat(dest, function (err, stats) {

    // If there was an error that is NOT that the file doesn't exist, then throw it.
    if (err && err.code !== 'ENOENT') {
      throw new Error(err);
    }

    // If the file exists then skip it.
    if (typeof stats === 'object') {
      process.stdout.write(`File exists: skipping (${dest})\n`);
    }

    return fs.createReadStream(source)
      .pipe(fs.createWriteStream(dest));

  });

}

// Copy Gulpfile.
const gulpFile = path.join(__dirname, 'files', 'gulpfile.js');
const gulpFileDest = path.join(process.cwd(), 'gulpfile.js');

copyFile(gulpFile, gulpFileDest);

// Copy default config.
const configFile = path.join(__dirname, 'files', 'config.example.js');
const configFileDest = path.join(process.cwd(), 'config.js');

copyFile(configFile, configFileDest);