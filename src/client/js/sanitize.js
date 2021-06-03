import Vue from 'vue'
import VueSanitize from 'vue-sanitize'

let defaultOptions = VueSanitize.defaults
//const defaultOptions = {
//  allowedTags: ['a', 'b', 'br'],
//  allowedAttributes: {
//    'a': [ 'href' ]
//  }
//}

Vue.use(VueSanitize, defaultOptions)
