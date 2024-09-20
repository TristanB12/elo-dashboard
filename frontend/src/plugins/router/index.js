import { createRouter, createWebHistory } from 'vue-router';
import useSessionStore from '../store/session';
import { routes } from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default function (app) {
  app.use(router)

  const sessionStore = useSessionStore()
  
  router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!sessionStore.isAuthenticated) {
         next('/login')
         return;
      }
      next()
    } else {
       next()
    }
  })
}
export { router };

