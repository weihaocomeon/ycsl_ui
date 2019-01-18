<template>
  <section class="app-main" style="min-height: 100%">
    <transition name="fade" mode="out-in">
      <!-- 缓存 加入缓存的组件会被缓存 -->
      <keep-alive :include="cachedViews">
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
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>
