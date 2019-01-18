import request from '@/utils/request'

// 根据节点名称获取节点下的详细列表

export function getDicListWithP(parParam) {
    return request({
      url: '/api/customDict/getDicListWithDicCode/',
      method: 'post',
      params: parParam
    })
  }

  export function getDicListWithPm(parParam) {
    return request({
      url: '/api/customDict/getDicListWithP/',
      method: 'post',
      params: parParam
    })
  }  

 //获取普通字典值  
 export function getDicWithPandC(parParam) {
  return request({
    url: '/api/customDict/getDicWithPandC',
    method: 'post',
    params: parParam
  })
} 


//更新普通字典值的信息  后端是个假的api 因为传到后端的id 在put的方法上压根没有用起来(还是只用到实体)
export function putObj(id, obj) {
  return request({
  url: '/api/customDict/' + id,
  method: 'put',
  data: obj
  })
  } 


//增加字典值
export function addObj(obj) {
  return request({
  url: '/api/customDict',
  method: 'post',
  data: obj
  })
  }

//删除字典值
export function delObj(id) {
  return request({
  url: '/api/customDict/' + id,
  method: 'delete'
  })
  }