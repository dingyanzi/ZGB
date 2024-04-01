import request from '@/router/axios'
import { baseUrl } from '@/config/env';

/**----------------------项目活动管理------------------------- */
/**
 * 项目活动列表分页查询
 */
export function getActivityList(query) {
  return request({
    url: baseUrl + '/ctActivityManager/list',
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

/**
 *  项目活动新增
 *  */ 
export function addActivity(data) {
  return request({
    url: baseUrl + '/ctActivityManager/insert',
    method: 'POST',
    data
  })
} 
/**
 *  项目活动暂存
 *  */ 
export function zcActivity(data) {
  return request({
    url: baseUrl + '/ctActivityManager/staringCtActivityManager',
    method: 'POST',
    data
  })
} 
/**
 * 项目活动明细
 *  */ 
export function getActivity(id) {
  return request({
    url: baseUrl + '/ctActivityManager/get/'+id,
    method: 'get',
  })
}

/**
 * 项目活动明细
 *  */ 
export function getActivityMoney(id) {
  return request({
    url: baseUrl + '/ctActivityFunt/getSubtotalSum?projectId='+id,
    method: 'get',
  })
}

/**
 * 项目活动审核
 *  */ 
export function checkActivity(data) {
  return request({
    url: baseUrl + '/ctActivityManager/check',
    method: 'put',
    data
  })
}

/**
 * 项目活动退回编辑
 *  */ 
export function returnUpdateActivity(data) {
  return request({
    url: baseUrl + '/ctActivityManager/returnUpdate',
    method: 'put',
    data
  })
}

/**
 * 项目活动编辑
 *  */ 
export function updateActivity(data) {
  return request({
    url: baseUrl + '/ctActivityManager/update',
    method: 'post',
    data
  })
}

/**
 * 项目活动数据信息
 *  */ 
export function ctApplyDetailList(query) {
  return request({
    url: baseUrl + '/ctApplyDetail/list',
    method: 'get',
    params: query
  })
}

/**
 * 项目活动字典查询
 *  */ 
export function dictQuery(type) {
  return request({
    url: baseUrl +  '/common/dict/infoByType?type='+type,
    method: 'get',
  })
}

/**
 * 项目活动导出
 *  */ 
export function exportActivity(data) {
  return request({
    url: baseUrl +  '/ctActivityManager/export',
    method: 'post',
    data
  })
}

/**
 * 项目活动查询id和name
 *  */ 
export function getIdAndName() {
  return request({
    url: baseUrl + '/ctProjectPlan/getProjectIdAndName',
    method: 'get',
  })
}

/**
 * 活动删除
 */
export function delActivity(query) {
  return request({
      url: baseUrl + '/ctActivityManager/delete',
      method: 'get',
      params: query
  })
}






