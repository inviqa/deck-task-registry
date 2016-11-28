'use strict';

module.exports = {
  "productionMode": false,
  "themeConfig": {
    "root": "../../web/themes/custom/deck",
    "sass": {
      "src": "assets/src/sass",
      "dest": "assets/dist/css",
      "browserSupport": [
        "last two versions"
      ]
    },
    "js": {
      "src": "assets/src/js",
      "dest": "assets/dist/js",
      "optimise": true
    },
    "fonts": {
      "src": "assets/src/fonts",
      "dest": "assets/dist/fonts"
    },
    "images": {
      "src": "assets/src/images",
      "dest": "assets/dist/images"
    }

  }
};