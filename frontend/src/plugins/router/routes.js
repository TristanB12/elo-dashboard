export const routes = [
  { path: '/', redirect: '/leaderboard' },
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'leaderboard',
        component: () => import('@/pages/leaderboard.vue'),
      },
      {
        path: 'players',
        component: () => import('@/pages/players.vue'),
      },
      {
        path: 'games',
        component: () => import('@/pages/games.vue'),
      },
      {
        path: 'dashboard',
        component: () => import('@/pages/dashboard.vue'),
      }
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: 'login',
        component: () => import('@/pages/login.vue'),
      },
      {
        path: 'register',
        component: () => import('@/pages/register.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/[...error].vue'),
      },
    ],
  },
]
