'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Find the root of a Drupal project.
 *
 * @throws {Error} Thrown if no Drupal root was found.
 *
 * @todo Refactor this so it actually tried to find the root rathen than having a set of possibilities.
 *
 * @returns {String} The root to the Drupal installation.
 */
function findRoot() {

  const possibleRoots = [
    'web',
    'docroot'
  ];

  let rootPath;

  // Loop over each possibility.
  possibleRoots.forEach(function (value) {

    const fullRoot = path.resolve(path.join('..', value));

    // Look for the directory. If it exists, then that's what we want to return.
    try {
      fs.statSync(fullRoot);
      rootPath = fullRoot;
    } catch (err) {
      return false;
    }

  });

  if (typeof rootPath === 'undefined') {
    throw new Error('No Drupal root found.');
  }

  return rootPath;

}

module.exports = findRoot;