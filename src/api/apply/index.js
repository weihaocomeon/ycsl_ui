

import request from '@/utils/request' 

//获取申请信息
export function getApplys(obj) {
    return request({
    url: '/api/uploadFile/files/findApplyOnline',
    method: 'post',
    data: obj
    }) 
    } 

//获取房屋详情    
export function getApplysDetail(obj) {
    return request({
    url: '/api/uploadFile/files/accessDjsq',
    method: 'post',
    params: obj
    }) 
    } 


//签收  /files/signInApply
export function signInApply(obj) {
    return request({
    url: '/api/uploadFile/files/signInApply',
    method: 'post',
    data: obj
    }) 
    }   
    
//附件手动上传/synFile
export function synFile(obj) {
    return request({
    url: '/api/uploadFile/synFile',
    method: 'post',
    params: obj
    }) 
    }   
    
//提交/files/approvalApply    
export function approvalApply(obj) {
    return request({
    url: '/api/uploadFile/files/approvalApply',
    method: 'post',
    data: obj
    }) 
    }   

 //转内网按钮/files/synApply
export function toinner(obj) {
    return request({
    url: '/api/uploadFile/files/synApply',
    method: 'post',
    params: obj
    }) 
    }      
   
//findFC获取房屋的属性数据
export function findFC(obj) {
    return request({
    url: '/api/cert/cert/findFC',
    method: 'post',
    params: obj
    }) 
    }       

 //获取图片详情/files/accessDjfj    
 export function getFjDetail(obj) {
    return request({
    responseType:'arrayBuffer',
    url: '/api/uploadFile/files/accessDjfj',
    method: 'post',
    params: obj,
}) 
    }    

//获取需要发送的短信通知  
export function sendMessage(obj) {
    return request({
    url: '/api/apply/applyMsg/generateApplyMsgInfo',
    method: 'get',
    params: obj,
}) 
    }
    




