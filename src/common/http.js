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
    // config.headers['x-forwarded-for'] = '10.10.9.77'
    // config.headers['Content-Type'] = 'multipart/form-data'
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
  switch (response.data.code) {
    case '200':
      return response
    case '500':
      alertIntervalTime('登录超时, 请重新登录')
  }
}, (error) => {
  if (error.response) {
    switch (error.response.data.status) {
      // 返回401，清除token信息并跳转到登录页面
      case 401:
        alertIntervalTime('登录超时, 请重新登录')
        router.push({name: 'Login'})
        return
      case 500:
        alertIntervalTime(error.response.data.message)
        if (error.response.data.message.indexOf('登录') > 0) {
          router.push({name: 'Login'})
        }
        // return error
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
