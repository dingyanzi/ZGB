import request from '@/router/axios'
import { baseUrl } from '@/config/env';

/**
 * 分页查询
 * @param query
 */
export function fetchList(query) {
  return request({
    url: baseUrl+'/common/log/page',
    method: 'get',
    params: query
  })
}
/**
 * 清除日志
 * @param id
 */
export function delObj() {
  return request({
    url: baseUrl+'/common/log/delete',
    method: 'post'
  })
}
