'use strict';

const imagemin = require('gulp-imagemin');
const path = require('path');

/**
 * Build project images.
 *
 * @param {ConfigParser} conf A configuration parser object.
 * @param {Undertaker} undertaker An Undertaker instance.
 *
 * @returns {Stream} A stream of files.
 */
function buildImages(conf, undertaker) {

    const imageMinConfig = {
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }, {
        cleanupIDs: true
      }, {
        cleanupAttrs: true
      }]
    };

    const imageSrc = path.join(conf.themeConfig.root, conf.themeConfig.images.src, '**', '*');
    const imageDest = path.join(conf.themeConfig.root, conf.themeConfig.images.dest);

    return undertaker.src(imageSrc)
      .pipe(imagemin(imageMinConfig))
      .pipe(undertaker.dest(imageDest));

}

buildImages.displayName = 'build:images';


module.exports = buildImages;