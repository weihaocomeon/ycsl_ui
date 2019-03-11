<template>
  <section class="app-main" id="app-main" style="min-height: 100%">
    <transition name="fade" mode="out-in">
      <!-- 缓存 加入缓存的组件会被缓存 -->
      <keep-alive :exclude='excludeViews'>
        <!-- :include="cachedViews" -->
        <!-- 路由出口 -->
       <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    excludeViews() {
       return ['xsbg'] //不需要被缓存的组件名称 按照业务要求自行添加
    }
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>
