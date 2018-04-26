import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 定义属性
const state = {
  province: '上海市'
}

// 定义 getters
const getters = {
  province (state) {
    return state.province
  }
}

// 定义变化
const mutations = {
  changeProvince (state, province) {
    state.province = province
  }
}

// 定义方法
const actions = {
  changeProvince ({commit, state}) {
    commit('changeProvince')
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
