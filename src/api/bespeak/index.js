import request from '@/utils/request' 

//获取日期区间内的号池总览情况
export function geInfos(obj) {
    return request({
    url: '/api/bespeak/yyjhc/geInfos',
    method: 'post',
    data: obj
    })
    } 

 //查看当天详情的叫号池 /yyjhc/getDetailedInfo 
 export function getDetailedInfo(obj) {
    return request({
    url: '/api/bespeak/yyjhc/getDetailedInfo',
    method: 'post',
    data: obj
    })
    } 

 //对号池的操作  
 export function setYyjhc(obj) {
    return request({
    url: '/api/bespeak/yyjhc/setYyjhc',
    method: 'post',
    data: obj
    })
    } 
 

    export function page(query) {
        return request({
        headers:{'OpenId':'pcAccess','AppId':'pcAccess'},    
        url: '/api/bespeak/zxyy/page',
        method: 'get',
        params: query
        })
        }


        