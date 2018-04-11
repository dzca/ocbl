const state = {
  seasons: []
}

const actions = {
  loadSeasons ({ commit }, seasons) {
    console.log('action load seasons = %j', seasons)
    commit('SET_SEASON_LIST', { list: seasons })
  }
}

const getters = {
  seasonCount: state => state.seasons.length,
  seasons: state => state.seasons
}

const mutations = {
  SET_SEASON_LIST: (state, list) => {
    state.seasons = list
  }

}

export default {
  state,
  actions,
  getters,
  mutations
}
