import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/IndexView.vue'
import SignIn from '@/views/SignIn.vue'
import SignUpView from '@/views/SignUpView.vue'
import ProfileView from '@/views/ProfileView.vue'
import AreaView from '@/views/AreaView.vue'
import AreaFormView from '@/views/AreaFormView.vue'
import AreasView from '@/views/AreasView.vue'
import RouteFormView from '@/views/RouteFormView.vue'
import RouteView from '@/views/RouteView.vue'
import NotFound from '@/views/NotFound.vue' 
import { jwtDecode } from 'jwt-decode'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'Index',
      component: IndexView
    },
    {
      path: '/signin',
      name: 'Signin',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'Signup',
      component: SignUpView
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfileView,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/areas/new',
      name: 'AreasForm',
      component: AreaFormView,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/areas/:id/edit',
      name: 'AreasFormEdit',
      component: AreaFormView,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/areas/:id',
      name: 'Area',
      component: AreaView 
    },
    {
      path: '/areas',
      name: 'Areas',
      component: AreasView
    },
    {
      path: '/routes/new',
      name: 'RouteForm',
      component: RouteFormView,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/routes/:id/edit',
      name: 'RouteFormEdit',
      component: RouteFormView,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/routes/:id',
      name: 'Route',
      component: RouteView
    },
    { path: '/:notFound(.*)', component: NotFound }
  ],

 

  scrollBehavior(to, from, savedPosition) {
    console.log('savedPosition', savedPosition)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Si savedPosition existe, on scroll à la position sauvegardée
        if (savedPosition) {
          resolve(savedPosition)
        }
        resolve({ left: 0, top: 0 })
      }, 500)
    })
  }
});

router.beforeEach((to, from, next)=>{
  try{
    if(to.meta.requiresAuth){
      const token = localStorage.getItem('token')
      if(token){
        const decoded = jwtDecode(token)
        const expiration = decoded.exp
        if(expiration < Date.now() / 1000){
          localStorage.removeItem('token') 
          this.$router.push('SignIn')
        }
        next()
      }
      else{
        this.$router.push('SignIn')
      }
    }
    else{
      next()
    }
  }
  catch(err){
    localStorage.removeItem('token')
    next('SignIn')
  }



 
})
 
export default router
