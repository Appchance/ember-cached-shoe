import Ember from "ember";
import { encodeData } from "./utils";

const {
  Service,
  inject: { service }
} = Ember;

export default Service.extend({
  fastboot: service(),
  separator: "---",

  pushResponse(requestToken, response) {
    this.get("fastboot.shoebox").put(requestToken, JSON.stringify(response));
    return response;
  },

  popResponse(requestToken) {
    let response = this.get("fastboot.shoebox").retrieve(requestToken);
    this.eraseResponse(requestToken);
    return response ? JSON.parse(response) : response;
  },

  eraseResponse(requestToken) {
    const element = document.getElementById(`shoebox-${requestToken}`);
    element && element.parentNode.removeChild(element);
    this.set(`fastboot.shoebox.${requestToken}`, undefined);
  },

  tokenizeAjaxRequest(url, type, options = {}) {
    let data = options.data;
    let separator = this.get("separator");
    return encodeData([url, type, JSON.stringify(data)].join(separator))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/\=+$/, "");
  }
});
