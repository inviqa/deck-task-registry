'use strict';

const gutil = require('gulp-util');

module.exports = (args, conf) => {

  let theme = args.theme || conf.defaultTheme;

  // If we've not got access to a theme in config, or via CLI,  then bomb out.
  if (!theme) {
    throw new gutil.PluginError({
      plugin: 'Main',
      message: 'No theme defined in config or CLI.'
    })
  }

  // If the theme we have doesn't exist on the main config theme object, then
  // bomb out. There's every chance that the config object won't be configured
  // correctly, but that not our problem.
  if (!conf.themes.hasOwnProperty(theme)) {
    throw new gutil.PluginError({
      plugin: 'Main',
      message: `No theme settings for ${theme} in config file.`
    })
  }

  return theme;

}
