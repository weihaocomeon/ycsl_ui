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
  
// 获取合同相关信息
export function getHouseWithPeople(qlrParams) {
  return request({
    url: '/api/ycsl/getHouseWithPeople',
    method: 'post',
    data: qlrParams, 
  })
}

//生成业务协税办公的受理号 
export function generalYwbh(username){
  return request({
    url: '/api/ycsl/generalYwbh',
    method: 'get',
    params: username, 
  })
}

//获取询问笔录相关信息
export function getXwblByYwbh(ywbh){
  return request({
    url: '/api/ycsl/getXwblByYwbh',
    method: 'get',
    params: ywbh, 
  })
}

//获取被选择人的列表
export function getToSelectQlrByYwbh(ywbh){
  return request({
    url: '/api/ycsl/getToSelectQlrByYwbh',
    method: 'get',
    params: ywbh, 
  })
}

//以人查房结果的数据过滤
export function yrcfPut(fcInfo){
  return request({
    url: '/api/ycsl/yrcfPut',
    method: 'put',
    data: fcInfo, 
  })
}

//获取一窗受理的件
export function getJobs(params){
  return request({
    url: '/api/ycsl/getJobs',
    method: 'get',
    params: params, 
  })
}