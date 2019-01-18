import request from '@/utils/request'

//排序
export function page(query) {
    return request({  
    url: '/api/apply/wwCxsq/listAndOrder',
    method: 'get',
    params: query,
    headers:{'OpenId':'pcAccess','AppId':'pcAccess'}
    })
    }

//获取用户查询结果（pdf）
export function getPdf(query) {
    return request({  
    url: '/api/apply/wwCxsq/getCxPdf',
    method: 'get',
    params: query,
    headers:{'OpenId':'pcAccess','AppId':'pcAccess'}
    })
    }
