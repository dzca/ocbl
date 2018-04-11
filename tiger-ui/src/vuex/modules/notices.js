import axios from 'axios'

const state = {
  notices: []
}

const actions = {
  loadNotices ({ commit }, noticePromise) {
    console.log('action load notices from api')
    axios.get('/tiger/api/notice/')
    .then((res)=>{
      console.log('api return result to action load notices: result = %j', res.data)
      commit('SET_NOTICE_LIST', res.data)
    })
    .catch(function (err) {
      console.log('load notice axios error=%j',err)
    })
  }
  // saveSeason ({ commit }) {
  //   axios.post('/notices').then((res) => {
  //     commit('ADD_SEASON', { notice: res.data })
  //   }, (err) => {
  //     console.log(err)
  //   })
  // },
  // updateSeason ({ commit }, item) {
  //   axios.put('/notices/' + item.id, item).then((res) => {
  //     commit('UPDATE_SEASON', { item: res.data })
  //   }, (err) => {
  //     console.log(err)
  //   })
  // }
}

const getters = {
  noticeCount: state => state.notices.length,
  notices: state => state.notices
}

const mutations = {
  SET_NOTICE_LIST: (state, list) => {
    state.notices = list
  }
  // ADD_SEASON: (state, notice) => {
  //   state.notices.push(notice)
  // },
  // UPDATE_SEASON: (state, item) => {
  //   let idx = state.notices.map(p => p.id).indexOf(item.id)
  //   // remove one from position idx, and add
  //   state.notices.splice(idx, 1, item)
  // }
}

export default {
  state,
  actions,
  getters,
  mutations
}
