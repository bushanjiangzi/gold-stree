import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Temp from '@/views/temp'
import Login from '@/views/login'
import ManageIndex from '@/views/manage/index'
import Manage from '@/views/manage/store/manage'

Vue.use(Router)

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/temp',
      name: 'Temp',
      component: Temp
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/manage',
      name: '管理',
      component: ManageIndex,
      redirect: '/manage/store',
      children: [
        {
          path: '/manage/store',
          name: '管理-店铺',
          component: Manage,
          iconClass: 'iconfont icon-nenghao',
          isHidden: false,
          hasChild: false
        },
      ]
    }
  ]
})
