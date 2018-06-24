// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 导入全局样式
import './assets/css/global.css'
// 导入 字体图标的样式表
import './assets/fonts/iconfont.css'
import ElementUI from 'element-ui'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
// 为 axios 挂载 token 请求头，需要使用 request 拦截器实现
axios.interceptors.request.use(function(config) {
  // 手动为 axios 的请求，追加 Authorization 请求头
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
