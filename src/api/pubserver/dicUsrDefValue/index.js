import request from '@/utils/request'

// 获取模块的自定义字典 传入字典的dicCode
export function getModlue(query) {
    return request({
      url: '/api/commonDict/getModlue',
      method: 'post',
      params: query
    })
  }
 
  //获取网点信息  
  
  export function getDotlist() {
    return request({
      url: '/api/commonDict/getDotlist',
      method: 'get'
    })
  }


//根据网点id获取预约类型 /commonDict/getBespeakType/{id} 
export function getBespeakType(id) {
  return request({
    url: '/api/commonDict/getBespeakType/'+id,
    method: 'get'
  })
}


//获取自定义字典值
export function getZdyDict(id) {
  return request({
    url: '/api/commonDict/'+id,
    method: 'get'
  })
}


//更新自定义字典值
export function putZdyDict(id,obj) {
  return request({
    url: '/api/commonDict/'+id,
    method: 'put',
    data: obj
  })
}


//保存自定义字典值
export function addZdyDict(obj) {
  return request({
    url: '/api/commonDict/',
    method: 'post',
    data: obj
  })
}


//删除自定义字典值
export function delZdyDict(id) {
  return request({
    url: '/api/commonDict/'+id,
    method: 'delete',
  })
}