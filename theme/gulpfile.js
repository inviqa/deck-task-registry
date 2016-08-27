const gulp = require('gulp');
const conf = require('./config');

const activeTheme = 'inviqa';

require('gulp-task-loader')({
  conf: conf,
  gulp:gulp,
  themeConf: conf.themes[activeTheme],
  activeTheme: activeTheme
});
