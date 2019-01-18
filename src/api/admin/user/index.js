import request from '@/utils/request'

export function page(query) {
  return request({
    url: 'api/user/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: 'api/user',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: 'api/user/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: 'api/user/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return request({
    url: 'api/user/' + id,
    method: 'put',
    data: obj
  })
}
