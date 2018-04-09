// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import _ from 'underscore'

import store from './vuex/store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/assets/css/styles.scss'

import axios from 'axios'
Vue.prototype.axios = axios

Vue.use(MintUI)

Vue.config.productionTip = false

export default new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
