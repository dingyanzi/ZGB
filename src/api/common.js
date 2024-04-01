import request from '@/router/axios';
import { baseUrl } from '@/config/env';
/**
 * 获取词典信息
 * @param page
 * @param limit
 */
export const queryDicItemList = (dictCode) => {
  const params = {dictCode}
  return request({
    url: baseUrl+'/sys/queryDicItemList',
    params,
    method: 'get'
  })
}

