import request from '@/utils/request'

// 获取合同相关信息
export function getJyInfo(HTBH) {
    return request({
      url: '/api/ycsl/getJyInfo',
      method: 'get',
      params: HTBH, 
    })
  }

// 获取合同相关信息
export function saveXwbl(xwbl) {
  return request({
    url: '/api/ycsl/saveXwbl',
    method: 'post',
    data: xwbl, 
  })
}
  

