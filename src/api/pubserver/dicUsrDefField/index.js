import request from '@/utils/request'  

//获取字段集合名称  
// 获取模块的自定义字典 传入字典的dicCode
export function getByDicCode(query) {
    return request({
      url: '/api/dicUsrdefField/getByDicCode',
      method: 'get',
      params: query
    })
  }