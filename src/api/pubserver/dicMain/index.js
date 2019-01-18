import request from '@/utils/request'

// 获取字典树(字典)
export function getTree() {
    return request({
      url: '/api/dicMain/tree',
      method: 'get'
    })
  }


export function updateDicType(id,obj) {
    return request({
      url: '/api/dicMain/'+id,
      method: 'put',
      data:obj
    })
  }

  export function addDicType(obj) {
  return request({
    url: '/api/dicMain/',
    method: 'post',
    data:obj
  })
}  


  export function deleteDicType(id,obj) {
    return request({
      url: '/api/dicMain/'+id,
      method: 'delete',
      data:obj
    })
  }