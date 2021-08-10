import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    components: {
      // header: () => import(/* webpackChunkName: "Header" */ '../components/Header.vue'),
      default: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
    },
    beforeEnter: (to, from, next) => {
      if (!store.state.userInfoLiveChat.UserID) {
        next()
      } else {
        next('/Chats')
      }
    }
  },
  {
    path: '/about',
    name: 'About',
    components: {
      header: () => import(/* webpackChunkName: "Header" */ '../components/Header.vue'),
      default: () => import(/* webpackChunkName: "About" */ '../views/About.vue')
    },
    beforeEnter: (to, from, next) => {
      if (!store.state.userInfoLiveChat.UserID) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/Chats',
    name: 'Chats',
    components: {
      header: () => import(/* webpackChunkName: "Header" */ '../components/Header.vue'),
      default: () => import(/* webpackChunkName: "Chats" */ '../views/Chats.vue')
    },
    beforeEnter: (to, from, next) => {
      if (!store.state.userInfoLiveChat.UserID) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/Settings/Users',
    name: 'Users',
    components: {
      header: () => import(/* webpackChunkName: "Header" */ '../components/Header.vue'),
      default: () => import(/* webpackChunkName: "Users" */ '../views/Users.vue')
    },
    beforeEnter: (to, from, next) => {
      if (!store.state.userInfoLiveChat.UserID || store.state.userInfoLiveChat.IsAdmin != 1) {
        next('/')
      } else {
        next()
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
