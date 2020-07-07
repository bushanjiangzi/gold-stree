import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Temp from '@/views/temp'

Vue.use(Router)

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
    }
  ]
})
