import request from '@/router/axios';
import { baseUrl } from '@/config/env';

/**
 * 分页查询插件信息
 * @param query
 */
export function fetchList(query) {
  return request({
    url: baseUrl+'/common/plugins/page',
    method: 'get',
    params: query
  })
}

/**
 * 分页查询插件参数信息
 * @param query
 */
export function fetchItemList(query) {
  return request({
    url: baseUrl+'/common/plugins/params/list',
    method: 'get',
    params: query
  })
}

/**
 * 添加插件
 * @param obj
 */
export function addItemObj(obj) {
  return request({
    url: baseUrl+'/common/plugins/params/add',
    method: 'post',
    data: obj
  })
}

/**
 * 删除插件
 * @param id
 */
export function delItemObj(id) {
  return request({
    url: baseUrl+'/common/plugins/params/delete' ,
    method: 'get',
    params:{id}
  })
}

/**
 * 更新词典项信息
 * @param obj
 */
export function putItemObj(obj) {
  return request({
    url: baseUrl+'/common/plugins/params/update',
    method: 'post',
    data: obj
  })
}

/**
 * 添加插件参数
 * @param obj
 */
export function addObj(obj) {
  return request({
    url: baseUrl+'/common/plugins/add',
    method: 'post',
    data: obj
  })
}

/**
 * 删除插件参数
 * @param row
 */
export function delObj(row) {
  return request({
    url: baseUrl+'/common/plugins/delete',
    method: 'get',
    params:{id:row.id}
  })
}

/**
 * 修改插件参数
 * @param obj
 */
export function putObj(obj) {
  return request({
    url: baseUrl+'/common/plugins/update',
    method: 'post',
    data: obj
  })
}
