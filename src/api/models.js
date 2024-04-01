import request from '@/router/axios'
import { baseUrl } from '@/config/env';

/**
 * 分页查询
 * @param query
 */
export function fetchList(query) {
    return request({
        url: baseUrl+'/workflow/models/page',
        method: 'get',
        params: query
    })
}

/**
 * 删除流程模版
 * @param id
 */
export function delObj(id) {
    return request({
        url: baseUrl+'/workflow/models/delete',
        method: 'get',
        params:{id}
    })
}

/**
 * 新增流程模版
 * @param obj
 */
export function addObj(obj) {
    return request({
        url: baseUrl+'/workflow/models/save',
        method: 'post',
        data: {
            key:obj.key,
            name:obj.name,
            category:obj.category,
            desc:obj.desc,
            modelUrl:obj.modelUrl[0]?obj.modelUrl[0].value:null
        }
    })
}

/**
 * 删除流程模版
 * @param id
 */
export function deploy(id) {
    return request({
        url: baseUrl+'/workflow/models/deploy',
        method: 'get',
        params:{id}
    })
}
