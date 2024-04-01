import request from '@/router/axios'
import { baseUrl } from '@/config/env';

/**
 * 分页查询
 * @param query
 */
export function fetchList(query) {
  return request({
    url: baseUrl+'/admin/role/page',
    method: 'get',
    params: query
  })
}


/**
 * 添加角色
 * @param obj
 */
export function addObj(obj) {
  return request({
    url: baseUrl+'/admin/role/save',
    method: 'post',
    data: obj
  })
}


/**
 * 修改角色
 * @param obj
 */
export function putObj(obj) {
  return request({
    url: baseUrl+'/admin/role/update',
    method: 'post',
    data: obj
  })
}

/**
 * 删除角色
 * @param id
 */
export function delObj(id) {
  return request({
    url: baseUrl+'/admin/role/delete',
    method: 'get',
    params:{id}
  })
}

/**
 * 更新角色菜单
 * @param roleId
 * @param menuIds
 */
export function permissionUpd(roleId, menuIds) {
  var obj={roleId,menuIds}
  return request({
    url: baseUrl+'/admin/role/updaateRoleMenu',
    method: 'get',
    params: obj
  })
}

/**
 * 查询角色的菜单集合
 * @param roleId
 */
export function fetchRoleTree(roleId) {
  return request({
    url: baseUrl+'/admin/menu/treeByRoleId/',
    method: 'get',
    params:{roleId}
  })
}

/**
 * 查询角色列表
 */
export function roleList() {
  return request({
    url: baseUrl+'/admin/role/list/',
    method: 'get'
  })
}

