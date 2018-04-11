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
}

const getters = {
  noticeCount: state => state.notices.length,
  notices: state => state.notices
}

const mutations = {
  SET_NOTICE_LIST: (state, list) => {
    state.notices = list
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
