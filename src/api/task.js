import request from '@/router/axios'
import { baseUrl } from '@/config/env';

/**
 * 查询操作日志
 * @param orgId
 */
export const getTaskPageInfo = (pageInfo, data) => {
  const params = {
    current: pageInfo.current,
    size: pageInfo.size,
    taskStatus: data.taskStatus
  }
  return request({
    url: baseUrl+'/gen/getTaskPageInfo',
    params,
    method: 'get'
  })
}
