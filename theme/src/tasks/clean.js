'use strict';

const gulp = require('gulp');
const del = require('del');

module.exports = conf => () => {

  const deletePaths = [
    conf.sassDestDir,
    conf.jsDestDir,
    conf.imageDestDir,
    conf.fontDestDir
  ];

  // Delete all build dirs.
  return del(deletePaths, {force: true});

};