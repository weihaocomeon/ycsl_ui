import Vue from 'vue'

// import 'vue-event-calendar/dist/style.css' // 1.1.10之后的版本，css被放在了单独的文件中，方便替换
// import vueEventCalendar from 'vue-event-calendar'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' //  Element的样式文件需要单独引入

import '@/assets/icon/iconfont.css'//引入阿里的图标库

import '@/styles/index.scss' // global css 全局样式  不知道是否有覆盖elementUi的样式

import ZkTable from 'vue-table-with-tree-grid'//引入treetable组件

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog'// error log
import './permission' // permission control
import './mock' // simulation data

import * as filters from './filters' // global filters

//富文本编辑器
import vueResource from 'vue-resource'
import vueQuillEdit from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(vueQuillEdit)
Vue.use(vueResource)

// window.Vue = Vue

Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value) // 使用配置文件定制i18
})

Vue.use(ZkTable) //使用表格树
// Vue.use(vueEventCalendar, { locale: 'zh' }) // 可以设置语言，支持中文和英文

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
