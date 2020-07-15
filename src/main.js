// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import './fonts/iconfont.css'
import ElementUI from 'element-ui'
import Echarts from 'echarts'



Vue.config.productionTip = false
Vue.prototype.echarts = Echarts

Vue.use(ElementUI)
Vue.use(Echarts)

const devObj = {
  interfaceUrl: 'http://10.10.7.27:8090' // 晓娴整合后本地路径
  // interfaceUrl: 'http://10.10.9.77:8090' // 李像华本地
}
const proObj = {
  interfaceUrl: 'http://139.9.26.115:8090' // 生产环境路径
  // interfaceUrl: 'http://127.0.0.1:8090'
}
const testObj = {
  interfaceUrl: 'http://10.10.7.27:8090' // 测试环境地址
} // 测试环境地址

Vue.prototype.isDev = process.env.NODE_ENV === 'development'
switch (process.env.NODE_ENV) {
  case 'development':
    Vue.prototype.urlObj = devObj
    break
  case 'test':
    Vue.prototype.urlObj = testObj
    break
  case 'production':
    Vue.prototype.urlObj = proObj
    break
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
