<template>
  <div class="app-container">
    <!-- 头部组件 -->
    <Header></Header>
    <!-- 头部组件 -->

    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- 路由组件出口 -->

    <!-- 底部组件 -->
    <!-- 由于只要在main.js注册了router，每一个组件实例都有$route属性，这个组件的$route属性继承自当前url的hash
    对应的路由组件的$route属性 -->
    <Footer v-show="$route.meta.showFooter"></Footer>
    <!-- 底部组件 -->
  </div>
</template>

<script>
import Header from '@/components/Header/'
import Footer from '@/components/Footer/'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  created() {
    // 获取三级联动的所有数据
    // 由于根组件只执行一次，且在这里是最早执行的，可以统一获取数据到vuex仓库。
    // 以免得每次创建一个TypeNav组件，就发起一次请求，没必要。
    this.$store.dispatch('getCategoryList')
  },
  mounted() {}
}
</script>

<style scoped lang="less"></style>
