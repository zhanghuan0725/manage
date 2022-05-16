import request from '@/utils/request'

// 心愿单模块查询
export function wishSelect(data) {
  return request({
    url: '/wish/select',
    method: 'post',
    data,
    baseURL: 'http://106.55.105.130:7080'
  })
}

// 心愿单模块-新建
export function wishInsert(data) {
  return request({
    url: '/wish/insert',
    method: 'post',
    data,
    baseURL: 'http://106.55.105.130:7080'
  })
}

// 心愿单模块-编辑
export function wishUpdate(data) {
  return request({
    url: '/wish/update',
    method: 'post',
    data,
    baseURL: 'http://106.55.105.130:7080'
  })
}

// 心愿单模块-删除
export function wishDelete(data) {
  return request({
    url: '/wish/delete',
    method: 'post',
    data,
    baseURL: 'http://106.55.105.130:7080'
  })
}

// 财务新闻
export function newsSelect(data) {
  return request({
    url: '/news/select',
    method: 'post',
    data,
    baseURL: 'http://106.55.105.130:7080'
  })
}


// 财务新闻-详情
export function newsDetailsSelect(data) {
  return request({
    url: '/news_detail/select',
    method: 'post',
    data,
    baseURL: 'http://106.55.105.130:7080'
  })
}

// 财务统计、财务分析模块查询
export function statistical(data) {
  return request({
    url: '/statistical/select',
    method: 'post',
    data,
    baseURL: 'http://106.55.105.130:7080'
  })
}

// 财务预算模块查询
export function budget(data) {
  return request({
    url: '/budget/select',
    method: 'post',
    data,
    baseURL: 'http://106.55.105.130:7080'
  })
}