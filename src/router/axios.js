/**
 * 全站http配置
 *
 * axios参数说明
 * isSerialize是否开启form表单提交
 * isToken是否需要token
 */
import axios from 'axios'
import store from '@/store/';
import router from '@/router/router'
import { serialize, redirectProtalLoginPage } from '@/util/util'
import { getToken } from '@/util/auth'
import { getStore } from '@/util/store'
import { Notification } from 'element-ui'
import website from '@/config/website';
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

axios.defaults.timeout = 10000;
//返回其他状态吗
axios.defaults.validateStatus = function (status) {
    return status >= 200 && status <= 500; // 默认的
};
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
// NProgress Configuration
NProgress.configure({
    showSpinner: false
});
//HTTPrequest拦截
axios.interceptors.request.use(config => {
    NProgress.start() // start progress bar
    const meta = (config.meta || {});
    const isToken = meta.isToken === false;
    let token = getStore({ name: 'token' });
    if (token && !isToken) {
        config.headers['AuthToken'] = token // 让每个请求携带token--['Authorization']为自定义key 请根据实际情况自行修改
    }
    //headers中配置serialize为true开启序列化
    if (config.method === 'post' && meta.isSerialize === true) {
        config.data = serialize(config.data);
    }
    return config
}, error => {
    return Promise.reject(error)
});
//HTTPresponse拦截
axios.interceptors.response.use(res => {
    NProgress.done();
    const status = Number(res.status) || 200;
    const statusWhiteList = website.statusWhiteList || [];
    const message = res.data.msg || '系统未知错误,请反馈给管理员'
    //如果在白名单里则自行catch逻辑处理
    if (statusWhiteList.includes(status)) return Promise.reject(res);
    //如果是401则跳转到登录页面
    if (status === 401) store.dispatch('FedLogOut').then(() => { process.env.NODE_ENV == 'development' ? router.push({ path: '/login' }) : redirectProtalLoginPage() });
    // 如果请求为非200否者默认统一处理
    if ((status === 200 && res.data.code === '0') || (status === 200 && res.data.code === undefined)) {
        console.log(111)
    } else {
        Notification({
            title: '失败',
            message: message,
            type: 'error',
            duration: 2000
        })
        return Promise.reject(new Error(message))
    }
    return res.data;
}, error => {
    NProgress.done();
    return Promise.reject(new Error(error));
})

export default axios;
