import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UploadProduct from '../views/UploadProductView.vue'
import UserRegister from '../views/UserRegisterView.vue'
import UserLogin from '../views/UserLoginView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'firstpage',
      component: UserLogin
    },
    {path:'/uploadproduct', name:'uploadproduct', component:UploadProduct },
    {path:'/login', name:'login', component:UserLogin },
    {path:'/register', name:'register', component:UserRegister },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
