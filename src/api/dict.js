import request from '@/router/axios';
import { baseUrl } from '@/config/env';

/**
 * 分页查询词典信息
 * @param query
 */
export function fetchList(query) {
  return request({
    url: baseUrl+'/common/dict/page',
    method: 'get',
    params: query
  })
}

/**
 * 分页查询词典项信息
 * @param query
 */
export function fetchItemList(query) {
  return request({
    url: baseUrl+'/common/dict/item/list',
    method: 'get',
    params: query
  })
}

/**
 * 添加词典项信息
 * @param obj
 */
export function addItemObj(obj) {
  return request({
    url: baseUrl+'/common/dict/item/add',
    method: 'post',
    data: obj
  })
}

/**
 * 删除词典项信息
 * @param id
 */
export function delItemObj(id) {
  return request({
    url: baseUrl+'/common/dict/item/delete' ,
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
    url: baseUrl+'/common/dict/item/update',
    method: 'post',
    data: obj
  })
}

/**
 * 添加词典信息
 * @param obj
 */
export function addObj(obj) {
  return request({
    url: baseUrl+'/common/dict/add',
    method: 'post',
    data: obj
  })
}

/**
 * 删除词典信息
 * @param row
 */
export function delObj(row) {
  return request({
    url: baseUrl+'/common/dict/delete',
    method: 'get',
    params:{id:row.id}
  })
}

/**
 * 修改词典信息
 * @param obj
 */
export function putObj(obj) {
  return request({
    url: baseUrl+'/common/dict/update',
    method: 'post',
    data: obj
  })
}
