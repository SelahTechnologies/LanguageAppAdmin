import ajax from './ajax'

const state = {
  user: null,
  token: null,
  usersCount: 0,
}

const getters = {
  user: state => {
    return state.user
  },
  token: state => {
    return state.token
  },
  usersCount: state => {
    return state.usersCount
  },
}

const mutations = {
  setUser: (state, payload) => {
    state.user = payload
  },
  setToken: (state, payload) => {
    state.token = payload
  },
  setUsersCount: (state, payload) => {
    state.usersCount = payload
  },
}

const actions = {
  setUser: ({ commit }, user) => {
    commit('setUser', user)
  },
  setToken: ({ commit }, token) => {
    commit('setToken', token)
  },
  fetchUsersCount: ({ commit }) => {
    ajax.get(`${process.env.VUE_APP_BASE_API_URL}users/count`).then(
      response => {
        commit('setUsersCount', response.data)
      },
      error => {
        console.log(error)
      },
    )
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
