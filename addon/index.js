import Ember from 'ember'

const {
  Mixin,
  RSVP: {Promise},
  inject: {service},
  run,
  $
} = Ember

export default Mixin.create({
  fastboot:     service(),
  cachedShoe:   service(),

  ajax(...args) {
    let tokenizeParams = this._paramsToTokenize(...args)
    let requestToken = this.get('cachedShoe').tokenizeAjaxRequest(...tokenizeParams)

    if(this.get('fastboot.isFastBoot')) {
      return this._super(...arguments).then(
        (response) => this.get('cachedShoe').pushResponse(requestToken, response)
      )
    }

    let cachedResponse = this.get('cachedShoe').popResponse(requestToken)

    if(cachedResponse) {
      return new Promise((resolve, _) => {
        run.join(null, resolve, cachedResponse)
      })
    }

    return this._super(...arguments)
  },

  _paramsToTokenize(...args) {
    if (typeof this.paramsToTokenize === 'function'){
      return this.paramsToTokenize(...args);
    }
    return args
  }
})
