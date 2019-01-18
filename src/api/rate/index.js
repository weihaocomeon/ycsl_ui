import request from '@/utils/request' 
// 上门服务的分页 +模糊搜索查询
export function page(query) {
    return request({  
    url: '/api/rate/wwTsjy/listAndOrder',
    method: 'get',
    params: query
    })
    }

export function sign(query) {
    return request({  
    url: '/api/rate/wwTsjy/sign',
    method: 'post',
    params: query
    })
    }

export function approval(query) {
    return request({  
    url: '/api/rate/wwTsjy/approval',
    method: 'post',
    params: query
    })
    }
        