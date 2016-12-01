'use strict';

const fs = require('fs');

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

module.exports = copyFile;