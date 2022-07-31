import ajax from './ajax'

const state = {
  languages: [],
  categories: [],
  languagesCount: 0,
  categoriesCount: 0,
}

const getters = {
  languages: state => {
    return state.languages
  },
  categories: state => {
    return state.categories
  },
  languagesCount: state => {
    return state.languagesCount
  },
  categoriesCount: state => {
    return state.categoriesCount
  },
}

const mutations = {
  setLanguages: (state, payload) => {
    state.languages = payload
  },
  setCategories: (state, payload) => {
    state.categories = payload
  },
  setLanguagesCount: (state, payload) => {
    state.languagesCount = payload
  },
  setCategoriesCount: (state, payload) => {
    state.categoriesCount = payload
  },
}

const actions = {
  fetchLanguages: ({ commit }) => {
    console.log(process.env.VUE_APP_BASE_API_URL)
    ajax.get(`${process.env.VUE_APP_BASE_API_URL}general/languages`).then(
      response => {
        commit('setLanguages', response.data)
      },
      error => {
        console.log(error)
      },
    )
  },

  fetchCategories: ({ commit }) => {
    ajax.get(`${process.env.VUE_APP_BASE_API_URL}general/categories`).then(
      response => {
        commit('setCategories', response.data)
      },
      error => {
        console.log(error)
      },
    )
  },

  fetchLanguagesCount: ({ commit }) => {
    console.log(process.env.VUE_APP_BASE_API_URL)
    ajax.get(`${process.env.VUE_APP_BASE_API_URL}general/languages/count`).then(
      response => {
        commit('setLanguagesCount', response.data)
      },
      error => {
        console.log(error)
      },
    )
  },

  fetchCategoriesCount: ({ commit }) => {
    ajax.get(`${process.env.VUE_APP_BASE_API_URL}general/categories/count`).then(
      response => {
        commit('setCategoriesCount', response.data)
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
