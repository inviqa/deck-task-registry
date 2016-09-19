'use strict';

const os = require('os');
const path = require('path');

module.exports = {
  "defaultTheme": "deck",
  "themes": {
    "deck": {
      "root": path.join(os.tmpDir(), 'drupaltools'),
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
  }
}