/* eslint-env node */
"use strict";

module.exports = {
  name: "ember-cached-shoe",

  options: {
    autoImport: {
      exclude: [],
      webpack: {}
    }
  },

  included() {
    this._super.included.apply(this, arguments);
  }
};
