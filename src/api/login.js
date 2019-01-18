import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/jwt/token',
    method: 'post',
    data
  })
}

export function logout(token) {
  return request({
    url: '/jwt/invalid',
    method: 'post',
    params: { token }
  })
}

export function getInfo() {
  return request({
    url: 'api/user/front/info',
    method: 'get'
  })
}

export function getMenus() {
  return request({
    url: 'api/user/front/menus',
    method: 'get'
  })
}
