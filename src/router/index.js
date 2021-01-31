import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

window.chartColors = {
	red:    '255, 99, 132',
  orange: '255, 159, 64',
	yellow: '255, 205, 86',
	green:  '75, 192, 192',
	blue:   '54, 162, 235',
	purple: '153, 102, 255',
	grey:   '231, 233, 237'
};

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about/:id',
    name: 'about',
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
