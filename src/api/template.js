import request from '@/router/axios';
import { baseUrl } from '@/config/env';
/**
 * 查询词典信息
 * @param orgId
 */
export const queryTemplatePageInfo = (pageInfo, data) => {
  const params = {
    current: pageInfo.current,
    size: pageInfo.size,
    templateKey: data.templateKey,
    templateName: data.templateName,
    templateType: data.templateType
  }
  return request({
    url: baseUrl+'/gen/queryTemplatePageInfo',
    params,
    method: 'get'
  })
}

/**
 * 保存模版信息
 * @param data
 */
export const saveTemplateInfo = (data) => {
  const info = {
    templateKey: data.templateKey,
    templateName:data.templateName,
    plugsKey:data.plugsKey,
    templatePackage:data.templatePackage,
    templateType: data.templateType,
    templateUrl: data.templateUrl,
    templateCode:data.templateCode,
    templateDesc:data.templateDesc
  }
  return request({
    url: baseUrl+'/gen/saveTemplateInfo',
    data: info,
    method: 'post'
  })
}

/**
 * 修改模版信息
 * @param data
 */
export const updTemplateInfo = (data) => {
  const info = {
    templateId:data.templateId,
    templateKey: data.templateKey,
    templateName:data.templateName,
    plugsKey:data.plugsKey,
    templatePackage:data.templatePackage,
    templateType: data.templateType,
    templateUrl: data.templateUrl,
    templateCode:data.templateCode,
    templateDesc:data.templateDesc
  }
  return request({
    url: baseUrl+'/gen/updTemplateInfo',
    data: info,
    method: 'post'
  })
}

/**
 * 删除模版信息
 * @param templateId
 */
export const delTemplateInfo = (templateId) => {
  const info = {
    templateId
  }
  return request({
    url: baseUrl+'/gen/delTemplateInfo',
    data: info,
    method: 'post'
  })
}
/**
 * 查询插件信息
 * @param data
 */
export const queryGenplusList = (plugsName,plugsKey,plugsType) => {
  const params = {
    plugsName,
    plugsKey,
    plugsType

  }
  return request({
    url: baseUrl+'/gen/queryGenplusList',
    params,
    method: 'get'
  })
}

