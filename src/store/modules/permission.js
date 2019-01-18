import { asyncRouterMap, constantRouterMap } from '@/router'
import { fetchAll } from '@/api/admin/menu/index'
/**
 * 通过authority判断是否与当前用户权限匹配 如果路由列表中配置了 authority关键字
 * @param menus
 * @param route
 */
function hasPermission(menus, route) { // route为route.js中配置的异步路由列表
  if (route.authority) {
    if (menus[route.authority] !== undefined) { // 查看对象中 是否有角色列表的key
      return menus[route.authority] // 返回该角色列表的key 存在则返回true
    } else {
      return false
    }
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表 这个方法有点问题 我们需要维护一份前端写死的路由，否则新加入的页面是无法使用的，目前admin团队没有很好的解决办法
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, menus, menuDatas) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(menus, route)) { // 判断当前遍历的这个页面中写死的路由 在数据库中是否存在,这一步有些多余 menuDatas不就是路由列表了吗？
      route.name = menuDatas[route.authority].title
      route.icon = menuDatas[route.authority].icon
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, menus, menuDatas)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ // 根据可访问的菜单树  生成路由表
      commit
    }, menus) {
      return new Promise(resolve => {
        fetchAll().then(data => {
          const menuDatas = {}
          for (let i = 0; i < data.length; i++) {
            menuDatas[data[i].code] = data[i] // 菜单的code和下标组成的对象
          }
          const accessedRouters = filterAsyncRouter(asyncRouterMap, menus, menuDatas); // 可访问的路由列表 使用预定义路由列表信息 全部菜单和 可访问菜单进行过滤
          console.log(accessedRouters)
          commit('SET_ROUTERS', accessedRouters)
          resolve()
        })
      })
    }
  }
}

export default permission
