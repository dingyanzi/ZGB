/**
 * 全站权限配置
 * 
 */
import { getStore } from '@/util/store'
import router from './router/router'
import store from './store'
import { validatenull } from '@/util/validate'
import watermark from '@/util/waterMark'
import { getToken } from '@/util/auth'
import { redirectProtalLoginPage } from '@/util/util'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false });
const lockPage = store.getters.website.lockPage; //锁屏页
router.beforeEach((to, from, next) => {
  const meta = to.meta || {};
  const isMenu = meta.menu === undefined ? to.query.menu : meta.menu;
  store.commit('SET_IS_MENU', isMenu === undefined);
  if (getStore({ name: 'token' })) {
    if (to.path != '/ssoLogin') {
      if (store.getters.isLock && to.path != lockPage) { //如果系统激活锁屏，全部跳转到锁屏页
        next({ path: lockPage })
      } else if (to.path === '/login') { //如果登录成功访问登录页跳转到主页
        next({ path: '/' })
      } else {
        //如果用户信息为空则获取用户信息，获取用户信息失败，跳转到登录页
        if (store.getters.roles.length === 0) {
          store.dispatch('GetUserInfo').then(() => {
            next({ ...to, replace: true })
          }).catch(() => {
            store.dispatch('FedLogOut').then(() => {
              process.env.NODE_ENV == 'development' ? next({ path: '/login' }) : redirectProtalLoginPage()
            })
          })
        } else {
          const value = to.query.src || to.fullPath;
          const label = to.query.name || to.name;
          const meta = to.meta || router.$avueRouter.meta || {};
          const i18n = to.query.i18n;
          if (meta.isTab !== false && !validatenull(value) && !validatenull(label)) {
            store.commit('ADD_TAG', {
              label: label,
              value: value,
              params: to.params,
              query: to.query,
              meta: (() => {
                if (!i18n) {
                  return meta
                }
                return {
                  i18n: i18n
                }
              })(),
              group: router.$avueRouter.group || []
            });
          }
          next()
        }
      }
    } else {
      next()
    }
  } else {
    //判断是否需要认证，没有登录访问去登录页
    if (meta.isAuth === false) {
      next()
    } else {
      process.env.NODE_ENV == 'development' ? next('/login') : redirectProtalLoginPage()
    }
  }
})

router.afterEach((to) => {
  NProgress.done();
  let title = store.getters.tag.label;
  let i18n = store.getters.tag.meta.i18n;
  title = router.$avueRouter.generateTitle(title, i18n)
  let userInfo = store.getters.userInfo;
  if (Object.keys(userInfo).length) {
    watermark.set(userInfo.username + ' ' + (userInfo.ipAddress || '') + ' ' + getStore({ name: 'firstLoginTime' }))
  }
  if (to.path == '/login') {
    watermark.set('')
  }
  //根据当前的标签也获取label的值动态设置浏览器标题
  router.$avueRouter.setTitle(title);
});