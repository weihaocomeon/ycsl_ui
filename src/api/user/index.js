import request from '@/utils/request'

export function getuser(OpenId) {
    return request({
      url: '/api/bespeak/wwUser',
      method: 'get',
      headers:{'OpenId':OpenId,'AppId':'pcAccess'},
    })
  }

export function userOrder(param) {
  return request({
    url: '/api/bespeak/wwUser/listAndOrder',
    params: param, 
    headers:{'OpenId':'pcAccess','AppId':'pcAccess'} ,  
    method: 'get',
  })
}  


   