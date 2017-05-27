import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { state, mutations } from './mutations'
import * as actions from './actions'
// import plugins from './plugins'
Vue.use(Vuex, axios, VueAxios)
const myPlugin = store => {
  // 当 store 初始化后调用
  store.subscribe((mutation, {menu}) => {
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
    window.localStorage.setItem('menu', JSON.stringify(menu))
  })
}
export default new Vuex.Store({
  state,
  mutations,
  plugins: [myPlugin],
  actions
})
