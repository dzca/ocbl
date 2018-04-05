import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/Home'
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
    path: '/hello',
    name: 'HelloWorld',
    component: HelloWorld
  },
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
