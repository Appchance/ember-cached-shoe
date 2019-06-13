/* eslint-env node */
"use strict";

module.exports = {
  name: "ember-cached-shoe",

  options: {
    autoImport: {
      alias: {
        // otherwise will default to /src/index.js, which is not transpiled
        'b2a': 'b2a/lib/index.js'
      },
      exclude: [],
      webpack: {}
    }
  },

  included() {
    this._super.included.apply(this, arguments);
  }
};
