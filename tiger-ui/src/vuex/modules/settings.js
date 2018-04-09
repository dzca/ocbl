
const state = {
  settings: {
    year: (new Date()).getFullYear().toString(),
    season: 'r'
  },
  seasons: [{
      label: 'Regular Season',
      value: 'r'
    },
    {
      label: 'Playoffs',
      value: 'p'
    }
  ]
  //headNav: 'home'
}

const actions = {
  // setHeadNav ({ commit }, nav) {
  //   commit('setHeadNav', nav)
  // },
  setYear ({ commit }, year) {
    commit('setYear', year)
  },
  setSeason ({ commit }, season) {
    commit('setSeason', season)
  }
}

const getters = {
  settings: state => state.settings,
  // headNav: state => state.headNav,
  getSeason: state => code => {
    let result = state.seasons.find(season => season.value === code)
    return result.label
  }
}

const mutations = {
  // setHeadNav: (state, nav) => {
  //   state.headNav = nav
  // },
  setYear: (state, year) => {
    state.settings.year = year
  },
  setSeason: (state, season) => {
    state.settings.season = season
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
