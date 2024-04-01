// import request from '@/libs/request'
// let url = 'https://jbms.nanjingdata.cn/welfareApi'
import request from '@/router/axios'
import { baseUrl } from '@/config/env';
import qs from 'qs'

// 文件上传
export const upload = params => {

  return request({
    url: baseUrl + '/os/file/upload?bucketName=lottery',
    data: params,
    method: 'post-form'
  })
}
export const uploadImg = data => {
  return request({
    data,
    url: baseUrl + '/os/file/uploadImg?bucketName=lottery',
    // data: qs.stringify(params),
    "Content-Type": 'multipart/form-data',
    method: 'post'
  })
}
// 文件列表
export const queryFileConfList = params => {

  return request({
    url: baseUrl + '/pc/queryFileInfo',
    params: params,
    method: 'get'
  })
}

// 文件上传
export const saveFileInfo = params => {

  return request({
    url: baseUrl + '/pc/saveFileInfo',
    data: params,
    method: 'post'
  })
}

// 签名图
export const queryFileInfoAuto = params => {

  return request({
    url: baseUrl + '/pc/queryFileInfoAuto',
    params: params,
    method: 'get'
  })
}
// 签名图
export const catchSign = params => {
  return request({
    url: baseUrl + '/ctProjectPlan/catchSign',
    params: params,
    method: 'get'
  })
}