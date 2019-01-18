import request from '@/utils/request'

export function fetchTree(query) {
  return request({
    url: 'api/menu/tree',
    method: 'get',
    params: query
  })
}

// 获取所有的菜单
export function fetchAll() {
  return request({
    url: 'api/menu/all',
    method: 'get'
  })
}
export function addObj(obj) {
  return request({
    url: 'api/menu',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: 'api/menu/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: 'api/menu/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return request({
    url: 'api/menu/' + id,
    method: 'put',
    data: obj
  })
}
