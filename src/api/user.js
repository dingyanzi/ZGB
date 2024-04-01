import request from '@/router/axios';
import { baseUrl } from '@/config/env';

export const sendLogs = (list) => request({
    url: baseUrl + '/user/logout',
    method: 'post',
    data: list
})

/**
 * 分页查询
 * @param query
 */
export function fetchList(query) {
    return request({
        url: baseUrl+'/admin/user/page',
        method: 'get',
        params: query
    })
}

/**
 * 添加用户
 * @param obj
 */
export function addObj(obj) {
    return request({
        url: baseUrl+'/admin/user/save',
        method: 'post',
        data: obj
    })
}

/**
 * 删除用户
 * @param userId
 */
export function delObj(userId) {
    return request({
        url: baseUrl+'/admin/user/delete',
        method: 'get',
        params:{userId}
    })
}

/**
 * 修改角色
 * @param obj
 */
export function putObj(obj) {
    return request({
        url: baseUrl+'/admin/user/update',
        method: 'post',
        data: obj
    })
}

