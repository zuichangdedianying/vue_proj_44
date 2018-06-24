import Vue from 'vue'
import Router from 'vue-router'
// 导入登录组件
import Login from '@/components/Login'
// 导入 后台首页组件
import Home from '@/components/Home'
// 导入欢迎组件
import Welcome from '@/components/Welcome'
// 导入 用户管理组件
import Users from '@/components/user/Users'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login' // 如果用户访问的 / 根路径，则 重定向到 /login 页面
    },
    { path: '/login', component: Login }, // 登录页面的路由规则
    {
      path: '/home',
      component: Home,
      redirect: '/welcome', // 只要进入了 home 页面，就立即重定向到 welcome 欢迎页
      children: [{ path: '/welcome', component: Welcome }, { path: '/users', component: Users }]
    } // 后台主页的路由规则
  ]
})

// 路由导航守卫的语法   router对象.beforeEach((to, from, next) => {})

export default router
