import request from '@/router/axios'
import { baseUrl } from '@/config/env';

/**----------------------项目资金管理------------------------- */
/**
 * 项目资金列表分页查询
 */
export function getFundsList(query) {
  return request({
    url: baseUrl + '/ctProjectPlan/activityPlanFundPageList',
    method: 'get',
    params: query
  })
}

/**
 * 根据主键project_id查询项目计划 详情上部分
 */
export function getFundsXxS(id) {
  return request({
    url: baseUrl + '/ctProjectPlan/getCtProjectPlanById?id='+id,
    method: 'get',
  })
}

/**
 * 根据主键project_id查询项目计划 详情中部分
 */
export function getFundsXxZ(id) {
  return request({
    url: baseUrl + '/ctActivityFunt/getSubtotalSum?projectId='+id,
    method: 'get',
  })
}

/**
 * 根据主键project_id查询项目计划 详情下部分
 */
export function getFundsXxX(query) {
  return request({
    url: baseUrl + '/ctActivityFunt/getActivityFuntPageByProjectId',
    method: 'get',
    params: query
  })
}




