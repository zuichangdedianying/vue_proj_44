import Vue from 'vue'
import Router from 'vue-router'

// 导入登陆组件
import Login from '@/components/Login'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Login'
    },
    { path: '/login', component: Login }
  ]
})
