/* eslint-env node */
"use strict";

module.exports = {
  name: "ember-cached-shoe",

  options: {
    autoImport: {
      alias: {
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
