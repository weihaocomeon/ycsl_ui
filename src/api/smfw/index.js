import request from '@/utils/request' 
// 上门服务的分页 +模糊搜索查询
export function page(query) {
    return request({  
    url: '/api/smfw/smfw/findAll',
    method: 'get',
    params: query,
    })
    }

//获取上门服务清单 /smfw/smfwQd  
export function getData(query){
    return request({  
        url: '/api/smfw/smfw/smfwQd',
        method: 'post',
        params: query
        }) 
}

//获取附件详情 
export function getFjDetail(query){
    return request({  
        url: '/api/smfw/smfw/fj',
        method: 'post',
        params: query
        }) 
}

//签收/smfw/smfwQs 
export function smfwQs(query){
    return request({  
        url: '/api/smfw/smfw/smfwQs',
        method: 'post',
        params: query
        }) 
}

//审批/smfw/smfwSp 
export function smfwSp(query){
    return request({  
        url: '/api/smfw/smfw/smfwSp',
        method: 'post',
        params: query
        }) 
}
