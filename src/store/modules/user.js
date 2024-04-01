import { setToken, removeToken } from '@/util/auth'
import { setStore, getStore } from '@/util/store'
import { isURL, validatenull } from '@/util/validate'
import { deepClone } from '@/util/util'
import { dateFormat } from '@/util/date'
import webiste from '@/config/website'
import { loginByUsername, getUserInfo, getMenu, refeshToken } from '@/api/login'
import { systemAppIds } from '@/config/env'



function addPath(ele, first) {
  const menu = webiste.menu;
  const propsConfig = menu.props;
  const propsDefault = {
    label: propsConfig.label || 'label',
    path: propsConfig.path || 'path',
    icon: propsConfig.icon || 'icon',
    children: propsConfig.children || 'children'
  }
  const icon = ele[propsDefault.icon];
  ele[propsDefault.icon] = validatenull(icon) ? menu.iconDefault : icon;
  const isChild = ele[propsDefault.children] && ele[propsDefault.children].length !== 0;
  if (!isChild && first && !isURL(ele[propsDefault.path])) {
    ele[propsDefault.path] = ele[propsDefault.path] + '/index'
  } else {
    ele[propsDefault.children].forEach(child => {
      if (!isURL(child[propsDefault.path])) {
        child[propsDefault.path] = `${ele[propsDefault.path]}/${child[propsDefault.path] ? child[propsDefault.path] : 'index'}`
      }
      addPath(child);
    })
  }

}
const user = {
  state: {
    userInfo: {},
    roleCodes: [],
    permission: {},
    roles: [],
    menuId: getStore({ name: 'menuId' }) || [],
    menu: getStore({ name: 'menu' }) || [],
    menuAll: getStore({ name: 'menuAll' }) || [],
    token: getStore({ name: 'token' }) || '',
  },
  actions: {
    //根据用户名登录
    LoginByUsername({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo.userAccount, userInfo.passWord, userInfo.verCode, userInfo.uuid).then(res => {
          const data = res.data;
          commit('SET_TOKEN', data);
          commit('DEL_ALL_TAG');
          commit('CLEAR_LOCK');
          resolve();
        }).catch(error => {
          reject(error)
        })
      })
    },
    //根据手机号登录
    LoginByPhone({ commit }, userInfo) {
      return new Promise((resolve) => {
        loginByUsername(userInfo.phone, userInfo.code).then(res => {
          const data = res.data.data;
          commit('SET_TOKEN', data);
          commit('DEL_ALL_TAG');
          commit('CLEAR_LOCK');
          resolve();
        })
      })
    },
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo(user.state.token).then((res) => {
          var data = res.data;
          if(!getStore({ name: 'firstLoginTime' })){
            setStore({ name: 'firstLoginTime', content: dateFormat(new Date()), type: 'session' })
          }
          commit('SET_USER_INFO', data.sysUser)
          commit('SET_USER_ROLECODES', data.roleCodes)
          commit('SET_ROLES', data.roles || [])
          commit('SET_PERMISSION', data.permissions || [])
          resolve(data)
        }).catch(() => {
          reject()
        })
      })
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_MENUID', {})
        commit('SET_MENUALL', []);
        commit('SET_MENU', [])
        commit('SET_ROLES', [])
        commit('SET_USER_INFO', {})
        commit('SET_PERMISSION', {})
        commit('DEL_ALL_TAG');
        commit('CLEAR_LOCK');
        removeToken()
        resolve()

      })
    },
    //注销session
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_MENUID', {})
        commit('SET_MENUALL', []);
        commit('SET_MENU', [])
        commit('SET_ROLES', [])
        commit('SET_USER_INFO', {})
        commit('SET_PERMISSION', {})
        commit('DEL_ALL_TAG');
        commit('CLEAR_LOCK');
        removeToken()
        resolve()
      })
    },
    GetTopMenu() {
      // return new Promise(resolve => {
      //   // getMenu(user.state.userInfo.userId,null).then((res) => {
      //   //   const data = res.data
      //   //   resolve(data)
      //   // })
      // })

    },
    //刷新token
    RefeshToken({ state, commit }) {
      return new Promise((resolve, reject) => {
        refeshToken(state.token, state.userInfo.userId).then(res => {
          const data = res.data;
          commit('SET_TOKEN', data);
          resolve(data);
        }).catch(error => {
          reject(error)
        })
      })
    },
    //获取系统菜单
    GetMenu({ commit }, parentId) {
      return new Promise(resolve => {
        getMenu(user.state.userInfo.userId, parentId, null, systemAppIds).then((res) => {
          const data = res.data
          const menu = deepClone(data)
          menu.forEach(ele => {
            addPath(ele, true);
          })
          commit('SET_MENU', menu)
          resolve(menu)
        })
      })
    },
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      setToken(token)
      state.token = token;
      setStore({ name: 'token', content: state.token, type: 'session' })
    },
    SET_MENUID(state, menuId) {
      state.menuId = menuId;
      setStore({ name: 'menuId', content: state.menuId, type: 'session' })
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_USER_ROLECODES: (state, roleCodes) => {
      state.roleCodes = roleCodes
    },
    SET_MENUALL: (state, menuAll) => {
      state.menuAll = menuAll
      setStore({ name: 'menuAll', content: state.menuAll, type: 'session' })
    },
    SET_MENU: (state, menu) => {
      state.menu = menu
      let menuAll = state.menuAll;
      if (!validatenull(menu)) {
        const obj = menuAll.filter(ele => ele.path === menu[0].path)[0]
        if (!obj) {
          menuAll = menuAll.concat(menu);
          state.menuAll = menuAll
        }

        setStore({ name: 'menuAll', content: state.menuAll, type: 'session' })
      }
      setStore({ name: 'menu', content: state.menu, type: 'session' })
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_PERMISSION: (state, permission) => {
      state.permission = {};
      if (permission.length > 0) {
        permission.forEach(ele => {
          state.permission[ele] = true;
        });
      }
    }
  }

}
export default user
