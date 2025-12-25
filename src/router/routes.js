const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'partidas', component: () => import('pages/PartidasPage.vue') },
      { path: 'salas', component: () => import('pages/SalasPage.vue') },
      { path: 'jugadores', component: () => import('pages/JugadoresPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
