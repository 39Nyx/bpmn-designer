import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/BpmnView.vue'),
    },
    {
      path: '/bundling',
      name: 'bundling',
      component: () => import('../views/BundlingView.vue'),
    },
    {
      path: '/color',
      name: 'color',
      component: () => import('../views/ColorView.vue'),
    },
  ],
})

export default router
