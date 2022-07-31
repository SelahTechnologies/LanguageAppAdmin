import ajax from './ajax'

const state = {
  questions: [],
  questionsCount: 0,
}

const getters = {
  questions: state => {
    return state.questions
  },
  questionsCount: state => {
    return state.questionsCount
  },
}

const mutations = {
  setQuestions: (state, payload) => {
    state.questions = payload
  },
  setQuestionsCount: (state, payload) => {
    state.questionsCount = payload
  },
}

const actions = {
  fetchQuestions: ({ commit }, filter) => {
    console.log(filter)
    ajax.get(`${process.env.VUE_APP_BASE_API_URL}questions`, { params: filter }).then(
      response => {
        commit('setQuestions', response.data)
      },
      error => {
        console.log(error)
      },
    )
  },

  fetchQuestionsCount: ({ commit }) => {
    ajax.get(`${process.env.VUE_APP_BASE_API_URL}questions/count`).then(
      response => {
        commit('setQuestionsCount', response.data)
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
