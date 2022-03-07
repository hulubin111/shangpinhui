import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 重写push方法
// 保留着原来push方法，因为还要用
const originPush = VueRouter.prototype.push

// 当使用this.$router.push方法，就是执行下面的代码
VueRouter.prototype.push = function (location, resolve, reject) {
  // 如果两个回调函数都有传
  if (resolve && reject) {
    // 如果直接调用originPush，它的this指向为window，所以要改变this指向为VueRouter的实例对象
    originPush.call(this, location, resolve, reject)
  } else {
    // 如果都没有传就替它传
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
// 重写replace方法
// 保留着原来replace方法，因为还要用
const originReplace = VueRouter.prototype.replace

// 当使用this.$router.push方法，就是执行下面的代码
VueRouter.prototype.replace = function (location, resolve, reject) {
  // 如果两个回调函数都有传
  if (resolve && reject) {
    // 如果直接调用originPush，它的this指向为window，所以要改变this指向为VueRouter的实例对象
    originReplace.call(this, location, resolve, reject)
  } else {
    // 如果都没有传就替它传
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      showFooter: true
    },
    component: () => import('@/views/Home/')
  },
  {
    path: '/search/:keyword?',
    name: 'search',
    meta: {
      showFooter: true
    },
    component: () => import('@/views/Search/')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      showFooter: false
    },
    component: () => import('@/views/Login/')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      showFooter: false
    },
    component: () => import('@/views/Register/')
  }
]

const router = new VueRouter({
  routes
})

export default router
