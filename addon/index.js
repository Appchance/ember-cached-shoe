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

  ajax() {
    let requestToken = this._tokenizeAjaxRequest(...arguments)

    if(this.get('fastboot.isFastBoot')) {
      return this
        ._super(...arguments)
        .then(r =>
          this.get('cachedShoe').pushResponse(requestToken, r)
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

  _tokenizeAjaxRequest() {
    return (
      this.tokenizeAjaxRequest ||
      this.get('cachedShoe').tokenizeAjaxRequest
    ).apply(this, arguments)
  }
})
