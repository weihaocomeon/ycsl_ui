import request from '@/utils/request'

export function getPageList(query) {
  return request({
    url: 'api/notice/findAll',
    method: 'get',
    params: query
  })
}

export function getType(params) {
  return request({
    url: 'api/notice/type',
    method: 'get',
    params
  })
}

export function deleteNotice(noticeID) {
  return request({
    url: 'api/notice/delete/' + noticeID,
    method: 'delete'
  })
}

export function noticeContent(formdata) {
  return request({
    url: 'api/notice/add/',
    method: 'post',
    data: formdata
  })
}

export function noticeUpdate(formdata) {
  return request({
    url: 'api/notice/update/',
    method: 'post',
    data: formdata
  })
}


