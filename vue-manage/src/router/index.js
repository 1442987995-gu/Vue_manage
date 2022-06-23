import Vue from 'vue'
import VueRouter from 'vue-router';
import indexHome from '../views/home/indexHome.vue'
import indexUser from '../views/User/indexUser.vue'
import indexMall from '../views/mall/indexMall.vue'
import pageOne from '../views/other/pageOne.vue'
import pageTwo from '../views/other/pageTwo.vue'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
  

Vue.use(VueRouter)
const routes=[
    {
        path:'/',
        name:'Main',
        // redirect:'/home',
        component: () => import('../views/Main.vue'),
         children: [
         ]
    },
    {
      path:'/login',
      name:'login',
      component:()=>import('../views/Login/login.vue')
    }
    
]
const router = new VueRouter({
    mode:'history',
    routes

})
export default router