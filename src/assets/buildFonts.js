'use strict';

const path = require('path');

/**
 * Build project fonts.
 *
 * @param {ConfigParser} conf A configuration parser object.
 * @param {Undertaker} undertaker An Undertaker instance.
 *
 * @returns {Stream} A stream of files.
 */
function buildFonts(conf, undertaker) {

  const fontSrc = path.join(conf.themeConfig.root, conf.themeConfig.fonts.src, '**', '*.{eot,ttf,woff,woff2,otf,svg}');
  const fontDest = path.join(conf.themeConfig.root, conf.themeConfig.fonts.dest);

  return undertaker.src(fontSrc)
    .pipe(undertaker.dest(fontDest));

}

buildFonts.displayName = 'build:fonts';

module.exports = buildFonts;