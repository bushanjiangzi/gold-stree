/*
  利用axios封装http模块，并把http分为post和get方法
*/
import axios from 'axios'
import {Message} from 'element-ui'
import router from '../router'

let lastTime
function alertIntervalTime (msg) {
  let nowTime = new Date().getTime()
  if (!lastTime || nowTime - lastTime > 3000) {
    Message.error(msg)
  }
  lastTime = new Date().getTime()
}
// 对axios设置拦截器，判断sessionStorage.getItem('sn')是否存在
axios.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('sn')) {
      config.headers.Authentication = sessionStorage.getItem('sn')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 返回拦截器，判断返回值的code是否异常
axios.interceptors.response.use((response) => {
  if (!response) {
    return
  }
  if (response.config.url.indexOf('/run/home/QX21') !== -1 || response.config.url.indexOf('/api/getinstallfile') !== -1 || response.config.url.indexOf('/api/checkfile/home/QX21') !== -1 || response.config.url.indexOf('/api/getip') !== -1) {
    return response
  }
  if (response.config.url.indexOf('/api/saas/lighting/equip/control') !== -1 || response.config.url.indexOf('/api/saas/common/page/change') !== -1) {
    return response
  }
  if (response.status === 299) {
    sessionStorage.clear()
    alertIntervalTime('登录超时, 请重新登录')
    setTimeout(() => {
      router.push({name: 'Login'})
    }, 500) // 为确保能够在wbesocket连接后关闭websocket,需加定时器进行延时
  }
  switch (response.data.code) {
    case '100':
      if (response.config.url.indexOf('/saas/voice/control') !== -1) {
        return response
      }
      alertIntervalTime(response.data.msg)
      // message.error('系统异常')
      break
    case '200':
      return response
    case '10001':
      if (response.config.url.indexOf('/saas/voice/control') !== -1) {
        return response
      }
      alertIntervalTime(response.data.msg)
      // message.error('业务异常')
      break
    case '10002':
      alertIntervalTime(response.data.msg)
      // message.error('非法请求')
      break
    case '10003':
      alertIntervalTime(response.data.msg)
      // message.error('非法请求')
      break
    case '10005':
      alertIntervalTime(response.data.msg)
      // message.error('非法请求')
      break
    case '10006':
      alertIntervalTime(response.data.msg)
      // message.error('非法请求')
      break
    case '20002':
      alertIntervalTime(response.data.msg)
      break
    case '30001':
      alertIntervalTime(response.data.msg)
      // message.error('无xx权限')
      break
    case '30002':
      alertIntervalTime(response.data.msg)
      // message.error('xx权限已过期')
      break
    case '30010':
      alertIntervalTime(response.data.msg)
      // message.error('xx参数不能为空')
      break
    case '30011':
      alertIntervalTime(response.data.msg)
      // message.error('xx参数是xx类型')
      break
    case '30012':
      alertIntervalTime(response.data.msg)
      // message.error('缺少xx参数')
      break
    case '30013':
      alertIntervalTime(response.data.msg)
      // message.error('xx参数的长度在xx位-xx位之间')
      break
    case '30014':
      alertIntervalTime(response.data.msg)
      // message.error('xx参数无效')
      break
    case '30015':
      alertIntervalTime(response.data.msg)
      if (response.config.url.indexOf('/saas/scene/save') !== -1 || response.config.url.indexOf('/saas/scene/change') !== -1 || response.config.url.indexOf('/saas/scene/delete') !== -1) {
        return response
      }
      break
    case '30016':
      // message.error('xx参数为空或错误')
      alertIntervalTime(response.data.msg)
      return response
    case '30020':
      alertIntervalTime(response.data.msg)
      // message.error('文件操作错误')
      break
    case '30021':
      alertIntervalTime(response.data.msg)
      // message.error('路径不存在')
      break
    case '30022':
      alertIntervalTime(response.data.msg)
      // message.error('文件格式不对，应为xxxx格式')
      break
    case '30023':
      alertIntervalTime(response.data.msg)
      // message.error('文件大小不超过xM')
      break
    case '30024':
      alertIntervalTime(response.data.msg)
      // message.error('文件大小不超过xM')
      break
    case '30026':
      return response
    case '30027':
      alertIntervalTime(response.data.msg)
      break
    case '50000':
      alertIntervalTime(response.data.msg)
      // message.error('系统错误')
      break
  }
}, (error) => {
  if (error.config.url.indexOf('/checkfile/home/QX21') !== -1 && (error.response.status === 404 || error.response.status === 504)) {
    return Promise.reject(error.response)
  }
  if (error.config.url.indexOf('/api/saas/lighting/equip/control') !== -1) {
    return error.response
  }
  if (error.config.url.indexOf('/api/saas/voice/control') !== -1) {
    return error.response
  }
  if (error.response) {
    switch (error.response.status) {
      // 返回401，清除token信息并跳转到登录页面
      case 401:
        sessionStorage.clear()
        alertIntervalTime('登录超时, 请重新登录')
        router.push({name: 'Login'})
        return
      case 500:
        alertIntervalTime(error.response.data.msg)
        return error
    }
    // 返回接口返回的错误信息
  }
})
// http response服务器响应拦截器，
// get请求封装
export const get = (url, data = {}, config) => {
  return new Promise((resolve, reject) => {
    axios.get(url, data, config).then((response) => {
      // console.log(response)
      if (url.indexOf('/saas/meter/excel') > 0) {
        resolve(response)
      }
      if (response) {
        resolve(response.data)
      }
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  })
}
// post请求封装
export const post = (url, data = {}, config) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data, config).then((response) => {
      if (response) {
        resolve(response.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
