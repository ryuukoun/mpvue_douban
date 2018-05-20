import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 定义属性
const state = {
  City: '上海市'
}

// 定义 getters
const getters = {
  city (state) {
    return state.City
  }
}

// 定义变化
const mutations = {
  changeCity (state, city) {
    state.City = city
  }
}

// 定义方法
const actions = {
  changeCity ({commit, state}) {
    commit('changeCity')
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
