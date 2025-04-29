import { createRouter, createWebHistory } from 'vue-router'

import LandingPage from '../components/LandingPage.vue'
import Login       from '../components/Login.vue'
import Signup      from '../components/Signup.vue'
import Dashboard   from '../components/Dashboard.vue'
import Profile     from '../components/Profilepage.vue'  
import Meals       from '../components/Meals.vue'

const routes = [
  { path: '/',          component: LandingPage },
  { path: '/login',     component: Login       },
  { path: '/signup',    component: Signup      },
  { path: '/dashboard', component: Dashboard   },
  { path: '/profile',   component: Profile   },
  { path: '/meals',     component: Meals       },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const publicPages  = ['/', '/login', '/signup']
  const requiresAuth = !publicPages.includes(to.path)
  const token        = localStorage.getItem('authToken')

  if (requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export { router }
