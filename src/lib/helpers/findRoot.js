'use strict';

const path = require('path');
const glob = require('glob');

/**
 * Find the root of a Drupal project.
 *
 * @throws {Error} Thrown if no Drupal root was found.
 *
 * @returns {String} The root to the Drupal installation from tools root.
 */
function findRoot() {

  let rootPath;

  try {
    rootPath = glob.sync('../**/Drupal.php', {ignore: ['../vendor/**', '../node_modules/**']});
  } catch (err) {
    throw new Error('No Drupal root found.');
  }

  // If we found no results for Drupal.php..then bomb out.
  if (rootPath.length === 0) {
    throw new Error('No Drupal root found.');
  }

  // Glob returns an array, even though we've only got one item.
  rootPath = rootPath[0];

  const filePathParts = rootPath.split(path.sep);
  const coreDirPosition = filePathParts.indexOf('core');

  // If we found a Drupal.php file, but no core directory..then bomb out.
  if (coreDirPosition === -1) {
    throw new Error('No Drupal root found.');
  }

  return filePathParts.slice(0, coreDirPosition).join(path.sep);

}

module.exports = findRoot;