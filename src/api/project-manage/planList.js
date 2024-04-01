import request from '@/router/axios';
import { baseUrl } from '@/config/env';

// 计划变更列表
export function selectPlanUpdate(query) {
    return request({
        url: baseUrl + '/ctProjectPlan/selectPlanUpdate',
        method: 'get',
        params: query
    })
}
// 月度计划列表
export function selectMonthPlan(query) {
    return request({
        url: baseUrl + '/ctProjectPlan/selectMonthPlan',
        method: 'get',
        params: query
    })
}
export function delMonthPlan(query) {
    return request({
        url: baseUrl + '/ctProjectPlan/delMonthPlan',
        method: 'get',
        params: query
    })
}
// 项目计划详情
export function getProjectPlanDetail(query) {
    return request({
        url: baseUrl + '/ctProjectPlan/getProjectPlanDetail',
        method: 'get',
        params: query
    })
}
export function ctProject(query) {
    return request({
        url: baseUrl + '/common/dict/infoByType?type=ct_project_type',
        method: 'get',
        params: query
    })
}
// 材料列表
export function getCtFile(query) {
    return request({
        url: baseUrl + '/ctProjectPlan/getCtFile',
        method: 'get',
        params: query
    })
}
export function addCtFile(obj) {
    return request({
        url: baseUrl + '/ctProjectPlan/addCtFile',
        method: 'post',
        data: obj
    })
}
export function planClosure(query) {
    return request({
        url: baseUrl + '/ctProjectPlan/planClosure',
        method: 'get',
        params: query
    })
}
// 项目变更详情
export function getUpdatePlan(query) {
    return request({
        url: baseUrl + '/ctProjectPlan/getUpdatePlan',
        method: 'get',
        params: query
    })
}
export function applySuccess(query) {
    return request({
        url: baseUrl + '/ctProjectPlan/applyInfo',
        method: 'get',
        params: query
    })
}
//变更记录
export function getUpdatePlanProjectId(query) {
    return request({
        url: baseUrl + '/ctProjectPlan/getUpdatePlanProjectId',
        method: 'get',
        params: query
    })
}
export function updateProjectPlanStatus(query) {
    return request({
        url: baseUrl + '/ctProjectPlan/updateProjectPlanStatus',
        method: 'get',
        params: query
    })
}
export function selectHistory(query) {
    return request({
        url: baseUrl + '/ctProjectPlan/selectHistory',
        method: 'get',
        params: query
    })
}
//项目活动
export function getActivityManager(query) {
    return request({
        url: baseUrl + '/ctProjectPlan/getActivityManagerPageListByProjectId',
        method: 'get',
        params: query
    })
}
//项目成员
export function getExecutionTeam(query) {
    return request({
        url: baseUrl + '/ctProjectPlan/getExecutionTeamDetailsPageListByProjectId',
        method: 'get',
        params: query
    })
}