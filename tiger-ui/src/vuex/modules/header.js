
const state = {
  head: {
    backEnabled: false,
    title: ''
  },
  headNav: 'home'
}

const actions = {
  setHeadNav ({ commit }, nav) {
    commit('setHeadNav', nav)
  },
  setBackEnabled ({ commit }, enable) {
    commit('setBackEnabled', enable)
  }
}

const getters = {
  head: state => state.head,
  headNav: state => state.headNav
}

const mutations = {
  setHeadNav: (state, nav) => {
    state.headNav = nav
  },
  setBackEnabled: (state, enable) => {
    state.head.backEnabled = enable
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
