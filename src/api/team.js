import request from '@/router/axios'
import { baseUrl } from '@/config/env';

/**----------------------项目成员管理------------------------- */
/**
 * 项目成员管理分页查询
 */
export function getTeamList(query) {
  return request({
    url: baseUrl + '/ctExecutionTeamDetails/list',
    method: 'get',
    params: query
  })
}

/**
 * 获取项目名称和id
 */
export function getProjectName() {
    return request({
      url: baseUrl + '/ctProjectPlan/getProjectIdAndName',
      method: 'get',
    })
  }
  
