import request from '@/router/axios'
import { baseUrl } from '@/config/env';

/**
 * 分页信息
 * @param query
 */
export function fetchList(query) {
    return request({
        url: baseUrl+'/workflow/process/page',
        method: 'get',
        params: query
    })
}

/**
 * 删除流程实例
 * @param deploymentId
 */
export function delObj(deploymentId) {
    return request({
        url: baseUrl+'/workflow/process/deleteProcIns',
        method: 'get',
        params: {deploymentId}
    })
}

/**
 * 更新状态
 * @param procDefId
 * @param status
 */
export function status(procDefId, status) {
    return request({
        url: baseUrl+'/workflow/process/updateState',
        method: 'get',
        params: {procDefId,status}
    })
}
