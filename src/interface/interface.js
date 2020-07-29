import {get, post} from '../common/http.js'

let isDev = process.env.NODE_ENV === 'development'
let userUrl = {
  login: '/xianghua/admin/manager/login', // 登录
  logout: '/xianghua/admin/manager/logout', // 退出登录
}

export const User = {
  login: function (data) {
    post(userUrl.login, data.params).then(data.success).catch(data.error)
  },
  logout: function (data) {
    get(userUrl.logout, data.params).then(data.success).catch(data.error)
  }
}

let adminUrl = {
  types: '/xianghua/admin/types', // 获取所有的店铺类型
  allShop: '/xianghua/admin/allShop', // 查找所有店铺的详细信息
  areas: '/xianghua/admin/areas', // 查询当前用户的所有区域
  showNums: '/xianghua/admin/showNums', // 查找选中区域的所有店铺编号
  shopSave: '/xianghua/admin/save', // 编辑保存商店信息
  detail: '/xianghua/admin/shop/', // 根据id查找店铺的详细信息
  status: '/xianghua/admin/status', // 更新店铺的状态信息
  upload: '/xianghua/admin/file/upload', // 图片上传和替换
  search: '/xianghua/admin/search', // 店铺搜索
  addStore: '/xianghua/admin/insert', // 新增店铺
  delete: '/xianghua/admin/delete/'
}

export const Admin = {
  types: function (data) {
    get(adminUrl.types, data.params).then(data.success).catch(data.error)
  },
  allShop: function (data) {
    get(adminUrl.allShop, data.params).then(data.success).catch(data.error)
  },
  areas: function (data) {
    get(adminUrl.areas, data.params).then(data.success).catch(data.error)
  },
  showNums: function (data) {
    post(adminUrl.showNums, data.params).then(data.success).catch(data.error)
  },
  shopSave: function (data) {
    post(adminUrl.shopSave, data.params).then(data.success).catch(data.error)
  },
  detail: function (data) {
    post(adminUrl.detail + data.id, {params: data.params}).then(data.success).catch(data.error)
  },
  status: function (data) {
    post(adminUrl.status, data.params).then(data.success).catch(data.error)
  },
  upload: function (data) {
    post(adminUrl.upload, data.params, {headers: {'Content-Type': 'multipart/form-data'}}).then(data.success).catch(data.error)
  },
  search: function (data) {
    post(adminUrl.search, data.params).then(data.success).catch(data.error)
  },
  addStore: function (data) {
    post(adminUrl.addStore, data.params).then(data.success).catch(data.error)
  },
  delete: function (data) {
    get(adminUrl.delete + data.id, {params: data.params}).then(data.success).catch(data.error)
  }
}
