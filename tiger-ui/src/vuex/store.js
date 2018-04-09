import Vue from 'vue'
import Vuex from 'vuex'

import header from './modules/header'
import settings from './modules/settings'
import seasons from './modules/seasons'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    header,
    settings,
    seasons
  },
  strict: process.env.NODE_ENV !== 'production' // 是否开启严格模式
})
