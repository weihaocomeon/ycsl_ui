import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar 进度条 关于进度条的使用 请参考https://www.cnblogs.com/y114113/p/6289629.html
import 'nprogress/nprogress.css'// progress bar style 进度条样式
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration 进度条的简单配置

const whiteList = ['/login', '/authredirect']// no redirect whitelist 不进行跳转的白名单

router.beforeEach((to, from, next) => { // 路由的遍历 路由的前置守卫 每次路由跳转时执行
  NProgress.start() // start progress bar 加载进度条
  if (getToken()) { // determine if there has token 用户刷新操作时会去cookie中拿取token 如果存在token 既从header中存在key为authorization的value
    /* has token*/
    if (to.path === '/login') { // 判断是否是向登录页进行跳转
      next({ path: '/' }) // 如果是 则放行
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else { // 不是跳往登录页
      if (store.getters.menus === undefined) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(info => { // 异步拉取user_info 包括权限 角色 和资源
          const menus = {}
          for (let i = 0; i < info.menus.length; i++) { // 初始化可访问菜单不是在GetInfo中初始化过了吗 是不是重复操作
            menus[info.menus[i].code] = true
          }
          store.dispatch('GenerateRoutes', menus).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch(() => {
          store.dispatch('LogOut').then(() => { // 用户信息遇到问题 则分发登出 并路由到登录页面
            next({ path: '/login' })
          })
        })
      } else {
      //  else {
      //   // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
      //   if (hasPermission(store.getters.roles, to.meta.role)) {
      //     next();//
      //   } else {
        next() // 最常见的就是进入这个方法 就是啥也不干 菜单也加载完毕 跳转到该跳转的路由上去
      //   }
      //   // 可删 ↑
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入当前路由
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => { // 路由的后守卫  路由完毕后 确保进度条被正确关闭
  NProgress.done() // finish progress bar 确保路由被关闭
})
