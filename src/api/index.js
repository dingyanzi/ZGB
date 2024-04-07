import request from '@/router/axios'
import { baseUrl } from '@/config/env';

/**----------------------首页统计------------------------- */
/**
 * 查询年度接口
 */
export function getAnnuals(query) {
  return request({
    url: baseUrl + '/ctProjectPlan/getAnnuals',
    method: 'get',
    params: query
  })
}
/**
 * 查询首页统计
 */
export function getIndex(query) {
  return request({
    url: baseUrl + '/ctProjectPlan/getIndex',
    method: 'get',
    params: query
  })
}







