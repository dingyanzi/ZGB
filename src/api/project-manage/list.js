import request from '@/router/axios';
import { baseUrl } from '@/config/env';
import store from "@/store";

// 项目管理新增项目
export function addPlan(obj) {
    return request({
        url: baseUrl + '/ctProjectPlan/addPlan',
        method: 'post',
        data: obj
    })
}
export function updatePlan(obj) {
    return request({
        url: baseUrl + '/ctProjectPlan/updatePlan',
        method: 'post',
        data: obj
    })
}
// 添加月度计划
export function addMonthPlan(obj) {
    return request({
        url: baseUrl + '/ctProjectPlan/addMonthPlan',
        method: 'post',
        data: obj
    })
}
export function addUpdateInfo(obj) {
    return request({
        url: baseUrl + '/ctProjectPlan/addUpdateInfo',
        method: 'post',
        data: obj
    })
}
export function delProjectPlan(query) {
    return request({
        url: baseUrl + '/ctProjectPlan/delProjectPlan',
        method: 'get',
        params: query
    })
}
export function updateUpdateInfo(obj) {
    return request({
        url: baseUrl + '/ctProjectPlan/updateUpdateInfo',
        method: 'post',
        data: obj
    })
}
export function stagingPlan(obj) {
    return request({
        url: baseUrl + '/ctProjectPlan/stagingPlan',
        method: 'post',
        data: obj
    })
}

export function getPic(query) {
    return request({
        url: baseUrl + '/ctProjectPlan/getPic',
        method: 'get',
        params: query
    })
}
export function getSign(query) {
    return request({
        url: baseUrl + '/ctProjectPlan/getSign',
        method: 'get',
        params: query
    })
}

// 项目管理列表
export function selectProject(query) {
    return request({
        url: baseUrl + '/ctProjectPlan/selectProjectManager',
        method: 'get',
        params: query
    })
}
export function unit(query) {
    return request({
        url: baseUrl + '/common/dict/infoByType?type=ct_unit',
        method: 'get',
        params: query
    })
}
export function edulevel(query) {
    return request({
        url: baseUrl + '/common/dict/infoByType?type=edu_level',
        method: 'get',
        params: query
    })
}
export function selectOrgan(query) {
    return request({
        url: baseUrl + '/ctProjectPlan/selectOrgan',
        method: 'get',
        params: query
    })
}
export function selectFile(query) {
    return request({
        url: baseUrl + '/ctProjectPlan/selectFile',
        method: 'get',
        params: query
    })
}
export function retuanUpdate(query) {
    return request({
        url: baseUrl + '/ctProjectPlan/retuanUpdate',
        method: 'get',
        params: query
    })
}
export function returnMonthUpdate(query) {
    return request({
        url: baseUrl + '/ctProjectPlan/returnMonthUpdate',
        method: 'get',
        params: query
    })
}
export function getBusinessType(query) {
    return request({
        url: baseUrl + '/ctProjectPlan/getBusinessType',
        method: 'get',
        params: query
    })
}
export function selectPlan() {
    return request({
        url: baseUrl + '/ctProjectPlan/selectPlanListOrg?undertakingUnitId=' + store.getters.userInfo.orgId,
        method: 'get',
        // params: query
    })
}