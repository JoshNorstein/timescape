import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  // Debug instrumentation (client-side only) to trace unexpected hash/route changes.
  if (typeof window !== 'undefined') {
    const origPush = Router.push.bind(Router)
    Router.push = function push(...args) {
      console.log('[ROUTER DEBUG] push', ...args, '\nstack:', new Error().stack)
      return origPush(...args)
    }

    const origReplace = Router.replace.bind(Router)
    Router.replace = function replace(...args) {
      console.log('[ROUTER DEBUG] replace', ...args, '\nstack:', new Error().stack)
      return origReplace(...args)
    }

    window.addEventListener('hashchange', () => {
      console.log('[ROUTER DEBUG] hashchange ->', location.hash, '\nstack:', new Error().stack)
    })

    Router.afterEach((to, from) => {
      console.log('[ROUTER DEBUG] afterEach to:', to.fullPath, 'from:', from.fullPath)
    })
  }

  return Router
})
