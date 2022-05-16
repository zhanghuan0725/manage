import request from '@/utils/request'

// 财务管理模块查询
export function manageSelect(data) {
  return request({
    url: '/income_and_expenses/select',
    method: 'post',
    data,
    baseURL: 'http://106.55.105.130:7080'
  })
}

// 财务管理模块-新建
export function manageInsert(data) {
  return request({
    url: '/income_and_expenses/insert',
    method: 'post',
    data,
    baseURL: 'http://106.55.105.130:7080'
  })
}

// 财务管理模块-编辑
export function manageUpdate(data) {
  return request({
    url: '/income_and_expenses/update',
    method: 'post',
    data,
    baseURL: 'http://106.55.105.130:7080'
  })
}

// 财务管理模块-删除
export function manageDelete(data) {
  return request({
    url: '/income_and_expenses/delete',
    method: 'post',
    data,
    baseURL: 'http://106.55.105.130:7080'
  })
}
