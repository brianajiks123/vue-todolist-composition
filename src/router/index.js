import { createRouter, createWebHistory } from 'vue-router'
// Import Authentication
import { d$auth } from '@store/auth'
//Import Home View
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/list',
      name: 'List',
      component: () => import('@/views/ListView.vue'),
      meta: { auth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Match All',
      component: () => import('@/views/NotFoundView.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      redirect: { name: 'Login' },
      // Nested Routes
      children: [
        {
          path: '',
          name: 'Login',
          component: () => import('@/views/Profile/LoginView.vue')
        },
        {
          path: '',
          name: 'Regist',
          component: () => import('@/views/Profile/RegisterView.vue'),
        },
        {
          // Add Optional Params
          path: 'detail/:id?',
          name: 'Authenticated',
          component: () => import('@/views/Profile/AuthenticatedView.vue'),
          meta: { auth: true }
        }
      ]
    },
  ]
})

// Navigation Guards
router.beforeEach((to, from, next) => {
  // Auth state
  const loggedIn = d$auth().isLoggedIn
  // If Target Route Requires Auth & No Logged in User
  // Redirect to Login
  if (to.meta.auth && !loggedIn) {
    next({ name: 'Login' })
  } else if (to.path === '/profile' && loggedIn) {
    next({ name: 'Authenticated', params: { id: d$auth().getUser.id } })
  } else {
    // Then proceeds
    next()
  }
})

export default router
