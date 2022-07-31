import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// TODO: Implement authentication on every route
export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Login',
          path: '',
          component: () => import('@/views/dashboard/Login'),
        },
        {
          name: 'Dashboard',
          path: 'dashboard',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        {
          name: 'Questions',
          path: 'pages/questions',
          component: () => import('@/views/dashboard/pages/Questions.vue'),
        },
        {
          name: 'Add Question',
          path: 'pages/questions/create',
          component: () => import('@/views/dashboard/pages/AddQuestion.vue'),
          props: true,
        },
      ],
    },
  ],
})
