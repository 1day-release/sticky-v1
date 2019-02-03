import Vue from 'vue'
import Router from 'vue-router'
import Edit from './views/Edit.vue'
import Presentation from './views/Presentation.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/presentation',
      name: 'Presentation',
      component: Presentation
    }
  ]
})
