import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import routes from './routes'
import arr from '@/util/arr'
//import firebase from 'firebase/app'
//import 'firebase/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  saveScrollPosition: true,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return { selector: to.hash };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  const routeByAuthState = () => {
    const isAdminPath = to.path.startsWith('/admin')
    const forbiddenDispPathsOnAuth = ['/signin', '/signup', '/admin/signin']
    const acceptPathsOnNotEmailVerifie = ['/user/verify-email', '/settings', '/user', '/admin']
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (requiresAuth) {
      if (store.state.auth.state) {
        if (forbiddenDispPathsOnAuth.includes(to.path)) {
          next(store.getters.isAdmin() ? { name:'AdminTop' } : { name:'UserTop' })
        } else if (isAdminPath && !store.getters.isAdmin()) {
          next({ name: 'Forbidden' })
        } else if (!store.getters.isEmailVerified()
          && !acceptPathsOnNotEmailVerifie.includes(to.path)) {
          next({ name:'RequiredEmailVerification' })
        }
        next()
      } else {
        next({
          path: isAdminPath ? '/admin/signin' :  '/signin',
          query: { redirect: to.fullPath }
        })
      }
    } else {
      next()
    }
  }

  store.dispatch('setHeaderMenuOpen', false)
  //firebase.auth().onAuthStateChanged(async (user) => {
  //  await store.dispatch('setUser', user)
  //  routeByAuthState()
  //})
  routeByAuthState()
})

export default router
