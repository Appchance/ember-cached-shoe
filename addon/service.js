import Ember from 'ember'
import b2a   from 'b2a'

const {
  Service,
  inject: {service},
  $
} = Ember

export default Service.extend({
  fastboot:  service(),
  separator: '---',
  b2a: b2a,

  pushResponse(requestToken, response) {
    this.get('fastboot.shoebox').put(
      requestToken,
      JSON.stringify(response)
    )
    return response
  },

  popResponse(requestToken) {
    let response = this.get('fastboot.shoebox').retrieve(requestToken)
    this.eraseResponse(requestToken)
    return response ? JSON.parse(response) : response
  },

  eraseResponse(requestToken) {
    $(`#shoebox-${requestToken}`).remove()
    this.set(`fastboot.shoebox.${requestToken}`, undefined)
  },

  tokenizeAjaxRequest(url, type, options = {}) {
    let data = options.data
    let separator = this.get('separator')
    return b2a.btoa([
      url,
      type,
      JSON.stringify(data)
    ].join(separator))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '')
  }
})
