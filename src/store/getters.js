const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  id: state => state.user.id,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
  permissionMenus: state => state.user.permissionMenus,
  menus: state => state.user.menus, // 用户信息
  elements: state => state.user.elements,
  blwd: state =>state.sqxq.blwd,//办理网点
  ywlx: state =>state.sqxq.ywlx, //申请详情  
  sqxq: state =>state.sqxq.sqxq 
  
}
export default getters
