import {
  loginByUsername,
  logout,
  getInfo,
  getMenus
} from '@/api/login'
import {
  Message
} from 'element-ui'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    id:'',
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    menus: undefined,
    elements: undefined,
    permissionMenus: undefined,
    setting: {
      articlePlatform: []
    }
  },

  mutations: { // 突变
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_ELEMENTS: (state, elements) => {
      state.elements = elements
    },
    LOGIN_SUCCESS: () => {
      console.log('login success')
    },
    LOGOUT_USER: state => {
      state.user = ''
    },
    SET_PERMISSION_MENUS: (state, permissionMenus) => {
      state.permissionMenus = permissionMenus
    }
  },

  actions: {
    // 用户名登录  Action 类似于 mutation 且包含了异步调用 内置两个参数 commit 和status
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response
          console.log(data)
          if (data.status != 200) {
            Message({
              message: data.message,
              type: 'error'
            })
            return Promise.reject('error')
          } else {
            console.log(data)
            setToken(data.data)
            commit('SET_TOKEN', data.data)
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息 异步
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => { // 访问后可以得到后端FrontUser对象
          const data = response // 通过resp进行设置  这里为啥设置为role admin?
          commit('SET_ROLES', 'admin')
          commit('SET_NAME', data.name)
          commit('SET_ID', data.id)
          commit('SET_AVATAR', './assets/bg/bg.jpg') //头像的设置  之后再弄
          commit('SET_INTRODUCTION', data.description)
          const menus = {}
          for (let i = 0; i < data.menus.length; i++) {
            menus[data.menus[i].code] = true // 为对象新增key 和value 这里的true应该是用来组成菜单列表的 es6中新的语法
          }
          commit('SET_MENUS', menus) // 为可操作的菜单赋值
          const elements = {}
          for (let i = 0; i < data.elements.length; i++) {
            elements[data.elements[i].code] = true
          }
          commit('SET_ELEMENTS', elements) // 为可操作的element赋值
          resolve(response)
        }).catch(error => {
          reject(error)
        })
        getMenus().then(response => { // 获取菜单？为什么这么多菜单？ 有重复请求的嫌疑  不过这里返回的是菜单树
          commit('SET_PERMISSION_MENUS', response)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出 所有的信息进行初始化操作
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_MENUS', undefined)
          commit('SET_ELEMENTS', undefined)
          commit('SET_PERMISSION_MENUS', undefined)
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_MENUS', undefined)
        commit('SET_ELEMENTS', undefined)
        commit('SET_PERMISSION_MENUS', undefined)
        removeToken()
        resolve()
      })
    }
  }
}

export default user
