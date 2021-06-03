import 'es6-promise/auto'
import Vue from 'vue'
import router from '@/router'
import i18n from '@/i18n'
import store from '@/store'
import '@/sanitize'
import App from '@/App'

//import firebase from 'firebase/app'
//import { SiteConfig } from '@/api/'

import Buefy from 'buefy'
Vue.use(Buefy)

import mixin from '@/mixins/site'
Vue.mixin(mixin);

import * as filters from '@/filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})

//SiteConfig.get('firebase')
//  .then(res => {
//    firebase.initializeApp(res)
//    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
//      .then(() => {
//        new Vue({
//          el: '#app',
//          router,
//          store,
//          i18n,
//          render: h => h(App)
//        })
//      })
//  })
//  .catch(err => {
//    throw err
//  })

