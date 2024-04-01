import request from '@/router/axios'
import { baseUrl } from '@/config/env';

/**
 * 查询用户菜单信息
 * @param userId
 * @param parentId
 */
export function getMenu(userId, parentId) {
    return request({
        url: baseUrl+'/admin/menu/list',
        params: {parentId, userId},
        method: 'get'
    })
}

/**
 * 查询树形菜单集合
 * @param query
 */
export function fetchMenuTree(query) {
    return request({
        url: baseUrl+'/admin/menu/tree',
        method: 'get',
        params: query
    })
}

/**
 * 添加菜单
 * @param obj
 */
export function addObj(obj) {
    return request({
        url: baseUrl+'/admin/menu/save',
        method: 'post',
        data: obj
    })
}

/**
 * 根据菜单ID查询菜单信息
 * @param menuId
 */
export function getObj(menuId) {
    return request({
        url: baseUrl+'/admin/menu/info',
        method: 'get',
        params: {menuId}
    })
}

/**
 * 删除菜单信息
 * @param menuId
 */
export function delObj(menuId) {
    return request({
        url: baseUrl+'/admin/menu/delete',
        method: 'get',
        params: {menuId}
    })
}

/**
 * 更新菜单
 * @param obj
 */
export function putObj(obj) {
    return request({
        url: baseUrl+'/admin/menu/update',
        method: 'post',
        data: obj
    })
}
