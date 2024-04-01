import request from '@/router/axios'
import { baseUrl } from '@/config/env';

/**----------------------组织机构管理------------------------- */
/**
 * 组织机构管理分页查询
 */
export function getOrganizationList(query) {
  return request({
    url: baseUrl + '/ctOrganization/list',
    method: 'get',
    params: query
  })
}

/**
 * 组织机构新增
 *  */ 
export function addOrganization(data) {
  return request({
    url: baseUrl + '/ctOrganization/save',
    method: 'POST',
    data
  })
} 

  /**
 * 组织机构明细
 *  */ 
export function getOrganization(id) {
  return request({
    url: baseUrl + '/ctOrganization/get?id='+id,
    method: 'get',
  })
}

 /**
 * 组织机构修改
 *  */ 
 export function updateOrganization(data) {
  return request({
    url: baseUrl + '/ctOrganization/update',
    method: 'PUT',
    data
  })
}


  
