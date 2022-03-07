import { categoryList } from '@/api/index.js'

// 这里放跟home页面里组件共用的数据
const state = {
  categoryList: []
}
const mutations = {
  GETCATEGORYLIST(state, data) {
    state.categoryList = data
  }
}

const actions = {
  // 结构赋值出commit
  async getCategoryList({ commit }) {
    const result = await categoryList()
    if (result.code === 200) {
      commit('GETCATEGORYLIST', result.data)
    }
  }
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
