'use strict';

const path = require('path');

/**
 * Watch project files.
 *
 * @param {ConfigParser} conf A configuration parser object.
 * @param {Undertaker} undertaker An Undertaker instance.
 */
function watch(conf, undertaker) {

  const root = conf.themeConfig.root;

  /**
   * STYLE WATCHING.
   */
  undertaker.watch(
    path.join(root, conf.themeConfig.sass.src, '**', '*.scss'),
    undertaker.series(
      require('../styles/lintStyles').bind(null, conf, undertaker),
      require('../styles/buildStyles').bind(null, conf, undertaker),
      require('../styles/holograph').bind(null, conf, undertaker)
    )
  );

  /**
   * SCRIPT WATCHING.
   */
  undertaker.watch(
    path.join(root, conf.themeConfig.js.src, '**', '*.js'),
    undertaker.series(
      require('../scripts/lintScripts').bind(null, conf, undertaker),
      require('../scripts/buildScripts').bind(null, conf, undertaker)
    )
  );

  /**
   * IMAGE WATCHING.
   */
  undertaker.watch(
    path.join(root, conf.themeConfig.images.src, '**', '*'),
    undertaker.series(
      require('../assets/buildImages').bind(null, conf, undertaker)
    )
  );

  /**
   * FONT WATCHING.
   */
  undertaker.watch(
    path.join(root, conf.themeConfig.fonts.src, '**', '*'),
    undertaker.series(
      require('../assets/buildFonts').bind(null, conf, undertaker)
    )
  );

}

watch.displayName = 'watch';

module.exports = watch;