import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '@/views/RegisterPage.vue'
import loginview from '@/views/LoginView.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'loginview',
    component: loginview, 
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/home',
    name: 'home',
    component : Home,
    children:[
      {
        path: '/goodsdata',
        name: 'goodsdata',
        component:() => import("@/views/MerchandiseManagement/GoodsData.vue")
      },
      {
        path: '/foodadd',
        name: 'foodadd',
        component:() =>import("@/views/MerchandiseManagement/FoodAdd.vue")
      },
      {
        path: '/classify',
        name: 'classify',
        component:() =>import("@/views/MerchandiseManagement/ClassIfy.vue")
      }
    ]
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
