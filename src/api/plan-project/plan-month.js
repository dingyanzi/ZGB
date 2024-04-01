import request from '@/router/axios';
import { baseUrl } from '@/config/env';

// 月度变更列表
export function updateMonthPlanStatus(query) {
    return request({
        url: baseUrl + '/ctProjectPlan/updateMonthPlanStatus',
        method: 'get',
        params: query
    })
}
export function getCtMonthPlanById(query) {
    return request({
        url: baseUrl + '/ctProjectPlan/getCtMonthPlanById',
        method: 'get',
        params: query
    })
}
export function updateMonthPlan(obj) {
    return request({
        url: baseUrl + '/ctProjectPlan/updateMonthPlan',
        method: 'post',
        data: obj
    })
}
export function ctstatus(query) {
    return request({
        url: baseUrl + '/common/dict/infoByType',
        method: 'get',
        params: query
    })
}
export function getCtMonthPlan(query) {
    return request({
        url: baseUrl + '/ctProjectPlan/getCtMonthPlanByProjectId',
        method: 'get',
        params: query
    })
}
export function streetAndCommunity(query) {
    return request({
        url: baseUrl + '/ctProjectPlan/streetAndCommunity?fId=320111',
        method: 'get',
        params: query
    })
}

