import request from '@/router/axios';
import { baseUrl } from '@/config/env';
/**
 * 查询插件分页信息
 * @param orgId
 */
export const queryGenPlugsPageInfo = (pageInfo, data) => {
  const params = {
    current: pageInfo.current,
    size: pageInfo.size,
    plugsName: data.plugsName,
    plugsKey: data.plugsKey,
    plugsType: data.plugsType
  }
  return request({
    url: baseUrl+'/gen/queryGenPlugsPageInfo',
    params,
    method: 'get'
  })
}

/**
 * 保存插件信息
 * @param data
 */
export const saveGenPlugsInfo = (data) => {
  const info = {
    plugsName: data.plugsName,
    plugsKey: data.plugsKey,
    plugsValue: data.plugsValue,
    plugsType: data.plugsType
  }
  return request({
    url: baseUrl+'/gen/saveGenPlugsInfo',
    data: info,
    method: 'post'
  })
}


/**
 * 修改插件信息
 * @param data
 */
export const updGenPlugsInfo = (data) => {
  const info = {
    plugsId: data.plugsId,
    plugsName: data.plugsName,
    plugsKey: data.plugsKey,
    plugsValue: data.plugsValue,
    plugsType: data.plugsType
  }
  return request({
    url: baseUrl+'/gen/updGenPlugsInfo',
    data: info,
    method: 'post'
  })
}

/**
 * 删除插件信息
 * @param templateId
 */
export const delGenPlugs = (plugsId) => {
  const info = {
    plugsId
  }
  return request({
    url: baseUrl+'/gen/delGenPlugs',
    data: info,
    method: 'post'
  })
}
