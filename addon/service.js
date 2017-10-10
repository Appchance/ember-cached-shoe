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

  pushResponse(requestToken, response) {
    this.get('fastboot.shoebox').put(
      requestToken,
      JSON.stringify(response)
    )
    return response
  },

  popResponse(requestToken) {
    let response = this.get('fastboot.shoebox').retrieve(requestToken)
    $(`#shoebox-${requestToken}`).remove()
    return response ? JSON.parse(response) : response
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
