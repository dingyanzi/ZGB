import request from '@/router/axios';
import { baseUrl } from '@/config/env';

export const loginByUsername = (userAccount, passWord, verCode, uuid) => {
  return request({
    url: baseUrl + '/auth/getTokenByAccount',
    headers: {
      isToken: false
    },
    method: 'get',
    params: { userAccount, passWord, verCode, uuid }
  })
}

/**
 * 获取验证码
 */
export const getCode = (uuid) => {
  return request({
    url: baseUrl + '/code/randomNum?uuid=' + uuid,
    method: 'get'
  })
}


/**
 * 加载用户信息
 * @param token
 */
export function getUserInfo(token) {
  return request({
    url: baseUrl + '/admin/user/loadUserInfo',
    method: 'get',
    params: { token }
  })
}

/**
 * 查询用户菜单信息
 * @param userId
 * @param parentId
 */
export function getMenu(userId, parentId, flag, appId) {
  return request({
    url: baseUrl + '/admin/menu/list',
    params: { parentId, userId, flag, appId },
    method: 'get'
  })
}

export const getTopMenu = () => request({
  url: baseUrl + '/user/getTopMenu',
  method: 'get'
});


/**
 * 刷新token
 * @param token
 */
export const refeshToken = (token, userId) => request({
  url: baseUrl + '/auth/refesh',
  params: { token: token, userId: userId },
  method: 'get'
})

