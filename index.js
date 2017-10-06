/* eslint-env node */
'use strict';
const Webpack = require('broccoli-webpack')
const PackOpts = {
  entry: 'b2a',
  output: {
    filename: 'b2a.js',
    library: 'b2a',
    libraryTarget: 'umd'
  }
};
const transformAMD = (name) => ({
  using: [{ transformation: 'amd', as: name }]
});

module.exports = {
  name: 'ember-cached-shoe',

  options: {
    nodeAssets: {
      'b2a': {
        vendor: {
          srcDir:   'lib',
          include: ['index.js'],
          processTree(input) {
            return  new Webpack([input], PackOpts)
          }
        }
      }
    }
  },

  included(app) {
    this._super.included.apply(this, arguments)
    app.import('vendor/b2a.js', transformAMD('b2a'))
  },
};
