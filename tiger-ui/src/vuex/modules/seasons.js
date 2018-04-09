const state = {
  seasons: []
}

const actions = {
  loadSeasons ({ commit }, seasons) {
    console.log('action load seasons = %j', seasons)
    commit('SET_SEASON_LIST', { list: seasons })
  }
  // saveSeason ({ commit }) {
  //   axios.post('/seasons').then((res) => {
  //     commit('ADD_SEASON', { season: res.data })
  //   }, (err) => {
  //     console.log(err)
  //   })
  // },
  // updateSeason ({ commit }, item) {
  //   axios.put('/seasons/' + item.id, item).then((res) => {
  //     commit('UPDATE_SEASON', { item: res.data })
  //   }, (err) => {
  //     console.log(err)
  //   })
  // }
}

const getters = {
  seasonCount: state => state.seasons.length,
  seasons: state => state.seasons
}

const mutations = {
  SET_SEASON_LIST: (state, list) => {
    state.seasons = list
  }
  // ADD_SEASON: (state, season) => {
  //   state.seasons.push(season)
  // },
  // UPDATE_SEASON: (state, item) => {
  //   let idx = state.seasons.map(p => p.id).indexOf(item.id)
  //   // remove one from position idx, and add
  //   state.seasons.splice(idx, 1, item)
  // }
}

export default {
  state,
  actions,
  getters,
  mutations
}
