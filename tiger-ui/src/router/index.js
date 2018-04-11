import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/Home'
import Schedule from '@/pages/Schedule'
import Notice from '@/pages/Notice'
import Profile from '@/pages/Profile'
import HelloWorld from '@/components/HelloWorld'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/schedule',
    name: 'schedule',
    component: Schedule
  },
  {
    path: '/notices',
    name: 'notices',
    component: Notice
  },
  // {
  //   path: '/test',
  //   name: 'test',
  //   component: Test
  // },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  // history: true,
  // base: __dirname,
  routes: routes
})

export default router
