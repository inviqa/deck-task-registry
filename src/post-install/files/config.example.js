'use strict';

module.exports = {
  "defaultTheme": "example",
  "themes": {
    "example": {
      "root": "../web/themes/custom/example",
      "sass": {
        "src": "assets/src/sass",
        "dest": "assets/dist/css",
        "browserSupport": [
          "last 2 versions"
        ]
      },
      "js": {
        "src": "assets/src/js",
        "dest": "assets/dist/js"
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
};